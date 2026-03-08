import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default Index;
