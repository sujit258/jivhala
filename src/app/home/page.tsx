'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic } from '@/components/avatars/AvatarGraphic';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Plus, Check, Bell, Sun, Sunset, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HomeScreen() {
  const router = useRouter();
  const { name, avatarId, reminders, t, installationId } = useApp();
  const { isInstalled, isInstallable, triggerInstall } = usePWAInstall();
  const { sendTestNotification } = usePushNotifications(installationId);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [dismissInstallBanner, setDismissInstallBanner] = useState(false);

  // Time of day greeting calculation
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: t('home.morning'), icon: Sun, iconColor: 'text-amber-500' };
    } else if (hour >= 12 && hour < 17) {
      return { text: t('home.afternoon'), icon: Sun, iconColor: 'text-amber-600' };
    } else if (hour >= 17 && hour < 21) {
      return { text: t('home.evening'), icon: Sunset, iconColor: 'text-orange-500' };
    } else {
      return { text: t('home.night'), icon: Moon, iconColor: 'text-indigo-400' };
    }
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  // Active reminders sorted by time
  const activeReminders = reminders.filter((r) => r.enabled);

  // Find next upcoming reminder based on current time
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const nextReminder = activeReminders.find((r) => {
    const [h, m] = r.scheduledTime.split(':').map(Number);
    const itemMinutes = h * 60 + m;
    return itemMinutes >= currentMinutes && !completedMap[r.id];
  }) || activeReminders[0];

  const handleCompleteToday = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!completedMap[id]) {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.7 }
      });
    }
  };

  const handleTestPush = async () => {
    setTestStatus('Sending...');
    const res = await sendTestNotification();
    if (res.success) {
      setTestStatus('Sent! Check notification.');
      setTimeout(() => setTestStatus(null), 3500);
    } else {
      setTestStatus(res.error || 'Failed to send');
      setTimeout(() => setTestStatus(null), 4000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F5] dark:bg-[#1B1716] pb-24">
      {/* Top Scenic Banner with Companion Avatar */}
      <div className="relative pt-8 pb-6 px-6 bg-gradient-to-b from-[#FFF0E6] via-[#FFF5EE] to-[#FFF9F5] dark:from-[#2B201D] dark:via-[#211A18] dark:to-[#1B1716] border-b border-[#F3E5DC]/60 dark:border-[#38312F]/60">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#817775] dark:text-[#A89D9A] mb-1">
              <GreetingIcon className={`w-4 h-4 ${greeting.iconColor}`} />
              <span>{greeting.text}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif flex items-center gap-1">
              {greeting.text}, {name || 'सखी'} <span className="text-[#E97878] text-xl">❤️</span>
            </h1>
            <p className="text-xs text-[#817775] dark:text-[#A89D9A] mt-0.5">
              {t('home.day_wish')}
            </p>
          </div>

          {/* Avatar Thumbnail */}
          <Link href="/companion" className="relative group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#FFF2EA] to-[#FCE4D8] dark:from-[#3D2D29] dark:to-[#2B201D] p-1 shadow-md shadow-[#E97878]/15 border-2 border-[#F8D8CC] dark:border-[#4B3733] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <AvatarGraphic avatarId={avatarId} expression="caring" viewMode="thumbnail" />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#88A987] border-2 border-white dark:border-[#1B1716]" />
          </Link>
        </div>

        {/* Development-Only Test Notification Bar */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Dev Push Tester</span>
            </div>
            <button
              type="button"
              onClick={handleTestPush}
              className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[11px] font-medium hover:bg-amber-700 active:scale-95 transition-all"
            >
              {testStatus || 'Send Push'}
            </button>
          </div>
        )}

        {/* Subtle PWA Install Banner */}
        {!isInstalled && isInstallable && !dismissInstallBanner && (
          <div className="mt-3 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#292525] dark:text-[#F7EFEA]">
                {t('home.install_banner_title')}
              </h4>
              <p className="text-[11px] text-[#817775] dark:text-[#A89D9A]">
                {t('home.install_banner_desc')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={triggerInstall}
                className="px-3 py-1.5 rounded-xl bg-[#E97878] text-white text-xs font-semibold shadow-xs"
              >
                Install
              </button>
              <button
                type="button"
                onClick={() => setDismissInstallBanner(true)}
                className="text-xs text-[#817775] p-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="px-6 pt-5 flex flex-col gap-6">
        {/* Next Upcoming Reminder Card */}
        {nextReminder && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#817775] dark:text-[#A89D9A]">
                {t('home.next_card_label')}
              </span>
              <span className="text-xs font-semibold text-[#E97878]">
                {nextReminder.scheduledTime}
              </span>
            </div>

            <div
              onClick={() => router.push(`/care/${nextReminder.id}`)}
              className="relative p-5 rounded-3xl bg-gradient-to-br from-[#FFF9F6] via-white to-[#FDF4EE] dark:from-[#29211F] dark:via-[#251D1C] dark:to-[#2E2422] border-2 border-[#F8D8CC] dark:border-[#4B3733] shadow-md shadow-[#E97878]/10 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F8D8CC]/50 dark:bg-[#3E2F2B] flex items-center justify-center text-2xl shrink-0 shadow-xs">
                    {nextReminder.categoryId === 'morning' ? '🌅' : nextReminder.categoryId === 'food' ? '🍱' : nextReminder.categoryId === 'water' ? '💧' : nextReminder.categoryId === 'break' ? '☕' : '🌙'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#292525] dark:text-[#F7EFEA]">
                      {nextReminder.customMessage || 'काळजीचा मेसेज'}
                    </h3>
                    <p className="text-xs text-[#817775] dark:text-[#A89D9A] mt-1 line-clamp-2">
                      कामासाठी स्वतःची काळजी घेणे विसरू नका. तू महत्वाचा आहेस. ❤️
                    </p>
                  </div>
                </div>

                {/* Mark Completed Button */}
                <button
                  type="button"
                  onClick={(e) => handleCompleteToday(nextReminder.id, e)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    completedMap[nextReminder.id]
                      ? 'bg-[#88A987] text-white shadow-sm'
                      : 'border-2 border-[#D9CECB] dark:border-[#524744] text-transparent hover:border-[#88A987]'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3E5DC]/60 dark:border-[#38312F]/60 flex items-center justify-between text-xs text-[#E97878] font-medium">
                <span>टॅप करून साथीदाराला भेटा ❤️</span>
                <span>Open Care Screen →</span>
              </div>
            </div>
          </div>
        )}

        {/* Today's Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#292525] dark:text-[#F7EFEA]">
              {t('home.timeline_label')}
            </h2>
            <Link
              href="/reminders/new"
              className="text-xs font-semibold text-[#E97878] hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {reminders.map((item) => {
              const isDone = completedMap[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => router.push(`/reminders/${item.id}`)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    item.enabled
                      ? 'bg-white dark:bg-[#272120] border-[#F3E5DC] dark:border-[#38312F] shadow-xs'
                      : 'bg-white/50 dark:bg-[#201A19] border-dashed border-[#E3D7D3] dark:border-[#362D2B] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8D8CC]/40 dark:bg-[#3E2F2B] flex items-center justify-center text-lg shrink-0">
                      {item.categoryId === 'morning' ? '🌅' : item.categoryId === 'food' ? '🍱' : item.categoryId === 'water' ? '💧' : item.categoryId === 'break' ? '☕' : '🌙'}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-[#817775]' : 'text-[#292525] dark:text-[#F7EFEA]'}`}>
                        {item.customMessage || item.categoryId}
                      </h4>
                      <span className="text-xs text-[#817775] dark:text-[#A89D9A]">
                        {item.scheduledTime}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleCompleteToday(item.id, e)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-[#88A987] text-white shadow-xs'
                        : 'border border-[#D9CECB] dark:border-[#524744] text-transparent hover:border-[#88A987]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Reminder CTA Pill */}
        <div className="pt-2">
          <Link
            href="/reminders/new"
            className="w-full py-3.5 px-5 rounded-2xl border-2 border-dashed border-[#E97878]/60 hover:border-[#E97878] bg-[#FDF1EB]/50 dark:bg-[#342421]/30 text-[#E97878] font-semibold text-center text-sm transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{t('home.add_reminder')}</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
