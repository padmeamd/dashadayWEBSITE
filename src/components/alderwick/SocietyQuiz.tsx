import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import { SOCIETIES } from "@/data/societies";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, type QuizOutcome } from "@/data/societyQuiz";
import { SERIES_LINKS, SERIES_ROUTE, societyRoute } from "@/data/series";
import { SITE_URL } from "@/config/site";
import { drawCertificate, drawStoryCard, handOver, shareLink } from "@/lib/initiationDocument";
import { createRoomTone } from "@/lib/roomTone";

/**
 * The initiation.
 *
 * Twelve questions, one at a time, and then a verdict delivered in the
 * society's own voice. The run lives in component state; the answers survive
 * an accidental reload through sessionStorage, but the name the visitor may
 * type on their certificate is never written anywhere — it exists only long
 * enough to be drawn onto a canvas.
 *
 * The room darkens as the questions go on. That is the only thing on the page
 * that keeps score visibly.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const SAVED = "alderwick:initiation";
const QUIZ_URL = `${SITE_URL}/things-i-shouldnt-say/discover-your-society`;

type Stage = "invitation" | "asking" | "result";

/** Answers survive a reload. The name does not; it is the visitor's. */
const restore = (): Record<string, string> => {
  try {
    const raw = sessionStorage.getItem(SAVED);
    const picks = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    // Only keep answers that still exist, in case the questions have changed.
    return Object.fromEntries(
      Object.entries(picks).filter(([q, a]) =>
        QUIZ_QUESTIONS.some((question) => question.id === q && question.answers.some((x) => x.id === a)),
      ),
    );
  } catch {
    return {};
  }
};

