'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Check } from 'lucide-react';
import { Reminder } from '@/lib/db/schema';

interface ReminderFormProps {
  initialReminder?: Reminder;
  isEditing?: boolean;
}

const CATEGORY_OPTIONS = [
  { id: 'food', label: 'जेवण', icon: '🍱', defaultMsg: 'जेवण झालं का? कामासाठी जेवण skip करू नकोस. ❤️' },
  { id: 'water', label: 'पाणी', icon: '💧', defaultMsg: 'पाणी प्यायलास का? एक ग्लास पाणी घे आधी. 💧' },
  { id: 'break', label: 'ब्रेक', icon: '☕', defaultMsg: 'खूप वेळ झाला... थोडा ब्रेक घे ना. ☕' },
  { id: 'sleep', label: 'झोप', icon: '🌙', defaultMsg: 'आता झोपायची वेळ झाली. उद्या पुन्हा सुरुवात करूया. 🌙' },
  { id: 'medicine', label: 'औषध', icon: '💊', defaultMsg: 'औषध घेण्याची वेळ झाली आहे. विसरू नका! 💊' },
  { id: 'exercise', label: 'व्यायाम', icon: '🏃', defaultMsg: 'शरीराला थोडी हालचाल द्या. थोडं चाला किंवा स्ट्रेच करा. 🏃' },
  { id: 'self_care', label: 'स्वतःची काळजी', icon: '❤️', defaultMsg: 'आज स्वतःची काळजी घेतलीस का? तू महत्वाचा आहेस. ❤️' },
  { id: 'motivation', label: 'प्रेरणा', icon: '🌿', defaultMsg: 'तू खूप काही छान करतोयस! स्वतःवर विश्वास ठेव. 💪' },
  { id: 'custom', label: 'Custom', icon: '➕', defaultMsg: 'तुमची नवीन प्रेमळ आठवण' }
];

export const ReminderForm: React.FC<ReminderFormProps> = ({ initialReminder, isEditing = false }) => {
  const router = useRouter();
  const { saveReminder, deleteReminder, t } = useApp();

  const [categoryId, setCategoryId] = useState<string>(initialReminder?.categoryId || 'food');
  const [customMessage, setCustomMessage] = useState<string>(initialReminder?.customMessage || 'जेवण झालं का? कामासाठी जेवण skip करू नकोस. ❤️');
  const [scheduledTime, setScheduledTime] = useState<string>(initialReminder?.scheduledTime || '13:00');
  const [repeatType, setRepeatType] = useState<'daily' | 'weekdays' | 'weekends' | 'custom'>(initialReminder?.repeatType || 'daily');
  const [isSaving, setIsSaving] = useState(false);

  const handleCategoryChange = (cat: typeof CATEGORY_OPTIONS[0]) => {
    setCategoryId(cat.id);
    if (!initialReminder || cat.id !== initialReminder.categoryId) {
      setCustomMessage(cat.defaultMsg);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await saveReminder({
      id: initialReminder?.id,
      categoryId,
      customMessage: customMessage.trim() || 'काळजीचा मेसेज',
      scheduledTime,
      repeatType,
      enabled: initialReminder ? initialReminder.enabled : true
    });

    setIsSaving(false);
    router.push('/home');
  };

  const handleDelete = async () => {
    if (!initialReminder?.id) return;
    await deleteReminder(initialReminder.id);
    router.push('/home');
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-6 py-8 bg-[#FFF9F5] dark:bg-[#1B1716] overflow-hidden">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/home"
            className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xs font-semibold text-[#817775]">
            {isEditing ? t('reminders.edit_title') : t('reminders.custom_title')}
          </span>
          <div className="w-9" />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
            {t('reminders.title')}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex-1 flex flex-col gap-5 my-auto py-2">
        {/* 3x3 Category Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = categoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  isSelected
                    ? 'border-[#E97878] bg-[#FDF1EB] dark:bg-[#382622] text-[#E97878] shadow-sm scale-[1.02]'
                    : 'border-[#F3E5DC] dark:border-[#38312F] bg-white dark:bg-[#272120] text-[#817775] dark:text-[#A89D9A] hover:border-[#E97878]/40'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Message Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#817775] dark:text-[#A89D9A] px-1">
            {t('reminders.label_message')}
          </label>
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] focus:border-[#E97878] focus:outline-none text-sm text-[#292525] dark:text-[#F7EFEA]"
            placeholder="उदा. पाणी प्यायलास का? 💧"
            required
          />
        </div>

        {/* Time Picker & Repeat Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#817775] dark:text-[#A89D9A] px-1">
              {t('reminders.label_time')}
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] focus:border-[#E97878] focus:outline-none text-sm text-[#292525] dark:text-[#F7EFEA] font-semibold"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#817775] dark:text-[#A89D9A] px-1">
              {t('reminders.label_repeat')}
            </label>
            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value as 'daily' | 'weekdays' | 'weekends')}
              className="w-full px-3 py-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] focus:border-[#E97878] focus:outline-none text-xs text-[#292525] dark:text-[#F7EFEA] font-medium"
            >
              <option value="daily">{t('reminders.repeat_daily')}</option>
              <option value="weekdays">{t('reminders.repeat_weekdays')}</option>
              <option value="weekends">{t('reminders.repeat_weekends')}</option>
            </select>
          </div>
        </div>

        {/* Phone Notification Preview Card */}
        <div className="p-3.5 rounded-2xl bg-[#F8D8CC]/25 dark:bg-[#2C211F] border border-[#F8D8CC]/60 dark:border-[#42312E]">
          <span className="text-[11px] font-bold text-[#817775] dark:text-[#A89D9A] block mb-2">
            {t('reminders.preview_heading')}
          </span>
          <div className="p-3 rounded-xl bg-white dark:bg-[#231A19] shadow-xs border border-[#F3E5DC] dark:border-[#362A28] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F8D8CC]/50 dark:bg-[#3D2C28] flex items-center justify-center text-sm shrink-0">
              ❤️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#292525] dark:text-[#F7EFEA]">Jivhala</span>
                <span className="text-[10px] text-[#817775]">{scheduledTime}</span>
              </div>
              <p className="text-xs text-[#292525] dark:text-[#E8DDD8] mt-0.5 truncate">
                {customMessage || 'काळजीचा मेसेज'}
              </p>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-4 px-6 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] active:scale-[0.99] text-white font-semibold text-center text-base shadow-lg shadow-[#E97878]/25 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>{t('save')}</span>
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-2.5 text-xs text-red-500 hover:underline font-medium text-center"
            >
              Delete this reminder
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
