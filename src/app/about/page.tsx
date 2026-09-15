'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F5] dark:bg-[#1B1716] px-6 py-8">
      <div className="flex items-center mb-6">
        <Link
          href="/settings"
          className="p-2 rounded-full text-[#817775] hover:text-[#292525] dark:text-[#A89D9A] dark:hover:text-[#F5EFEB] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#292525] dark:text-[#F7EFEA] ml-2 font-serif">
          About Jivhala
        </h1>
      </div>

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-36 h-36 rounded-full bg-white dark:bg-[#27201E] p-1 border-2 border-[#F8D8CC] dark:border-[#4B3733] shadow-xl shadow-[#E97878]/20 flex items-center justify-center overflow-hidden mb-5">
          <Image
            src="/logo.webp"
            alt="Jivhala Logo Emblem"
            width={144}
            height={144}
            className="w-full h-full object-contain rounded-full select-none"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#292525] dark:text-[#F7EFEA] font-serif flex items-center gap-1.5">
          Jivhala <Heart className="w-5 h-5 text-[#E97878] fill-[#E97878]" />
        </h2>
        <p className="text-sm font-semibold text-[#E97878] mt-1">
          छोट्या छोट्या गोष्टींची काळजी.
        </p>
        <p className="text-xs text-[#817775] dark:text-[#A89D9A] mt-0.5">
          Someone who remembers the little things.
        </p>

        <div className="mt-8 p-5 rounded-3xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs text-xs text-[#817775] dark:text-[#B4A7A4] leading-relaxed text-left max-w-sm">
          <p className="mb-2.5">
            Jivhala was born from a simple, warm belief: that everyone deserves to feel remembered. Not with cold alarms or medical dashboards, but with the gentle warmth of someone who asks:
          </p>
          <p className="font-serif italic text-sm text-[#292525] dark:text-[#F7EFEA] text-center my-3">
            &ldquo;जेवण झालं का? पाणी प्यायलास का? ❤️&rdquo;
          </p>
          <p>
            Version 1.0.0 • Built with love for your everyday well-being.
          </p>
        </div>
      </div>
    </div>
  );
}