const SocietyQuiz = () => {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("invitation");
  const [picks, setPicks] = useState<Record<string, string>>(restore);
  const [index, setIndex] = useState(0);
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [margin, setMargin] = useState(false);
  const [sound, setSound] = useState(false);

  const canvas = useRef<HTMLCanvasElement>(null);
  const tone = useRef<ReturnType<typeof createRoomTone>>(null);
  const resultTop = useRef<HTMLDivElement>(null);

  const question = QUIZ_QUESTIONS[index];
  const answered = Object.keys(picks).length;
  const depth = stage === "result" ? 1 : answered / QUIZ_QUESTIONS.length;

  const primary = useMemo(
    () => (outcome ? SOCIETIES.find((s) => s.id === outcome.primary)! : null),
    [outcome],
  );
  const secondary = useMemo(
    () => (outcome?.secondary ? SOCIETIES.find((s) => s.id === outcome.secondary)! : null),
    [outcome],
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(SAVED, JSON.stringify(picks));
    } catch {
      // A private window that refuses storage is not a reason to stop.
    }
  }, [picks]);

  useEffect(() => () => tone.current?.dispose(), []);

  const toggleSound = () => {
    tone.current ??= createRoomTone();
    if (!tone.current) return;
    if (sound) {
      tone.current.stop();
      setSound(false);
    } else {
      void tone.current.start();
      setSound(true);
    }
  };

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

  const begin = () => {
    // A half-finished run picks up where it stopped.
    const first = QUIZ_QUESTIONS.findIndex((q) => !picks[q.id]);
    setIndex(first === -1 ? 0 : first);
    setStage("asking");
  };

  const again = () => {
    setPicks({});
    setIndex(0);
    setOutcome(null);
    setNote(null);
    setMargin(false);
    setStage("invitation");
  };

  const take = async (kind: "certificate" | "story") => {
    if (!primary || !canvas.current) return;
    setBusy(kind);
    setNote(null);
    try {
      const input = { society: primary, name, secondary: secondary?.name ?? null };
      if (kind === "certificate") {
        await drawCertificate(canvas.current, input);
        setNote(await handOver(canvas.current, `alderwick-initiation-${primary.slug}.png`, "Certificate of Initiation"));
      } else {
        await drawStoryCard(canvas.current, input);
        setNote(await handOver(canvas.current, `alderwick-${primary.slug}.png`, "My Alderwick society"));
      }
    } catch {
      setNote("This browser could not prepare the image.");
    } finally {
      setBusy(null);
    }
  };

  const share = async (text: string) => {
    setNote((await shareLink(QUIZ_URL, text)) || null);
  };

  return (
    <div
      className="aw-initiation relative mx-auto w-full max-w-2xl px-5 sm:px-8"
      style={{ "--aw-depth": depth } as React.CSSProperties}
    >
      {/* The hall darkens as Alderwick learns more. */}
      <span aria-hidden className="aw-initiation-dark" />
      <canvas ref={canvas} className="hidden" aria-hidden />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={sound}
        className="aw-label fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-3 py-2 opacity-45 transition-opacity hover:opacity-100"
        style={{ background: "rgba(10, 9, 9, 0.72)", border: "1px solid var(--aw-rule-faint)" }}
      >
        {sound ? <Volume2 size={13} aria-hidden /> : <VolumeX size={13} aria-hidden />}
        <span className="hidden sm:inline">{sound ? "Sound on" : "Sound off"}</span>
      </button>

      <AnimatePresence mode="wait">
        {/* ── The invitation ──────────────────────────────────────── */}
        {stage === "invitation" && (
          <motion.div
            key="invitation"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="py-10 text-center"
          >
            <div className="aw-letter mx-auto max-w-lg px-7 py-12 sm:px-12">
              <p className="aw-label">Alderwick University</p>

              <h1 className="aw-display mt-7 text-[clamp(1.6rem,4.4vw,2.4rem)] leading-[1.3]">
                Not everyone who enters Alderwick belongs here.
              </h1>

              <span aria-hidden className="aw-rule-ornament mx-auto mt-8 max-w-[14rem]">
                <span className="aw-diamond" />
              </span>

              <div className="mt-8 space-y-4 text-[1.02rem] leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                <p>Three societies. Three paths. One decision that may change everything.</p>
                <p>The question is not which society you would choose.</p>
              </div>

              <p className="aw-display mt-7 text-xl italic">It is which society has already chosen you.</p>

              <button type="button" onClick={begin} className="aw-label aw-cta-solid mt-10 px-8 py-4">
                {answered ? "Resume the initiation" : "Begin the initiation"}
              </button>

              <p className="mt-7 text-xs leading-relaxed" style={{ color: "var(--aw-ivory-faint)" }}>
                Twelve questions. Nothing is recorded, nothing is sent, and no name is asked for
                until you choose to give one.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── The questions ───────────────────────────────────────── */}
        {stage === "asking" && (
          <motion.div
            key={question.id}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            className="py-10"
          >
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
                animate={{ width: `${(index / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.5 }}
              />
            </div>

            <h2 className="aw-display mt-10 text-[clamp(1.3rem,3.4vw,1.8rem)] leading-[1.45]">
              {question.prompt}
            </h2>

            <ul className="mt-9 space-y-3" role="list">
              {question.answers.map((answer, n) => {
                const chosen = picks[question.id] === answer.id;
                return (
                  <li key={answer.id}>
                    <button
                      type="button"
                      onClick={() => choose(answer.id)}
                      aria-pressed={chosen}
                      className="aw-answer group w-full px-5 py-4 text-left text-[0.97rem] leading-relaxed"
                      style={chosen ? { borderColor: "var(--aw-gold)" } : undefined}
                    >
                      <span
                        aria-hidden
                        className="aw-answer-mark mr-3 inline-block"
                        style={{ color: "var(--aw-gold)" }}
                      >
                        {["i", "ii", "iii", "iv"][n]}
                      </span>
                      {answer.text}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-center text-xs italic" style={{ color: "var(--aw-ivory-faint)" }}>
              There are no wrong answers. There are answers that are noticed.
            </p>
          </motion.div>
        )}

        {/* ── The verdict ─────────────────────────────────────────── */}
        {stage === "result" && primary && outcome && (
          <motion.div
            key="result"
            ref={resultTop}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="py-10 text-center"
          >
            <motion.p
              className="aw-label"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: reduced ? 0 : 0.2 }}
            >
              Your society has chosen you
            </motion.p>

            <motion.img
              src={primary.crest}
              alt={`${primary.name} — ${primary.symbolDescription}`}
              width={591}
              height={600}
              initial={reduced ? false : { opacity: 0, scale: 1.1, filter: "blur(18px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, delay: reduced ? 0 : 0.5, ease: [0.25, 0.6, 0.2, 1] }}
              className="mx-auto mt-7 h-36 w-36 object-contain sm:h-44 sm:w-44"
            />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: reduced ? 0 : 1.4 }}
            >
              <p className="aw-label mt-6">{primary.identity}</p>
              <h1 className="aw-display mt-3 text-[clamp(1.9rem,5.4vw,3rem)] uppercase tracking-[0.05em]">
                {primary.name}
              </h1>
              <p className="aw-display mt-2 text-xl italic" style={{ color: "var(--aw-ivory-soft)" }}>
                {primary.archetype}
              </p>
              <p className="aw-display mt-4 text-base italic" style={{ color: "var(--aw-ivory-faint)" }}>
                “{primary.motto}”
              </p>

              <span aria-hidden className="aw-rule-ornament mx-auto mt-8 max-w-xs">
                <span className="aw-diamond" />
              </span>

              <p className="aw-display mx-auto mt-8 max-w-lg text-[1.35rem] italic leading-[1.45]">
                “{primary.signatureLine}”
              </p>

              <p className="mx-auto mt-7 max-w-xl text-[1.01rem] leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
                {QUIZ_RESULTS[outcome.primary]}
              </p>

              {/* ── Why, and at what cost ─────────────────────────── */}
              <div className="mx-auto mt-12 max-w-xl space-y-8 text-left">
                <section>
                  <p className="aw-label">Why they reached for you</p>
                  <p className="mt-3 text-[0.99rem] leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
                    {primary.verdict.chosen}
                  </p>
                </section>

                <section className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="aw-label">Your strengths</p>
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
                </section>

                <section style={{ borderLeft: "1px solid var(--aw-rule)", paddingLeft: "1.25rem" }}>
                  <p className="aw-label">Your fatal flaw</p>
                  <p className="aw-display mt-3 text-[1.08rem] italic leading-[1.7]">{primary.verdict.flaw}</p>
                </section>

                {secondary && (
                  <section>
                    <p className="aw-label">A second hand on the door</p>
                    <p className="mt-3 text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                      {secondary.name} recognised something in your answers as well. Few people belong
                      entirely to one house —{" "}
                      <Link to={societyRoute(secondary.slug)} className="underline underline-offset-4">
                        read their record
                      </Link>
                      .
                    </p>
                  </section>
                )}
              </div>

              {/* ── The line left hanging ─────────────────────────── */}
              <p className="aw-display mx-auto mt-14 max-w-lg text-lg italic leading-[1.6]">
                {primary.verdict.closing}
              </p>

              <p className="mt-4">
                <button
                  type="button"
                  onClick={() => setMargin((open) => !open)}
                  aria-expanded={margin}
                  className="text-base leading-none opacity-45 transition-opacity hover:opacity-90"
                  style={{ color: "var(--aw-gold)" }}
                  aria-label="A note in the margin"
                >
                  ✶
                </button>
              </p>

              <AnimatePresence>
                {margin && (
                  <motion.p
                    initial={reduced ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="aw-marginalia mx-auto mt-2 max-w-md text-[0.95rem]"
                  >
                    {primary.verdict.marginalia}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* ── The document ──────────────────────────────────── */}
              <div className="aw-letter mx-auto mt-16 max-w-lg px-6 py-10 text-left sm:px-10">
                <p className="aw-label text-center">Certificate of Initiation</p>
                <p className="mt-4 text-center text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
                  Alderwick will put a name to this, if you give it one. It is drawn on your own
                  device and never leaves it.
                </p>

                <label htmlFor="initiate-name" className="aw-label mt-8 block">
                  Name on the certificate — optional
                </label>
                <input
                  id="initiate-name"
                  value={name}
                  onChange={(event) => setName(event.target.value.slice(0, 48))}
                  placeholder="Left blank, it reads “the bearer of this document”"
                  autoComplete="off"
                  className="aw-field mt-3 w-full px-4 py-3 text-[0.97rem]"
                />

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => take("certificate")}
                    disabled={busy !== null}
                    className="aw-label aw-cta-solid px-6 py-3.5"
                  >
                    {busy === "certificate" ? "Drawing…" : "Download your letter"}
                  </button>
                  <button
                    type="button"
                    onClick={() => take("story")}
                    disabled={busy !== null}
                    className="aw-label aw-cta-ghost px-6 py-3.5"
                  >
                    {busy === "story" ? "Drawing…" : "Story card · 9:16"}
                  </button>
                </div>
              </div>

              {/* ── Passing it on ─────────────────────────────────── */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => share(`Alderwick put me in ${primary.name}. ${primary.signatureLine}`)}
                  className="aw-label aw-cta-ghost px-5 py-3"
                >
                  Share your society
                </button>
                <button
                  type="button"
                  onClick={() => share("Find out which Alderwick society would choose you.")}
                  className="aw-label aw-cta-ghost px-5 py-3"
                >
                  Challenge a friend
                </button>
                <button type="button" onClick={again} className="aw-label aw-cta-ghost px-5 py-3">
                  Discover another path
                </button>
              </div>

              {note && (
                <p className="mt-5 text-xs" style={{ color: "var(--aw-ivory-faint)" }} role="status">
                  {note}
                </p>
              )}

              {/* ── Into the series ───────────────────────────────── */}
              <div className="mt-20" style={{ borderTop: "1px solid var(--aw-rule-faint)", paddingTop: "3rem" }}>
                <h2 className="aw-display mx-auto max-w-lg text-[clamp(1.3rem,3.6vw,1.9rem)] uppercase leading-[1.3] tracking-[0.05em]">
                  Your story at Alderwick has only just begun.
                </h2>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
                  <a href={SERIES_LINKS.youtubeEpisodeOne} className="aw-label aw-cta-solid px-7 py-3.5">
                    Watch episode one
                  </a>
                  <Link to={societyRoute(primary.slug)} className="aw-label aw-cta-ghost px-6 py-3.5 no-underline">
                    Read your society's record
                  </Link>
                  <Link to={`${SERIES_ROUTE}#people`} className="aw-label aw-cta-ghost px-6 py-3.5 no-underline">
                    Meet the characters
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocietyQuiz;
