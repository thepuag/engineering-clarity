import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import type { Lang } from '@/i18n';

const DRAG_THRESHOLD = 4;

export default function ProjectsSection() {
  const { lang, t } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);
  const hasDragged = useRef(false);

  const allTags = ['all', ...Array.from(new Set(projectsData.flatMap((p) => p.tags)))];
  const filtered = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.tags.includes(activeFilter));

  const getTagLabel = (tag: string) => {
    if (tag === 'all') return t('projects.filterAll');
    const service = servicesData.find((s) => s.id === tag);
    return service ? service.title[lang as Lang] : tag;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current.scrollLeft };
    hasDragged.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || !scrollRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) >= DRAG_THRESHOLD) hasDragged.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    dragStart.current = null;
    updateActiveIndex();
  };

  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / filtered.length;
    const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)));
  }, [filtered.length]);

  const handleCardClick = (project: typeof projectsData[0]) => {
    if (hasDragged.current) return;
    setSelectedProject(project);
  };

  const scrollByCard = (direction: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector(':first-child')?.clientWidth ?? 340;
    scrollRef.current.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <>
      <section id="proyectos" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t('projects.title')}</h2>

          {/* Filters */}
          <div className="flex gap-1.5 flex-wrap mb-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveFilter(tag); setActiveIndex(0); }}
                className={`px-2.5 py-0.5 rounded-full text-xs transition-colors ${
                  tag === activeFilter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {getTagLabel(tag)}
              </button>
            ))}
          </div>

          {/* Carousel with arrows */}
          <div className="relative group/carousel">
            {/* Left arrow - desktop only */}
            <button
              onClick={() => scrollByCard(-1)}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing scroll-smooth"
              style={{ scrollSnapType: 'x proximity', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onScroll={updateActiveIndex}
            >
              {filtered.map((project) => (
                <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
                  <ProjectCard
                    project={project as any}
                    onClick={() => handleCardClick(project)}
                  />
                </div>
              ))}
            </div>

            {/* Right arrow - desktop only */}
            <button
              onClick={() => scrollByCard(1)}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-background"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {filtered.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === activeIndex ? 'dot-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject as any}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
