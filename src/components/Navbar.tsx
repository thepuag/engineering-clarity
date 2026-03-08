import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const COMPANY_NAME = 'NMG Ingeniería';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: t('nav.projects'), href: '#proyectos' },
    { label: t('nav.services'), href: '#servicios' },
    { label: t('nav.contact'), href: '#contacto' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-400 ${
          scrolled ? 'navbar-sticky shadow-sm' : ''
        }`}
      >
        <div className={`mx-auto transition-all duration-400 ${
          scrolled ? 'max-w-full px-6 py-2' : 'max-w-3xl mt-4 px-6 py-3 navbar-float'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-foreground tracking-tight">{COMPANY_NAME}</span>
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <LanguageSwitcher />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden navbar-sticky px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm text-foreground">{COMPANY_NAME}</span>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-background flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-semibold text-sm text-foreground">{COMPANY_NAME}</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-foreground"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-2xl font-light text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-4 pb-8">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
