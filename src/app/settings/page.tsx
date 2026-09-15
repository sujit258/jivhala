'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic } from '@/components/avatars/AvatarGraphic';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import {
  Bell,
  MessageSquareHeart,
  Globe,
  SunMoon,
  Sparkles,
  Shield,
  Info,
  RotateCcw,
  ChevronRight,
  Check
} from 'lucide-react';
import { LANGUAGE_OPTIONS } from '@/lib/i18n';

export default function SettingsScreen() {
  const { name, avatarId, language, updateLanguage, theme, toggleTheme, resetAllData, t } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F5] dark:bg-[#1B1716] pb-24 overflow-hidden">
      {/* Top Header */}
      <div className="pt-8 pb-4 px-6">
        <h1 className="text-2xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
          {t('settings.title')}
        </h1>
      </div>

      {/* User Profile Card */}
      <div className="px-6 mb-5">
        <div className="p-4 rounded-3xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#FFF2EA] dark:bg-[#3D2C28] p-1 border border-[#F8D8CC] dark:border-[#4B3733] flex items-center justify-center overflow-hidden">
              <AvatarGraphic avatarId={avatarId} expression="caring" viewMode="thumbnail" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#292525] dark:text-[#F7EFEA]">
                {name || 'सखी'}
              </h2>
              <Link
                href="/onboarding/name"
                className="text-xs text-[#E97878] font-semibold hover:underline"
              >
                {t('settings.edit_profile')}
              </Link>
            </div>
          </div>

          <Link
            href="/onboarding/avatar"
            className="px-3 py-1.5 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] text-xs font-semibold text-[#E97878] hover:bg-[#F8D8CC]/60 transition-colors"
          >
            Change Avatar
          </Link>
        </div>
      </div>

      {/* Settings Options List */}
      <div className="px-6 flex flex-col gap-2.5">
        {/* Notifications & Reminders */}
        <Link
          href="/onboarding/messages"
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.notifications')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {t('settings.notifications_desc')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#817775]" />
        </Link>

        {/* Message Style & Categories */}
        <Link
          href="/onboarding/messages"
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878]">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.message_style')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {t('settings.message_style_desc')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#817775]" />
        </Link>

        {/* Language Selection */}
        <button
          type="button"
          onClick={() => setShowLanguageModal(true)}
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.language')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {LANGUAGE_OPTIONS.find((l) => l.code === language)?.label}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#817775]" />
        </button>

        {/* App Appearance / Dark Mode */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#E97878]">
              <SunMoon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.app_appearance')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {theme === 'dark' ? t('settings.mode_dark') : t('settings.mode_light')}
              </p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] text-xs font-semibold text-[#E97878]">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </div>
        </button>

        {/* Jivhala Pro Feature Teaser Card */}
        <Link
          href="/pro"
          className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0E6] to-[#FCE6DB] dark:from-[#332421] dark:to-[#2A1D1A] border-2 border-[#F8D8CC] dark:border-[#4B3733] flex items-center justify-between shadow-xs hover:border-[#E97878] transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#E97878] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA]">
                  {t('settings.pro_card')}
                </h3>
                <span className="px-1.5 py-0.5 rounded-md bg-[#E97878] text-white text-[10px] font-bold">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {t('settings.coming_soon')} • ₹20 Lifetime
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#E97878]" />
        </Link>

        {/* Privacy Policy */}
        <Link
          href="/privacy"
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#88A987]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.privacy')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                Zero camera or microphone access
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#817775]" />
        </Link>

        {/* About App */}
        <Link
          href="/about"
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] flex items-center justify-between hover:border-[#E97878]/50 shadow-xs transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-[#817775]">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#292525] dark:text-[#F7EFEA]">
                {t('settings.about')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {t('settings.version')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#817775]" />
        </Link>

        {/* Reset App Option */}
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-red-200 dark:border-red-900/40 flex items-center justify-between hover:border-red-400 shadow-xs transition-all text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center text-red-500">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                {t('settings.reset')}
              </h3>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                Clear local preferences on this device
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6">
          <div className="w-full max-w-xs rounded-3xl bg-white dark:bg-[#272120] p-5 shadow-2xl border border-[#F8D8CC] dark:border-[#38312F]">
            <h3 className="text-lg font-bold text-[#292525] dark:text-[#F7EFEA] mb-3">
              {t('settings.language')}
            </h3>
            <div className="flex flex-col gap-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    updateLanguage(opt.code);
                    setShowLanguageModal(false);
                  }}
                  className={`p-3 rounded-xl flex items-center justify-between text-left text-sm font-semibold transition-all ${
                    language === opt.code
                      ? 'bg-[#E97878] text-white'
                      : 'bg-[#FFF9F5] dark:bg-[#1E1716] text-[#292525] dark:text-[#F7EFEA] hover:bg-[#F8D8CC]/40'
                  }`}
                >
                  <span>{opt.label}</span>
                  {language === opt.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-4 py-2.5 text-xs text-[#817775] font-semibold hover:underline"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6">
          <div className="w-full max-w-xs rounded-3xl bg-white dark:bg-[#272120] p-5 shadow-2xl border border-red-200 dark:border-red-900/40 text-center">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              {t('settings.reset')}
            </h3>
            <p className="text-xs text-[#817775] dark:text-[#A89D9A] mb-4">
              {t('settings.reset_confirm')}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#F3E5DC] text-xs font-semibold text-[#817775]"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  resetAllData();
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-xs font-semibold text-white"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
