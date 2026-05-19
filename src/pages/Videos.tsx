import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, X } from "lucide-react";
import { useState } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";
import { musicVideos } from "@/data/musicVideos";

const Videos = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = musicVideos.find((v) => v.youtubeId === activeVideoId);

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-night via-night/80 to-transparent md:w-32" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-night via-night/80 to-transparent md:w-32" />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-12 sm:px-8 sm:py-20 md:px-16 md:py-24">
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1
            className="text-editorial-display text-ivory mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
          >
            Music Videos
          </h1>
          <div className="w-24 h-px bg-gold/50 mx-auto mb-8" />
          <p className="text-ivory/50 text-base leading-relaxed font-serif max-w-xl mx-auto">
            Visual stories behind the sound — directed and produced by DAYD Media.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {musicVideos.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.04 }}
              onClick={() => setActiveVideoId(video.youtubeId)}
              className="group relative aspect-video overflow-hidden border border-ivory/10 hover:border-gold/30 transition-all duration-500 text-left"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-night/55 group-hover:bg-night/35 transition-colors duration-500" />

              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-night/70 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-night/70 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-ivory/35 flex items-center justify-center backdrop-blur-sm group-hover:border-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <Play className="w-6 h-6 text-ivory group-hover:text-gold ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-night via-night/70 to-transparent">
                <p className="text-ivory/40 text-xs tracking-widest uppercase mb-1">
                  Official Video
                </p>
                <p className="text-ivory font-serif text-base tracking-wide">
                  {video.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-3 border border-ivory/10 pointer-events-none" />

              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-night/80 text-ivory/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-ivory"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title={activeVideo?.title ?? "Music video"}
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

export default Videos;
