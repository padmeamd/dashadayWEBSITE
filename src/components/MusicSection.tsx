import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const albums = [
  {
    id: 1,
    title: "Midnight Drive",
    year: "2025",
    slug: "midnight-drive",
    coverColor: "from-night-soft to-secondary",
  },
  {
    id: 2,
    title: "Velvet Hours",
    year: "2024",
    slug: "velvet-hours",
    coverColor: "from-secondary to-night-card",
  },
  {
    id: 3,
    title: "After Dark",
    year: "2023",
    slug: "after-dark",
    coverColor: "from-night-card to-night",
  },
];

const MusicSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section
      id="music"
      ref={ref}
      className="section-cinematic bg-night py-32 md:py-48"
    >
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-20 md:mb-32"
        >
          <h2 className="text-section-title text-editorial text-ivory/90 mb-4">
            Music
          </h2>
          <p className="text-ivory/40 text-sm tracking-widest uppercase">
            Select a release
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {albums.map((album, index) => (
            <motion.button
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 + index * 0.15 }}
              onClick={() => navigate(`/album/${album.slug}`)}
              className="group relative aspect-square glow-gold-hover cursor-pointer text-left"
            >
              {/* Album cover placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${album.coverColor} transition-all duration-700`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-700" />
              
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full border border-ivory/30 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-6 h-6 text-ivory ml-1" />
                </div>
              </div>

              {/* Album info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-night/90 to-transparent">
                <p className="text-ivory/40 text-xs tracking-widest mb-1">
                  {album.year}
                </p>
                <h3 className="text-ivory font-serif text-xl tracking-wide">
                  {album.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
