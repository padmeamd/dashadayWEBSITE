import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

import { LATEST_RELEASE } from "@/data/latestRelease";
import vinylRecord from "@/assets/vinyl-record.png";

/**
 * The newest release, given the top of the page.
 *
 * It sits directly under the hero because a release is news, and news goes
 * first. Everything it says comes from the release data; it claims no date,
 * because the stores have not published one.
 */

const NewSingleSection = () => {
  const reduced = useReducedMotion();
  const release = LATEST_RELEASE;
  const [playing, setPlaying] = useState(false);
  const primary = release.platforms.find((p) => p.primary);
  const others = release.platforms.filter((p) => !p.primary);

  const rise = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  return (
    <section className="section-cinematic bg-night py-16 sm:py-24" aria-labelledby="new-single-title">
      <div className="section-container">
        <div className="grid items-center gap-10 sm:gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          {/* ── The sleeve, with the record behind it ────────────────── */}
          <motion.a
            {...rise()}
            href={primary?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto block aspect-square w-full max-w-[26rem] no-underline md:max-w-none"
            aria-label={`Listen to ${release.title} on ${primary?.label}`}
          >
            {/* The record slides a little further out when approached, the way
                one does when you pull it from the sleeve. */}
            {/* Positioned explicitly rather than by transform percentages.
                It leans out of the top-right corner: the gap to the text
                column is narrow, but the space above the sleeve is free, so
                that is where the record is allowed to show itself. */}
            <span
              aria-hidden
              className="absolute left-[24%] top-[-6%] h-[84%] w-[84%] transition-[top] duration-[1100ms] ease-out group-hover:top-[-11%] motion-reduce:transition-none"
            >
              <motion.span
                className="block h-full w-full"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <img src={vinylRecord} alt="" className="h-full w-full object-contain" />
              </motion.span>
            </span>

            <span className="relative z-10 block h-full w-full overflow-hidden">
              <img
                src={release.cover}
                alt={release.coverAlt}
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 border border-ivory/10 transition-colors duration-700 group-hover:border-gold/40"
              />
            </span>
          </motion.a>

          {/* ── The announcement ─────────────────────────────────────── */}
          <div>
            <motion.p {...rise(0.08)} className="font-sans text-[11px] uppercase tracking-[0.34em] text-gold/70">
              New {release.kind.toLowerCase()} · Out now
            </motion.p>

            <motion.h2
              {...rise(0.14)}
              id="new-single-title"
              className="mt-5 font-serif text-[clamp(2.6rem,9vw,5rem)] leading-[0.95] text-ivory"
            >
              {release.title}
            </motion.h2>

            <motion.p {...rise(0.2)} className="mt-6 max-w-[52ch] text-[1.02rem] leading-[1.8] text-ivory/60">
              {release.blurb}
            </motion.p>

            {/* One button for the main door, the rest as a quiet row. Five
                buttons of equal weight would be a wall, not a choice. */}
            <motion.div {...rise(0.26)} className="mt-9">
              {primary && (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ivory px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-night no-underline transition-colors hover:bg-gold"
                >
                  Listen on {primary.label}
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              )}

              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                {others.map((platform) => (
                  <li key={platform.label}>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-b border-ivory/20 pb-1 font-sans text-[11px] uppercase tracking-[0.22em] text-ivory/65 no-underline transition-colors hover:border-gold/60 hover:text-gold"
                    >
                      {platform.label}
                      <ArrowUpRight size={11} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {release.moreComing && (
              <motion.p {...rise(0.32)} className="mt-6 font-sans text-xs tracking-[0.14em] text-ivory/35">
                Rolling out to the other stores shortly.
              </motion.p>
            )}
          </div>
        </div>

        {/* ── The official video ───────────────────────────────────────
            A still with a play button until it is wanted: YouTube loads
            nothing — no iframe, no cookies, no third-party request — until
            someone actually asks to watch. */}
        <motion.div {...rise(0.1)} className="mt-16 sm:mt-24">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.34em] text-gold/70">
            The official video
          </h3>

          <div className="relative mt-6 aspect-video w-full overflow-hidden bg-night-soft">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${release.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={release.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group/play absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
                aria-label={`Play ${release.video.title}`}
              >
                <img
                  src={release.video.poster}
                  alt=""
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover/play:scale-[1.02] motion-reduce:transform-none"
                />
                <span aria-hidden className="absolute inset-0 bg-night/25 transition-colors duration-500 group-hover/play:bg-night/10" />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-night/55 backdrop-blur-sm transition-colors duration-500 group-hover/play:border-gold/70 sm:h-20 sm:w-20"
                >
                  <Play className="ml-0.5 h-6 w-6 text-ivory sm:h-7 sm:w-7" strokeWidth={1.25} />
                </span>
              </button>
            )}
          </div>

          <p className="mt-4 font-sans text-xs tracking-[0.14em] text-ivory/35">
            <a
              href={release.video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors hover:text-ivory/70"
            >
              Watch on YouTube ↗
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewSingleSection;
