import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * About the artist — one framed plate rather than five paragraphs.
 *
 * The bio used to run five columns of prose, which nobody reads on a phone.
 * The figures carry what the prose used to argue, so the text around them can
 * stay short, and the photograph does the rest.
 */

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
        className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border border-ivory/10"
      >
        {/* The photograph sits behind everything, pushed right so the type has
            the quiet half of the frame to itself. */}
        <img
          src="/image/about-artist.jpg"
          alt="DashaDay"
          width={1280}
          height={1497}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[78%_22%]"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,hsl(0_0%_4%/0.97)_0%,hsl(0_0%_4%/0.93)_38%,hsl(0_0%_4%/0.72)_62%,hsl(0_0%_4%/0.35)_100%)]"
        />

        <div className="relative px-6 py-10 sm:px-12 sm:py-14 md:max-w-[68%]">
          <motion.p
            {...rise(0.12)}
            className="text-[10px] font-light uppercase tracking-[0.4em] text-gold/45"
          >
            About the Artist
          </motion.p>

          <motion.h2
            {...rise(0.2)}
            className="mt-3 font-serif text-3xl text-ivory sm:text-4xl"
          >
            DashaDay
          </motion.h2>

          <motion.p
            {...rise(0.3)}
            className="mt-5 max-w-lg font-serif text-base leading-relaxed text-ivory/70 sm:text-lg"
          >
            A London-based alt-pop artist, originally from Russia, writing songs that
            live somewhere between heartbreak and dark humour — intimate one moment,
            theatrical the next.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-x-7 gap-y-5 sm:gap-x-9">
            {FIGURES.map((figure) => (
              <div key={figure.label}>
                <p className="font-serif text-2xl text-gold/80 sm:text-3xl tabular-nums">
                  {figure.value}
                </p>
                <p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-ivory/40">
                  {figure.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.p
            {...rise(0.5)}
            className="mt-8 max-w-lg text-sm leading-relaxed text-ivory/55"
          >
            Her debut album <span className="italic text-ivory/75">Things I Shouldn't Say</span>{" "}
            explores love, identity and the things people wish they had never said. She
            performs across London with live vocals, keys and cinematic visuals, and works
            as a software engineer alongside her music.
          </motion.p>

          <motion.p
            {...rise(0.58)}
            className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ivory/35"
          >
            For listeners of Lana Del Rey · RAYE · Olivia Rodrigo
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutStrip;
