/**
 * Atmospheric fog.
 *
 * The cloud shapes are fractal turbulence, written as inline SVG rather than
 * as a data-URI texture: a data URI is one silent typo away from a mask that
 * never loads, and a mask that never loads looks exactly like fog that was
 * simply too subtle to see.
 *
 * The turbulence is evaluated once. Only transforms animate afterwards, so
 * the drift costs a composite rather than a filter pass per frame.
 */

type Depth = "back" | "middle" | "front";

const DEPTHS: Record<
  Depth,
  {
    seed: number;
    frequency: number;
    octaves: number;
    /** Contrast curve on the noise: higher exponent, sparser clouds. */
    exponent: number;
    amplitude: number;
    offset: number;
    opacity: number;
    drift: string;
    /** Stops of the gradient the noise is cut out of. */
    stops: { offset: string; color: string; opacity: number }[];
    shape: { cx: string; cy: string; r: string };
  }
> = {
  // Deep burgundy, large and slow, well behind the lettering.
  back: {
    seed: 11,
    frequency: 0.0042,
    octaves: 4,
    exponent: 1.9,
    amplitude: 1.9,
    offset: -0.12,
    opacity: 0.46,
    drift: "aw-fog-a",
    stops: [
      { offset: "0%", color: "#8a1428", opacity: 0.62 },
      { offset: "48%", color: "#3c0a14", opacity: 0.42 },
      { offset: "100%", color: "#1a040a", opacity: 0 },
    ],
    shape: { cx: "56%", cy: "44%", r: "56%" },
  },
  // Muted crimson passing around the title, so the letters sit inside weather.
  middle: {
    seed: 29,
    frequency: 0.0078,
    octaves: 4,
    exponent: 2.3,
    amplitude: 2.1,
    offset: -0.2,
    opacity: 0.3,
    drift: "aw-fog-b",
    stops: [
      { offset: "0%", color: "#a8303f", opacity: 0.46 },
      { offset: "55%", color: "#4a0d18", opacity: 0.26 },
      { offset: "100%", color: "#200509", opacity: 0 },
    ],
    shape: { cx: "44%", cy: "54%", r: "52%" },
  },
  // The faintest layer, kept to the floor so it never crosses her face.
  front: {
    seed: 47,
    frequency: 0.011,
    octaves: 3,
    exponent: 2.6,
    amplitude: 2.2,
    offset: -0.26,
    opacity: 0.26,
    drift: "aw-fog-c",
    stops: [
      { offset: "0%", color: "#c3b2ae", opacity: 0.2 },
      { offset: "44%", color: "#8d7b78", opacity: 0.1 },
      { offset: "100%", color: "#6b5c5a", opacity: 0 },
    ],
    shape: { cx: "50%", cy: "104%", r: "66%" },
  },
};

const Fog = ({ depth, className = "" }: { depth: Depth; className?: string }) => {
  const d = DEPTHS[depth];
  const filterId = `aw-fog-filter-${depth}`;
  const paintId = `aw-fog-paint-${depth}`;

  return (
    <svg
      aria-hidden
      focusable="false"
      preserveAspectRatio="none"
      className={`aw-fog ${d.drift} ${className}`}
      style={{ opacity: d.opacity }}
    >
      <defs>
        <radialGradient id={paintId} cx={d.shape.cx} cy={d.shape.cy} r={d.shape.r}>
          {d.stops.map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </radialGradient>

        <filter id={filterId} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={d.frequency}
            numOctaves={d.octaves}
            seed={d.seed}
            stitchTiles="stitch"
            result="noise"
          />
          {/* Flat noise is grey mush; the curve pulls it apart into banks. */}
          <feComponentTransfer in="noise" result="banks">
            <feFuncA type="gamma" exponent={d.exponent} amplitude={d.amplitude} offset={d.offset} />
          </feComponentTransfer>
          {/* Keep the colour, take the shape from the noise. */}
          <feComposite in="SourceGraphic" in2="banks" operator="in" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${paintId})`} filter={`url(#${filterId})`} />
    </svg>
  );
};

export default Fog;
