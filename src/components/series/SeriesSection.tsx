import { ArrowUpRight, Instagram, Send, Youtube } from "lucide-react";
import {
  EPISODES,
  FOLLOW,
  GUIDE,
  MEMBERSHIP,
  SCHEDULE,
  SERIES,
  SERIES_ANCHOR_ID,
  SERIES_STILLS,
  type FollowChannel,
} from "@/data/series";
import ChapterRow from "./ChapterRow";
import CinematicPlate from "./CinematicPlate";
import Ornament from "./Ornament";
import Reveal from "./Reveal";
import SeriesButton from "./SeriesButton";

const TITLE_ID = "series-title";

const CHANNEL_ICONS: Record<FollowChannel["name"], typeof Send> = {
  telegram: Send,
  instagram: Instagram,
  youtube: Youtube,
};

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

      {/* ─── THE CHAPTERS ───────────────────────────────────────────────── */}
      <Reveal className="mt-20 sm:mt-24 md:mt-28" y={16}>
        <Ornament className="mb-10 sm:mb-14" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="font-serif text-[clamp(1.5rem,4.8vw,2.4rem)] font-light uppercase leading-none tracking-[0.18em] text-ivory/90">
            {SCHEDULE.heading}
          </h3>
          <p className="font-sans text-[12px] font-light leading-relaxed text-ash/85 sm:text-right sm:text-[13px]">
            {SCHEDULE.subheading}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 border-b border-ivory/[0.12] sm:mt-10">
        {EPISODES.map((episode, i) => (
          <Reveal key={episode.id} delay={i * 0.08} y={14}>
            <ChapterRow episode={episode} />
          </Reveal>
        ))}
      </div>

      {/* ─── THE ALDERWICK SOCIETY ──────────────────────────────────────── */}
      <Reveal className="mt-16 sm:mt-20 md:mt-24" y={16}>
        <div className="relative overflow-hidden border border-gold/25 bg-[hsl(var(--burgundy-deep)/0.5)]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 110% at 50% 0%, hsl(var(--burgundy) / 0.45) 0%, transparent 68%)",
            }}
          />
          <span aria-hidden className="pointer-events-none absolute inset-[6px] border border-gold/[0.14]" />

          <div className="relative px-6 py-10 text-center sm:px-10 sm:py-14 md:px-16">
            <p className="font-serif text-[9.5px] uppercase tracking-[0.4em] text-gold/70 sm:text-[10.5px]">
              {MEMBERSHIP.eyebrow}
            </p>

            <h3 className="mt-5 font-serif text-[clamp(1.5rem,5.2vw,2.5rem)] font-light uppercase leading-tight tracking-[0.14em] text-ivory">
              {MEMBERSHIP.heading}
            </h3>

            <Ornament className="my-6 sm:my-7" width="max-w-[13rem]" />

            <p className="mx-auto max-w-xl font-serif text-[1.05rem] font-light italic leading-snug text-ivory/85 sm:text-[1.2rem]">
              &ldquo;{MEMBERSHIP.quote}&rdquo;
            </p>

            <p className="mx-auto mt-5 max-w-lg font-sans text-[13px] font-light leading-relaxed text-ivory/60 sm:text-[13.5px]">
              {MEMBERSHIP.description}
            </p>

            <ul className="mx-auto mt-6 flex max-w-2xl flex-col items-center justify-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
              {MEMBERSHIP.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2.5 font-sans text-[11.5px] font-light tracking-wide text-ash/85"
                >
                  <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
                  {benefit}
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-baseline justify-center gap-2">
              <span className="font-serif text-[2.1rem] font-light leading-none text-gold sm:text-[2.5rem]">
                {MEMBERSHIP.price}
              </span>
              <span className="font-sans text-[10.5px] uppercase tracking-[0.26em] text-ash/85">
                {MEMBERSHIP.priceInterval}
              </span>
            </p>

            <SeriesButton href={MEMBERSHIP.cta.href} variant="primary" className="mt-7 w-full sm:w-auto">
              {MEMBERSHIP.cta.label}
            </SeriesButton>
          </div>
        </div>
      </Reveal>

      {/* ─── FOLLOW THE STORY ───────────────────────────────────────────── */}
      <Reveal className="mt-14 sm:mt-16 md:mt-20" y={14}>
        <div className="flex items-center gap-4">
          <h3 className="font-serif text-[10.5px] uppercase tracking-[0.34em] text-ivory/60 sm:text-xs sm:tracking-[0.4em]">
            {FOLLOW.heading}
          </h3>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent" />
        </div>

        <ul className="mt-6 grid list-none gap-px border border-ivory/[0.08] bg-ivory/[0.06] sm:grid-cols-3">
          {FOLLOW.channels.map((channel) => {
            const Icon = CHANNEL_ICONS[channel.name];
            return (
              <li key={channel.name} className="bg-[hsl(var(--charcoal))]">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/follow flex h-full min-h-[4.5rem] items-center gap-4 px-5 py-5 transition-colors duration-500 hover:bg-ivory/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/50 sm:px-6"
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-gold/60 transition-colors duration-500 group-hover/follow:text-gold"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[12px] uppercase tracking-[0.26em] text-ivory/85 transition-colors duration-500 group-hover/follow:text-ivory">
                      {channel.label}
                    </span>
                    <span className="mt-1 block font-sans text-[11.5px] font-light leading-snug text-ash/75">
                      {channel.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-ivory/25 transition-all duration-500 group-hover/follow:-translate-y-0.5 group-hover/follow:translate-x-0.5 group-hover/follow:text-gold/70 motion-reduce:transition-none"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* ─── BEHIND THE MAGIC ───────────────────────────────────────────── */}
      <Reveal className="mt-10 pb-16 sm:mt-12 sm:pb-20 md:pb-28" y={12}>
        <div className="flex flex-col gap-5 border-t border-ivory/[0.08] pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl">
            <h3 className="font-serif text-[10.5px] uppercase tracking-[0.34em] text-gold/65">
              {GUIDE.heading}
            </h3>
            <p className="mt-3 font-serif text-[0.98rem] font-light italic leading-snug text-ivory/75">
              {GUIDE.question}
            </p>
            <p className="mt-2 font-sans text-[12.5px] font-light leading-relaxed text-ash/80">
              Discover my filmmaking guide,{" "}
              <em className="not-italic text-ivory/70">{GUIDE.guideTitle}</em>, and explore the creative
              process behind the series.
            </p>
          </div>
          <SeriesButton
            href={GUIDE.cta.href}
            variant="ghost"
            size="sm"
            className="shrink-0 self-start sm:self-auto"
          >
            {GUIDE.cta.label}
          </SeriesButton>
        </div>
      </Reveal>
    </div>
  </section>
);

export default SeriesSection;
