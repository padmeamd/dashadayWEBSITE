import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const lyrics = [
  "I found you in the static",
  "between the hours we don't name",
  "when the city sleeps",
  "and I'm wide awake",
  "",
  "You said forever",
  "like it was easy to keep",
  "now I'm driving alone",
  "through streets that remember",
  "",
  "Music after midnight",
  "is the only truth I know",
];

const LyricsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="lyrics"
      ref={ref}
      className="section-cinematic bg-night py-32 md:py-48"
    >
      <div className="container mx-auto px-8 md:px-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="mb-20"
        >
          <h2 className="text-section-title text-editorial text-ivory/90 mb-4">
            Lyrics
          </h2>
          <p className="text-ivory/40 text-sm tracking-widest uppercase">
            From "Midnight Drive"
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
              className="font-serif text-xl md:text-2xl lg:text-3xl text-ivory leading-relaxed tracking-wide"
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
