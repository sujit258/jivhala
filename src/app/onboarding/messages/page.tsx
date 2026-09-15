'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { SEED_CATEGORIES } from '@/lib/db/seed-data';
import { ArrowRight, ArrowLeft, Info } from 'lucide-react';

export default function PredefinedMessagesScreen() {
  const router = useRouter();
  const { categoryPreferences, toggleCategory, t } = useApp();

  const handleContinue = () => {
    router.push('/onboarding/notifications');
  };

  const getCategorySample = (id: string) => {
    switch (id) {
      case 'morning':
        return 'आजचा दिवस छान जाऊ दे. 🌅';
      case 'food':
        return 'कामासाठी जेवण skip करू नकोस. 🍱';
      case 'water':
        return 'एक ग्लास पाणी घे आधी. 💧';
      case 'break':
        return 'थोडा ब्रेक घे ना. ☕';
      case 'sleep':
        return 'आता आराम कर. उद्या पुन्हा सुरुवात. 🌙';
      case 'self_care':
        return 'आज स्वतःची काळजी घेतलीस का? ❤️';
      case 'motivation':
        return 'तू खूप छान करतोयस, पुढे जा. 💪';
      default:
        return 'काळजी घ्या!';
    }
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center mb-3">
          <Link
            href="/onboarding/name"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('messages_step.title')}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#817775] dark:text-[#A89D9A] max-w-xs mx-auto">
            {t('messages_step.subtitle')}
          </p>
        </div>
      </div>

      {/* Predefined Categories List - ALL ENABLED BY DEFAULT */}
      <div className="flex flex-col gap-2.5 my-auto py-4 overflow-y-auto max-h-[60vh] pr-1">
        {SEED_CATEGORIES.map((category) => {
          const isEnabled = categoryPreferences[category.id] !== false; // Default true!
          return (
            <div
              key={category.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between shadow-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-xl shrink-0">
                  {category.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                      {category.name}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F8D8CC]/50 dark:bg-[#43312D] text-[#817775] dark:text-[#B8ABA7]">
                      {category.defaultTime}
                    </span>
                  </div>
                  <p className="text-xs text-[#817775] dark:text-[#A89D9A] mt-0.5 line-clamp-1">
                    {getCategorySample(category.id)}
                  </p>
                </div>
              </div>

              {/* iOS style toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => toggleCategory(category.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEnabled ? 'bg-[#E97878]' : 'bg-[#D9CECB] dark:bg-[#4A403D]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Reassurance Box & CTA */}
      <div className="flex flex-col gap-3.5 pb-6">
        <div className="p-3 rounded-2xl bg-[#FDF1EB] dark:bg-[#2F2321] border border-[#F8D8CC] dark:border-[#4B3733] flex items-start gap-2.5 text-xs text-[#817775] dark:text-[#BCAFA9]">
          <Info className="w-4 h-4 text-[#E97878] shrink-0 mt-0.5" />
          <p>{t('messages_step.reassurance')}</p>
        </div>

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
