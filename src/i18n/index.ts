import es from './es.json';
import en from './en.json';
import de from './de.json';

export type Lang = 'es' | 'en' | 'de';

const translations: Record<Lang, typeof es> = { es, en, de };

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[lang];
  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

export const langNames: Record<Lang, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
};
