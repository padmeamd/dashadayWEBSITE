import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import vinylRecord from "@/assets/vinyl-record.png";
import heroImage from "@/assets/hero-dashaday.jpg";

const songTitles = [
  "Midnight Confessions",
  "Velvet Shadows",
  "After Hours",
  "City Lights Fade",
  "Whispers in the Dark",
  "Golden Hour",
  "Champagne Dreams",
  "Silent Streets",
  "Neon Heartbeat",
  "Lost in You",
  "Twilight Zone",
  "Smoke & Mirrors",
  "Electric Touch",
  "Moonlit Drive",
  "Until Dawn",
];

const NewAlbumSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="new-album"
      ref={ref}
      className="section-cinematic bg-night py-24 md:py-40"
    >
      <div className="container mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-16 text-center"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            New Release
          </p>
          <h2 className="text-section-title text-editorial text-ivory/90">
            Midnight Hour
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left side - Album with spinning vinyl */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0"
          >
            {/* Spinning vinyl behind */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <img
                src={vinylRecord}
                alt="Vinyl Record"
                className="w-full h-full object-contain translate-x-8 md:translate-x-12"
              />
            </motion.div>

            {/* Album cover in front */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 relative glow-gold overflow-hidden -translate-x-4 md:-translate-x-8">
                <img
                  src={heroImage}
                  alt="Midnight Hour Album"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-ivory/60 text-xs tracking-widest">2026</p>
                  <p className="text-ivory font-serif text-lg">Midnight Hour</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Song list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-12">
              {songTitles.map((title, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                  className="flex items-center gap-4 py-2 border-b border-ivory/10 hover:border-gold/30 transition-colors group"
                >
                  <span className="text-ivory/30 text-xs font-mono w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ivory/70 group-hover:text-ivory transition-colors text-sm tracking-wide">
                    {title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Listen now button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex justify-center"
            >
              <Link
                to="/listen"
                className="px-12 py-4 border border-gold/50 text-gold text-sm tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500"
              >
                Listen Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewAlbumSection;
