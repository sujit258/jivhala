'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Heart } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const { isOnboarded } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOnboarded) {
        router.push('/home');
      } else {
        router.push('/welcome');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [isOnboarded, router]);

  const handleSkip = () => {
    if (isOnboarded) {
      router.push('/home');
    } else {
      router.push('/welcome');
    }
  };

  return (
    <div
      onClick={handleSkip}
      className="relative flex flex-col justify-between min-h-screen px-6 py-12 cursor-pointer select-none overflow-hidden bg-gradient-to-b from-[#FFF4EC] via-[#FFF9F5] to-[#FCEFE8] dark:from-[#231A18] dark:via-[#1B1716] dark:to-[#171312]"
    >
      {/* Decorative Warm Sunrise Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#F8D8CC]/60 to-[#FCE4D8]/20 blur-3xl pointer-events-none" />

      {/* Top spacing */}
      <div className="pt-8" />

      {/* Center Branding Visual */}
      <div className="flex flex-col items-center justify-center text-center z-10 my-auto">
        <div className="relative mb-5 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white/80 dark:bg-[#2A2220]/80 shadow-lg shadow-[#E97878]/15 flex items-center justify-center border border-[#F8D8CC] dark:border-[#3E2F2B]">
            <Heart className="w-10 h-10 text-[#E97878] fill-[#E97878] animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFAAA6] animate-ping" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[#292525] dark:text-[#F7EFEA] font-serif flex items-center gap-1.5">
          Jivhala <span className="text-[#E97878]">❤️</span>
        </h1>

        <p className="mt-3 text-lg font-medium text-[#292525]/90 dark:text-[#F7EFEA]/90">
          छोट्या छोट्या गोष्टींची काळजी.
        </p>

        <p className="mt-1 text-sm text-[#817775] dark:text-[#A89D9A] tracking-wide">
          Someone who remembers the little things.
        </p>
      </div>

      {/* Subtle Bottom Loading Dots */}
      <div className="flex flex-col items-center justify-center gap-3 pb-8 z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E97878] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#E97878] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#E97878] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-xs text-[#817775] dark:text-[#A89D9A]">
          Loading...
        </span>
      </div>
    </div>
  );
}
