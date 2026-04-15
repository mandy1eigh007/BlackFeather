'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { CrestIcon } from '@/components/BlackfeatherLogo';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/95 via-black/60 to-transparent"
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
      >
        <CrestIcon size={26} className="text-gold group-hover:animate-glow" />
        <span className="font-display text-[#D4AF37] font-bold tracking-[0.25em] text-sm sm:text-base">
          BLACKFEATHER
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {loading ? (
          <div className="w-16" />
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-xs font-display font-bold uppercase tracking-wider hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
              aria-label="Account menu"
            >
              {user.email?.charAt(0) ?? '?'}
            </button>

            {showMenu && (
              <div className="absolute top-10 right-0 bg-[#111111]/95 backdrop-blur-md border border-[#D4AF37]/10 rounded-sm shadow-2xl py-1 min-w-[180px] animate-fade-in">
                <p className="px-3 py-2 text-white/30 text-xs font-body truncate border-b border-white/5">
                  {user.email}
                </p>
                <button
                  onClick={async () => {
                    setShowMenu(false);
                    await signOut();
                  }}
                  className="w-full text-left px-3 py-2 text-white/60 text-sm font-body hover:bg-white/5 hover:text-[#D4AF37] transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth"
            className="font-display bg-[#D4AF37]/90 text-black px-4 py-1.5 rounded-sm text-xs font-bold shadow-lg shadow-[#D4AF37]/10 transition-all hover:bg-[#D4AF37] hover:shadow-[#D4AF37]/20 active:scale-95 uppercase tracking-[0.15em]"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
