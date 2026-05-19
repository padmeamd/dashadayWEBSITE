import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import vinylRecord from "@/assets/vinyl-record.png";

const albumCover = "/image/albums/tiss.jpg";

const songTitles = [
  "Blockbuster",
  "Venom",
  "Cinematic",
  "So Confusing",
  "Love You Like You Do",
  "Be That",
  "Feel The Same",
  "Expectations",
  "Darker Than Lust",
  "Marylebone Road",
  "Lied to You",
  "ur time is up",
  "Season of Rollercoasters",
  "Not My Circus",
  "Wind Oh Wind",
  "That Boy Was a Mistake",
  "SUFM",
  "Give Up On Love",
  "Back to My Old Ways",
];

const NewAlbumSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="new-album"
      ref={ref}
      className="section-cinematic scroll-mt-20 bg-night py-16 sm:py-24 md:scroll-mt-24 md:py-40"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="mb-16 text-center"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            New Release
          </p>
          <Link
            to="/album/things-i-shouldnt-say"
            className="text-section-title text-editorial text-ivory/90 transition-colors hover:text-ivory inline-block"
          >
            Things I Shouldn't Say
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left side - Album with spinning vinyl */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mx-auto aspect-square w-full max-w-[min(calc(100vw-2.5rem),17.5rem)] sm:max-w-[20rem] md:h-96 md:w-96 md:max-w-none md:flex-shrink-0"
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
                className="h-[94%] w-[94%] object-contain translate-x-[5%] sm:h-full sm:w-full sm:translate-x-[8%] md:translate-x-12"
              />
            </motion.div>

            {/* Album cover in front */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-1 sm:px-0">
              <Link
                to="/album/things-i-shouldnt-say"
                className="relative block aspect-square w-[min(88%,15.5rem)] max-w-full translate-x-0 overflow-hidden glow-gold transition-opacity hover:opacity-95 sm:w-[86%] sm:max-w-[16rem] sm:-translate-x-3 md:h-80 md:w-80 md:max-w-none md:-translate-x-8"
                aria-label="Open Things I Shouldn't Say album"
              >
                <img
                  src={albumCover}
                  alt="Things I Shouldn't Say Album"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:bottom-4 sm:p-4">
                  <p className="text-[10px] tracking-[0.28em] text-ivory/60 sm:text-xs sm:tracking-widest">
                    2026
                  </p>
                  <p className="font-serif text-sm leading-snug text-ivory sm:text-base md:text-lg">
                    Things I Shouldn&apos;t Say
                  </p>
                </div>
              </Link>
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
                className="min-h-11 px-8 py-3 sm:px-12 sm:py-4 border border-gold/50 text-gold text-xs sm:text-sm tracking-[0.28em] sm:tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500"
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
