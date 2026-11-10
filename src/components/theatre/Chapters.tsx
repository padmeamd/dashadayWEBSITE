import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { STAGE } from "@/data/theatre";
import { EPISODES, SERIES_LINKS } from "@/data/series";

/**
 * SCENE FOUR — the chapters.
 *
 * The still is the card. A flat cut-card frame lies over its edges — the same
 * 16:9 as the picture, so it follows the border exactly and takes nothing out
 * of the middle — and every word sits in HTML underneath, where it can be
 * read, selected, translated and edited.
 *
 * The heavy printed playbill this replaced put the type inside the artwork.
 * It looked the part and fought everything else: masks and gold crowding the
 * picture, a synopsis squeezed into a window that could not grow, and text
 * that a reader could not select or a translator reach.
 *
 * Everything shown comes from data/series.ts. Nothing here invents a chapter,
 * a status or a date.
 */

const Chapters = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="chapters"
      className="relative px-4 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14"
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

        {/* Flex, not grid: a trailing row of two then centres itself under
            three instead of hanging off to the left. */}
        <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-14">
          {EPISODES.map((episode, n) => (
            <motion.li
              key={episode.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: n * 0.06, ease: [0.2, 0.7, 0.2, 1] as const }}
              className="w-full max-w-[23rem] sm:w-[21rem] lg:w-[22.5rem]"
            >
              <article className="tf-card flex h-full flex-col">
                <div className="tf-card-plate relative aspect-video w-full overflow-hidden">
                  <img
                    src={episode.still?.src ?? `/image/series/episode-${episode.number}.jpg`}
                    alt={episode.still?.alt ?? `A still from Chapter ${episode.number}`}
                    width={episode.still?.width}
                    height={episode.still?.height}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* The frame is the same 16:9 as the plate, so inset-0 lays
                      its band exactly along the picture's edges. */}
                  <img
                    src={STAGE.paperFrame.src}
                    width={STAGE.paperFrame.width}
                    height={STAGE.paperFrame.height}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  />
                </div>

                <div className="flex flex-1 flex-col px-1 pt-6">
                  <p className="tf-label text-[0.72rem]">
                    Chapter {episode.number}
                  </p>

                  <h3 className="tf-display mt-3 text-[1.5rem] leading-tight">
                    {episode.title ?? `Chapter ${episode.number}`}
                  </h3>

                  <p
                    className="mt-2 text-[0.76rem] font-medium uppercase tracking-[0.16em]"
                    style={{ color: "var(--tf-gold-bright)" }}
                  >
                    {episode.statusLabel}
                  </p>

                  {episode.description && (
                    <p
                      className="mt-4 text-[0.95rem] leading-[1.75]"
                      style={{ color: "var(--tf-ivory-soft)" }}
                    >
                      {episode.description}
                    </p>
                  )}

                  {episode.availability && (
                    <p
                      className="mt-4 text-[0.8rem] leading-[1.6]"
                      style={{ color: "var(--tf-ivory-faint)" }}
                    >
                      {episode.availability}
                    </p>
                  )}

                  {/* The release history, said plainly. A chapter can open for
                      members, reach Telegram and reach YouTube on three
                      different days, and one status line cannot hold that. */}
                  {episode.schedule && episode.schedule.length > 0 && (
                    <ol className="mt-4 space-y-1.5">
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

                  {/* mt-auto pins the link to the foot of the card, so the
                      links line up across a row whatever length the synopsis
                      above them runs to. */}
                  <a
                    href={episode.cta?.href ?? SERIES_LINKS.telegram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tf-card-link mt-auto inline-flex items-center gap-2 self-start border-b pb-1 pt-6 text-[0.76rem] font-medium uppercase tracking-[0.18em]"
                  >
                    {episode.cta?.label ?? "Where to watch"}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Chapters;
