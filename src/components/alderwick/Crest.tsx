/**
 * The Alderwick crest and its seal — drawn, not photographed.
 *
 * Original geometry: a lantern between two laurel strokes over an open book,
 * which is the series' own iconography rather than any existing institution's.
 * Being vector, it stays sharp at any size and costs nothing to load.
 */
const Crest = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 140" className={className} role="img" aria-label="The Alderwick crest">
    <defs>
      <linearGradient id="aw-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c7b48f" />
        <stop offset="100%" stopColor="#8a7050" />
      </linearGradient>
    </defs>
    <path
      d="M60 4 112 22v58c0 28-22 46-52 56C30 126 8 108 8 80V22L60 4Z"
      fill="none"
      stroke="url(#aw-gold)"
      strokeWidth="1.6"
    />
    <path
      d="M60 12 104 27v52c0 24-19 39-44 48C35 118 16 103 16 79V27L60 12Z"
      fill="none"
      stroke="url(#aw-gold)"
      strokeWidth="0.7"
      opacity="0.55"
    />
    {/* lantern */}
    <path d="M54 44h12l4 8v20H50V52l4-8Z" fill="none" stroke="url(#aw-gold)" strokeWidth="1.4" />
    <path d="M60 36v8M56 56h8M60 52v12" stroke="url(#aw-gold)" strokeWidth="1.2" />
    {/* open book */}
    <path
      d="M30 92c10-5 20-5 30 0 10-5 20-5 30 0v10c-10-5-20-5-30 0-10-5-20-5-30 0V92Z"
      fill="none"
      stroke="url(#aw-gold)"
      strokeWidth="1.3"
    />
    <path d="M60 92v10" stroke="url(#aw-gold)" strokeWidth="1" opacity="0.7" />
    {/* laurel strokes */}
    <path d="M26 58c6 6 8 14 6 22M94 58c-6 6-8 14-6 22" fill="none" stroke="url(#aw-gold)" strokeWidth="1" opacity="0.6" />
  </svg>
);

export default Crest;
