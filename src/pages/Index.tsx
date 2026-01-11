import FilmGrain from "@/components/FilmGrain";
import VHSScratchOverlay from "@/components/VHSScratchOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NewAlbumSection from "@/components/NewAlbumSection";
import MusicSection from "@/components/MusicSection";
import MusicVideosSection from "@/components/MusicVideosSection";
import LyricsSection from "@/components/LyricsSection";
import VisualsSection from "@/components/VisualsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-night min-h-screen">
      <FilmGrain />
      <VHSScratchOverlay />
      <Navigation />
      <HeroSection />
      <NewAlbumSection />
      <MusicSection />
      <MusicVideosSection />
      <LyricsSection />
      <VisualsSection />
      <Footer />
    </main>
  );
};

export default Index;
