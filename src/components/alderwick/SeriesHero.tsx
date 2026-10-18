import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import Fog from "@/components/alderwick/Fog";
import { SERIES, SERIES_LINKS } from "@/data/series";

/**
 * The title sequence.
 *
 * A key-art poster that plays itself in: ember, then her, then the lettering
 * out of the mist, then the words. Afterwards nothing stops — the fog keeps
 * drifting, the ember keeps wavering — but everything stays small enough that
 * the page reads as a photograph rather than as a screensaver.
 *
 * Layers are stacked rather than blended, because blending is confined to the
 * nearest stacking context and every one of these layers transforms.
 */

/** Pointer parallax, in pixels at full deflection. Restraint is the point. */
const DRIFT = { ember: 12, title: 5, portrait: 8 };

const parallax = (px: number, py = px * 0.75) => ({
  transform: `translate3d(calc(var(--aw-mx, 0) * ${px}px), calc(var(--aw-my, 0) * ${py}px), 0)`,
});

const SeriesHero = () => {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  // Scroll: the layers part company slightly, the air clears, the dark closes in.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const emberY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 86]);
  const airOut = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const nightfall = useTransform(scrollYProgress, [0.15, 1], [0, 0.92]);

  useEffect(() => {
    // A mouse the composition can feel. Not on touch, not when asked for stillness.
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let toX = 0;
    let toY = 0;
    let atX = 0;
    let atY = 0;

    const settle = () => {
      atX += (toX - atX) * 0.06;
      atY += (toY - atY) * 0.06;
      section.current?.style.setProperty("--aw-mx", atX.toFixed(4));
      section.current?.style.setProperty("--aw-my", atY.toFixed(4));
      frame =
        Math.abs(toX - atX) + Math.abs(toY - atY) > 0.0015 ? requestAnimationFrame(settle) : 0;
    };

    const onMove = (event: PointerEvent) => {
      toX = (event.clientX / window.innerWidth - 0.5) * 2;
      toY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(settle);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  /** Phase four: the words arrive once the picture has settled. */
  const word = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  return (
    <section
      ref={section}
      className="aw-hero relative isolate flex w-full flex-col items-center overflow-hidden px-5 pb-14 pt-10 text-center lg:block lg:px-0 lg:pb-0 lg:pt-0 lg:text-left"
    >
      {/* ── The air behind everything ──────────────────────────────── */}
      <motion.span
        aria-hidden
        style={{ y: emberY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <span className="aw-ember" style={parallax(DRIFT.ember)} />
      </motion.span>

      <motion.span aria-hidden style={{ opacity: airOut }} className="pointer-events-none absolute inset-0 z-0">
        <Fog depth="back" />
      </motion.span>

      {/* ── The title, out of the mist ─────────────────────────────── */}
      <motion.div
        style={{ y: titleY }}
        className="aw-hero-title relative z-10 w-full max-w-[24rem]"
      >
        <div style={parallax(DRIFT.title)}>
          <h1 className="aw-title-breathe m-0">
            <img
              src="/image/series/hero/title.webp"
              alt={SERIES.title}
              width={1672}
              height={941}
              fetchPriority="high"
              decoding="async"
              className="aw-title-art w-full"
            />
          </h1>
        </div>
      </motion.div>

      {/* Mist passing in front of the lettering, still behind her. */}
      <motion.span aria-hidden style={{ opacity: airOut }} className="pointer-events-none absolute inset-0 z-20">
        <Fog depth="middle" />
      </motion.span>

      {/* ── Dasha ──────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: portraitY }}
        className="aw-hero-portrait relative z-30 -mt-1 w-[88%] max-w-[21rem] lg:mt-0"
      >
        <div style={parallax(DRIFT.portrait)}>
          <div className="aw-portrait-enter">
            <div className="aw-portrait-breathe relative">
              {/* Her own silhouette, blurred and warmed: light can only catch her edges. */}
              <img
                src="/image/series/hero/dasha.webp"
                alt=""
                aria-hidden
                width={1338}
                height={1175}
                decoding="async"
                className="aw-portrait-art aw-rimlight absolute inset-0 h-full w-full scale-[1.012]"
              />
              <img
                src="/image/series/hero/dasha.webp"
                alt=""
                aria-hidden
                width={1338}
                height={1175}
                fetchPriority="high"
                decoding="async"
                className="aw-portrait-art relative w-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* The lowest, faintest layer — kept to the floor, never across her face. */}
      <motion.span aria-hidden style={{ opacity: airOut }} className="pointer-events-none absolute inset-0 z-40">
        <Fog depth="front" />
      </motion.span>

      {/* ── Grade ──────────────────────────────────────────────────── */}
      <svg aria-hidden focusable="false" className="aw-film z-[45]" preserveAspectRatio="none">
        <defs>
          <filter id="aw-grain-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#aw-grain-filter)" />
      </svg>
      <span aria-hidden className="aw-vignette z-[45]" />
      <motion.span
        aria-hidden
        style={{ opacity: nightfall }}
        className="pointer-events-none absolute inset-0 z-[46]"
      >
        <span className="absolute inset-0" style={{ background: "#080506" }} />
      </motion.span>

      {/* ── The words ──────────────────────────────────────────────── */}
      <div className="aw-hero-words relative z-50 mt-10 flex w-full max-w-sm flex-col items-center lg:mt-0 lg:max-w-none lg:items-start">
        <motion.p
          {...word(2.6)}
          className="aw-display text-lg italic leading-relaxed sm:text-xl"
          style={{ color: "var(--aw-ivory-soft)" }}
        >
          She came for one day. Some secrets were waiting for her.
        </motion.p>

        <motion.div
          {...word(2.95)}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <a
            href={SERIES_LINKS.youtubeEpisodeOne}
            className="aw-label aw-cta-solid w-full px-7 py-3.5 sm:w-auto"
          >
            Watch the series
          </a>
          <a href="#archives" className="aw-label aw-cta-ghost w-full px-6 py-3.5 sm:w-auto">
            Explore Alderwick
          </a>
        </motion.div>
      </div>

      <motion.p
        {...word(3.4)}
        className="aw-hero-cue relative z-50 mt-12 text-[11px] uppercase tracking-[0.3em] lg:mt-0"
        style={{ color: "var(--aw-ivory-faint)" }}
      >
        Your story begins here
      </motion.p>
    </section>
  );
};

export default SeriesHero;
