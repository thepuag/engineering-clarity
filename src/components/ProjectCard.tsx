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
    description: Record<Lang, string>;
    fullDescription: Record<Lang, string>;
  };
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ project, expanded, onToggle }: ProjectCardProps) {
  const { lang, t } = useLang();

  return (
    <div
      className={`glass-card overflow-hidden flex-shrink-0 w-[280px] md:w-[340px] cursor-pointer select-none transition-all duration-300 ${
        expanded ? 'w-[90vw] md:w-[600px]' : ''
      }`}
      onClick={onToggle}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title[lang]}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{project.title[lang]}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span>{project.date}</span>
          <span>·</span>
          <span>{project.location[lang]}</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
        {expanded && (
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed animate-fade-in">
            {project.fullDescription[lang]}
          </p>
        )}
        {!expanded && (
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description[lang]}</p>
        )}
      </div>
    </div>
  );
}
