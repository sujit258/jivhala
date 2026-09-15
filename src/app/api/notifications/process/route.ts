import { NextRequest, NextResponse } from 'next/server';
import {
  getActivePushSubscriptions,
  getInstallation,
  getReminders,
  getNextMessage,
  hasNotificationBeenDelivered,
  recordNotificationDelivery
} from '@/lib/db';
import { sendWebPushNotification } from '@/lib/push/webpush';

async function processNotifications(req: NextRequest) {
  // Canonical Vercel Cron secret is CRON_SECRET (development fallback to NOTIFICATION_CRON_SECRET)
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || (process.env.NODE_ENV !== 'production' ? process.env.NOTIFICATION_CRON_SECRET : undefined);

  if (cronSecret) {
    const bearer = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    const querySecret = new URL(req.url).searchParams.get('secret');
    if (bearer !== cronSecret && querySecret !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'CRON_SECRET is not configured on server' }, { status: 500 });
  }

  try {
    const activeSubscriptions = await getActivePushSubscriptions();
    const results = {
      totalSubscriptions: activeSubscriptions.length,
      processed: 0,
      sent: 0,
      skippedQuietHours: 0,
      skippedAlreadySent: 0,
      errors: 0
    };

    // Group subscriptions by installation
    const subsByInstallation = new Map<string, typeof activeSubscriptions>();
    for (const sub of activeSubscriptions) {
      const list = subsByInstallation.get(sub.installationId) || [];
      list.push(sub);
      subsByInstallation.set(sub.installationId, list);
    }

    for (const [installationId, subs] of subsByInstallation.entries()) {
      results.processed++;
      const installation = await getInstallation(installationId);
      const timezone = installation?.timezone || 'Asia/Kolkata';

      // 1. Calculate current local time and date in installation timezone
      const localTimeString = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());

      const localDateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date());

      const [localHour, localMinute] = localTimeString.split(':').map(Number);
      const currentMinutes = localHour * 60 + localMinute;

      // 2. Check Quiet Hours (Default: 23:00 to 07:30 = 1380m to 450m)
      const isQuietHours = currentMinutes >= 23 * 60 || currentMinutes < 7 * 60 + 30;
      if (isQuietHours) {
        results.skippedQuietHours++;
        continue;
      }

      // 3. Find reminders matching current time window (within ±5 minutes)
      const reminders = await getReminders(installationId);
      const dueReminders = reminders.filter((r) => {
        if (!r.enabled) return false;
        const [rh, rm] = r.scheduledTime.split(':').map(Number);
        const remMinutes = rh * 60 + rm;
        return Math.abs(currentMinutes - remMinutes) <= 5;
      });

      if (dueReminders.length === 0) {
        continue;
      }

      // 4. Send caring notification for due reminder (with deduplication)
      for (const reminder of dueReminders) {
        // Idempotency key: specific scheduled bucket for today
        const scheduledBucket = `${localDateStr}T${reminder.scheduledTime}:00`;

        // Check if already delivered for this bucket
        const alreadySent = await hasNotificationBeenDelivered(installationId, reminder.id, scheduledBucket);
        if (alreadySent) {
          results.skippedAlreadySent++;
          continue;
        }

        const lang = installation?.language || 'mr';
        const msg = getNextMessage({
          installationId,
          categoryId: reminder.categoryId,
          language: lang
        });

        const notificationId = `care-${reminder.id}-${Date.now()}`;
        const payload = {
          title: reminder.customMessage || msg.text,
          body: msg.secondaryText || 'छोट्या छोट्या गोष्टींची काळजी.',
          notificationId,
          category: reminder.categoryId,
          expression: msg.expression,
          url: `/care/${notificationId}`
        };

        let deliverySuccess = false;
        let lastError = '';

        for (const sub of subs) {
          const res = await sendWebPushNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth }
            },
            payload
          );

          if (res.success) {
            deliverySuccess = true;
          } else {
            lastError = res.error || 'Push error';
          }
        }

        if (deliverySuccess) {
          results.sent++;
          await recordNotificationDelivery({
            installationId,
            reminderId: reminder.id,
            scheduledFor: scheduledBucket,
            status: 'sent'
          });
        } else {
          results.errors++;
          await recordNotificationDelivery({
            installationId,
            reminderId: reminder.id,
            scheduledFor: scheduledBucket,
            status: 'failed',
            error: lastError
          });
        }
      }
    }

    return NextResponse.json({ success: true, ...results });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Notification processor failure';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Support both GET (default for Vercel Cron) and POST
export async function GET(req: NextRequest) {
  return processNotifications(req);
}

export async function POST(req: NextRequest) {
  return processNotifications(req);
}
