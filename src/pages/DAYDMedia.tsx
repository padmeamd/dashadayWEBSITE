import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, X } from "lucide-react";
import { useState } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const projectVideos = [
  {
    id: "6c0aEu5mRr4",
    title: "Work OA",
  },
  {
    id: "tRAF38ixcwI",
    title: "Nobody's Better",
  },
  {
    id: "ZA6Mjycq9yM",
    title: "Arkhip Grek - Rastafarai",
  },
  {
    id: "HxJhYpTIrl8",
    title: "Villain Phase",
  },
];

const services = [
  "Strategy and Planning",
  "Content Creatives and Scripting",
  "Filming & Production",
  "Post Production Editing",
  "Backstage Shooting",
  "Location Scouting",
  "Lyric Writing",
  "Lyric Editing",
  "Get Help Writing Better Hooks",
  "Set Your Vocal Melody to Music",
  "Music Production (beatmaking, mixing)",
  "Photo Editing (Adobe Photoshop, Lightroom)",
  "Designs (album covers for videos and other)",
  "Photoshoot",
  "Website-making, Landing Page",
  "SMM – management",
  "Copywriting",
];

const DAYDMedia = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      {/* Vintage cinema texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Curtain-like gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r md:w-32 from-night via-night/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l md:w-32 from-night via-night/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-12 sm:px-8 sm:py-20 md:px-16 md:py-24">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-editorial-display text-gold mb-4" style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.5rem)", lineHeight: 1.1 }}>
            DAYD Media
          </h1>
          <div className="w-24 h-px bg-gold/50 mx-auto mb-8" />
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <p className="text-ivory/70 text-lg leading-relaxed text-center font-serif">
            DAYD media is Dasha Day's innovative creative project where she and other talented creators make art.
          </p>
          <p className="text-ivory/50 text-base leading-relaxed text-center mt-6">
            All the videos below are the intellectual property of Dasha Day. It is very important to keep a creative
            way of thinking, and make your most ambitious ideas come true.
          </p>
        </motion.div>

        {/* Significant Projects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-24"
        >
          <h2 className="text-2xl text-editorial text-ivory/90 text-center mb-12 tracking-widest">
            OTHER SIGNIFICANT PROJECTS
          </h2>

          {/* Video Grid - Cinema Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectVideos.map((video, index) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                onClick={() => setActiveVideo(video.id)}
                className="group relative aspect-video overflow-hidden border-4 border-ivory/10 hover:border-gold/30 transition-all duration-500"
              >
                {/* Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-night/60 group-hover:bg-night/40 transition-colors duration-500" />
                
                {/* Film grain */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
                
                {/* Curtain effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-night/80 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-night/80 to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-ivory/40 flex items-center justify-center backdrop-blur-sm group-hover:border-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                    <Play className="w-8 h-8 text-ivory group-hover:text-gold ml-1" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-night via-night/80 to-transparent">
                  <p className="text-ivory font-serif text-lg tracking-wide">
                    {video.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mb-16 max-w-3xl border border-ivory/10 bg-night/50 p-6 text-center backdrop-blur-sm sm:mb-20 sm:p-10 md:p-12"
        >
          <h2 className="text-2xl text-editorial text-ivory/90 mb-6 tracking-widest">
            Want your creative project to be done by DASHA?
          </h2>
          <p className="text-ivory/60 leading-relaxed mb-8">
            I believe you want to unleash your creative potential and realize your craziest ART-IDEA! DAYD media
            will help! Click the button below and tell us about it! We'll get back to you as soon as possible to
            discuss all the details.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-500 text-sm tracking-widest uppercase"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl text-editorial text-ivory/90 text-center mb-12 tracking-widest">
            PRIMARY SERVICES INCLUDE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.03 }}
                className="flex items-center gap-3 text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                <span className="text-gold">•</span>
                <span className="text-sm tracking-wide">{service}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cinema curtain frame */}
              <div className="absolute -inset-4 border-8 border-secondary/30 pointer-events-none" />
              
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-night/80 text-ivory/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-ivory"
                aria-label="Close video"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
              
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default DAYDMedia;
