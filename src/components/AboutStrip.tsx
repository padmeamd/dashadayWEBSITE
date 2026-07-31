import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative z-10 py-10 sm:py-14 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(350 35% 15% / 0.12) 0%, hsl(38 25% 12% / 0.06) 50%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.03, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <svg
              className="w-3.5 h-3.5 text-gold/30"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
            </svg>
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
          <h2 className="text-center font-serif text-2xl sm:text-3xl text-ivory/90 mb-1">
            DashaDay
          </h2>
          <p className="text-center text-gold/35 text-[10px] tracking-[0.4em] uppercase font-light">
            About the Artist
          </p>
        </motion.div>

        {/* Body */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-sm sm:text-base text-ivory/55 leading-relaxed"
          >
            <span className="text-ivory/80 font-medium">DashaDay</span> is a
            London-based alt-pop artist blending cinematic storytelling with
            emotionally charged songwriting. Originally from Russia, she writes
            music that lives somewhere between heartbreak and dark humor, turning
            messy emotions into anthems that feel both intimate and theatrical.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-sm sm:text-base text-ivory/55 leading-relaxed"
          >
            Her music has reached listeners in{" "}
            <span className="text-ivory/75">172 countries</span>, accumulating{" "}
            <span className="text-ivory/75">more than 2.7 million streams</span>{" "}
            across platforms. With over{" "}
            <span className="text-ivory/75">30,000 monthly Spotify listeners</span>,
            DashaDay has built a growing international audience through
            independently released music that combines vulnerable lyrics,
            cinematic production, and memorable pop hooks.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-serif text-sm sm:text-base text-ivory/55 leading-relaxed"
          >
            Inspired by artists such as Lana Del Rey, RAYE, Olivia Rodrigo, Lady
            Gaga, and Conan Gray, DashaDay creates songs that explore love,
            identity, self-destruction, nostalgia, and the things people wish
            they had never said. Her debut album,{" "}
            <span className="italic text-ivory/70">Things I Shouldn't Say</span>,
            captures these themes through honest songwriting and dramatic,
            atmospheric production.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="font-serif text-sm sm:text-base text-ivory/55 leading-relaxed"
          >
            Beyond the studio, DashaDay has established herself as an engaging
            live performer, bringing her music to audiences across London with
            intimate, emotionally driven shows that combine live vocals,
            keyboards, and cinematic visuals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-serif text-sm sm:text-base text-ivory/55 leading-relaxed"
          >
            Alongside her music career, DashaDay is also a software engineer,
            bringing a unique blend of technical precision and artistic creativity
            to everything she creates. Whether on stage or in the studio, her
            goal remains the same: to tell stories that stay with people long
            after the final note.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
