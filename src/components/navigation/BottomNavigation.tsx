'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircleHeart, Settings } from 'lucide-react';
export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      label: 'Home',
      href: '/home',
      icon: Home
    },
    {
      name: 'Companion',
      label: 'Companion',
      href: '/companion',
      icon: MessageCircleHeart
    },
    {
      name: 'Settings',
      label: 'Settings',
      href: '/settings',
      icon: Settings
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-[480px] mx-auto bg-[#FFF9F5]/90 dark:bg-[#1B1716]/90 backdrop-blur-md border-t border-[#F3E5DC] dark:border-[#38312F] px-6 py-2.5 flex items-center justify-around shadow-sm pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href === '/home' && pathname === '/');

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 py-1 px-4 rounded-2xl ${
              isActive
                ? 'text-[#E97878] font-semibold'
                : 'text-[#817775] dark:text-[#A89D9A] hover:text-[#292525] dark:hover:text-[#F5EFEB]'
            }`}
          >
            <div className={`relative p-1 rounded-full ${isActive ? 'bg-[#F8D8CC]/40 dark:bg-[#E97878]/15' : ''}`}>
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 1.8} />
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E97878]" />
              )}
            </div>
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
