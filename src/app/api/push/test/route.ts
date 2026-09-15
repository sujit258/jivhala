import { NextRequest, NextResponse } from 'next/server';
import { getActivePushSubscriptions } from '@/lib/db';
import { sendWebPushNotification } from '@/lib/push/webpush';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId } = body;

    if (!installationId) {
      return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
    }

    const subscriptions = await getActivePushSubscriptions(installationId);

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No active push subscription found for this device. Please enable notifications first!' },
        { status: 404 }
      );
    }

    const notificationId = `push-care-${Date.now()}`;
    const payload = {
      title: '🍱 जेवण झालं का? ❤️',
      body: 'कामासाठी जेवण skip करू नकोस. तू महत्वाचा आहेस.',
      notificationId,
      category: 'food',
      expression: 'caring',
      url: `/care/${notificationId}`,
      icon: '/icons/icon-192.svg',
      tag: 'jivhala-care-test'
    };

    let sent = 0;
    for (const sub of subscriptions) {
      const res = await sendWebPushNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        },
        payload
      );
      if (res.success) {
        sent++;
      }
    }

    return NextResponse.json({
      success: sent > 0,
      sentCount: sent,
      notificationId,
      targetUrl: `/care/${notificationId}`
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Test push failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
