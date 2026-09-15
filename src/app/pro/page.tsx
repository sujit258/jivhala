'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic } from '@/components/avatars/AvatarGraphic';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  MessageSquare,
  Clock,
  Smartphone,
  CalendarHeart,
  Brain,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JivhalaProScreen() {
  const router = useRouter();
  const { avatarId, proInterest, recordProInterest, t } = useApp();
  const [notified, setNotified] = useState(proInterest);

  const handleNotifyMe = async () => {
    setNotified(true);
    await recordProInterest();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  const proFeatures = [
    {
      icon: Heart,
      title: 'More Companions',
      desc: 'अजून avatars आणि personalities',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
    },
    {
      icon: MessageSquare,
      title: 'More Message Packs',
      desc: 'नवीन विषयांचे काळजीचे मेसेज',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40'
    },
    {
      icon: Clock,
      title: 'Advanced Reminders',
      desc: 'तुमच्या पद्धतीने customize करा',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
    },
    {
      icon: Smartphone,
      title: 'Multi-device Sync',
      desc: 'तुमच्या दुसऱ्या फोनवरही Jivhala',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40'
    },
    {
      icon: CalendarHeart,
      title: 'Special Occasions',
      desc: 'वाढदिवस, सण आणि खास दिवस',
      color: 'text-red-500 bg-red-50 dark:bg-red-950/40'
    },
    {
      icon: Brain,
      title: 'Smarter Personalization',
      desc: 'तुमच्या सवयीनुसार सुंदर अधिक personal',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      icon: Sparkles,
      title: 'More Immersive Experiences',
      desc: 'तुमच्या companion अजून जवळून भेटेल',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F5] dark:bg-[#1B1716] pb-12 overflow-hidden">
      {/* Top Header with Avatar Peek */}
      <div className="relative pt-6 pb-6 px-6 bg-gradient-to-b from-[#FFF0E6] via-[#FFF5EE] to-[#FFF9F5] dark:from-[#2E201D] dark:via-[#211816] dark:to-[#1B1716] border-b border-[#F3E5DC]/60 dark:border-[#38312F]/60">
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/settings"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="px-3 py-1 rounded-full bg-[#E97878] text-white text-[11px] font-bold shadow-xs">
            COMING SOON
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif flex items-center gap-1.5">
              Jivhala Pro <Sparkles className="w-5 h-5 text-[#E97878]" />
            </h1>
            <p className="text-sm font-semibold text-[#E97878] mt-0.5">
              {t('pro.tagline')}
            </p>
          </div>

          {/* Top Avatar Peek */}
          <div className="w-16 h-16 rounded-full bg-[#FFF2EA] dark:bg-[#382622] p-1 border-2 border-[#F8D8CC] dark:border-[#4B3733] shadow-md flex items-center justify-center overflow-hidden">
            <AvatarGraphic avatarId={avatarId} expression="happy" viewMode="thumbnail" />
          </div>
        </div>

        <p className="mt-3 text-xs text-[#817775] dark:text-[#B4A7A4] leading-relaxed">
          {t('pro.intro')}
        </p>
      </div>

      {/* Pro Features Grid */}
      <div className="px-6 py-5 flex flex-col gap-2.5">
        {proFeatures.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-center gap-3.5 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${feat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA]">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#817775] dark:text-[#A89D9A] truncate">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Card (₹20 Lifetime) */}
      <div className="px-6 py-2">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FFF2EA] via-white to-[#FCE6DB] dark:from-[#332421] dark:via-[#261C1A] dark:to-[#221614] border-2 border-[#F8D8CC] dark:border-[#4B3733] shadow-lg shadow-[#E97878]/10 text-center flex flex-col items-center">
          <span className="text-xs font-bold text-[#817775] dark:text-[#A89D9A] uppercase tracking-wider">
            {t('pro.pricing_headline')}
          </span>
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[#E97878] font-serif">
              {t('pro.price')}
            </span>
            <span className="text-xs font-bold text-[#817775]">
              LIFETIME
            </span>
          </div>
          <span className="text-xs font-semibold text-[#292525] dark:text-[#F7EFEA]">
            {t('pro.one_time')}
          </span>
          <p className="text-[10px] text-[#817775] dark:text-[#A89D9A] mt-1 italic">
            {t('pro.disclaimer')}
          </p>

          <div className="w-full mt-4 pt-3 border-t border-[#F3E5DC]/80 dark:border-[#38312F] text-[11px] text-[#817775] dark:text-[#BCAEA9] leading-relaxed text-left">
            ℹ️ {t('pro.account_note')}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pt-4 flex flex-col items-center gap-3">
        {notified ? (
          <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('pro.cta_notified')}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleNotifyMe}
            className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-base shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <BellRing className="w-5 h-5" />
            <span>{t('pro.cta_notify')}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => router.push('/home')}
          className="text-xs font-semibold text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] py-1 transition-colors"
        >
          {t('pro.maybe_later')}
        </button>
      </div>
    </div>
  );
}
