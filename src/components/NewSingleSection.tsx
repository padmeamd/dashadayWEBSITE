import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { LATEST_RELEASE } from "@/data/latestRelease";

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
          {/* ── The sleeve ───────────────────────────────────────────── */}
          <motion.a
            {...rise()}
            href={release.platforms.find((p) => p.primary)?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden no-underline"
            aria-label={`Listen to ${release.title} on ${release.platforms.find((p) => p.primary)?.label}`}
          >
            <img
              src={release.cover}
              alt={release.coverAlt}
              width={1200}
              height={1200}
              loading="lazy"
              decoding="async"
              className="w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 border border-ivory/10 transition-colors duration-700 group-hover:border-gold/40"
            />
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

            <motion.ul {...rise(0.26)} className="mt-9 flex flex-wrap items-center gap-3.5">
              {release.platforms.map((platform) => (
                <li key={platform.label}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      platform.primary
                        ? "inline-flex items-center gap-2 border border-transparent bg-ivory px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-night no-underline transition-colors hover:bg-gold"
                        : "inline-flex items-center gap-2 border border-ivory/25 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory no-underline transition-colors hover:border-gold/60 hover:text-gold"
                    }
                  >
                    {platform.primary ? "Listen on " : ""}
                    {platform.label}
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                </li>
              ))}
            </motion.ul>

            {release.moreComing && (
              <motion.p {...rise(0.32)} className="mt-6 font-sans text-xs tracking-[0.14em] text-ivory/35">
                Rolling out to the other stores shortly.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSingleSection;
