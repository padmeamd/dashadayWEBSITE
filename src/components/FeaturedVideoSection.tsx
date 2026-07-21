import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Play } from "lucide-react";

function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 43 + 17) % 100}%`,
        top: `${(i * 37 + 5) % 100}%`,
        size: 2 + (i % 3),
        dur: 3 + (i % 4) * 1.5,
        delay: (i % 7) * 0.6,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, hsl(38 80% 75% / 0.9) 0%, hsl(38 60% 55% / 0.4) 40%, transparent 70%)",
            boxShadow: `0 0 ${s.size * 2}px hsl(38 70% 60% / 0.4)`,
          }}
          animate={{
            opacity: [0, 0.8, 0, 0.6, 0],
            scale: [0.5, 1.3, 0.5, 1.1, 0.5],
          }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
    </div>
  );
}

function LightLeaks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen" aria-hidden>
      <motion.div
        className="absolute -top-[10%] -left-[15%] w-[500px] h-[400px] rounded-full rotate-12"
        style={{ background: "radial-gradient(ellipse at center, hsl(350 60% 50% / 0.18) 0%, hsl(30 65% 50% / 0.08) 45%, transparent 70%)" }}
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[15%] -right-[10%] w-[450px] h-[350px] rounded-full -rotate-6"
        style={{ background: "radial-gradient(ellipse at center, hsl(38 55% 55% / 0.15) 0%, hsl(350 45% 45% / 0.06) 45%, transparent 65%)" }}
        animate={{ opacity: [0.25, 0.5, 0.25], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute bottom-[0%] left-[15%] w-[550px] h-[300px] rounded-full rotate-3"
        style={{ background: "radial-gradient(ellipse at center, hsl(350 50% 48% / 0.14) 0%, hsl(20 55% 45% / 0.06) 40%, transparent 60%)" }}
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute top-[40%] left-[40%] w-[400px] h-[300px] rounded-full -rotate-3"
        style={{ background: "radial-gradient(ellipse at center, hsl(38 50% 50% / 0.1) 0%, hsl(350 40% 42% / 0.05) 45%, transparent 65%)" }}
        animate={{ opacity: [0.15, 0.35, 0.15], x: [-15, 15, -15] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
    </div>
  );
}

function CinematicParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 53 + 7) % 100}%`,
        size: 1.5 + (i % 3),
        dur: 12 + (i % 5) * 3,
        delay: (i % 4) * 1.5,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "0%",
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, hsl(38 65% 60% / 0.5) 0%, transparent 70%)",
          }}
          animate={{
            y: [0, "-80vh"],
            opacity: [0, 0.5, 0.3, 0.4, 0],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

const FeaturedVideoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-night pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(350 35% 15% / 0.2) 0%, hsl(38 30% 12% / 0.08) 45%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <CinematicParticles />
      <Sparkles />
      <LightLeaks />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <span className="text-gold/50 text-[10px] tracking-[0.4em] uppercase font-light">
              Latest Video
            </span>
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory/90 leading-tight">
            Cinematic
          </h2>
          <p className="text-ivory/35 text-xs tracking-[0.2em] uppercase mt-2">
            Official Music Video
          </p>
        </motion.div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          {/* Glow border */}
          <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-[hsl(350_50%_40%/0.3)] via-gold/10 to-[hsl(350_45%_35%/0.2)] opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />

          {/* Video container */}
          <div className="relative rounded-sm overflow-hidden border border-ivory/[0.06] bg-black">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ttj_ktpPOp8?rel=0&modestbranding=1"
                title="DashaDay - Cinematic (Official Music Video)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Corner accents */}
          {["top-0 left-0", "top-0 right-0 -scale-x-100", "bottom-0 left-0 -scale-y-100", "bottom-0 right-0 -scale-x-100 -scale-y-100"].map(
            (pos, i) => (
              <div key={i} className={`absolute ${pos} pointer-events-none`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold/15">
                  <path d="M0 0v6L6 0z" fill="currentColor" />
                </svg>
              </div>
            )
          )}
        </motion.div>

        {/* Watch on YouTube link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-center"
        >
          <a
            href="https://www.youtube.com/watch?v=ttj_ktpPOp8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ivory/35 text-xs tracking-[0.2em] uppercase hover:text-gold/60 transition-colors duration-300"
          >
            <Play className="w-3 h-3" />
            Watch on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
