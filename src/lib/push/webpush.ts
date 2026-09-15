// Web Push Sender Utility using web-push & VAPID

import webpush from 'web-push';
import { deactivatePushSubscription } from '../db';

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:care@jivhala.app';

let vapidConfigured = false;

export function ensureVapidConfigured() {
  if (vapidConfigured) return true;
  if (!vapidPublicKey || !vapidPrivateKey) {
    console.warn('[WebPush] VAPID keys not configured in environment variables.');
    return false;
  }
  try {
    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
    vapidConfigured = true;
    return true;
  } catch (err) {
    console.error('[WebPush] Failed to configure VAPID:', err);
    return false;
  }
}

export interface CareNotificationPayload {
  title: string;
  body: string;
  notificationId: string;
  category: string;
  expression?: string;
  url?: string;
  icon?: string;
  tag?: string;
}

export async function sendWebPushNotification(
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  },
  payload: CareNotificationPayload
): Promise<{ success: boolean; error?: string; expired?: boolean }> {
  const isReady = ensureVapidConfigured();
  if (!isReady) {
    return { success: false, error: 'VAPID keys not configured on server' };
  }

  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth
    }
  };

  const notificationData = {
    ...payload,
    url: payload.url || `/care/${payload.notificationId}`,
    icon: payload.icon || '/icons/icon-192.svg'
  };

  try {
    await webpush.sendNotification(
      pushSubscription,
      JSON.stringify(notificationData),
      {
        TTL: 60 * 60 * 24 // 24 hours
      }
    );
    return { success: true };
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string };
    console.warn(`[WebPush] Push delivery error (status: ${error.statusCode}):`, error.message);

    // If subscription is expired or unsubscribed (HTTP 404 or 410)
    if (error.statusCode === 404 || error.statusCode === 410) {
      await deactivatePushSubscription(subscription.endpoint);
      return { success: false, expired: true, error: 'Subscription expired or unregistered' };
    }

    return { success: false, error: error.message || 'Unknown push error' };
  }
}
