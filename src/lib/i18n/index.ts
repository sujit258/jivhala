// i18n Translation Engine for Jivhala

import mr from '@/locales/mr.json';
import hi from '@/locales/hi.json';
import en from '@/locales/en.json';
import hinglish from '@/locales/hinglish.json';

export type LanguageCode = 'mr' | 'hi' | 'en' | 'hinglish';

export const translations: Record<LanguageCode, typeof mr> = {
  mr,
  hi,
  en,
  hinglish
};

export const LANGUAGE_OPTIONS: { code: LanguageCode; label: string; native: string; description: string }[] = [
  { code: 'mr', label: 'मराठी', native: 'मराठी', description: 'मायबोली मराठीमध्ये आपलेपणा' },
  { code: 'hi', label: 'हिन्दी', native: 'हिन्दी', description: 'सरल और आत्मीय हिंदी' },
  { code: 'en', label: 'English', native: 'English', description: 'Simple, warm English' },
  { code: 'hinglish', label: 'Hinglish', native: 'Hinglish', description: 'Casual, friendly mix' }
];

export function getTranslation(lang: LanguageCode = 'mr') {
  return translations[lang] || translations.mr;
}

// Nested key lookup with interpolation: t('welcome.title') or t('companion.title', { name: 'Sujeet' })
export function t(
  lang: LanguageCode,
  path: string,
  variables?: Record<string, string | number>
): string {
  const dict = getTranslation(lang);
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = dict;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }

  if (typeof current !== 'string') return path;

  let result = current;
  if (variables) {
    for (const [k, v] of Object.entries(variables)) {
      result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }

  return result;
}
