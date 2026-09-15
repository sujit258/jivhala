import { NextRequest, NextResponse } from 'next/server';
import { getReminders, saveReminder, deleteReminder } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get('installationId');

  if (!installationId) {
    return NextResponse.json({ error: 'installationId is required' }, { status: 400 });
  }

  try {
    const list = await getReminders(installationId);
    return NextResponse.json({ reminders: list });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { installationId, categoryId, scheduledTime, customMessage, repeatType, repeatDays, enabled, id } = body;

    if (!installationId || !scheduledTime) {
      return NextResponse.json({ error: 'installationId and scheduledTime are required' }, { status: 400 });
    }

    const saved = await saveReminder({
      id,
      installationId,
      categoryId: categoryId || 'food',
      customMessage,
      scheduledTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      repeatType: repeatType || 'daily',
      repeatDays,
      enabled: enabled !== undefined ? enabled : true
    });

    return NextResponse.json({ success: true, reminder: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save reminder';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const installationId = searchParams.get('installationId');

  if (!id || !installationId) {
    return NextResponse.json({ error: 'id and installationId are required' }, { status: 400 });
  }

  try {
    const ok = await deleteReminder(id, installationId);
    return NextResponse.json({ success: ok });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete reminder';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
