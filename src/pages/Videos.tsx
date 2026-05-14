import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, X } from "lucide-react";
import { useState } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const videos = [
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

const Videos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      {/* Curtain-like gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-night via-night/80 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-night via-night/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-8 md:px-16 py-24">
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

        {/* Video Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.12 }}
              onClick={() => setActiveVideo(video.id)}
              className="group relative aspect-video overflow-hidden border border-ivory/10 hover:border-gold/30 transition-all duration-500"
            >
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-night/55 group-hover:bg-night/35 transition-colors duration-500" />

              {/* Curtain edges */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-night/70 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-night/70 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-ivory/35 flex items-center justify-center backdrop-blur-sm group-hover:border-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  <Play className="w-6 h-6 text-ivory group-hover:text-gold ml-1" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-night via-night/70 to-transparent">
                <p className="text-ivory font-serif text-base tracking-wide text-left">
                  {video.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cinema frame */}
              <div className="absolute -inset-3 border border-ivory/10 pointer-events-none" />

              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-11 right-0 text-ivory/50 hover:text-ivory transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-7 h-7" />
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

export default Videos;
