import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/db';
import { SEED_MESSAGES } from '@/lib/db/seed-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const language = (searchParams.get('language') || 'mr') as 'mr' | 'hi' | 'en' | 'hinglish';

  try {
    const categories = await getCategories();

    if (categoryId) {
      const messages = SEED_MESSAGES.filter(
        (m) => m.categoryId === categoryId && m.language === language
      );
      return NextResponse.json({ categoryId, language, messages });
    }

    return NextResponse.json({ categories });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
