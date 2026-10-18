import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SOCIETIES } from "@/data/societies";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, type QuizOutcome } from "@/data/societyQuiz";
import { SERIES_LINKS, SERIES_ROUTE, societyRoute } from "@/data/series";
import { drawResultCard, saveResultCard } from "@/lib/societyCard";

/**
 * The sorting.
 *
 * Twelve questions, one at a time, then a single cinematic reveal. The whole
 * run lives in component state: no account, no storage, nothing sent anywhere.
 *
 * The questions advance on choice rather than on a separate "next" press —
 * one decision per screen is the whole point — but the visitor can always
 * step back, and the scoring is a pure function of the answers, so stepping
 * back and changing one costs nothing.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

type Stage = "intro" | "asking" | "result";

const SocietyQuiz = () => {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveNote, setSaveNote] = useState<string | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const question = QUIZ_QUESTIONS[index];
  const progress = (index + (stage === "result" ? 1 : 0)) / QUIZ_QUESTIONS.length;

  const primary = useMemo(
    () => (outcome ? SOCIETIES.find((s) => s.id === outcome.primary)! : null),
    [outcome],
  );
  const secondary = useMemo(
    () => (outcome?.secondary ? SOCIETIES.find((s) => s.id === outcome.secondary)! : null),
    [outcome],
  );

  const choose = useCallback(
    (answerId: string) => {
      const next = { ...picks, [question.id]: answerId };
      setPicks(next);

      if (index + 1 < QUIZ_QUESTIONS.length) {
        setIndex(index + 1);
        return;
      }
      setOutcome(scoreQuiz(next));
      setStage("result");
    },
    [index, picks, question],
  );

  const restart = () => {
    setPicks({});
    setIndex(0);
    setOutcome(null);
    setSaveNote(null);
    setStage("intro");
  };

  const onSave = async () => {
    if (!primary || !outcome) return;
    setSaving(true);
    setSaveNote(null);
    try {
      const node = canvas.current;
      if (!node) return;
      await drawResultCard(node, {
        society: primary,
        archetype: primary.archetype,
        line: primary.signatureLine,
        secondary: secondary?.name ?? null,
      });
      setSaveNote(await saveResultCard(node, `alderwick-${primary.slug}.png`));
    } catch {
      setSaveNote("The card could not be prepared in this browser.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 sm:px-8">
      {/* The card is drawn here and never shown; only the file leaves. */}
      <canvas ref={canvas} width={1080} height={1920} className="hidden" aria-hidden />

      <AnimatePresence mode="wait">
        {/* ── Before ──────────────────────────────────────────────── */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.7 }}
            className="py-6 text-center"
          >
            <p className="aw-label">Alderwick University</p>
            <h1 className="aw-display mt-5 text-[clamp(1.9rem,5.2vw,3rem)] uppercase leading-[1.1] tracking-[0.04em]">
              Which Alderwick Society
              <span className="block">would choose you?</span>
            </h1>
            <p className="aw-display mx-auto mt-5 max-w-md text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
              Your answers may reveal more than you intended.
            </p>

            <span aria-hidden className="aw-rule-ornament mx-auto mt-9 max-w-xs">
              <span className="aw-diamond" />
            </span>

            <p className="mx-auto mt-8 max-w-md text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
              Twelve questions. Nothing is recorded, nothing is sent, and no name is asked for.
            </p>

            <button type="button" onClick={() => setStage("asking")} className="aw-label aw-cta-solid mt-9 px-8 py-4">
              Begin
            </button>
          </motion.div>
        )}

        {/* ── During ──────────────────────────────────────────────── */}
        {stage === "asking" && (
          <motion.div
            key={question.id}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="py-6"
          >
            {/* Progress: a number and a hairline, nothing more. */}
            <div className="flex items-baseline justify-between">
              <span className="aw-label opacity-70">
                {ROMAN[index]} of {ROMAN[QUIZ_QUESTIONS.length - 1]}
              </span>
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="aw-label opacity-55 transition-opacity hover:opacity-100 disabled:invisible"
              >
                Back
              </button>
            </div>
            <div className="mt-3 h-px w-full" style={{ background: "var(--aw-rule-faint)" }}>
              <motion.div
                className="h-px"
                style={{ background: "var(--aw-gold)" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.5 }}
              />
            </div>

            <h2 className="aw-display mt-10 text-[clamp(1.3rem,3.4vw,1.75rem)] leading-[1.45]" aria-live="polite">
              {question.prompt}
            </h2>

            <ul className="mt-9 space-y-3">
              {question.answers.map((answer) => {
                const chosen = picks[question.id] === answer.id;
                return (
                  <li key={answer.id}>
                    <button
                      type="button"
                      onClick={() => choose(answer.id)}
                      aria-pressed={chosen}
                      className="aw-answer w-full px-5 py-4 text-left text-[0.97rem] leading-relaxed"
                      style={chosen ? { borderColor: "var(--aw-gold)" } : undefined}
                    >
                      {answer.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* ── After ───────────────────────────────────────────────── */}
        {stage === "result" && primary && outcome && (
          <motion.div
            key="result"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="py-6 text-center"
          >
            <motion.img
              src={primary.crest}
              alt={`${primary.name} — ${primary.symbolDescription}`}
              width={591}
              height={600}
              initial={reduced ? false : { opacity: 0, scale: 1.08, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: reduced ? 0 : 0.2, ease: [0.25, 0.6, 0.2, 1] }}
              className="mx-auto h-36 w-36 object-contain sm:h-44 sm:w-44"
            />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: reduced ? 0 : 1 }}
            >
              <p className="aw-label mt-6">{primary.identity}</p>
              <h1 className="aw-display mt-3 text-[clamp(1.9rem,5.4vw,3rem)] uppercase tracking-[0.05em]">
                {primary.name}
              </h1>
              <p className="aw-display mt-2 text-xl italic" style={{ color: "var(--aw-ivory-soft)" }}>
                {primary.archetype}
              </p>

              <span aria-hidden className="aw-rule-ornament mx-auto mt-7 max-w-xs">
                <span className="aw-diamond" />
              </span>

              <p className="aw-display mx-auto mt-7 max-w-lg text-[1.3rem] italic leading-[1.45]">
                “{primary.signatureLine}”
              </p>

              <p className="mx-auto mt-7 max-w-xl text-[1.01rem] leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
                {QUIZ_RESULTS[outcome.primary]}
              </p>

              <div className="mx-auto mt-11 grid max-w-xl gap-8 text-left sm:grid-cols-2">
                <div>
                  <p className="aw-label">Your qualities</p>
                  <p className="mt-3 text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                    {primary.traits.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="aw-label">Where it turns</p>
                  <p className="mt-3 text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                    {primary.shadow.join(" · ")}
                  </p>
                </div>
              </div>

              {secondary && (
                <p className="mx-auto mt-10 max-w-lg text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                  <span className="aw-label">A second hand on the door · </span>
                  {secondary.name} recognised something in your answers as well. Few people
                  belong entirely to one house.
                </p>
              )}

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3.5">
                <button type="button" onClick={onSave} disabled={saving} className="aw-label aw-cta-solid px-7 py-3.5">
                  {saving ? "Preparing…" : "Save your card"}
                </button>
                <Link to={societyRoute(primary.slug)} className="aw-label aw-cta-ghost px-6 py-3.5 no-underline">
                  Read the full record
                </Link>
                <button type="button" onClick={restart} className="aw-label aw-cta-ghost px-6 py-3.5">
                  Answer again
                </button>
              </div>

              {saveNote && (
                <p className="mt-5 text-xs" style={{ color: "var(--aw-ivory-faint)" }} role="status">
                  {saveNote}
                </p>
              )}

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                <a href={SERIES_LINKS.youtubeEpisodeOne} className="aw-label border-b pb-1" style={{ borderColor: "var(--aw-rule)" }}>
                  Watch the series
                </a>
                <Link to={SERIES_ROUTE} className="aw-label border-b pb-1 no-underline" style={{ borderColor: "var(--aw-rule)" }}>
                  Enter Alderwick
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocietyQuiz;
