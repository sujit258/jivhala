'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic, AvatarExpression } from '@/components/avatars/AvatarGraphic';
import { X, Sparkles, Check, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ImmersiveCareScreen() {
  const router = useRouter();
  const params = useParams();
  const notificationId = params?.notificationId as string;
  const { avatarId, reminders, t, installationId } = useApp();

  // Find reminder or category context
  const reminder = reminders.find((r) => r.id === notificationId);
  const categoryId = reminder?.categoryId || (notificationId?.includes('food') ? 'food' : notificationId?.includes('water') ? 'water' : 'food');

  // Expression mapping
  const getInitialExpression = (cat: string): AvatarExpression => {
    switch (cat) {
      case 'water':
        return 'playful';
      case 'break':
        return 'concerned';
      case 'sleep':
        return 'sleepy';
      case 'motivation':
        return 'motivational';
      case 'morning':
        return 'happy';
      case 'food':
      default:
        return 'caring';
    }
  };

  const [expression, setExpression] = useState<AvatarExpression>(getInitialExpression(categoryId));
  const [reactionText, setReactionText] = useState<string | null>(null);

  // Caring message content
  const getMessageContent = () => {
    if (reminder?.customMessage) {
      return {
        title: reminder.customMessage,
        subtitle: 'तू स्वतःसाठीही तितकाच महत्वाचा आहेस. ❤️'
      };
    }
    switch (categoryId) {
      case 'water':
        return {
          title: 'पाणी प्यायलास का? 💧',
          subtitle: 'एक ग्लास पाणी घे आधी. शरीर ताजेतवाने वाटेल.'
        };
      case 'break':
        return {
          title: 'खूप वेळ झाला... ☕',
          subtitle: 'थोडा ब्रेक घे ना. डोळ्यांना आणि मनाला विश्रांती दे.'
        };
      case 'sleep':
        return {
          title: 'आता आराम कर. 🌙',
          subtitle: 'उद्या पुन्हा गोड सुरुवात करूया. छान झोप घे. ❤️'
        };
      case 'morning':
        return {
          title: 'सुप्रभात! 🌅',
          subtitle: 'आजचा दिवस तुझ्यासाठी खूप सुंदर आणि छान जाऊ दे. ❤️'
        };
      case 'food':
      default:
        return {
          title: 'जेवण झालं का? ❤️',
          subtitle: 'कामासाठी जेवण skip करू नकोस. तू महत्वाचा आहेस.'
        };
    }
  };

  const message = getMessageContent();

  const handleAction = async (type: 'done' | 'doing' | 'snooze') => {
    if (type === 'done') {
      setExpression('happy');
      setReactionText(t('care.reaction_done'));
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else if (type === 'doing') {
      setExpression('happy');
      setReactionText(t('care.reaction_doing'));
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 }
      });
    } else {
      setExpression('caring');
      setReactionText(t('care.reaction_snooze'));
    }

    // Sync response to backend API
    fetch('/api/care/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        installationId,
        notificationDeliveryId: notificationId,
        responseType: type === 'done' ? 'completed' : type === 'doing' ? 'doing_now' : 'snoozed'
      })
    }).catch((err) => console.warn('[Care] Response sync note:', err));

    // Return to Home after a gentle delay
    setTimeout(() => {
      router.push('/home');
    }, 1800);
  };

  const handleClose = () => {
    router.push('/home');
  };

  return (
    <div className="relative w-full min-h-screen h-[100dvh] bg-gradient-to-b from-[#FFF0E6] via-[#FFF6EE] to-[#FCEBE1] dark:from-[#2B1F1C] dark:via-[#211715] dark:to-[#171110] overflow-hidden flex flex-col justify-between select-none">
      {/* Ambient Focal Lighting Glow (creates camera depth illusion) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-[#FFAAA6]/30 via-[#F8D8CC]/40 to-[#FFE4D6]/20 blur-3xl pointer-events-none" />

      {/* Top Close Button Bar */}
      <div className="relative z-30 pt-6 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-[#2A201E]/70 backdrop-blur-md border border-[#F8D8CC]/60 dark:border-[#4B3733]/60 text-xs font-semibold text-[#E97878] shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Jivhala Care</span>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/70 dark:bg-[#2A201E]/70 backdrop-blur-md border border-[#F8D8CC]/60 dark:border-[#4B3733]/60 text-[#817775] dark:text-[#F7EFEA] hover:text-[#292525] flex items-center justify-center shadow-xs active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* THE IMMERSIVE AVATAR (Occupies 70-85% of screen height) */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-2 py-0 overflow-hidden">
        <div className="w-full h-full max-h-[72vh] flex items-center justify-center scale-[1.3] sm:scale-[1.4] translate-y-4">
          <AvatarGraphic
            avatarId={avatarId}
            expression={expression}
            viewMode="immersive-closeup"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Bottom Floating Caring Message & Interactive Actions */}
      <div className="relative z-30 px-5 pb-8 pt-2">
        <div className="p-5 rounded-3xl bg-white/90 dark:bg-[#251D1B]/90 backdrop-blur-xl border-2 border-[#F8D8CC] dark:border-[#4B3733] shadow-2xl shadow-[#E97878]/15 text-center flex flex-col gap-3.5">
          {reactionText ? (
            <div className="py-2 animate-fade-in">
              <span className="text-2xl">❤️</span>
              <h3 className="text-xl font-bold text-[#E97878] mt-1">
                {reactionText}
              </h3>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
                  {message.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#817775] dark:text-[#B8ABA7] leading-relaxed">
                  {message.subtitle}
                </p>
              </div>

              {/* 3 Quick Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleAction('snooze')}
                  className="py-3 px-2 rounded-2xl border border-[#F3E5DC] dark:border-[#423532] bg-[#FFF9F5] dark:bg-[#2F2422] text-[#817775] dark:text-[#C4B7B4] hover:border-[#E97878] text-xs font-semibold active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
                >
                  <Clock className="w-4 h-4 text-[#817775]" />
                  <span>{t('care.snooze')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('doing')}
                  className="py-3 px-2 rounded-2xl border border-[#E97878]/40 bg-[#FDF1EB] dark:bg-[#382622] text-[#E97878] hover:border-[#E97878] text-xs font-semibold active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
                >
                  <Sparkles className="w-4 h-4 text-[#E97878]" />
                  <span>{t('care.doing_now')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('done')}
                  className="py-3 px-2 rounded-2xl bg-[#E97878] hover:bg-[#D45D5D] text-white shadow-md shadow-[#E97878]/30 text-xs font-bold active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t('care.done')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
