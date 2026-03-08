import { useLang } from '@/contexts/LangContext';
import servicesData from '@/data/services.json';
import { HardHat, Calculator } from 'lucide-react';
import type { Lang } from '@/i18n';

const iconMap: Record<string, React.ElementType> = {
  HardHat,
  Calculator,
};

export default function ServicesSection() {
  const { lang, t } = useLang();

  return (
    <section id="servicios" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t('services.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || HardHat;
            return (
              <div key={service.id} className="glass-card overflow-hidden container-query">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title[lang as Lang]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{service.title[lang as Lang]}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description[lang as Lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
