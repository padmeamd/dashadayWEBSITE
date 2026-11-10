import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { STAGE } from "@/data/theatre";
import { SERIES_LINKS } from "@/data/series";
import { SOCIAL_LINKS } from "@/config/site";

/**
 * WHERE TO WATCH, and BEHIND THE CURTAIN.
 *
 * Three ways into the series, in the order they cost the reader: the
 * membership first, then the channel, then the free public release. Every
 * address comes from data/series.ts or config/site.ts — this file writes no
 * URLs of its own, and makes no claim about when anything arrives.
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
      className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14"
    >
      {/* The stage stands behind everything, dimmed hard. It is a ground, not
          a picture: anything legible back there would compete with the cards
          standing on it. */}
      <div aria-hidden className="absolute inset-0">
        <img
          src={STAGE.watchBackdrop.src}
          width={STAGE.watchBackdrop.width}
          height={STAGE.watchBackdrop.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(16,13,10,0.9), rgba(16,13,10,0.95) 45%, rgba(16,13,10,0.97))",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="text-center">
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

        <ul className="mt-12 flex flex-wrap justify-center gap-7">
          {WAYS.map((way, n) => (
            <motion.li
              key={way.id}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: n * 0.07, ease: [0.2, 0.7, 0.2, 1] as const }}
              className="w-full max-w-[21rem] sm:w-[19rem] lg:w-[20rem]"
            >
              <article
                className={`tf-way flex h-full flex-col items-center p-7 text-center ${
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
                  className="h-28 w-auto object-contain sm:h-32"
                />

                <h3 className="tf-label mt-6 text-[0.84rem]">{way.kicker}</h3>

                <p
                  className="mt-3 flex-1 text-[0.95rem] leading-[1.7]"
                  style={{ color: "var(--tf-ivory-soft)" }}
                >
                  {way.body}
                </p>

                <a
                  href={way.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="tf-paper-button mt-7"
                >
                  {way.cta}
                </a>
              </article>
            </motion.li>
          ))}
        </ul>

        {/* ── Behind the curtain ──────────────────────────────────────── */}
        <div className="mt-16 sm:mt-20">
          <h2 className="tf-display text-center text-2xl uppercase tracking-[0.12em] sm:text-3xl">
            Behind the curtain
          </h2>

          <div className="mt-10 flex flex-col items-center gap-9 sm:flex-row sm:items-center sm:gap-12">
            {/* She faces right, so she stands on the left and looks into the
                words rather than off the edge of the page. */}
            <div className="w-48 shrink-0 sm:w-56 lg:w-64">
              <Blink />
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-[1.02rem] leading-[1.8]" style={{ color: "var(--tf-ivory-soft)" }}>
                Alderwick is written, directed and scored by Dasha Day, an
                independent artist who builds the story, characters and music
                behind the series.
              </p>

              <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 sm:justify-start">
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
