'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LANGUAGE_OPTIONS, LanguageCode } from '@/lib/i18n';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { language, updateLanguage, t } = useApp();

  const handleSelect = (code: LanguageCode) => {
    updateLanguage(code);
  };

  const handleContinue = () => {
    router.push('/onboarding/avatar');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Bar */}
      <div>
        <div className="flex items-center mb-4">
          <Link
            href="/welcome"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center pt-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('language.title')}
          </h1>
          <p className="mt-2 text-sm text-[#817775] dark:text-[#A89D9A]">
            {t('language.subtitle')}
          </p>
        </div>
      </div>

      {/* Language Options Cards */}
      <div className="flex flex-col gap-3.5 my-auto py-6">
        {LANGUAGE_OPTIONS.map((opt) => {
          const isSelected = language === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => handleSelect(opt.code)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-[#E97878] bg-[#FDF1EB] dark:bg-[#342421] shadow-md shadow-[#E97878]/10 scale-[1.01]'
                  : 'border-[#F3E5DC] dark:border-[#38312F] bg-white dark:bg-[#272120] hover:border-[#E97878]/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                    isSelected
                      ? 'bg-[#E97878] text-white'
                      : 'bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] text-[#817775] dark:text-[#A89D9A]'
                  }`}
                >
                  {opt.code === 'mr' ? 'म' : opt.code === 'hi' ? 'ह' : opt.code === 'en' ? 'En' : 'Hg'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292525] dark:text-[#F7EFEA]">
                    {opt.label}
                  </h3>
                  <p className="text-xs text-[#817775] dark:text-[#A89D9A]">
                    {opt.description}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#E97878] text-white' : 'border-2 border-[#D9CECB] dark:border-[#524744]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="pb-6">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-lg shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>{t('continue')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
