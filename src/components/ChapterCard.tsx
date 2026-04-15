'use client';

interface ChapterCardProps {
  id: string;
  title: string;
  chapterNumber: number;
  sagaName: string;
  sagaSlug: string;
  thumbnailUrl?: string | null;
  durationSeconds?: number | null;
  isFree?: boolean;
  onPlay?: () => void;
  className?: string;
}

export default function ChapterCard({
  title,
  chapterNumber,
  sagaName,
  thumbnailUrl,
  durationSeconds,
  isFree = false,
  onPlay,
  className = '',
}: ChapterCardProps) {
  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <article 
      className={`chapter-row cursor-pointer ${className}`}
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay?.();
        }
      }}
    >
      {/* Thumbnail */}
      <div className="chapter-thumb">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0B0B0B] flex items-center justify-center">
            <PlayIconSmall className="w-6 h-6 text-[#D4AF37]/30" />
          </div>
        )}
        
        {/* Play overlay on thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <PlayIconSmall className="w-8 h-8 text-[#D4AF37]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Saga name with crown */}
        <div className="flex items-center gap-2 mb-1">
          <CrownIconTiny className="w-3 h-3 text-[#D4AF37]/60" />
          <span className="text-[10px] font-display tracking-[0.15em] text-[#D4AF37]/70 uppercase truncate">
            {sagaName}
          </span>
        </div>

        {/* Chapter title */}
        <h4 className="font-body text-base text-[#EAEAEA] leading-tight truncate">
          Chapter {chapterNumber}: {title}
        </h4>

        {/* Meta info */}
        <div className="flex items-center gap-3 mt-1">
          {durationSeconds && (
            <span className="text-[11px] text-[#EAEAEA]/40">
              {formatDuration(durationSeconds)}
            </span>
          )}
          {isFree && (
            <span className="text-[10px] font-display tracking-wider text-[#D4AF37]/70 uppercase">
              Free
            </span>
          )}
        </div>
      </div>

      {/* Play button */}
      <button 
        className="btn-play shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onPlay?.();
        }}
        aria-label={`Play ${title}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </article>
  );
}

// Mini play icon
function PlayIconSmall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Tiny crown for saga badge
function CrownIconTiny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L9 9L2 7L5 14H19L22 7L15 9L12 2Z" opacity="0.8" />
      <path d="M5 16H19V18H5V16Z" />
    </svg>
  );
}
