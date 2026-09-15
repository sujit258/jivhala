import { NextRequest, NextResponse } from 'next/server';
import { upsertInstallation, getInstallation } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installationId');

  if (!installationId) {
    return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
  }

  try {
    const installation = await getInstallation(installationId);
    return NextResponse.json({ installation });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId, name, language, avatarId, timezone, platform, userAgent } = body;

    if (!installationId) {
      return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
    }

    const saved = await upsertInstallation({
      installationId,
      name: name || 'सखी',
      language: language || 'mr',
      avatarId: avatarId || 'aaisarkhi',
      timezone: timezone || 'Asia/Kolkata',
      platform,
      userAgent
    });

    return NextResponse.json({ success: true, installation: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to upsert installation';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
