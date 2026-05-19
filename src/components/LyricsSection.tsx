import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const LyricsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="lyrics"
      ref={ref}
      className="section-cinematic bg-night py-20 sm:py-32 md:py-48"
    >
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="mb-20"
        >
          <h2 className="text-section-title text-editorial text-ivory/90 mb-4">
            Lyrics
          </h2>
          <p className="text-ivory/60 text-sm tracking-widest uppercase mb-2">
            Be That
          </p>
          <p className="text-ivory/40 text-sm tracking-widest uppercase">
            From &ldquo;Things I Shouldn&apos;t Say&rdquo;
          </p>
        </motion.div>

        <div className="space-y-6">
          {lyrics.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: line ? 0.8 : 0, x: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.15,
                ease: "easeOut",
              }}
              className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-ivory leading-relaxed tracking-normal sm:tracking-wide"
            >
              {line || <span className="block h-8" />}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="mt-20 text-center"
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
