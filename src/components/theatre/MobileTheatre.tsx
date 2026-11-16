import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { ALDERWICK_ACT, OVERTURE, PLAYERS, STAGE } from "@/data/theatre";
import { SERIES_LINKS } from "@/data/series";

/**
 * THE MOBILE THEATRE — one performance, played out by scrolling.
 *
 * On a phone the stage was a letterbox: a 16:9 picture squeezed into a strip,
 * with three figures a centimetre tall. This replaces it with a tall stage
 * that stays put while the performance inside it changes.
 *
 * How it is built: a tall track with a sticky viewport inside it. The visitor
 * scrolls normally — nothing is intercepted, nothing is nested — and the
 * scroll position drives what the stage is doing. Five scenes, in order: the
 * opening, the company waking, the change of players and scenery, the story,
 * and the curtain.
 *
 * Everything on it is an existing asset at its own proportions. The curtains
 * are the one drawn panel and its mirror, run full height and cropped on the
 * width rather than stretched — the asset is portrait, so a phone suits it
 * better than a desktop ever did.
 *
 * Under reduced motion none of this runs: the track collapses, the stage is
 * shown open with the company on it, and the same words and links follow
 * underneath.
 */

/* Scene boundaries as a share of the track. */
const S = { open: 0.16, alive: 0.38, change: 0.6, story: 0.82 };

