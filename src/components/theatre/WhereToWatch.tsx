import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { STAGE } from "@/data/theatre";
import { SERIES_LINKS } from "@/data/series";
import { SOCIAL_LINKS } from "@/config/site";

/**
 * ONE STAGE: where to watch, and who is behind it.
 *
 * A single composition rather than two full-width blocks stacked. The paper
 * theatre is the ground; Dasha stands downstage left, facing in; everything
 * she is introducing — the three ways to watch, then the short note about who
 * makes it — stands in the lit middle to her right.
 *
 * She is laid out in her own column rather than positioned absolutely over
 * the content. Absolute would look right at one width and cover a button at
 * the next; a column cannot overlap what it sits beside, at any size.
 *
 * Three ways in, in the order they cost the reader: the membership first,
 * then the channel, then the free public release. Every address comes from
 * data/series.ts or config/site.ts — this file writes no URLs of its own, and
 * makes no claim about when anything arrives.
 *
 * The blink is two cut-outs of the same size swapped on a timer. Both are in
 * the document from the start so neither has to be fetched mid-blink, and the
 * closed one is simply stacked over the open one. Under reduced motion the
 * timer never starts and her eyes stay open.
 */

const social = (label: string) =>
  SOCIAL_LINKS.find((l) => l.label === label)?.href ?? "";

const WAYS = [
  {
    id: "early",
    kicker: "Early access",
    body: "Watch the opening half of the season early with a monthly membership.",
    cta: "Get early access",
    href: SERIES_LINKS.membership,
    art: STAGE.cardTicket,
    featured: true,
  },
  {
    id: "telegram",
    kicker: "Telegram",
    body: "Follow public episode releases and series updates in the Telegram channel.",
    cta: "Follow on Telegram",
    href: SERIES_LINKS.telegram,
    art: STAGE.cardTelegram,
    featured: false,
  },
  {
    id: "youtube",
    kicker: "YouTube",
    body: "Watch full episodes free on YouTube as they become publicly available.",
    cta: "Watch on YouTube",
    href: SERIES_LINKS.youtube,
    art: STAGE.cardScreen,
    featured: false,
  },
] as const;

const SOCIALS = [
  { label: "Instagram", handle: "@heydashaday", href: social("Instagram") },
  { label: "TikTok", handle: "@dashadaymusic", href: social("TikTok") },
  { label: "YouTube", handle: "DashaDay", href: social("YouTube") },
  { label: "Spotify", handle: "DashaDay", href: social("Spotify") },
  { label: "Telegram", handle: "@daydmedia", href: SERIES_LINKS.telegram },
] as const;

const Blink = () => {
  const reduced = useReducedMotion();
  const [shut, setShut] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    // Irregular on purpose: a blink on a fixed beat stops looking like a
    // blink and starts looking like a flicker.
    const schedule = () => {
      timer = window.setTimeout(() => {
        setShut(true);
        timer = window.setTimeout(() => {
          setShut(false);
          schedule();
        }, 160);
      }, 3600 + Math.random() * 4200);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduced]);

  // The cut-out ends square at the chest — that is where the supplied
  // artwork stops. Left alone it meets the ground as a drawn straight line;
  // the mask lets it fall away instead. Nothing is cropped: the fade starts
  // below everything in the picture.
  const fade = {
    maskImage: "linear-gradient(to bottom, black 76%, transparent 99%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 76%, transparent 99%)",
  } as const;

  return (
    <div className="relative w-full" style={fade}>
      <img
        src={STAGE.dashaOpen.src}
        width={STAGE.dashaOpen.width}
        height={STAGE.dashaOpen.height}
        alt={STAGE.dashaOpen.alt}
        loading="lazy"
        decoding="async"
        className="w-full"
        style={{ filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.55))" }}
      />
      {/* Stacked, same box, same size — the swap cannot shift anything. */}
      <img
        src={STAGE.dashaClosed.src}
        width={STAGE.dashaClosed.width}
        height={STAGE.dashaClosed.height}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full"
        style={{
          opacity: shut ? 1 : 0,
          filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.55))",
        }}
      />
    </div>
  );
};

