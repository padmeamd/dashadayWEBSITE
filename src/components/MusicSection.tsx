import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const albums = [
  {
    id: 1,
    title: "Things I Shouldn't Say",
    year: "2026",
    slug: "things-i-shouldnt-say",
    coverImage: "/image/albums/tiss.webp",
    coverColor: "from-gold/20 to-night-soft",
  },
  {
    id: 2,
    title: "Great Romance",
    year: "2025",
    slug: "great-romance",
    coverImage: "/image/albums/greatromance.webp",
    coverColor: "from-night-card to-night",
  },
  {
    id: 3,
    title: "Phobia",
    year: "2023",
    slug: "phobia",
    coverImage: "/image/albums/phobia.webp",
    coverColor: "from-secondary to-night-card",
  },
  {
    id: 4,
    title: "Work of Art",
    year: "2021",
    slug: "work-of-art",
    coverImage: "/image/albums/workofart.webp",
    coverColor: "from-night-soft to-secondary",
  },
];

const MusicSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="music"
      ref={ref}
      className="section-cinematic band-tight bg-night"
    >
      <div className="section-container">
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

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 + index * 0.15 }}
              className="group relative aspect-square glow-gold-hover text-left"
            >
              {/* A real link, stretched over the tile. These were buttons
                  calling navigate(), so they could not be opened in a new tab,
                  were announced as buttons rather than links, and left the album
                  pages with no crawlable way in. */}
              <Link
                to={`/album/${album.slug}`}
                className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
              >
                <span className="sr-only">{`${album.title} (${album.year})`}</span>
              </Link>
              {/* Album cover */}
              <img
                src={album.coverImage}
                alt={`${album.title} album cover`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${album.coverColor} opacity-0 transition-opacity duration-700 group-hover:opacity-20`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-700" />
              
              {/* Play icon */}
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-70 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                <div className="w-16 h-16 rounded-full border border-ivory/30 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-6 h-6 text-ivory ml-1" />
                </div>
              </motion.div>

              {/* Album info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-night/90 to-transparent">
                <p className="text-ivory/40 text-xs tracking-widest mb-1">
                  {album.year}
                </p>
                <h3 className="text-ivory font-serif text-xl tracking-wide">
                  {album.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
