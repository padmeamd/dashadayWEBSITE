import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Seo from "@/components/Seo";
import { societyBySlug } from "@/data/societies";
import { SERIES_LINKS, SERIES_ROUTE, SOCIETY_QUIZ_ROUTE } from "@/data/series";
import "@/styles/alderwick.css";

/**
 * One society's record, opened.
 *
 * A single component renders all three: everything that differs between them
 * — palette, emblem, copy, standing — comes from the registry, so adding a
 * fourth society later is a data change and nothing else.
 *
 * Each house dresses the page in its own colours by overriding the Alderwick
 * tokens on the wrapper, which keeps the three visually distinct without
 * forking the stylesheet three ways.
 */

const SocietyPage = () => {
  const { slug } = useParams();
  const society = societyBySlug(slug);
  const reduced = useReducedMotion();

  // An address that names no society is not a page; send it to the archive.
  if (!society) return <Navigate to={SERIES_ROUTE} replace />;

  const { palette } = society;
  const rise = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  return (
    <main
      className="alderwick relative min-h-screen overflow-x-hidden"
      style={
        {
          background: palette.ground,
          "--aw-black": palette.ground,
          "--aw-gold": palette.accent,
          "--aw-ivory": palette.text,
          "--aw-ivory-soft": palette.textSoft,
          "--aw-rule": `${palette.accent}4d`,
          "--aw-rule-faint": `${palette.accent}26`,
        } as React.CSSProperties
      }
    >
      <Seo />

      {/* ── The record opens ───────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-16 pt-14 text-center sm:px-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(62% 48% at 50% 18%, ${palette.accent}1f 0%, transparent 72%)`,
          }}
        />
        <span className="aw-dust" aria-hidden />

        <div className="relative mx-auto max-w-3xl">
          <Link
            to={SERIES_ROUTE}
            className="aw-label inline-flex items-center gap-2 no-underline opacity-75 transition-opacity hover:opacity-100"
          >
            <ArrowLeft size={13} aria-hidden /> The Alderwick archive
          </Link>

          <motion.div {...rise()} className="mt-10">
            <img
              src={society.crest}
              alt={`${society.name} — ${society.symbolDescription}`}
              width={591}
              height={600}
              className="mx-auto h-40 w-40 object-contain sm:h-48 sm:w-48"
            />

            <p className="aw-label mt-6">{society.identity}</p>
            <h1 className="aw-display mt-4 text-[clamp(2.1rem,6vw,3.6rem)] uppercase tracking-[0.05em]">
              {society.name}
            </h1>

            <span aria-hidden className="aw-rule-ornament mx-auto mt-7 max-w-xs">
              <span className="aw-diamond" />
            </span>

            <p className="aw-display mx-auto mt-6 max-w-xl text-xl italic leading-relaxed" style={{ color: palette.textSoft }}>
              “{society.motto}”
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The registry entry ─────────────────────────────────────── */}
      <section className="relative mx-auto max-w-2xl px-5 pb-16 sm:px-8">
        <motion.div {...rise()} className="space-y-5 text-[1.02rem] leading-[1.85]" style={{ color: palette.textSoft }}>
          {society.description.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 28)}>{paragraph}</p>
          ))}
        </motion.div>
      </section>

      {/* ── Who belongs here ───────────────────────────────────────── */}
      <section className="relative px-5 py-14 sm:px-8" style={{ borderTop: "1px solid var(--aw-rule-faint)" }}>
        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2">
          <motion.div {...rise()}>
            <p className="aw-label">The archetype</p>
            <h2 className="aw-display mt-3 text-2xl">{society.archetype}</h2>
            <ul className="mt-6 space-y-2.5 text-sm" style={{ color: palette.textSoft }}>
              {society.traits.map((trait) => (
                <li key={trait} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[0.5rem] h-[4px] w-[4px] shrink-0 rotate-45" style={{ background: palette.accent }} />
                  {trait}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...rise(0.12)}>
            <p className="aw-label">What it costs</p>
            <h2 className="aw-display mt-3 text-2xl">The shadow</h2>
            <ul className="mt-6 space-y-2.5 text-sm" style={{ color: palette.textSoft }}>
              {society.shadow.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden className="mt-[0.5rem] h-[4px] w-[4px] shrink-0 rotate-45" style={{ background: palette.accent, opacity: 0.45 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── The line the society is known by ───────────────────────── */}
      <section className="relative px-5 py-16 text-center sm:px-8" style={{ borderTop: "1px solid var(--aw-rule-faint)" }}>
        <motion.blockquote {...rise()} className="mx-auto max-w-2xl">
          <p className="aw-display text-[clamp(1.5rem,4vw,2.2rem)] italic leading-[1.4]">
            “{society.signatureLine}”
          </p>
        </motion.blockquote>
      </section>

      {/* ── The catalogue's own note ───────────────────────────────── */}
      <section className="relative px-5 pb-16 sm:px-8">
        <motion.dl
          {...rise()}
          className="mx-auto grid max-w-3xl gap-x-10 gap-y-5 p-7 text-sm sm:grid-cols-2"
          style={{ border: "1px solid var(--aw-rule-faint)", background: "rgba(0, 0, 0, 0.22)" }}
        >
          <div>
            <dt className="aw-label opacity-75">Emblem</dt>
            <dd className="mt-2" style={{ color: palette.textSoft }}>{society.symbolDescription}</dd>
          </div>
          <div>
            <dt className="aw-label opacity-75">Colours</dt>
            <dd className="mt-2" style={{ color: palette.textSoft }}>{society.colourNames}</dd>
          </div>
          <div>
            <dt className="aw-label opacity-75">Standing</dt>
            <dd className="mt-2" style={{ color: palette.textSoft }}>
              {society.standing === "recognised"
                ? "Recognised by the university."
                : "Not currently recognised by the university."}
            </dd>
          </div>
          <div>
            <dt className="aw-label opacity-75">Records</dt>
            <dd className="mt-2" style={{ color: palette.textSoft }}>{society.archival}</dd>
          </div>
        </motion.dl>

        {society.hidden && (
          <motion.p {...rise(0.15)} className="aw-display mx-auto mt-8 max-w-xl text-center text-base italic opacity-70">
            {society.hidden}
          </motion.p>
        )}
      </section>

      {/* ── Back into the series ───────────────────────────────────── */}
      <section className="relative px-5 py-16 text-center sm:px-8" style={{ borderTop: "1px solid var(--aw-rule-faint)" }}>
        <motion.div {...rise()} className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4">
          <Link to={SOCIETY_QUIZ_ROUTE} className="aw-label aw-cta-solid px-7 py-3.5 no-underline">
            Discover your society
          </Link>
          <a href={SERIES_LINKS.youtubeEpisodeOne} className="aw-label aw-cta-ghost px-6 py-3.5">
            Watch the series
          </a>
          <Link to={SERIES_ROUTE} className="aw-label aw-cta-ghost px-6 py-3.5 no-underline">
            Enter Alderwick
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default SocietyPage;
