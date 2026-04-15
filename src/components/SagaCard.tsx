'use client';

import Link from 'next/link';
import { CrestIcon } from '@/components/BlackfeatherLogo';

interface SagaCardProps {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description?: string | null;
  coverImage?: string | null;
  totalChapters: number;
  isComplete?: boolean;
  className?: string;
}

/**
 * SAGA CARD
 * 
 * Structure:
 * - Background image (blurred fantasy scene)
 * - Dark overlay (70-80%)
 * - Gold border (#D4AF37)
 * - Content layered on top
 * 
 * Hover:
 * - Background image sharpens slightly
 * - Card scales up slightly (1.02)
 * - Gold border intensifies
 */
export default function SagaCard({
  title,
  slug,
  tagline,
  description,
  coverImage,
  totalChapters,
  isComplete,
  className = '',
}: SagaCardProps) {
  // Default tagline if none provided
  const displayTagline = tagline || description?.slice(0, 60) || 'A tale of power and betrayal.';

  return (
    <Link 
      href={`/saga/${slug}`}
      className={`saga-card group block ${className}`}
    >
      {/* Image side */}
      <div className="saga-card-image w-[140px] h-[180px] sm:w-[180px] sm:h-[200px] md:w-[200px] md:h-[220px]">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder gradient if no image */
          <div className="w-full h-full bg-gradient-to-br from-[#5A0A0A] via-[#111111] to-[#0B0B0B]" />
        )}
      </div>

      {/* Content side */}
      <div className="saga-card-content min-w-0 flex-1">
        {/* Crest + saga label */}
        <div className="flex items-center gap-2 mb-3">
          <CrestIcon size={20} className="opacity-60" />
          {isComplete && (
            <span 
              className="font-display text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border"
              style={{ 
                color: '#D4AF37',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                background: 'rgba(212, 175, 55, 0.05)'
              }}
            >
              Complete
            </span>
          )}
        </div>

        {/* Title */}
        <h2 
          className="font-display text-lg sm:text-xl md:text-2xl leading-tight tracking-wide"
          style={{ color: '#EAEAEA' }}
        >
          {title.toUpperCase()}
        </h2>

        {/* Tagline */}
        <p 
          className="tagline text-sm sm:text-base mt-2 line-clamp-2"
          style={{ color: 'rgba(234, 234, 234, 0.6)' }}
        >
          {displayTagline}
        </p>

        {/* Chapter count */}
        <p 
          className="font-body text-xs mt-3 tracking-wide"
          style={{ color: 'rgba(212, 175, 55, 0.5)' }}
        >
          {totalChapters} Chapter{totalChapters !== 1 ? 's' : ''}
        </p>

        {/* CTA Button */}
        <div className="mt-4">
          <span className="btn-outline text-[10px] sm:text-[11px] px-4 py-2 relative">
            Begin Her Story
          </span>
        </div>
      </div>
    </Link>
  );
}
