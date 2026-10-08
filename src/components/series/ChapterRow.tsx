import { isMilestoneReleased, type Episode } from "@/data/series";
import SeriesButton from "./SeriesButton";
import { cn } from "@/lib/utils";

/** Live dot + label, shown beside a chapter that is already streaming. */
const StatusMark = ({ episode }: { episode: Episode }) => {
  const isLive = episode.status === "streaming";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap font-sans text-[9.5px] uppercase leading-none tracking-[0.26em] sm:text-[10px]",
        isLive ? "text-gold" : "text-ash/80"
      )}
    >
      {isLive ? (
        <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/70 motion-reduce:animate-none" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      ) : null}
      {episode.statusLabel}
    </span>
  );
};

/**
 * One chapter as an editorial timeline row: an oversized ghosted numeral, the
 * title, a short line of story, and the dated release milestones — separated
 * by hairlines rather than boxed in a card.
 */
const ChapterRow = ({ episode }: { episode: Episode }) => {
  const headingId = `series-${episode.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="group relative border-t border-ivory/[0.12] transition-colors duration-700 hover:border-gold/30"
    >
      {/* Gold wash that warms the row on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: "linear-gradient(to right, hsl(var(--burgundy) / 0.22) 0%, transparent 55%)",
        }}
      />

      <div className="relative grid gap-x-8 gap-y-5 py-8 sm:py-10 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,18rem)] md:items-start md:gap-x-10">
        {/* Numeral */}
        <p
          aria-hidden
          className="font-serif text-[2.6rem] font-light leading-none text-ivory/[0.14] transition-colors duration-700 group-hover:text-gold/35 sm:text-[3.4rem] md:w-[3.2rem] md:text-[3.6rem]"
        >
          {episode.number}
        </p>

        {/* Title + story */}
        <div className="min-w-0">
          <span className="sr-only">Episode {episode.number}</span>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h4
              id={headingId}
              className="font-serif text-[1.45rem] font-light uppercase leading-tight tracking-[0.1em] text-ivory sm:text-[1.75rem]"
            >
              {episode.title ?? (
                <span className="text-[1.05rem] italic tracking-[0.05em] text-ivory/45 sm:text-[1.2rem]">
                  Title to be announced
                </span>
              )}
            </h4>
            <StatusMark episode={episode} />
          </div>

          {episode.description ? (
            <p className="mt-3 max-w-prose font-sans text-[13.5px] font-light leading-relaxed text-ivory/60 sm:text-sm">
              {episode.description}
            </p>
          ) : null}
        </div>

        {/* Dated milestones */}
        <div className="md:pt-1">
          <ul className="space-y-2.5">
            {episode.schedule.map((milestone) => {
              const released = isMilestoneReleased(milestone);
              return (
                <li key={`${milestone.date}-${milestone.note}`} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[0.4rem] h-1.5 w-1.5 shrink-0 rotate-45 border",
                      released ? "border-gold/70 bg-gold/70" : "border-ash/50 bg-transparent"
                    )}
                  />
                  <span className="min-w-0">
                    <time
                      dateTime={milestone.date}
                      className={cn(
                        "font-serif text-[12.5px] uppercase tracking-[0.16em] sm:text-[13px]",
                        released ? "text-ivory/85" : "text-ivory/55"
                      )}
                    >
                      {milestone.label}
                    </time>
                    <span className="ml-2 font-sans text-[11.5px] font-light text-ash/80 sm:text-xs">
                      {milestone.note}
                      <span className="sr-only">{released ? " — released" : " — upcoming premiere"}</span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <SeriesButton
            href={episode.cta.href}
            variant={episode.status === "streaming" ? "primary" : "ghost"}
            size="sm"
            className="mt-6 w-full sm:w-auto"
            srSuffix={`— Episode ${episode.number}${episode.title ? `, ${episode.title}` : ""}`}
          >
            {episode.cta.label}
          </SeriesButton>
        </div>
      </div>
    </article>
  );
};

export default ChapterRow;
