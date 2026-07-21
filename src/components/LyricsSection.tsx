import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

const lyrics = [
  "Be that",
  "Someone's broken, someone's burned,",
  "Someone's waiting, never learned.",
  "Someone's counting days in fear,",
  "Someone's lost why they are here.",
  "",
  "Someone's trading soul for shame,",
  "Fading slow in someone's name.",
  "Someone's praying, scared to hope,",
  "Wakes up crying, barely copes.",
  "",
  "Call me chaos, call me bright —",
  "I've been broken, still I bite.",
  "Painted tears and velvet rage,",
  "Watch me set fire to the cage.",
  "",
  "Be the one who walks through smoke,",
  "Holds the dream you never spoke.",
  "Don't just ache — become the fire,",
  "Turn your scars into desire.",
  "Be that.",
  "",
  "Be that bitch, be that flame,",
  "Be the thunder in the rain.",
  "Be that dream they said was dead —",
  "Rise in heels and paint it red.",
  "",
  "Someone's drowning in the blue,",
  "Drinks the ache like bitter truth.",
  "Hears the voices in the dark,",
  "Still they chase that distant spark.",
  "",
  "There are some who walk through smoke,",
  "Holding tight to dreams they spoke.",
  "They don't break, they bend like fire—",
  "Turning scars into desire.",
];

function FloatingEmbers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 47 + 11) % 100}%`,
        size: 1.5 + (i % 3),
        dur: 10 + (i % 6) * 3,
        delay: (i % 5) * 1.2,
        drift: i % 2 ? 15 : -15,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: e.left,
            bottom: "-5%",
            width: e.size,
            height: e.size,
            background:
              "radial-gradient(circle, hsl(350 60% 55% / 0.6) 0%, hsl(30 70% 50% / 0.3) 60%, transparent 100%)",
            boxShadow: `0 0 ${e.size * 3}px hsl(350 55% 50% / 0.3)`,
          }}
          animate={{
            y: [0, "-110vh"],
            x: [0, e.drift, -e.drift * 0.5, e.drift * 0.7, 0],
            opacity: [0, 0.7, 0.5, 0.6, 0],
          }}
          transition={{
            duration: e.dur,
            repeat: Infinity,
            ease: "easeOut",
            delay: e.delay,
          }}
        />
      ))}
    </div>
  );
}

const LyricsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="lyrics"
      ref={ref}
      className="section-cinematic bg-night py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(350 40% 18% / 0.15) 0%, hsl(350 30% 12% / 0.06) 50%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.5, 0.8, 0.4], scale: [1, 1.05, 0.98, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingEmbers />

      <div className="section-container max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="mb-10 sm:mb-14"
        >
          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-[hsl(350_45%_45%/0.3)]" />
            <svg className="w-3 h-3 text-[hsl(350_50%_50%/0.35)]" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
            </svg>
            <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-[hsl(350_45%_45%/0.3)]" />
          </motion.div>

          <h2 className="text-section-title text-editorial text-ivory/90 mb-3">
            Lyrics
          </h2>
          <p className="text-ivory/60 text-sm tracking-widest uppercase mb-1.5">
            Be That
          </p>
          <p className="text-ivory/40 text-sm tracking-widest uppercase">
            From &ldquo;Things I Shouldn&apos;t Say&rdquo;
          </p>
        </motion.div>

        <div className="space-y-4">
          {lyrics.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: line ? 0.8 : 0, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.12,
                ease: "easeOut",
              }}
              className="font-serif text-base sm:text-lg md:text-xl text-ivory leading-relaxed tracking-normal sm:tracking-wide"
              style={{
                textShadow: line ? "0 0 20px hsl(350 45% 50% / 0.08)" : "none",
              }}
            >
              {line || <span className="block h-5" />}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="mt-12 text-center"
        >
          <p className="text-ivory/40 text-xs tracking-[0.3em] uppercase">
            — DashaDay
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LyricsSection;
