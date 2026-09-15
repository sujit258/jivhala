import { NextRequest, NextResponse } from 'next/server';
import { deactivatePushSubscription } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
    }

    await deactivatePushSubscription(endpoint);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unsubscribe failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
