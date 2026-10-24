import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * About the artist.
 *
 * The photograph is never filtered or retouched — it reads dark only where the
 * scrim sits, so the scrim stops before her face rather than covering the whole
 * plate. Everything on the left half is type; the right half is hers.
 */

/** Edit the numbers here; nothing downstream hardcodes them. */
const FIGURES = [
  { value: "172", label: "Countries reached" },
  { value: "2.7M+", label: "Streams worldwide" },
  { value: "30K+", label: "Monthly listeners" },
];

const AboutStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  return (
    <section ref={ref} className="relative z-10 px-5 pt-12 pb-4 sm:px-8 sm:pt-16 sm:pb-6">
      <motion.div
        {...rise(0)}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-sm border border-ivory/10"
      >
        <img
          src="/image/about-artist.jpg"
          alt="Dasha Day"
          width={1280}
          height={1497}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[64%_30%]"
        />

        {/* Two scrims instead of one blanket: a horizontal one that has faded
            out well before her face, and a faint floor so the lower type keeps
            its footing. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(102deg,hsl(0_0%_4%/0.95)_0%,hsl(0_0%_4%/0.9)_34%,hsl(0_0%_4%/0.55)_52%,hsl(0_0%_4%/0.12)_66%,transparent_78%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,hsl(0_0%_4%/0.55),transparent)] md:hidden"
        />

        <div className="relative px-6 py-11 sm:px-12 sm:py-16 md:max-w-[60%] md:py-20">
          <motion.p
            {...rise(0.12)}
            className="text-[10px] font-light uppercase tracking-[0.42em] text-gold/50"
          >
            About the Artist
          </motion.p>

          <motion.h2
            {...rise(0.2)}
            className="mt-4 font-serif text-4xl leading-[1.05] text-ivory sm:text-5xl"
          >
            Dasha Day
          </motion.h2>

          <motion.p
            {...rise(0.3)}
            className="mt-6 font-serif text-lg leading-relaxed text-ivory/85 sm:text-xl"
          >
            Independent alt-pop artist, songwriter and filmmaker turning complicated
            emotions into cinematic worlds.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-7 space-y-4">
            <p className="max-w-[62ch] text-[0.95rem] leading-[1.75] text-ivory/60">
              Blending intimate songwriting, sharp wit and theatrical storytelling,
              Dasha Day makes music about love, heartbreak, desire and everything
              people are afraid to say out loud. She writes, directs and scores her
              own work from London, for an audience spread across 172 countries.
            </p>
            <p className="max-w-[62ch] text-[0.95rem] leading-[1.75] text-ivory/60">
              Her 19-track album{" "}
              <span className="italic text-ivory/80">Things I Shouldn't Say</span>{" "}
              extends beyond music into an original cinematic mystery series, bringing
              her songs, characters and stories into one interconnected universe.
              Through DAYD Media she handles the creative direction, film and digital
              projects behind it.
            </p>
            <p className="pt-1">
              <a
                href="/media-kit/"
                className="tap tap-pad font-sans text-[11px] uppercase tracking-[0.26em] text-ivory/60 no-underline transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                Full biography and figures →
              </a>
            </p>
          </motion.div>

          <motion.div
            {...rise(0.5)}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-ivory/10 pt-7"
          >
            {FIGURES.map((figure) => (
              <div key={figure.label}>
                <p className="font-serif text-2xl tabular-nums text-gold/85 sm:text-[1.75rem]">
                  {figure.value}
                </p>
                <p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.13em] text-ivory/45">
                  {figure.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutStrip;
