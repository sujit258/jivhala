'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { CheckCircle2, Share2, PlusSquare, Smartphone, ArrowLeft, Download } from 'lucide-react';

export default function InstallPWAScreen() {
  const router = useRouter();
  const { completeOnboarding, t } = useApp();
  const { isInstalled, isIOS, triggerInstall, hasNativePrompt } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');
  const [installedSuccess, setInstalledSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (activeTab === 'android' && hasNativePrompt) {
      const accepted = await triggerInstall();
      if (accepted) {
        setInstalledSuccess(true);
        setTimeout(() => {
          completeOnboarding();
          router.push('/home');
        }, 1200);
        return;
      }
    }
    // If no native prompt or already triggered, proceed to Home
    completeOnboarding();
    router.push('/home');
  };

  const handleFinish = () => {
    completeOnboarding();
    router.push('/home');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-center mb-3">
          <Link
            href="/onboarding/notifications"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('install_step.title')}
          </h1>
          <p className="mt-1 text-sm text-[#817775] dark:text-[#A89D9A]">
            {t('install_step.subtitle')}
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center justify-center gap-2 mt-5 p-1 bg-[#F8D8CC]/40 dark:bg-[#2B211F] rounded-2xl max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'android'
                ? 'bg-white dark:bg-[#3E2F2B] text-[#E97878] shadow-xs'
                : 'text-[#817775] dark:text-[#A89D9A]'
            }`}
          >
            {t('install_step.tab_android')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-[#3E2F2B] text-[#E97878] shadow-xs'
                : 'text-[#817775] dark:text-[#A89D9A]'
            }`}
          >
            {t('install_step.tab_ios')}
          </button>
        </div>
      </div>

      {/* Main Mockup & Instructions */}
      <div className="flex flex-col items-center my-auto py-4 z-10">
        {/* Visual Phone Card */}
        <div className="relative w-44 h-44 rounded-3xl bg-gradient-to-b from-[#FFF0E6] to-[#FCE2D6] dark:from-[#342724] dark:to-[#221B1A] border border-[#F8D8CC] dark:border-[#4B3733] shadow-lg shadow-[#E97878]/10 flex flex-col items-center justify-center p-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#2A211F] p-2 flex items-center justify-center shadow-md mb-2">
            <span className="text-3xl">❤️</span>
          </div>
          <span className="text-xs font-bold text-[#292525] dark:text-[#F7EFEA]">Jivhala</span>
          <span className="text-[10px] text-[#817775] dark:text-[#A89D9A]">Install App</span>
        </div>

        {/* Step Guide List */}
        {activeTab === 'android' ? (
          <div className="w-full flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <CheckCircle2 className="w-5 h-5 text-[#88A987] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.step1')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <CheckCircle2 className="w-5 h-5 text-[#88A987] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.step2')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <CheckCircle2 className="w-5 h-5 text-[#88A987] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.step3')}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2.5">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <div className="w-7 h-7 rounded-lg bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878] shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.ios_step1')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <div className="w-7 h-7 rounded-lg bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878] shrink-0">
                <PlusSquare className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.ios_step2')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F]">
              <div className="w-7 h-7 rounded-lg bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-[#88A987] shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#292525] dark:text-[#F7EFEA]">
                {t('install_step.ios_step3')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 pb-6">
        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-lg shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>{isInstalled || installedSuccess ? t('install_step.installed_success') : t('install_step.cta')}</span>
        </button>

        <button
          type="button"
          onClick={handleFinish}
          className="text-sm font-medium text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] py-1 transition-colors"
        >
          {t('maybe_later')}
        </button>
      </div>
    </div>
  );
}
