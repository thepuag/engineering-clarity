import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import type { Lang } from '@/i18n';

interface ProjectModalProps {
  project: {
    id: string;
    slug: string;
    title: Record<Lang, string>;
    date: string;
    location: Record<Lang, string>;
    tags: string[];
    coverImage: string;
    gallery: string[];
    description: Record<Lang, string>;
    fullDescription: Record<Lang, string>;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useLang();
  const allImages = [project.coverImage, ...project.gallery];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImage(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setCurrentImage(i => Math.min(allImages.length - 1, i + 1));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [allImages.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 glass-card w-full max-w-5xl max-h-[95vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: 'hsl(var(--card-hover-border))' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Image gallery */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[var(--card-radius)]">
          <img
            src={allImages[currentImage]}
            alt={`${project.title[lang]} - ${currentImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {allImages.length > 1 && (
            <>
              {currentImage > 0 && (
                <button
                  onClick={() => setCurrentImage(i => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {currentImage < allImages.length - 1 && (
                <button
                  onClick={() => setCurrentImage(i => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Image dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage
                        ? 'bg-primary-foreground w-5 rounded-sm'
                        : 'bg-primary-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {project.title[lang]}
          </h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span>{project.date}</span>
            <span>·</span>
            <span>{project.location[lang]}</span>
          </div>
          <div className="flex gap-2 flex-wrap mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag.replace('-', ' ')}
              </span>
            ))}
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            {project.fullDescription[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}
