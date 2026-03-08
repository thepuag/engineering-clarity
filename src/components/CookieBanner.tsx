import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LangContext';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'hsl(var(--overlay-bg, 0 0% 0% / 0.5))' }}>
      <div className="glass-card mx-4 max-w-md p-6 text-center animate-fade-in">
        <p className="mb-6 text-sm text-foreground leading-relaxed">{t('cookie.message')}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleChoice(false)}
            className="px-5 py-2 rounded-full text-sm font-medium text-muted-foreground border border-border hover:bg-muted transition-colors"
          >
            {t('cookie.reject')}
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
