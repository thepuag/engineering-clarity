import { useRef, useState, useCallback } from 'react';
import { useLang } from '@/contexts/LangContext';
import ProjectCard from './ProjectCard';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';
import type { Lang } from '@/i18n';

const DRAG_THRESHOLD = 4;

export default function ProjectsSection() {
  const { lang, t } = useLang();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    dragStart.current = { x: e.touches[0].clientX, scrollLeft: scrollRef.current.scrollLeft };
    hasDragged.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStart.current || !scrollRef.current) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    if (Math.abs(dx) >= DRAG_THRESHOLD) hasDragged.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleTouchEnd = () => {
    dragStart.current = null;
    updateActiveIndex();
  };

  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / filtered.length;
    const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)));
  }, [filtered.length]);

  const toggleExpand = (id: string) => {
    if (hasDragged.current) return;
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="proyectos" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t('projects.title')}</h2>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveFilter(tag); setExpandedId(null); setActiveIndex(0); }}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                tag === activeFilter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {getTagLabel(tag)}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={updateActiveIndex}
        >
          {filtered.map((project) => (
            <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
              <ProjectCard
                project={project as any}
                expanded={expandedId === project.id}
                onToggle={() => toggleExpand(project.id)}
              />
            </div>
          ))}
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
  );
}
