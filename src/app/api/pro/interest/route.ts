import { NextRequest, NextResponse } from 'next/server';
import { saveProInterest, isProInterested } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installationId');

  if (!installationId) {
    return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
  }

  try {
    const interested = await isProInterested(installationId);
    return NextResponse.json({ interested });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId } = body;

    if (!installationId) {
      return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
    }

    await saveProInterest(installationId);
    return NextResponse.json({ success: true, proInterest: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to record Pro interest';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
