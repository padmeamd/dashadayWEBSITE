import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { musicVideos } from "@/data/musicVideos";

const MusicVideosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="videos"
        ref={ref}
        className="section-cinematic bg-night-soft py-16 sm:py-24 md:py-40"
      >
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="mb-12 flex flex-col gap-4 sm:mb-16 md:mb-24 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <h2 className="text-section-title text-editorial text-ivory/90 mb-4">
                Videos
              </h2>
              <p className="text-ivory/40 text-sm tracking-widest uppercase">
                Music Films
              </p>
            </div>
            
            {/* Scroll controls */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 border border-ivory/20 flex items-center justify-center hover:border-gold/50 hover:text-gold transition-colors text-ivory/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 border border-ivory/20 flex items-center justify-center hover:border-gold/50 hover:text-gold transition-colors text-ivory/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-4 sm:gap-6 sm:px-8 md:px-16"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {musicVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group relative flex-shrink-0"
                style={{ 
                  width: "min(400px, 80vw)",
                  scrollSnapAlign: "start",
                }}
              >
                <button
                  onClick={() => setActiveVideo(video.youtubeId)}
                  className="w-full aspect-video relative overflow-hidden cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-night/50 group-hover:bg-night/30 transition-colors duration-500" />
                  
                  {/* Film grain */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-ivory/50 flex items-center justify-center backdrop-blur-sm group-hover:border-gold group-hover:scale-110 transition-all duration-500">
                      <Play className="w-6 h-6 text-ivory group-hover:text-gold ml-1" />
                    </div>
                  </div>
                </button>

                {/* Title */}
                <div className="mt-4">
                  <p className="text-ivory/40 text-xs tracking-widest uppercase mb-1">
                    Official Video
                  </p>
                  <h3 className="text-ivory font-serif text-lg tracking-wide">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-night-soft to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-night-soft to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Video Modal */}
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
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
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
    </>
  );
};

export default MusicVideosSection;
