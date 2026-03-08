import { useLang } from '@/contexts/LangContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 text-center border-t border-border">
      <p className="text-xs text-muted-foreground">
        © {year} · {t('footer.createdBy')}
      </p>
    </footer>
  );
}