const WhereToWatch = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="where-to-watch"
      className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14 lg:pb-10"
    >
      {/* The supplied stage, untouched, dimmed hard. It is a ground, not a
          picture: anything legible back there would compete with what stands
          on it. */}
      {/* Masked to nothing at its own top edge.
          The seam was never spacing — the boxes have always met at zero. It
          was two different grounds meeting along a line: .theatre paints a
          fixed wash behind the page, it shows through the hero above (which
          has no background of its own), and this section's opaque backdrop
          was blocking it. Fading the backdrop in from transparent makes the
          top of this section the same ground as the foot of the hero, and
          there is no edge left to see.
          The fade is short on purpose. This artwork carries its own drawn
          curtain along its top edge, and that edge is the transition — a
          separate strip laid across the join only made the two sections look
          like two sections. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0, black 7%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 7%)",
        }}
      >
        <img
          src={STAGE.watchBackdrop.src}
          width={STAGE.watchBackdrop.width}
          height={STAGE.watchBackdrop.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

      </div>

      {/* Wider than the rest of the page: Dasha takes a column of her own,
          and on a 6xl container her growing would have squeezed the three
          cards beside her below a readable width. */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[29rem_minmax(0,1fr)]">
          {/* ── Downstage left ──────────────────────────────────────────
              Bottom-aligned by the grid, so she stands on the stage floor
              rather than floating beside the heading. */}
          {/* On wide screens she is drawn larger than the column she occupies
              and hangs off its left edge, so her head reaches the top of the
              first card without her column stealing the width the three cards
              need. She faces right, so what leaves the frame is the outer edge
              of her hair — her face never does. */}
          <div className="mx-auto w-64 shrink-0 sm:w-80 lg:mx-0 lg:w-full">
            <div className="lg:-ml-[10rem] lg:w-[38rem] lg:max-w-none xl:-ml-[9rem] xl:w-[40rem]">
              <Blink />
            </div>
          </div>

          {/* ── The lit middle ──────────────────────────────────────── */}
          <div className="min-w-0">
            <header className="text-center lg:text-left">
              <h2 className="tf-display text-3xl uppercase tracking-[0.12em] sm:text-4xl">
                Where to watch
              </h2>
              <p
                className="tf-display mt-3 text-lg italic"
                style={{ color: "var(--tf-ivory-soft)" }}
              >
                Choose how you’d like to enter the story.
              </p>
            </header>

            <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {WAYS.map((way, n) => (
                <motion.li
                  key={way.id}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: n * 0.07, ease: [0.2, 0.7, 0.2, 1] as const }}
                >
                  <article
                    className={`tf-way flex h-full flex-col items-center p-5 text-center ${
                      way.featured ? "tf-way--featured" : ""
                    }`}
                  >
                    <img
                      src={way.art.src}
                      width={way.art.width}
                      height={way.art.height}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-auto object-contain sm:h-24"
                    />

                    <h3 className="tf-label mt-4 text-[0.78rem]">{way.kicker}</h3>

                    <p
                      className="mt-2.5 flex-1 text-[0.88rem] leading-[1.65]"
                      style={{ color: "var(--tf-ivory-soft)" }}
                    >
                      {way.body}
                    </p>

                    <a
                      href={way.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`tf-plate-btn mt-5 ${
                        way.featured ? "tf-plate-btn--burgundy" : "tf-plate-btn--cream"
                      }`}
                    >
                      {way.cta}
                    </a>
                  </article>
                </motion.li>
              ))}
            </ul>

            {/* ── Behind the curtain ──────────────────────────────────
                Compact, and under the cards rather than in a block of its
                own: it is the same scene, and she is standing right there. */}
            <div
              className="mt-10 border-t pt-8"
              style={{ borderColor: "var(--tf-gold-faint)" }}
            >
              <h3 className="tf-display text-center text-xl uppercase tracking-[0.14em] sm:text-2xl lg:text-left">
                Behind the curtain
              </h3>

              <p
                className="mt-4 text-center text-[0.98rem] leading-[1.75] lg:text-left"
                style={{ color: "var(--tf-ivory-soft)" }}
              >
                Alderwick is written, directed and scored by Dasha Day, an
                independent artist who builds the story, characters and music
                behind the series.
              </p>

              <ul className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 lg:justify-start">
                {SOCIALS.filter((s) => s.href).map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="tf-social"
                    >
                      <span className="tf-social-label">{s.label}</span>
                      <span className="tf-social-handle">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereToWatch;
