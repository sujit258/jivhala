import { NextRequest, NextResponse } from 'next/server';
import { recordNotificationResponse } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId, notificationDeliveryId, responseType } = body;

    if (!installationId || !responseType) {
      return NextResponse.json(
        { error: 'installationId and responseType are required' },
        { status: 400 }
      );
    }

    await recordNotificationResponse({
      installationId,
      notificationDeliveryId,
      responseType
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to record care response';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
