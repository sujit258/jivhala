'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic } from '@/components/avatars/AvatarGraphic';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function NameScreen() {
  const router = useRouter();
  const { name, updateName, avatarId, t } = useApp();
  const [inputName, setInputName] = useState(name === 'सखी' ? '' : name);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = inputName.trim() || 'सखी';
    updateName(finalName);
    router.push('/onboarding/messages');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center mb-3">
          <Link
            href="/onboarding/avatar"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('name_step.title')}
          </h1>
        </div>
      </div>

      {/* Center Companion Preview & Input */}
      <div className="flex flex-col items-center my-auto py-6 z-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#FFF2EA] to-[#FCE4D8] dark:from-[#342724] dark:to-[#221B1A] p-2 shadow-lg shadow-[#E97878]/10 border border-[#F8D8CC] dark:border-[#3E2F2B] flex items-center justify-center overflow-hidden mb-6">
          <AvatarGraphic
            avatarId={avatarId}
            expression={inputName.trim() ? 'happy' : 'caring'}
            viewMode="hero"
          />
        </div>

        {/* Live speech bubble */}
        {inputName.trim() && (
          <div className="mb-6 px-4 py-2.5 rounded-2xl bg-[#FDF1EB] dark:bg-[#342421] border border-[#F8D8CC] dark:border-[#4B3834] text-center max-w-xs shadow-sm">
            <p className="text-sm font-semibold text-[#E97878]">
              {t('name_step.greeting', { name: inputName.trim() })}
            </p>
            <p className="text-xs text-[#817775] dark:text-[#A89D9A] mt-0.5">
              {t('name_step.reassurance')}
            </p>
          </div>
        )}

        <form onSubmit={handleContinue} className="w-full max-w-xs">
          <div className="relative">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder={t('name_step.placeholder')}
              autoFocus
              maxLength={30}
              className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-[#272120] border-2 border-[#F3E5DC] dark:border-[#38312F] focus:border-[#E97878] focus:outline-none text-[#292525] dark:text-[#F7EFEA] text-center text-lg font-medium shadow-sm transition-all duration-200"
            />
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pb-6">
        <button
          type="button"
          onClick={() => handleContinue()}
          className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-lg shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>{t('continue')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
