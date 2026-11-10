import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Seo from "@/components/Seo";
import LostSocieties from "@/components/alderwick/LostSocieties";
import Societies from "@/components/alderwick/Societies";

import Overture from "@/components/theatre/Overture";
import AlderwickAct from "@/components/theatre/AlderwickAct";
import Players from "@/components/theatre/Players";
import Chapters from "@/components/theatre/Chapters";
import Overture19 from "@/components/theatre/Overture19";
import SealedLetter from "@/components/theatre/SealedLetter";

import { GUIDE, SERIES_UPDATES } from "@/data/series";
import "@/styles/alderwick.css";
import "@/styles/theatre.css";

/**
 * THINGS I SHOULDN'T SAY — the series page, as a Victorian toy theatre.
 *
 * Six scenes in one performance: the curtains open, Alderwick is entered, the
 * players are met, the chapters are played, the record is heard, and the
 * invitation is broken open. The societies and the news that were already here
 * keep their place between the acts.
 *
 * Every link, date, price and chapter still comes from data/series.ts and
 * data/album.ts. This file is the running order; it decides nothing about what
 * the series contains.
 *
 * The full-screen Invitation overlay that used to open this page has been
 * retired: the curtain is now the entrance, and two sealed envelopes in a row
 * is one door too many. The envelope itself is where the brief puts it — at
 * the end, as the invitation to join.
 */

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] as const },
});

const SeriesPage = () => (
  <main className="theatre alderwick relative min-h-screen overflow-x-hidden">
    <Seo />

    <Overture />
    <AlderwickAct />
    <Players />
    <Chapters />

    {/* The societies were already part of this world; they sit between the
        chapters and the music rather than being rebuilt. */}
    <Societies />
    <LostSocieties />

    <Overture19 />

    {/* ── Whispers ──────────────────────────────────────────────────── */}
    <section
      id="whispers"
      className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8"
      style={{ background: "var(--tf-black)" }}
    >
      <motion.div {...rise()} className="text-center">
        <p className="tf-label">The noticeboard</p>
        <h2 className="tf-display mt-5 text-3xl uppercase tracking-[0.12em] sm:text-4xl">
          Whispers from Alderwick
        </h2>
      </motion.div>

      <ul className="mt-12 space-y-8">
        {SERIES_UPDATES.map((update, n) => (
          <motion.li
            key={update.date + update.title}
            {...rise(n * 0.05)}
            className="border-t pt-7"
            style={{ borderColor: "var(--tf-gold-faint)" }}
          >
            <p className="tf-label text-[0.62rem]">
              <time dateTime={update.date}>{update.label}</time>
            </p>
            <h3 className="tf-display mt-3 text-xl">{update.title}</h3>
            {update.body && (
              <p
                className="mt-3 text-[0.95rem] leading-[1.75]"
                style={{ color: "var(--tf-ivory-soft)" }}
              >
                {update.body}
              </p>
            )}
            {update.link && (
              <a
                href={update.link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="tf-label mt-4 inline-flex items-center gap-2 border-b pb-1 text-[0.62rem]"
                style={{ borderColor: "var(--tf-gold-faint)" }}
              >
                {update.link.label}
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} aria-hidden />
              </a>
            )}
          </motion.li>
        ))}
      </ul>
    </section>

    <SealedLetter />

    {/* ── Behind the creation ───────────────────────────────────────────
        Who makes this, and how. Claims kept to what can be verified: no
        budgets, no crew counts, no festivals. */}
    <section
      className="mx-auto max-w-3xl px-5 py-24 sm:px-8"
      style={{ background: "var(--tf-black)" }}
    >
      <motion.div {...rise()}>
        <p className="tf-label">Behind the creation</p>
        <h2 className="tf-display mt-4 text-2xl uppercase tracking-[0.12em]">Dasha Day</h2>

        <div
          className="mt-6 space-y-4 text-[0.95rem] leading-[1.8]"
          style={{ color: "var(--tf-ivory-soft)" }}
        >
          <p>
            Alderwick is written, directed and scored by one person. Dasha Day builds the
            story, the characters and the world, and composes the music the series is set to.
          </p>
          <p>
            It is an independent production, made with AI filmmaking tools alongside ordinary
            editing craft — the tools render the frames; the continuity, the performances on
            the page and the shape of the mystery are authored.
          </p>
        </div>

        <p className="mt-7 text-sm leading-relaxed" style={{ color: "var(--tf-ivory-soft)" }}>
          <span className="tf-display italic">{GUIDE.guideTitle}</span> — {GUIDE.subtitle}.
        </p>
        <a
          href={GUIDE.cta.href}
          target="_blank"
          rel="noreferrer noopener"
          className="tf-label mt-4 inline-flex items-center gap-2 border-b pb-1 text-[0.62rem]"
          style={{ borderColor: "var(--tf-gold-faint)" }}
        >
          {GUIDE.cta.label}
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} aria-hidden />
        </a>
      </motion.div>

      <div className="mt-20 text-center">
        <Link to="/" className="tf-label inline-flex items-center gap-2 text-[0.62rem]">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          Back to DashaDay
        </Link>
      </div>
    </section>
  </main>
);

export default SeriesPage;
