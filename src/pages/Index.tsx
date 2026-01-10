import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MusicSection from "@/components/MusicSection";
import LyricsSection from "@/components/LyricsSection";
import VisualsSection from "@/components/VisualsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-night min-h-screen">
      <FilmGrain />
      <Navigation />
      <HeroSection />
      <MusicSection />
      <LyricsSection />
      <VisualsSection />
      <Footer />
    </main>
  );
};

export default Index;
