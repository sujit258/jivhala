'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic, AvatarId } from '@/components/avatars/AvatarGraphic';
import { SEED_AVATARS } from '@/lib/db/seed-data';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ChooseAvatarScreen() {
  const router = useRouter();
  const { avatarId, updateAvatar, t } = useApp();

  const handleSelect = (id: string) => {
    updateAvatar(id);
  };

  const handleContinue = () => {
    router.push('/onboarding/name');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center mb-3">
          <Link
            href="/onboarding/language"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('avatar.title')}
          </h1>
          <p className="mt-1.5 text-sm text-[#817775] dark:text-[#A89D9A]">
            {t('avatar.subtitle')}
          </p>
        </div>
      </div>

      {/* 6 Original Avatars Grid */}
      <div className="grid grid-cols-2 gap-3.5 my-auto py-4">
        {SEED_AVATARS.map((companion) => {
          const isSelected = avatarId === companion.id;
          return (
            <button
              key={companion.id}
              type="button"
              onClick={() => handleSelect(companion.id)}
              className={`relative p-3 rounded-2xl flex flex-col items-center text-center border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-[#E97878] bg-[#FDF1EB] dark:bg-[#342421] shadow-md shadow-[#E97878]/15 scale-[1.02]'
                  : 'border-[#F3E5DC] dark:border-[#38312F] bg-white dark:bg-[#272120] hover:border-[#E97878]/50'
              }`}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E97878] text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Avatar Illustration */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-[#FFF2EA] to-[#FCE4D8] dark:from-[#362C2A] dark:to-[#2A201E] p-1 flex items-center justify-center overflow-hidden mb-2">
                <AvatarGraphic
                  avatarId={companion.id as AvatarId}
                  expression={isSelected ? 'happy' : 'caring'}
                  viewMode="card"
                />
              </div>

              <h3 className="text-base font-bold text-[#292525] dark:text-[#F7EFEA]">
                {companion.name}
              </h3>
              <p className="text-[11px] leading-tight text-[#817775] dark:text-[#A89D9A] mt-1 line-clamp-2">
                {companion.personality}
              </p>
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
