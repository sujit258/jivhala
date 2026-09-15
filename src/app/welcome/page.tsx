'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic } from '@/components/avatars/AvatarGraphic';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeScreen() {
  const { t, avatarId } = useApp();

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#F8D8CC]/40 dark:bg-[#3A2925]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header text */}
      <div className="pt-6 text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] text-[#E97878] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Welcome ❤️</span>
        </div>
        <h1 className="text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
          {t('welcome.title')}
        </h1>
        <p className="mt-2 text-base text-[#292525]/85 dark:text-[#F7EFEA]/85 font-medium px-4">
          {t('welcome.subtitle')}
        </p>
        <p className="mt-1 text-xs text-[#817775] dark:text-[#A89D9A]">
          {t('welcome.english_tag')}
        </p>
      </div>

      {/* Main Avatar Companion Visual */}
      <div className="flex flex-col items-center justify-center my-auto z-10">
        <div className="relative">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-[#FFF2EA] to-[#FCE4D8] dark:from-[#2B2220] dark:to-[#1F1918] p-3 shadow-xl shadow-[#E97878]/10 border border-[#F8D8CC] dark:border-[#3E2F2B] flex items-center justify-center overflow-hidden">
            <AvatarGraphic avatarId={avatarId || 'aaisarkhi'} expression="caring" viewMode="hero" />
          </div>
          {/* Floating tiny heart badge */}
          <div className="absolute bottom-2 right-4 w-9 h-9 rounded-full bg-[#E97878] text-white flex items-center justify-center shadow-md shadow-[#E97878]/30">
            <span className="text-base leading-none">❤️</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Area */}
      <div className="flex flex-col items-center gap-3.5 pb-6 z-10">
        <Link
          href="/onboarding/language"
          className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-lg shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>{t('welcome.cta')}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        <p className="text-xs text-[#817775] dark:text-[#A89D9A] font-medium">
          {t('free_reassurance')}
        </p>
      </div>
    </div>
  );
}
