import heroBg from '@/assets/hero-bg.jpg';
import { useLang } from '@/contexts/LangContext';

export default function Hero() {
  const { t } = useLang();

  const scrollToProjects = () => {
    document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-navy-950/70" />
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-navy-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          {t('hero.subtitle')}
        </p>
        <button
          onClick={scrollToProjects}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity animate-fade-in-up"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
}
