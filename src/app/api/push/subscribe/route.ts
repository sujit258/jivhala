import { NextRequest, NextResponse } from 'next/server';
import { savePushSubscription } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId, endpoint, p256dh, auth, platform, userAgent } = body;

    if (!installationId || !endpoint || !p256dh || !auth) {
      return NextResponse.json(
        { error: 'Missing required subscription fields (installationId, endpoint, p256dh, auth)' },
        { status: 400 }
      );
    }

    const saved = await savePushSubscription({
      installationId,
      endpoint,
      p256dh,
      auth,
      platform,
      userAgent
    });

    return NextResponse.json({ success: true, subscriptionId: saved.id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Subscription registration failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
