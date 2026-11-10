import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { STAGE } from "@/data/theatre";
import { EPISODES, SERIES_LINKS } from "@/data/series";

/**
 * SCENE FOUR — the chapters.
 *
 * The episodes exactly as data/series.ts has them: same titles, same dates,
 * same links, same public and members-only rules. Nothing here invents a
 * chapter or moves a premiere; this file is a frame and the frame is all.
 *
 * Two things the artwork dictates. The playbill is printed with two blank
 * windows, and only short, fixed-length things go in them — a number, a
 * title, a status, a one-line availability note and the link. The synopsis
 * is a paragraph of unpredictable length, so it sits below the frame where
 * it can run as long as it needs to without ever touching the moulding.
 *
 * The row is flex rather than grid so that a trailing row of two centres
 * itself under three, instead of hanging off to the left.
 */

const Chapters = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="chapters"
      className="relative px-4 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20"
      style={{ background: "var(--tf-black)" }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <p className="tf-label">The programme</p>
          <h2 className="tf-display mt-4 text-3xl uppercase tracking-[0.12em] sm:text-4xl">
            The chapters
          </h2>
          <p
            className="tf-display mt-3 text-lg italic"
            style={{ color: "var(--tf-ivory-soft)" }}
          >
            Every story leaves something behind.
          </p>
        </header>

        <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-12">
          {EPISODES.map((episode, n) => (
            <motion.li
              key={episode.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: n * 0.06, ease: [0.2, 0.7, 0.2, 1] as const }}
              className="flex w-full max-w-[22rem] flex-col sm:w-[20rem] lg:w-[21.5rem]"
            >
              <article className="flex h-full flex-col">
                <div className="tf-playbill relative">
                  <img
                    src={STAGE.playbill.src}
                    width={STAGE.playbill.width}
                    height={STAGE.playbill.height}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />

                  {/* Measured off the artwork: the tall window runs 8%–64% of
                      the height, the short one under the carved divider
                      71%–92%, both inset to 11%. Only fixed-length type goes
                      in them. */}
                  <div className="absolute inset-x-[11%] top-[8%] bottom-[36%] flex flex-col">
                    <p
                      className="text-center text-[0.68rem] uppercase tracking-[0.26em]"
                      style={{ color: "#6b4a28" }}
                    >
                      Chapter {episode.number}
                    </p>

                    <div
                      className="mt-2 overflow-hidden border"
                      style={{ borderColor: "rgba(92, 64, 35, 0.55)" }}
                    >
                      <img
                        src={episode.still?.src ?? `/image/series/episode-${episode.number}.jpg`}
                        alt={episode.still?.alt ?? `A still from Chapter ${episode.number}`}
                        width={episode.still?.width}
                        height={episode.still?.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover"
                        style={{ filter: "sepia(0.18) contrast(1.05)" }}
                      />
                    </div>

                    <h3
                      className="tf-display mt-3 text-center text-[1.3rem] leading-tight"
                      style={{ color: "#33200f" }}
                    >
                      {episode.title ?? `Chapter ${episode.number}`}
                    </h3>
                    <p
                      className="mt-2 text-center text-[0.64rem] font-medium uppercase tracking-[0.2em]"
                      style={{ color: "#6b4a28" }}
                    >
                      {episode.statusLabel}
                    </p>
                  </div>

                  <div className="absolute inset-x-[11%] bottom-[8%] top-[71%] flex flex-col items-center justify-center text-center">
                    {episode.availability && (
                      <p
                        className="text-[0.64rem] uppercase leading-[1.6] tracking-[0.12em]"
                        style={{ color: "#6b4a28" }}
                      >
                        {episode.availability}
                      </p>
                    )}
                    <a
                      href={episode.cta?.href ?? SERIES_LINKS.telegram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-1.5 border-b pb-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                      style={{ color: "#51161f", borderColor: "rgba(81, 22, 31, 0.6)" }}
                    >
                      {episode.cta?.label ?? "Where to watch"}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>

                {/* Below the artwork, where a paragraph can be any length it
                    likes. `flex-1` keeps the frames level when one synopsis
                    runs longer than its neighbour's. */}
                {episode.description && (
                  <p
                    className="mt-5 text-[0.95rem] leading-[1.75]"
                    style={{ color: "var(--tf-ivory-soft)" }}
                  >
                    {episode.description}
                  </p>
                )}

                {/* The release history, said plainly. A chapter can open for
                    members, reach Telegram and reach YouTube on three
                    different days, and a single status line cannot hold that
                    — a reader looking for "where can I watch this, and since
                    when" was being asked to guess. `flex-1` sits on this,
                    the last thing in the card, so the frames stay level
                    whatever length the synopsis above it runs to. */}
                {episode.schedule && episode.schedule.length > 0 && (
                  <ol className="mt-5 flex-1 space-y-2">
                    {episode.schedule.map((entry) => (
                      <li
                        key={entry.date + entry.note}
                        className="flex gap-3 text-[0.8rem] leading-[1.5]"
                        style={{ color: "var(--tf-ivory-faint)" }}
                      >
                        <time
                          dateTime={entry.date}
                          className="shrink-0 tabular-nums"
                          style={{ color: "var(--tf-gold-bright)" }}
                        >
                          {entry.label}
                        </time>
                        <span>{entry.note}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Chapters;
