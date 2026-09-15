'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CameraOff, MicOff, MapPinOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
      </div>

      <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#817775] dark:text-[#B4A7A4] leading-relaxed">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-start gap-3">
          <CameraOff className="w-5 h-5 text-[#E97878] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA] mb-1">
              Zero Camera Access
            </h3>
            <p>
              Jivhala’s signature immersive care screen is completely a digital visual illusion created using responsive vector illustrations, lighting depth, and CSS animation. We NEVER request or access your device camera.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-start gap-3">
          <MicOff className="w-5 h-5 text-[#E97878] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA] mb-1">
              Zero Microphone & Audio Recording
            </h3>
            <p>
              We do not record your voice or request microphone access. Your conversations and responses with the companion remain entirely private.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-start gap-3">
          <MapPinOff className="w-5 h-5 text-[#E97878] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA] mb-1">
              No Location Tracking
            </h3>
            <p>
              We do not track your GPS location. Reminders are scheduled based on your device’s local clock and timezone.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#272120] border border-[#F3E5DC] dark:border-[#38312F] shadow-xs flex items-start gap-3">
          <Lock className="w-5 h-5 text-[#88A987] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#292525] dark:text-[#F7EFEA] mb-1">
              Anonymous-First Data Protection
            </h3>
            <p>
              You do not need to create an account or provide an email to use the complete core Jivhala experience. An anonymous installation ID is stored on your device to keep your reminders and companion preferences safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
