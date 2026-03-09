import { Mail, Phone, MapPin } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

const OFFICE = {
  email: 'info@bipoficinatecnica.com',
  phone: '+34 971 123 456',
  address: 'Camí dels Reis, 164, Ponent, 07011 Palma, Illes Balears',
  lat: 39.5696,
  lng: 2.6158,
};

export default function ContactSection() {
  const { t } = useLang();

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${OFFICE.lat},${OFFICE.lng}&zoom=15`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${OFFICE.lat},${OFFICE.lng}`;

  return (
    <section id="contacto" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t('contact.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <a
              href={`mailto:${OFFICE.email}`}
              className="glass-card p-5 flex items-center gap-4 group"
            >
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('contact.email')}</p>
                <p className="font-medium text-foreground">→</p>
              </div>
            </a>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('contact.phone')}</p>
                <p className="font-medium text-foreground">{OFFICE.phone}</p>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('contact.address')}</p>
                <p className="font-medium text-foreground">{OFFICE.address}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card overflow-hidden block aspect-square md:aspect-auto"
          >
            <iframe
              src={mapUrl}
              className="w-full h-full min-h-[300px] pointer-events-none"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Office location"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
