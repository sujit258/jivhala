'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeScreen() {
  const { t } = useApp();

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#F8D8CC]/40 dark:bg-[#3A2925]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header text */}
      <div className="pt-4 text-center z-10">
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

      {/* Official Brand Logo Emblem */}
      <div className="flex flex-col items-center justify-center my-auto z-10 py-2">
        <div className="relative group">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-white/70 dark:bg-[#27201E]/70 backdrop-blur-xs shadow-2xl shadow-[#E97878]/20 border border-[#F8D8CC] dark:border-[#423330] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
            <Image
              src="/logo.webp"
              alt="Jivhala Official Logo — छोट्या छोट्या गोष्टींची काळजी"
              width={288}
              height={288}
              priority
              className="w-full h-full object-contain rounded-full select-none"
            />
          </div>
          {/* Subtle floating heart pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-[#2F2624] text-[#E97878] border border-[#F8D8CC] dark:border-[#4B3733] shadow-md text-xs font-semibold flex items-center gap-1">
            <span>सखी</span>
            <span className="text-[#E97878]">❤️</span>
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