const MobileTheatre = () => {
  const reduced = useReducedMotion();
  const track = useRef<HTMLElement>(null);

  const { scrollYProgress: p } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  /* ── Title ─────────────────────────────────────────────────────────── */
  const titleOpen = useTransform(p, [0, 0.07], ["inset(0 50% 0 50%)", "inset(0 0% 0 0%)"]);
  const rolledFade = useTransform(p, [0, 0.07], [1, 0]);
  const titleY = useTransform(p, [S.open, S.alive], ["0%", "-130%"]);
  const titleFade = useTransform(p, [S.open, S.alive], [1, 0]);

  /* ── Backdrops ─────────────────────────────────────────────────────── */
  const dayFade = useTransform(p, [S.alive, S.change], [1, 0]);
  const nightFade = useTransform(p, [S.alive, S.change], [0, 1]);
  const backdropY = useTransform(p, [0, 1], ["0%", "-7%"]);

  /* ── The company ───────────────────────────────────────────────────── */
  /* Scene 2: Dasha steps forward, the other two draw back. Scene 3: she
     slides off and they return — paper props crossing a small stage. */
  const dashaScale = useTransform(p, [S.open, S.alive, S.change], [1, 1.22, 1.22]);
  const dashaY = useTransform(p, [S.open, S.alive], ["0%", "-6%"]);
  const dashaX = useTransform(p, [S.alive, S.change], ["0%", "-150%"]);
  const dashaFade = useTransform(p, [S.alive, S.change], [1, 0]);

  const sideScale = useTransform(p, [S.open, S.alive, S.change], [1, 0.88, 1.06]);
  const sideDim = useTransform(p, [S.open, S.alive, S.change], [1, 0.55, 1]);
  const gregX = useTransform(p, [S.alive, S.change], ["0%", "38%"]);
  const theoX = useTransform(p, [S.alive, S.change], ["0%", "-38%"]);
  /* The stage clears before the words arrive. Overlapped, the text came
     up behind two figures and neither could be read. */
  const companyFade = useTransform(p, [S.change, S.change + 0.1], [1, 0]);

  /* ── Story ─────────────────────────────────────────────────────────── */
  const storyFade = useTransform(p, [S.change + 0.1, S.story], [0, 1]);
  const storyY = useTransform(p, [S.change + 0.1, S.story], ["14%", "0%"]);
  const storyOut = useTransform(p, [0.9, 1], [1, 0]);
  /* Declared here, not in the markup: below the early return for reduced
     motion a hook would be called on some renders and not others, and React
     counts them in order. */
  const storyOpacity = useTransform(
    [storyFade, storyOut],
    ([a, b]: number[]) => a * b,
  );

  /* ── Curtain ───────────────────────────────────────────────────────── */
  /* Parted all the way through, then drawn across at the end. */
  const curtainL = useTransform(p, [0, 0.07, 0.88, 1], ["0%", "-62%", "-62%", "2%"]);
  const curtainR = useTransform(p, [0, 0.07, 0.88, 1], ["0%", "62%", "62%", "-2%"]);

  const doors = [
    { label: "Watch the chapters", href: "#chapters", external: false },
    { label: "Become a member", href: SERIES_LINKS.membership, external: true },
    { label: "Discover Alderwick", href: "#alderwick", external: false },
  ];

  /* ── Reduced motion: the same scene, standing still ─────────────────── */
  if (reduced) {
    return (
      <section className="relative sm:hidden">
        <div className="tf-proscenium relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={STAGE.alderwick.src}
            width={STAGE.alderwick.width}
            height={STAGE.alderwick.height}
            alt={STAGE.alderwick.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="tf-mt-scrim" aria-hidden />
          {PLAYERS.map((player, i) => (
            <img
              key={player.id}
              src={player.puppet.src}
              width={player.puppet.width}
              height={player.puppet.height}
              alt=""
              aria-hidden
              className="absolute bottom-[8%] h-[46%] w-auto object-contain"
              style={{ left: `${[22, 50, 78][i]}%`, transform: "translateX(-50%)" }}
            />
          ))}
          <img
            src={STAGE.scrollOpen.src}
            width={STAGE.scrollOpen.width}
            height={STAGE.scrollOpen.height}
            alt=""
            aria-hidden
            className="absolute inset-x-[6%] top-[5%]"
          />
          <img src={STAGE.curtain.src} alt="" aria-hidden
            className="tf-mt-curtain absolute inset-y-0 left-0" style={{ transform: "translateX(-46%)" }} />
          <img src={STAGE.curtain.src} alt="" aria-hidden
            className="tf-mt-curtain absolute inset-y-0 right-0"
            style={{ transform: "scaleX(-1) translateX(-46%)" }} />
        </div>

        <div className="px-5 py-8 text-center">
          <h1 className="sr-only">{OVERTURE.title}</h1>
          <p className="tf-label">{ALDERWICK_ACT.place}</p>
          <p className="tf-display mt-4 text-xl italic" style={{ color: "var(--tf-ivory-soft)" }}>
            {OVERTURE.line}
          </p>
          <nav aria-label="Where to go next" className="mt-6 grid grid-cols-3 gap-2">
            {doors.map((d) => (
              <a key={d.label} href={d.href}
                 {...(d.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                 className="tf-door-tile">{d.label}</a>
            ))}
          </nav>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* The track. Its only job is to be tall enough for the performance;
          everything visible lives in the sticky stage inside it. */}
      <section ref={track} className="relative h-[420svh] sm:hidden">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[color:var(--tf-black)]">
          {/* ── Scenery ───────────────────────────────────────────── */}
          <motion.div className="absolute inset-0" style={{ y: backdropY }}>
            <motion.img
              src={STAGE.alderwick.src}
              width={STAGE.alderwick.width}
              height={STAGE.alderwick.height}
              alt=""
              aria-hidden
              className="absolute inset-0 h-[107%] w-full object-cover"
              style={{ opacity: dayFade }}
            />
            <motion.img
              src="/image/theatre/societies-night.webp"
              width={1600}
              height={900}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-[107%] w-full object-cover"
              style={{ opacity: nightFade }}
            />
          </motion.div>
          <div className="tf-mt-scrim" aria-hidden />

          {/* ── The company ───────────────────────────────────────── */}
          <motion.div className="absolute inset-0" style={{ opacity: companyFade }}>
            <motion.img
              src={PLAYERS[1].puppet.src}
              width={PLAYERS[1].puppet.width}
              height={PLAYERS[1].puppet.height}
              alt=""
              aria-hidden
              className="tf-mt-puppet left-[22%]"
              style={{ x: gregX, scale: sideScale, opacity: sideDim }}
            />
            <motion.img
              src={PLAYERS[2].puppet.src}
              width={PLAYERS[2].puppet.width}
              height={PLAYERS[2].puppet.height}
              alt=""
              aria-hidden
              className="tf-mt-puppet left-[78%]"
              style={{ x: theoX, scale: sideScale, opacity: sideDim }}
            />
            <motion.img
              src={PLAYERS[0].puppet.src}
              width={PLAYERS[0].puppet.width}
              height={PLAYERS[0].puppet.height}
              alt=""
              aria-hidden
              className="tf-mt-puppet tf-mt-puppet--lead left-1/2"
              style={{ x: dashaX, y: dashaY, scale: dashaScale, opacity: dashaFade }}
            />
          </motion.div>

          <div className="tf-footlight tf-flicker" aria-hidden />

          {/* ── The bill ──────────────────────────────────────────── */}
          <motion.div
            className="absolute inset-x-[7%] top-[calc(var(--tf-header,4.5rem)+2vh)] z-40"
            style={{ y: titleY, opacity: titleFade }}
          >
            <div className="relative">
              <motion.img
                src={STAGE.scrollRolled.src}
                width={STAGE.scrollRolled.width}
                height={STAGE.scrollRolled.height}
                alt=""
                aria-hidden
                className="w-full"
                style={{ opacity: rolledFade }}
              />
              <motion.div className="absolute inset-0" style={{ clipPath: titleOpen }}>
                <img
                  src={STAGE.scrollOpen.src}
                  width={STAGE.scrollOpen.width}
                  height={STAGE.scrollOpen.height}
                  alt=""
                  aria-hidden
                  className="w-full"
                />
              </motion.div>
            </div>
            <h1 className="sr-only">{OVERTURE.title}</h1>
          </motion.div>

          {/* ── The story, once the stage has cleared ─────────────── */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-40 px-5 pb-10 text-center"
            style={{ opacity: storyOpacity, y: storyY }}
          >
            <p className="tf-label">{ALDERWICK_ACT.place}</p>
            <p className="tf-display mt-3 text-[1.15rem] leading-[1.5]">
              {ALDERWICK_ACT.body}
            </p>
            <p
              className="tf-display mt-4 text-base italic"
              style={{ color: "var(--tf-ivory-soft)" }}
            >
              {OVERTURE.line}
            </p>
            <nav aria-label="Where to go next" className="mt-6 grid grid-cols-3 gap-2">
              {doors.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  {...(d.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="tf-door-tile"
                >
                  {d.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ── The curtains ──────────────────────────────────────────
              One drawn panel and its mirror. Run at full height and
              cropped on the width — the artwork is portrait, so a phone
              fits it without a pixel of stretching. They part at the
              start, frame the whole performance, and draw across at the
              end. */}
          <motion.img
            src={STAGE.curtain.src}
            width={STAGE.curtain.width}
            height={STAGE.curtain.height}
            alt=""
            aria-hidden
            className="tf-mt-curtain absolute inset-y-0 left-0 z-30"
            style={{ x: curtainL }}
          />
          <motion.img
            src={STAGE.curtain.src}
            width={STAGE.curtain.width}
            height={STAGE.curtain.height}
            alt=""
            aria-hidden
            className="tf-mt-curtain absolute inset-y-0 right-0 z-30"
            style={{ x: curtainR, scaleX: -1 }}
          />
        </div>
      </section>
    </>
  );
};

export default MobileTheatre;
