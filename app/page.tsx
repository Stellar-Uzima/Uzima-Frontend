import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { MissionStrip } from '@/components/mission-strip';
import { About } from '@/components/about';
import { Features } from '@/components/features';
import { Team } from '@/components/team';
import { Contribute } from '@/components/contribute';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-[var(--warm-white)]">
      <Navigation />
      <Hero />
      <MissionStrip />
      <About />
      <Features />
      <Team />
      <Contribute />
      <Contact />
      <Footer />
    </div>
  );
}
