"use client";

import Image from 'next/image';

export function Logo() {
  return (
    <div className="relative w-12 h-12">
      <Image
        src="/ux-consulting-logo.png"
        alt="UX Consulting Logo"
        width={48}
        height={48}
        className="rounded-full"
      />
    </div>
  );
} 