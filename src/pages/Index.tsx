import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";
import HeroSection from "@/components/HeroSection";
import SeriesSection from "@/components/series/SeriesSection";
import NewEpisodePopup from "@/components/series/NewEpisodePopup";
import SeriesStructuredData from "@/components/series/SeriesStructuredData";
import AboutStrip from "@/components/AboutStrip";
import NewAlbumSection from "@/components/NewAlbumSection";
import FeaturedVideoSection from "@/components/FeaturedVideoSection";
import MusicSection from "@/components/MusicSection";
import MusicVideosSection from "@/components/MusicVideosSection";
import LyricsSection from "@/components/LyricsSection";
import VisualsSection from "@/components/VisualsSection";
import LinksStrip from "@/components/LinksStrip";
import Footer from "@/components/Footer";

const SectionBlend = ({ from = "night", to = "night" }: { from?: string; to?: string }) => (
  <div
    className="h-16 sm:h-24 -mt-8 sm:-mt-12 relative z-[1]"
    style={{
      background: `linear-gradient(to bottom, hsl(var(--${from})) 0%, hsl(var(--${to})) 100%)`,
    }}
  />
);

const Index = () => {
  return (
    <main className="bg-night min-h-screen overflow-x-hidden">
      <SeriesStructuredData />
      <NewEpisodePopup />
      <FilmGrain />
      <LightLeaksOverlay />
      <HeroSection />
      <SeriesSection />
      <AboutStrip />
      <NewAlbumSection />
      <FeaturedVideoSection />
      <SectionBlend from="night" to="night" />
      <MusicSection />
      <SectionBlend from="night" to="night-soft" />
      <MusicVideosSection />
      <SectionBlend from="night-soft" to="night" />
      <LyricsSection />
      <SectionBlend from="night" to="night" />
      <VisualsSection />
      <LinksStrip />
      <Footer />
    </main>
  );
};

export default Index;
