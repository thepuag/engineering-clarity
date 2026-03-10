import { useLang } from '@/contexts/LangContext';
import type { Lang } from '@/i18n';

interface ProjectCardProps {
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
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { lang } = useLang();

  return (
    <div
      className="relative overflow-hidden flex-shrink-0 w-[320px] md:w-[520px] cursor-pointer select-none rounded-[var(--card-radius)] group"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* Overlay with text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
        <h3 className="font-semibold text-white mb-1 text-sm md:text-base">{project.title[lang]}</h3>
        <div className="flex items-center gap-2 text-[11px] text-white/70 mb-1.5">
          <span>{project.date}</span>
          <span>·</span>
          <span>{project.location[lang]}</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm"
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
