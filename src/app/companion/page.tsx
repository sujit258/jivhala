'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AvatarGraphic, AvatarExpression } from '@/components/avatars/AvatarGraphic';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { Send, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MessageLog {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: string;
}

export default function CompanionScreen() {
  const { name, avatarId, t } = useApp();
  const [expression, setExpression] = useState<AvatarExpression>('caring');
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState<MessageLog[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMoodSelect = (moodKey: 'great' | 'tough' | 'visit') => {
    let userText = '';
    let compText = '';
    let newExpression: AvatarExpression = 'caring';

    if (moodKey === 'great') {
      userText = t('companion.chip_great');
      compText = t('companion.resp_great');
      newExpression = 'happy';
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else if (moodKey === 'tough') {
      userText = t('companion.chip_tough');
      compText = t('companion.resp_tough');
      newExpression = 'concerned';
    } else {
      userText = t('companion.chip_visit');
      compText = t('companion.resp_visit');
      newExpression = 'happy';
    }

    setExpression(newExpression);

    const userMsg: MessageLog = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLog((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const compMsg: MessageLog = {
        id: `c-${Date.now()}`,
        sender: 'companion',
        text: compText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatLog((prev) => [...prev, compMsg]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: MessageLog = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setExpression('happy');

    setTimeout(() => {
      setIsTyping(false);
      const compMsg: MessageLog = {
        id: `c-${Date.now()}`,
        sender: 'companion',
        text: t('companion.resp_custom'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatLog((prev) => [...prev, compMsg]);
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F5] dark:bg-[#1B1716] pb-24 overflow-hidden">
      {/* Top Scenic Area with Companion Closeup */}
      <div className="relative pt-6 pb-4 px-6 flex flex-col items-center text-center bg-gradient-to-b from-[#FFF0E6] via-[#FFF6EF] to-[#FFF9F5] dark:from-[#2B201D] dark:via-[#211A18] dark:to-[#1B1716] border-b border-[#F3E5DC]/70 dark:border-[#38312F]/70">
        <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-[#FFF2EA] to-[#FCE4D8] dark:from-[#3D2D29] dark:to-[#2B201D] p-2 shadow-xl shadow-[#E97878]/15 border-2 border-[#F8D8CC] dark:border-[#4B3733] flex items-center justify-center overflow-hidden mb-3">
          <AvatarGraphic avatarId={avatarId} expression={expression} viewMode="hero" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#292525] dark:text-[#F7EFEA] tracking-tight font-serif">
          {t('companion.title', { name: name || 'सखी' })}
        </h1>
        <p className="text-sm font-medium text-[#E97878] mt-0.5">
          {t('companion.question')}
        </p>

        {/* 3 Emotional Mood Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
          <button
            type="button"
            onClick={() => handleMoodSelect('great')}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] text-xs font-semibold text-[#292525] dark:text-[#F7EFEA] shadow-xs hover:border-[#E97878] active:scale-95 transition-all"
          >
            {t('companion.chip_great')}
          </button>
          <button
            type="button"
            onClick={() => handleMoodSelect('tough')}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] text-xs font-semibold text-[#292525] dark:text-[#F7EFEA] shadow-xs hover:border-[#E97878] active:scale-95 transition-all"
          >
            {t('companion.chip_tough')}
          </button>
          <button
            type="button"
            onClick={() => handleMoodSelect('visit')}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] text-xs font-semibold text-[#292525] dark:text-[#F7EFEA] shadow-xs hover:border-[#E97878] active:scale-95 transition-all"
          >
            {t('companion.chip_visit')}
          </button>
        </div>
      </div>

      {/* Conversation Thread Area */}
      <div className="flex-1 px-6 py-4 overflow-y-auto flex flex-col gap-3">
        {chatLog.length === 0 ? (
          <div className="my-auto text-center py-6 px-4">
            <Heart className="w-8 h-8 text-[#E97878] fill-[#F8D8CC] mx-auto mb-2 opacity-60" />
            <p className="text-xs text-[#817775] dark:text-[#A89D9A]">
              आज तुला काय वाटतंय? वरील बटण दाबून किंवा खाली लिहून सांगू शकतोस. ❤️
            </p>
          </div>
        ) : (
          chatLog.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#E97878] text-white rounded-br-xs'
                    : 'bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] text-[#292525] dark:text-[#F7EFEA] rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[#817775] dark:text-[#A89D9A] px-1 mt-0.5">
                {msg.timestamp}
              </span>
            </div>
          ))
        )}

        {isTyping && (
          <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] text-xs text-[#817775]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E97878] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E97878] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E97878] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="px-6 py-3 border-t border-[#F3E5DC] dark:border-[#38312F] bg-[#FFF9F5]/90 dark:bg-[#1B1716]/90 backdrop-blur-md flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('companion.input_placeholder')}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] focus:border-[#E97878] focus:outline-none text-sm text-[#292525] dark:text-[#F7EFEA]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-2xl bg-[#E97878] disabled:opacity-40 hover:bg-[#D45D5D] text-white flex items-center justify-center shrink-0 shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
