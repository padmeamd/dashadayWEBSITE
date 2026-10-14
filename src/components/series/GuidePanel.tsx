import { motion, useReducedMotion } from "framer-motion";
import { GUIDE } from "@/data/series";
import SeriesButton from "./SeriesButton";

/**
 * The filmmaking guide, given its own lit panel so it stops reading as a
 * footnote at the end of the section.
 *
 * A warm pool of light breathes underneath it — slowly, roughly at the rate a
 * candle gutters — and comes up brighter when the panel is hovered or focused.
 * The motion is the only thing that moves; the type stays still, so it draws
 * the eye without becoming a flashing advert. Visitors who ask for reduced
 * motion get the lit state, held steady.
 */
const GuidePanel = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={[
        "group relative overflow-hidden border border-gold/30 bg-[hsl(var(--charcoal))]",
        "transition-[border-color,box-shadow] duration-700 ease-out",
        "shadow-[0_0_0_0_hsl(var(--gold)/0)] hover:border-gold/60",
        "hover:shadow-[0_24px_80px_-40px_hsl(var(--gold)/0.45)]",
        "focus-within:border-gold/60 focus-within:shadow-[0_24px_80px_-40px_hsl(var(--gold)/0.45)]",
      ].join(" ")}
    >
      {/* The breathing ember. Two pools so the light has somewhere to fall. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 130% at 8% 115%, hsl(var(--gold) / 0.26) 0%, transparent 60%)," +
            "radial-gradient(60% 120% at 92% -10%, hsl(38 60% 45% / 0.18) 0%, transparent 62%)",
        }}
        animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.55, 1, 0.55] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 7, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
        }
      />

      {/* Steps up on hover, so the panel answers the cursor. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background:
            "radial-gradient(85% 150% at 10% 120%, hsl(var(--gold) / 0.2) 0%, transparent 62%)",
        }}
      />

      {/* Lit top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, hsl(var(--gold) / 0.65) 28%, hsl(var(--gold) / 0.3) 62%, transparent 100%)",
        }}
      />
      {/* Mounted-frame hairline, same device as the cinematic plates */}
      <span aria-hidden className="pointer-events-none absolute inset-[6px] border border-gold/[0.14]" />

      <div className="relative flex flex-col gap-7 px-6 py-9 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-10 sm:py-11">
        <div className="max-w-xl">
          <h3 className="font-serif text-[12px] uppercase tracking-[0.3em] text-gold sm:text-[13px] sm:tracking-[0.34em]">
            {GUIDE.heading}
          </h3>

          <p className="mt-4 font-serif text-[1.2rem] font-light italic leading-snug text-ivory sm:text-[1.45rem]">
            {GUIDE.question}
          </p>

          <p className="mt-4 font-sans text-[14.5px] font-light leading-relaxed text-ivory/75 sm:text-[15.5px]">
            Get my filmmaking guide,{" "}
            <em className="not-italic text-ivory">{GUIDE.guideTitle}</em>. {GUIDE.subtitle}.
          </p>
        </div>

        <SeriesButton
          href={GUIDE.cta.href}
          variant="primary"
          className="shrink-0 self-start sm:self-auto"
        >
          {GUIDE.cta.label}
        </SeriesButton>
      </div>
    </div>
  );
};

export default GuidePanel;
