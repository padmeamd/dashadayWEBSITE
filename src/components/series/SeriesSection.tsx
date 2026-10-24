import {
  SCHEDULE,
  SERIES,
  SERIES_ANCHOR_ID,
  SERIES_STILLS,
} from "@/data/series";
import GuidePanel from "./GuidePanel";
import CinematicPlate from "./CinematicPlate";
import Reveal from "./Reveal";
import SeriesButton from "./SeriesButton";

const TITLE_ID = "series-title";


/* ── Title lockup ─────────────────────────────────────────────────────────── */

/**
 * The film-title treatment. It straddles the bottom edge of the dominant
 * frame on desktop, so it reads as part of the image rather than as a caption
 * sitting in a content box.
 */
const TitleLockup = () => (
  <div className="max-w-[52rem]">
    <Reveal delay={0.1} y={14} duration={1.1}>
      <p className="flex items-center gap-3 font-serif text-[9.5px] uppercase tracking-[0.34em] text-gold/80 sm:text-[11px] sm:tracking-[0.42em]">
        <span aria-hidden className="h-px w-6 bg-gold/50 sm:w-12" />
        {SERIES.eyebrow}
      </p>
    </Reveal>

    <Reveal delay={0.22} y={22} duration={1.3} focusPull>
      <h2
        id={TITLE_ID}
        className="mt-4 font-serif font-light uppercase leading-[0.94] text-ivory sm:mt-5"
        style={{
          /* Scales from a phone to a cinema-wide frame without ever wrapping
             "Shouldn't Say" onto a third line. */
          fontSize: "clamp(2.1rem, 9vw, 5.2rem)",
          letterSpacing: "0.035em",
          textShadow: "0 2px 30px hsl(0 0% 0% / 0.8), 0 1px 4px hsl(0 0% 0% / 0.6)",
        }}
      >
        {SERIES.titleLines.map((line) => (
          <span key={line} className="block [overflow-wrap:break-word]">
            {line}
          </span>
        ))}
      </h2>
    </Reveal>

    <Reveal delay={0.42} y={12} duration={1.1}>
      <p
        className="mt-4 font-serif text-[1rem] font-light italic leading-snug text-gold/90 sm:mt-5 sm:text-[1.25rem]"
        style={{ textShadow: "0 1px 18px hsl(0 0% 0% / 0.85)" }}
      >
        &ldquo;{SERIES.tagline}&rdquo;
      </p>
    </Reveal>

    <Reveal delay={0.54} y={10} duration={1}>
      <p className="mt-4 font-sans text-[9.5px] uppercase leading-relaxed tracking-[0.26em] text-ivory/60 sm:text-[10.5px] sm:tracking-[0.32em]">
        {SERIES.genre.join(" · ")}
      </p>
    </Reveal>
  </div>
);

/* ── Section ──────────────────────────────────────────────────────────────── */

