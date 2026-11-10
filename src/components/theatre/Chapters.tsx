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
 * Each one is printed into the playbill parchment. The still sits in the
 * window the frame leaves, and the type is real HTML over the top — so it can
 * be read, selected, translated and searched, which it could not be if it were
 * baked into the image.
 */

const Chapters = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="chapters"
      className="relative px-4 py-24 sm:px-8 sm:py-32"
      style={{ background: "var(--tf-black)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="tf-label">The programme</p>
          <h2 className="tf-display mt-5 text-3xl uppercase tracking-[0.12em] sm:text-4xl">
            The chapters
          </h2>
          <p
            className="tf-display mt-4 text-lg italic"
            style={{ color: "var(--tf-ivory-soft)" }}
          >
            Every story leaves something behind.
          </p>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {EPISODES.map((episode, n) => (
            <motion.li
              key={episode.id}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: n * 0.06, ease: [0.2, 0.7, 0.2, 1] as const }}
              className="tf-playbill"
            >
              <article className="relative">
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

                {/* The frame is printed with two blank windows — a tall one
                    and a short one under the carved divider. Measured off the
                    artwork: the upper runs 8%–64% of the height, the lower
                    71%–92%, both inset to 11% on either side. Content is laid
                    into those, not over the moulding. */}
                <div className="absolute inset-x-[11%] top-[8%] bottom-[36%] flex flex-col">
                  <p
                    className="text-center text-[0.56rem] uppercase tracking-[0.3em]"
                    style={{ color: "#7a5733" }}
                  >
                    Chapter {episode.number}
                  </p>

                  <div
                    className="mt-2 overflow-hidden border"
                    style={{ borderColor: "rgba(107, 75, 42, 0.5)" }}
                  >
                    <img
                      src={episode.still?.src ?? `/image/series/episodes/${episode.id}.jpg`}
                      alt={episode.still?.alt ?? `A still from Chapter ${episode.number}`}
                      width={episode.still?.width}
                      height={episode.still?.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover"
                      style={{ filter: "sepia(0.2) contrast(1.05)" }}
                    />
                  </div>

                  <h3
                    className="tf-display mt-3 text-center text-[1.2rem] leading-tight"
                    style={{ color: "#3c2616" }}
                  >
                    {episode.title ?? `Chapter ${episode.number}`}
                  </h3>
                  <p
                    className="mt-1.5 text-center text-[0.54rem] uppercase tracking-[0.2em]"
                    style={{ color: "#7a5733" }}
                  >
                    {episode.statusLabel}
                  </p>

                  {episode.description && (
                    <p
                      className="mt-2 overflow-hidden text-center text-[0.72rem] leading-[1.5]"
                      style={{
                        color: "#5c432c",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {episode.description}
                    </p>
                  )}
                </div>

                <div className="absolute inset-x-[11%] bottom-[8%] top-[71%] flex flex-col items-center justify-center text-center">
                  {episode.availability && (
                    <p
                      className="text-[0.56rem] uppercase leading-[1.7] tracking-[0.14em]"
                      style={{ color: "#7a5733" }}
                    >
                      {episode.availability}
                    </p>
                  )}
                  <a
                    href={episode.cta?.href ?? SERIES_LINKS.telegram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-flex items-center gap-1.5 border-b text-[0.6rem] uppercase tracking-[0.22em] transition-opacity hover:opacity-70"
                    style={{ color: "#5a1f28", borderColor: "rgba(90, 31, 40, 0.5)" }}
                  >
                    {episode.cta?.label ?? "Where to watch"}
                    <ArrowUpRight className="h-3 w-3" aria-hidden />
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
