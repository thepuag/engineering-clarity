import { useLang } from '@/contexts/LangContext';
import { type Lang, langNames } from '@/i18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ['es', 'en', 'de'];

  return (
    <div className="flex gap-1 items-center">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            l === lang
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {langNames[l]}
        </button>
      ))}
    </div>
  );
}