const SeriesSection = () => (
  <section
    id={SERIES_ANCHOR_ID}
    aria-labelledby={TITLE_ID}
    className="relative z-10 scroll-mt-24 overflow-hidden border-y border-ivory/[0.07] bg-[hsl(var(--charcoal))] md:scroll-mt-28"
  >
    {/* Atmosphere: burgundy pools + candle warmth, all non-interactive */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(85% 45% at 14% 0%, hsl(var(--burgundy) / 0.3) 0%, transparent 62%)," +
          "radial-gradient(70% 45% at 92% 22%, hsl(38 45% 30% / 0.16) 0%, transparent 64%)," +
          "radial-gradient(110% 55% at 50% 108%, hsl(var(--burgundy-deep) / 0.65) 0%, transparent 66%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    {/* ─── ACT I — the gate ──────────────────────────────────────────────── */}
    <div className="relative pt-14 sm:pt-20 md:pt-24">
      <div className="relative mx-auto w-full max-w-[82rem] px-4 sm:px-6 md:px-10">
        {/* Dominant establishing frame, breaking wider than the text column */}
        <Reveal y={30} duration={1.5} focusPull>
          <CinematicPlate
            still={SERIES_STILLS.hall}
            aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]"
            objectPosition="object-top"
            scrim="deep"
            priority
            sizes="(min-width: 1280px) 1280px, 96vw"
            className="lg:border-ivory/[0.16]"
          >
            {/* Location slug, top-right, like a production slate */}
            <p className="absolute right-4 top-4 font-serif text-[8.5px] uppercase tracking-[0.3em] text-ivory/55 sm:right-6 sm:top-6 sm:text-[10px] sm:tracking-[0.34em]">
              {SERIES.locationCaption}
            </p>
          </CinematicPlate>
        </Reveal>

        {/* One title lockup: it flows under the frame on small screens and
            lifts onto it, centred left, from lg up — where there is room
            beside the subjects. */}
        <div className="pt-8 sm:pt-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-14 lg:pt-0 xl:px-[4.5rem]">
          <TitleLockup />
        </div>
      </div>
    </div>

    {/* ─── ACT II — the plates + the story ───────────────────────────────── */}
    <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-12">
      <div className="mt-12 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-7">
        {/* Larger secondary frame */}
        <Reveal
          className="lg:col-span-7 lg:col-start-1"
          y={28}
          duration={1.3}
          delay={0.05}
        >
          <CinematicPlate
            still={SERIES_STILLS.arrival}
            aspect="aspect-[16/9] sm:aspect-[1.9/1]"
            parallax={14}
            scrim="soft"
            sizes="(min-width: 1024px) 640px, 92vw"
          />
        </Reveal>

        {/* Smaller frame, dropped lower so the pair reads asymmetrically */}
        <Reveal
          className="lg:col-span-5 lg:col-start-8 lg:mt-16"
          y={28}
          duration={1.3}
          delay={0.2}
        >
          <CinematicPlate
            still={SERIES_STILLS.encounter}
            aspect="aspect-[16/9]"
            parallax={22}
            scrim="soft"
            sizes="(min-width: 1024px) 420px, 92vw"
          />
        </Reveal>

        {/* Story introduction, tucked into the composition beneath the wide frame */}
        <Reveal
          className="lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:-mt-4"
          y={20}
          duration={1.2}
          delay={0.15}
        >
          <div className="pt-4 lg:pt-6">
            <h3 className="font-serif text-[11px] uppercase tracking-[0.36em] text-gold/75 sm:text-xs sm:tracking-[0.42em]">
              {SERIES.intro.heading}
            </h3>

            <p className="mt-5 font-serif text-[1.15rem] font-light leading-snug tracking-wide text-ivory/90 sm:text-[1.45rem]">
              &ldquo;{SERIES.intro.lead}&rdquo;
            </p>

            <p className="mt-5 max-w-prose font-sans text-[13.5px] font-light leading-relaxed text-ivory/60 sm:text-[14.5px]">
              {SERIES.intro.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <SeriesButton href={SERIES.primaryCta.href} variant="primary">
                {SERIES.primaryCta.label}
              </SeriesButton>
              <SeriesButton href={SERIES.secondaryCta.href} variant="ghost">
                {SERIES.secondaryCta.label}
              </SeriesButton>
            </div>

            <p className="mt-5 flex max-w-prose items-start gap-2.5 font-sans text-[12.5px] font-light leading-relaxed text-gold/80 sm:text-[13px]">
              <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
              {SERIES.watchNote}
            </p>

            {/* Kept from the removed chapter block: the release cadence is the one
                fact in it that somebody still on the homepage needs. */}
            <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.2em] text-ivory/45">
              {SCHEDULE.subheading}
            </p>
          </div>
        </Reveal>
        {/* Production slate — closes the composition under the smaller frame */}
        <Reveal
          className="lg:col-span-5 lg:col-start-8 lg:row-start-2"
          y={16}
          duration={1.2}
          delay={0.3}
        >
          <dl className="mt-12 border-t border-ivory/[0.12] lg:mt-6">
            {SERIES.credits.map((credit) => (
              <div
                key={credit.label}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ivory/[0.08] py-3"
              >
                <dt className="w-[7.5rem] shrink-0 font-sans text-[9.5px] uppercase tracking-[0.24em] text-gold/60">
                  {credit.label}
                </dt>
                <dd className="min-w-0 flex-1 font-serif text-[13px] font-light leading-snug tracking-wide text-ivory/75">
                  {credit.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

      </div>

      {/* The chapter list, the Alderwick Society panel and the milestone
          timeline used to stand here — roughly two thousand pixels of them.
          Each is reproduced in full on /things-i-shouldnt-say, which is where
          the detail belongs: the homepage's job is to make someone want the
          series, not to be the series site. The two buttons above carry them. */}

      {/* ─── BEHIND THE MAGIC ───────────────────────────────────────────── */}
      <Reveal className="mt-12 pb-16 sm:mt-14 sm:pb-20 md:pb-28" y={16}>
        <GuidePanel />
      </Reveal>

    </div>
  </section>
);

export default SeriesSection;
