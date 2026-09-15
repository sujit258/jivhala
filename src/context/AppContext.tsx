'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageCode, t as translateFn } from '@/lib/i18n';
import { Reminder } from '@/lib/db/schema';

interface AppContextType {
  installationId: string;
  name: string;
  language: LanguageCode;
  avatarId: string;
  categoryPreferences: Record<string, boolean>;
  reminders: Reminder[];
  quietHours: { start: string; end: string; enabled: boolean };
  theme: 'light' | 'dark';
  isOnboarded: boolean;
  proInterest: boolean;
  updateName: (name: string) => void;
  updateLanguage: (lang: LanguageCode) => void;
  updateAvatar: (avatarId: string) => void;
  toggleCategory: (categoryId: string) => void;
  saveReminder: (reminder: Partial<Reminder>) => Promise<Reminder>;
  deleteReminder: (id: string) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  toggleTheme: () => void;
  recordProInterest: () => Promise<void>;
  completeOnboarding: () => void;
  resetAllData: () => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_CATEGORIES_STATE: Record<string, boolean> = {
  morning: true,
  food: true,
  water: true,
  break: true,
  sleep: true,
  self_care: true,
  motivation: true
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [installationId, setInstallationId] = useState<string>('');
  const [name, setName] = useState<string>('सखी');
  const [language, setLanguage] = useState<LanguageCode>('mr');
  const [avatarId, setAvatarId] = useState<string>('aaisarkhi');
  const [categoryPreferences, setCategoryPreferences] = useState<Record<string, boolean>>(DEFAULT_CATEGORIES_STATE);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [quietHours] = useState({ start: '23:00', end: '07:30', enabled: true });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [proInterest, setProInterest] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    queueMicrotask(() => {
      let id = localStorage.getItem('jivhala_installation_id');
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('jivhala_installation_id', id);
      }
      setInstallationId(id);

    const savedName = localStorage.getItem('jivhala_name');
    if (savedName) setName(savedName);

    const savedLang = localStorage.getItem('jivhala_language') as LanguageCode;
    if (savedLang && ['mr', 'hi', 'en', 'hinglish'].includes(savedLang)) {
      setLanguage(savedLang);
    }

    const savedAvatar = localStorage.getItem('jivhala_avatar_id');
    if (savedAvatar) setAvatarId(savedAvatar);

    const savedCats = localStorage.getItem('jivhala_categories');
    if (savedCats) {
      try {
        setCategoryPreferences(JSON.parse(savedCats));
      } catch {
        setCategoryPreferences(DEFAULT_CATEGORIES_STATE);
      }
    }

    const savedOnboarded = localStorage.getItem('jivhala_onboarded');
    if (savedOnboarded === 'true') {
      setIsOnboarded(true);
    }

    const savedPro = localStorage.getItem('jivhala_pro_interest');
    if (savedPro === 'true') {
      setProInterest(true);
    }

    const savedTheme = localStorage.getItem('jivhala_theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Load initial reminders
    const savedReminders = localStorage.getItem('jivhala_reminders');
    if (savedReminders) {
      try {
        setReminders(JSON.parse(savedReminders));
      } catch {
        // Fallback handled below
      }
    } else {
      // Default 5 initial caring reminders
      const defaults: Reminder[] = [
        {
          id: 'rem-default-morning',
          installationId: id,
          categoryId: 'morning',
          customMessage: 'सुप्रभात! आजचा दिवस छान जाऊ दे. 🌅',
          scheduledTime: '08:30',
          timezone: 'Asia/Kolkata',
          repeatType: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'rem-default-food',
          installationId: id,
          categoryId: 'food',
          customMessage: 'जेवण झालं का? 🍱 कामासाठी जेवण skip करू नकोस.',
          scheduledTime: '13:00',
          timezone: 'Asia/Kolkata',
          repeatType: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'rem-default-water',
          installationId: id,
          categoryId: 'water',
          customMessage: 'पाणी प्यायलास का? 💧 एक ग्लास पाणी घे आधी.',
          scheduledTime: '16:30',
          timezone: 'Asia/Kolkata',
          repeatType: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'rem-default-break',
          installationId: id,
          categoryId: 'break',
          customMessage: 'खूप वेळ झाला... थोडा ब्रेक घे ना. ☕',
          scheduledTime: '18:00',
          timezone: 'Asia/Kolkata',
          repeatType: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'rem-default-sleep',
          installationId: id,
          categoryId: 'sleep',
          customMessage: 'आता झोपायची वेळ झाली. 🌙 उद्या पुन्हा सुरुवात करूया.',
          scheduledTime: '22:30',
          timezone: 'Asia/Kolkata',
          repeatType: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setReminders(defaults);
      localStorage.setItem('jivhala_reminders', JSON.stringify(defaults));
    }

    setIsInitialized(true);
    });
  }, []);

  // Sync installation identity with server
  useEffect(() => {
    if (!isInitialized || !installationId) return;

    fetch('/api/installation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        installationId,
        name,
        language,
        avatarId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
        platform: navigator.platform,
        userAgent: navigator.userAgent
      })
    }).catch((err) => {
      console.warn('[Sync] Background installation sync note:', err);
    });
  }, [isInitialized, installationId, name, language, avatarId]);

  const updateName = (newName: string) => {
    setName(newName);
    localStorage.setItem('jivhala_name', newName);
  };

  const updateLanguage = (newLang: LanguageCode) => {
    setLanguage(newLang);
    localStorage.setItem('jivhala_language', newLang);
  };

  const updateAvatar = (newAvatarId: string) => {
    setAvatarId(newAvatarId);
    localStorage.setItem('jivhala_avatar_id', newAvatarId);
  };

  const toggleCategory = (catId: string) => {
    setCategoryPreferences((prev) => {
      const next = { ...prev, [catId]: !prev[catId] };
      localStorage.setItem('jivhala_categories', JSON.stringify(next));
      return next;
    });
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('jivhala_theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('jivhala_onboarded', 'true');
  };

  const saveReminder = async (item: Partial<Reminder>): Promise<Reminder> => {
    const now = new Date().toISOString();
    const id = item.id || `rem-${Date.now()}`;
    const newReminder: Reminder = {
      id,
      installationId,
      categoryId: item.categoryId || 'food',
      customMessage: item.customMessage || '',
      scheduledTime: item.scheduledTime || '13:00',
      timezone: item.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      repeatType: item.repeatType || 'daily',
      repeatDays: item.repeatDays,
      enabled: item.enabled !== undefined ? item.enabled : true,
      createdAt: item.createdAt || now,
      updatedAt: now
    };

    setReminders((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      const updated = idx >= 0 ? [...prev] : [...prev, newReminder];
      if (idx >= 0) updated[idx] = newReminder;
      updated.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
      localStorage.setItem('jivhala_reminders', JSON.stringify(updated));
      return updated;
    });

    // Sync with backend API
    fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReminder)
    }).catch((err) => console.warn('[Reminders] Save sync error:', err));

    return newReminder;
  };

  const deleteReminder = async (id: string) => {
    setReminders((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem('jivhala_reminders', JSON.stringify(updated));
      return updated;
    });

    fetch(`/api/reminders?id=${id}&installationId=${installationId}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('[Reminders] Delete sync error:', err));
  };

  const toggleReminder = async (id: string) => {
    const target = reminders.find((r) => r.id === id);
    if (!target) return;
    await saveReminder({ ...target, enabled: !target.enabled });
  };

  const recordProInterest = async () => {
    setProInterest(true);
    localStorage.setItem('jivhala_pro_interest', 'true');
    fetch('/api/pro/interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ installationId })
    }).catch((err) => console.warn('[Pro] Record interest note:', err));
  };

  const resetAllData = () => {
    localStorage.clear();
    setInstallationId(crypto.randomUUID());
    setName('सखी');
    setLanguage('mr');
    setAvatarId('aaisarkhi');
    setCategoryPreferences(DEFAULT_CATEGORIES_STATE);
    setIsOnboarded(false);
    setProInterest(false);
    window.location.reload();
  };

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      return translateFn(language, path, vars);
    },
    [language]
  );

  return (
    <AppContext.Provider
      value={{
        installationId,
        name,
        language,
        avatarId,
        categoryPreferences,
        reminders,
        quietHours,
        theme,
        isOnboarded,
        proInterest,
        updateName,
        updateLanguage,
        updateAvatar,
        toggleCategory,
        saveReminder,
        deleteReminder,
        toggleReminder,
        toggleTheme,
        recordProInterest,
        completeOnboarding,
        resetAllData,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
