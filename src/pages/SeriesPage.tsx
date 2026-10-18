import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Seo from "@/components/Seo";
import Crest from "@/components/alderwick/Crest";
import Invitation from "@/components/alderwick/Invitation";
import Plate from "@/components/alderwick/Plate";
import Characters from "@/components/alderwick/Characters";
import SeriesHero from "@/components/alderwick/SeriesHero";
import LostSocieties from "@/components/alderwick/LostSocieties";
import Societies from "@/components/alderwick/Societies";
import { VESPER_CLUES } from "@/data/alderwick";
import {
  EPISODES,
  MEMBERSHIP,
  GUIDE,
  SERIES,
  SERIES_LINKS,
  SERIES_UPDATES,
} from "@/data/series";
import "@/styles/alderwick.css";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] as const },
});

const Ornament = () => (
  <div className="aw-rule-ornament my-10">
    <span className="aw-diamond" aria-hidden />
  </div>
);

const SeriesPage = () => {
  const [clue, setClue] = useState(-1);

  return (
    <main className="alderwick relative min-h-screen overflow-x-hidden">
      <Seo />
      <Invitation />

      <SeriesHero />

      {/* ── The story ─────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div {...rise()}>
          <p className="aw-label">A university with secrets</p>
          <Ornament />
          <p className="aw-display text-2xl leading-[1.5] sm:text-[1.75rem]">
            Dasha arrives at the prestigious Alderwick University for a single day, to decide
            whether she belongs there.
          </p>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
            <p>
              An unexpected connection with an enigmatic orchestra conductor changes everything.
            </p>
            <p>
              As she explores the university, she discovers an unsettling ability — to witness
              events happening elsewhere, at that very moment.
            </p>
            <p>
              And beneath Alderwick's ancient walls, a secret society called Vesper has been
              waiting for her arrival. An old prophecy suggests she may either destroy it, or
              begin something far greater.
            </p>
          </div>
        </motion.div>
      </section>

      <Societies />
      <LostSocieties />
      <Characters />

      {/* ── The archive ───────────────────────────────────────────────── */}
      <section id="archives" className="relative px-5 py-20 sm:px-8 sm:py-24" style={{ background: "var(--aw-walnut)" }}>
        <div className="mx-auto max-w-4xl">
          <motion.div {...rise()} className="text-center">
            <h2 className="aw-display text-3xl uppercase tracking-[0.08em] sm:text-4xl">
              The Alderwick Archives
            </h2>
            <p className="aw-display mt-3 text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
              Every story leaves something behind.
            </p>
          </motion.div>

          <div className="mt-12 space-y-10">
            {EPISODES.map((episode, n) => (
              <motion.article
                key={episode.id}
                {...rise(n * 0.05)}
                className="grid gap-6 border-t pt-8 sm:grid-cols-[1.1fr_1.4fr]"
                style={{ borderColor: "var(--aw-rule)" }}
              >
                <Plate
                  src={`/image/series/episodes/${episode.id}.jpg`}
                  alt={`A still from ${episode.title}`}
                  caption={`Chapter ${episode.number} — still to come`}
                  className="aspect-video w-full object-cover"
                />
                <div>
                  <p className="aw-label">
                    Chapter {episode.number} · {episode.statusLabel}
                  </p>
                  <h3 className="aw-display mt-3 text-2xl">{episode.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--aw-ivory-soft)" }}>
                    {episode.description}
                  </p>
                  {episode.availability && (
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--aw-ivory-faint)" }}>
                      {episode.availability}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Whispers ──────────────────────────────────────────────────── */}
      <section id="whispers" className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <motion.div {...rise()}>
          <h2 className="aw-display text-3xl uppercase tracking-[0.08em] sm:text-4xl">
            Whispers from Alderwick
          </h2>
          <p className="aw-display mt-3 text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Not everything stays hidden behind these walls.
          </p>
        </motion.div>

        <div className="mt-10 space-y-7">
          {SERIES_UPDATES.map((update, n) => (
            <motion.article
              key={update.date + update.title}
              {...rise(n * 0.05)}
              className="border-l pl-6"
              style={{ borderColor: "var(--aw-rule)" }}
            >
              <time dateTime={update.date} className="aw-label">
                {update.label}
              </time>
              <h3 className="aw-display mt-2 text-xl">{update.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--aw-ivory-soft)" }}>
                {update.body}
              </p>
              {update.link && (
                <a
                  href={update.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--aw-gold)" }}
                >
                  {update.link.label}
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Vesper ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 py-24 text-center sm:px-8">
        <span className="aw-dust" aria-hidden />
        <motion.div {...rise()} className="relative mx-auto max-w-xl">
          <h2 className="aw-display text-4xl uppercase tracking-[0.3em]">Vesper</h2>
          <p className="aw-display mt-4 text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            The university remembers what others forget.
          </p>

          <button
            type="button"
            onClick={() => setClue((c) => Math.min(c + 1, VESPER_CLUES.length - 1))}
            className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              background: "radial-gradient(circle at 36% 30%, #8a1a33 0%, #650f25 52%, #45091a 100%)",
              outlineColor: "var(--aw-gold)",
            }}
            aria-label="Press the seal to uncover an inscription"
          >
            <Crest className="h-14 w-14 opacity-80" />
          </button>

          {clue >= 0 && (
            <motion.figure
              key={clue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-8"
            >
              <blockquote className="aw-display text-xl italic" style={{ color: "var(--aw-ivory)" }}>
                “{VESPER_CLUES[clue].inscription}”
              </blockquote>
              <figcaption className="aw-label mt-3 opacity-70">{VESPER_CLUES[clue].source}</figcaption>
            </motion.figure>
          )}

          {clue < VESPER_CLUES.length - 1 && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--aw-ivory-faint)" }}>
              {clue < 0 ? "Press the seal" : "Press again"}
            </p>
          )}
        </motion.div>
      </section>

      {/* ── The sound, the gates, the guide ───────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <motion.div {...rise()}>
          <h2 className="aw-display text-3xl uppercase tracking-[0.08em]">The sound of Alderwick</h2>
          <p className="mt-4 leading-relaxed" style={{ color: "var(--aw-ivory-soft)" }}>
            The series grew out of the album <em>{SERIES.title}</em> — every chapter is scored with
            music written for it.
          </p>
          <a
            href="https://open.spotify.com/album/1ROwGXAQFQnqVBL0n3cI4E"
            className="aw-label mt-5 inline-flex items-center gap-2 border-b pb-1"
            style={{ borderColor: "var(--aw-rule)" }}
          >
            Listen to the album <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>

        <Ornament />

        <motion.div {...rise(0.05)}>
          <h2 className="aw-display text-3xl uppercase tracking-[0.08em]">Beyond the gates</h2>
          <p className="aw-display mt-3 text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Some stories are revealed before the rest of the world sees them.
          </p>
          <ul className="mt-5 space-y-2 text-sm" style={{ color: "var(--aw-ivory-soft)" }}>
            {MEMBERSHIP.benefits.slice(0, 4).map((benefit: string) => (
              <li key={benefit}>— {benefit}</li>
            ))}
          </ul>
          <a
            href={SERIES_LINKS.membership}
            className="aw-label mt-6 inline-block px-7 py-3.5"
            style={{ background: "var(--aw-oxblood)", color: "var(--aw-ivory)" }}
          >
            Join — {MEMBERSHIP.price} {MEMBERSHIP.priceInterval}
          </a>
        </motion.div>

        <Ornament />

        <motion.div {...rise(0.1)}>
          <h2 className="aw-display text-2xl uppercase tracking-[0.08em]">{GUIDE.guideTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--aw-ivory-soft)" }}>
            {GUIDE.subtitle}. The series is made independently, with AI filmmaking tools and
            ordinary editing craft.
          </p>
          <a
            href={GUIDE.cta.href}
            className="aw-label mt-4 inline-flex items-center gap-2 border-b pb-1"
            style={{ borderColor: "var(--aw-rule)" }}
          >
            {GUIDE.cta.label} <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>

        <div className="mt-20 text-center">
          <Link to="/" className="aw-label inline-flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to DashaDay
          </Link>
        </div>
      </section>

    </main>
  );
};

export default SeriesPage;
