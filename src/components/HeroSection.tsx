'use client';

import { useEffect, useState } from 'react';
import BlackfeatherLogo from '@/components/BlackfeatherLogo';

interface HeroSectionProps {
  onEnter?: () => void;
}

/**
 * HERO SECTION
 * 
 * Layout: Full viewport height (100vh)
 * Center stack: Logo, Optional tagline, Primary CTA button
 * Background: Animated smoke (slow), floating embers, vignette
 * Lighting: Soft glow behind logo
 */
export default function HeroSection({ onEnter }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger staggered reveal animation
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    } else {
      // Smooth scroll to content below hero
      window.scrollTo({ 
        top: window.innerHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Soft center glow behind logo — warm gold/red, diffused */}
      <div 
        className={`hero-glow absolute transition-opacity duration-[2000ms] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(90, 10, 10, 0.04) 40%, transparent 70%)',
          width: '600px',
          height: '600px',
          filter: 'blur(80px)',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo — staggered fade in */}
        <div 
          className={`transition-all duration-[1200ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <BlackfeatherLogo size={200} showText={true} />
        </div>

        {/* Tagline */}
        <p 
          className={`tagline text-lg md:text-xl mt-8 transition-all duration-[1200ms] delay-300 ease-out ${
            isVisible 
              ? 'opacity-80 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ color: '#EAEAEA' }}
        >
          Stories That Actually End
        </p>

        {/* Sub-tagline */}
        <p 
          className={`font-body text-sm md:text-base tracking-[0.2em] mt-3 transition-all duration-[1200ms] delay-500 ease-out ${
            isVisible 
              ? 'opacity-50 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
          style={{ color: '#D4AF37' }}
        >
          Power. Betrayal. Rebirth.
        </p>

        {/* Decorative rule */}
        <div 
          className={`mt-10 mb-10 transition-all duration-[1000ms] delay-700 ease-out ${
            isVisible 
              ? 'opacity-100 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
        >
          <div className="gold-rule w-32 md:w-48" />
        </div>

        {/* CTA Button — Deep crimson + gold border */}
        <button 
          onClick={handleEnter}
          className={`btn-throne transition-all duration-[1200ms] delay-900 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}
        >
          Enter the Throne
        </button>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1200ms] delay-[1200ms] ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
      >
        <span 
          className="font-display text-xs tracking-[0.3em] uppercase"
          style={{ color: '#8C6B1F' }}
        >
          Scroll
        </span>
        <svg 
          className="w-4 h-4 animate-bounce" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="#8C6B1F"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
}
