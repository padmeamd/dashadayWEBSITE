import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";
import HeroSection from "@/components/HeroSection";
import NewSingleSection from "@/components/NewSingleSection";
import SeriesSection from "@/components/series/SeriesSection";
import NewEpisodePopup from "@/components/series/NewEpisodePopup";
import SeriesStructuredData from "@/components/series/SeriesStructuredData";
import AboutStrip from "@/components/AboutStrip";
import NewAlbumSection from "@/components/NewAlbumSection";
import FeaturedVideoSection from "@/components/FeaturedVideoSection";
import MusicSection from "@/components/MusicSection";
import MusicVideosSection from "@/components/MusicVideosSection";
import VisualsSection from "@/components/VisualsSection";
import ExploreWorld from "@/components/ExploreWorld";
import LinksStrip from "@/components/LinksStrip";
import CollaborateSection from "@/components/CollaborateSection";
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
      {/* Who she is ───────────────────────────────────────────────── */}
      <HeroSection />

      {/* What she has made, newest first ───────────────────────────── */}
      <NewSingleSection />
      <SectionBlend from="night" to="night" />
      <SeriesSection />
      <NewAlbumSection />
      <SectionBlend from="night" to="night" />
      <MusicSection />
      <SectionBlend from="night" to="night" />
      <FeaturedVideoSection />
      <SectionBlend from="night" to="night-soft" />
      <MusicVideosSection />

      {/* Who is behind it ──────────────────────────────────────────── */}
      <SectionBlend from="night-soft" to="night" />
      <AboutStrip />
      <VisualsSection />

      {/* Where to go next ──────────────────────────────────────────── */}
      <ExploreWorld />
      <LinksStrip />
      <CollaborateSection />
      <Footer />
    </main>
  );
};

export default Index;
