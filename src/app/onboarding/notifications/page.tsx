'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Bell, Heart, ShieldCheck, Clock, ArrowLeft, Loader2 } from 'lucide-react';

export default function NotificationPermissionScreen() {
  const router = useRouter();
  const { installationId, t } = useApp();
  const { subscribe, loading } = usePushNotifications(installationId);
  const [deniedState, setDeniedState] = useState(false);

  const handleRequest = async () => {
    const success = await subscribe();
    if (success) {
      router.push('/onboarding/install');
    } else {
      if (Notification.permission === 'denied') {
        setDeniedState(true);
      } else {
        // User dismissed or default, continue anyway
        router.push('/onboarding/install');
      }
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/install');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center mb-3">
          <Link
            href="/onboarding/messages"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('notifications_step.title')}
          </h1>
          <p className="mt-1.5 text-sm text-[#817775] dark:text-[#A89D9A] max-w-xs mx-auto">
            {t('notifications_step.subtitle')}
          </p>
        </div>
      </div>

      {/* Bell Visual with Glowing Particles */}
      <div className="flex flex-col items-center justify-center my-auto py-4 z-10">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FFE5D8] to-[#FFF0E6] dark:from-[#3D2C28] dark:to-[#2B201D] flex items-center justify-center shadow-lg shadow-[#E97878]/15 border border-[#F8D8CC] dark:border-[#4B3733]">
            <Bell className="w-12 h-12 text-[#E97878] fill-[#F8D8CC] dark:fill-[#523A35] animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>
          {/* Floating tiny warm hearts */}
          <Heart className="w-5 h-5 text-[#E97878] fill-[#E97878] absolute -top-1 -right-1 animate-pulse" />
          <Heart className="w-4 h-4 text-[#FFAAA6] fill-[#FFAAA6] absolute bottom-2 -left-2" />
        </div>

        {/* 3 Value propositions */}
        <div className="w-full flex flex-col gap-3">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center gap-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('notifications_step.f1_title')}
              </h4>
              <p className="text-xs text-[#817775] dark:text-[#A89D9A]">
                {t('notifications_step.f1_desc')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center gap-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#88A987] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('notifications_step.f2_title')}
              </h4>
              <p className="text-xs text-[#817775] dark:text-[#A89D9A]">
                {t('notifications_step.f2_desc')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center gap-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('notifications_step.f3_title')}
              </h4>
              <p className="text-xs text-[#817775] dark:text-[#A89D9A]">
                {t('notifications_step.f3_desc')}
              </p>
            </div>
          </div>
        </div>

        {deniedState && (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 text-center px-4">
            {t('notifications_step.denied_help')}
          </p>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 pb-6">
        <button
          type="button"
          onClick={handleRequest}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-lg shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>{t('notifications_step.cta')}</span>
          )}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="text-sm font-medium text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] py-1 transition-colors"
        >
          {t('later')}
        </button>
      </div>
    </div>
  );
}
