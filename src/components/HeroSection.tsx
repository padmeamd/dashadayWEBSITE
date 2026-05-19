import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  MotionValue,
  motionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useMemo, useState, useCallback, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import { HERO_HOTSPOTS, heroHotspotZIndex, resolveHeroHotspotStyle } from "@/data/heroHotspots";
import { ChevronDown, Plus } from "lucide-react";

const BG_SRC = "/image/background.png";
const MIRROR_BOX = { left: "7%", top: "6%", width: "43%", height: "54%" } as const;

/** Same hit-area padding on all viewports — desktop geometry, reliable router links on mobile. */
const HOTSPOT_TAP_CLASS =
  "pointer-events-auto absolute block cursor-pointer border-0 bg-transparent p-2 outline-none touch-manipulation ring-offset-2 ring-offset-[hsl(350_28%_5%)] before:absolute before:-inset-2 before:content-[''] focus-visible:ring-2 focus-visible:ring-gold/45";

const PARALLAX_MAX = 4;
const SPRING = { stiffness: 48, damping: 28, mass: 0.9 };
const CANDLE_CURSOR_SPRING = { stiffness: 160, damping: 34, mass: 0.5 };

/** Warm, intimate pool of light with the bright core slightly above the pointer (flame) + soft flicker. */
function CandleCursorLight({
  cursorX,
  cursorY,
  flameY,
  active,
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  flameY: MotionValue<number>;
  active: boolean;
}) {
  const ambient = useMotionTemplate`radial-gradient(ellipse min(52vmin, 70vw) min(44vmin, 58vw) at ${cursorX}px ${cursorY}px, hsl(26 72% 48% / 0.13) 0%, hsl(22 58% 32% / 0.06) 48%, transparent 70%)`;
  const halo = useMotionTemplate`radial-gradient(ellipse min(24vmin, 34vw) min(21vmin, 30vw) at ${cursorX}px ${flameY}px, hsl(30 82% 58% / 0.14) 0%, hsl(24 68% 42% / 0.06) 55%, transparent 76%)`;
  const flame = useMotionTemplate`radial-gradient(circle min(11vmin, 15vw) at ${cursorX}px ${flameY}px, hsl(38 96% 74% / 0.16) 0%, hsl(28 88% 54% / 0.09) 45%, hsl(22 70% 38% / 0.03) 68%, transparent 78%)`;

  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[23]"
      animate={{
        opacity: [0.86, 0.98, 0.9, 1, 0.88, 0.96, 0.91, 0.99, 0.87],
      }}
      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ background: ambient }} />
      <motion.div className="absolute inset-0 mix-blend-soft-light" style={{ background: halo }} />
      <motion.div className="absolute inset-0 mix-blend-plus-lighter" style={{ background: flame }} />
    </motion.div>
  );
}

const STREAMING = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/artist/3XVaHujuNOBwtjM4XNpxRr",
    icon: (
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    href: "https://music.apple.com/us/artist/dashaday/1529962263",
    icon: (
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 5.07 5.07 0 00-.4-1.09 4.66 4.66 0 00-.67-.9 4.66 4.66 0 00-.9-.67 5.07 5.07 0 00-1.09-.4 9.23 9.23 0 00-2.19-.24c-.51-.02-1.19-.03-2.48-.03H7.97c-1.29 0-1.97.01-2.48.03a9.23 9.23 0 00-2.19.24 5.07 5.07 0 00-1.09.4c-.32.17-.62.4-.9.67a4.66 4.66 0 00-.67.9c-.18.34-.32.7-.4 1.09a9.23 9.23 0 00-.24 2.19c-.02.51-.03 1.19-.03 2.48v6.88c0 1.29.01 1.97.03 2.48a9.23 9.23 0 00.24 2.19c.08.39.22.75.4 1.09.17.32.4.62.67.9.28.27.58.5.9.67.34.18.7.32 1.09.4a9.23 9.23 0 002.19.24c.51.02 1.19.03 2.48.03h8.06c1.29 0 1.97-.01 2.48-.03a9.23 9.23 0 002.19-.24 5.07 5.07 0 001.09-.4c.32-.17.62-.4.9-.67.27-.28.5-.58.67-.9.18-.34.32-.7.4-1.09a9.23 9.23 0 00.24-2.19c.02-.51.03-1.19.03-2.48V8.6c0-1.29-.01-1.97-.03-2.48z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/c/DashaDayIsHere",
    icon: (
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/heydashaday/",
    icon: (
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@dashadaymusic",
    icon: (
      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

function LipstickKissSmudge() {
  const uid = useId().replace(/:/g, "");
  const blurId = `kiss-blur-${uid}`;
  return (
    <svg width="54" height="54" viewBox="0 0 48 48" className="shrink-0" aria-hidden>
      <defs>
        <linearGradient id={`lip-a-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a0a14" />
          <stop offset="45%" stopColor="#8b1532" />
          <stop offset="100%" stopColor="#5c0818" />
        </linearGradient>
        <filter id={blurId} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="0.75" />
        </filter>
      </defs>
      <g filter={`url(#${blurId})`} opacity="0.92">
        <ellipse cx="16.5" cy="27" rx="10" ry="6.2" fill={`url(#lip-a-${uid})`} transform="rotate(-16 16.5 27)" />
        <ellipse cx="31.5" cy="27" rx="10" ry="6.2" fill={`url(#lip-a-${uid})`} transform="rotate(16 31.5 27)" />
        <ellipse cx="24" cy="28" rx="5" ry="3" fill="#2d040a" opacity="0.45" />
      </g>
      <path
        d="M18 31 Q24 35 30 31"
        fill="none"
        stroke="#3d060f"
        strokeWidth="0.6"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MirrorMotes({ reduced }: { reduced: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${14 + (i * 19) % 72}%`,
        top: `${20 + (i * 21) % 58}%`,
        size: 1 + (i % 2),
        duration: 11 + (i % 5) * 2,
        delay: (i % 6) * 0.3,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[hsl(40_35%_96%/0.14)]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={
            reduced
              ? { opacity: 0.06 }
              : { y: [0, -4, 2, -3, 0], opacity: [0.05, 0.14, 0.07, 0.11, 0.06] }
          }
          transition={{
            duration: p.duration,
            repeat: reduced ? 0 : Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text, reduced }: { text: string; reduced: boolean }) {
  const [displayed, setDisplayed] = useState(reduced ? text : "");
  const [phase, setPhase] = useState<"idle" | "typing" | "erasing">("idle");

  useEffect(() => {
    if (reduced) return;
    const init = setTimeout(() => setPhase("typing"), 1600);
    return () => clearTimeout(init);
  }, [reduced]);

  useEffect(() => {
    if (reduced || phase === "idle") return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (displayed.length < text.length) {
        t = setTimeout(
          () => setDisplayed(text.slice(0, displayed.length + 1)),
          90 + Math.random() * 80
        );
      } else {
        t = setTimeout(() => setPhase("erasing"), 4800);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          60 + Math.random() * 45
        );
      } else {
        t = setTimeout(() => setPhase("typing"), 2800);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, text, reduced]);

  return (
    <>
      {displayed}
      {!reduced && phase !== "idle" && (
        <motion.span
          className="inline-block w-px align-middle bg-ivory/55 ml-px"
          style={{ height: "0.72em" }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      )}
    </>
  );
}

/** Typography on the mirror - no glass card, no synthetic light-leak overlays */
function MirrorCopyOnGlass({
  reduced,
  onEnterWorld,
}: {
  reduced: boolean;
  onEnterWorld: () => void;
}) {
  return (
    <div className="pointer-events-none absolute z-[34] overflow-hidden" style={MIRROR_BOX}>
      <div className="pointer-events-auto relative h-full min-h-0 w-full">
        <MirrorMotes reduced={reduced} />

        <div className="absolute inset-0 z-[1] flex items-start justify-center px-3 pt-3 pb-3 sm:items-center sm:py-3 md:px-4 md:py-4">
          <div className="flex max-h-full w-full max-w-[min(100%,26rem)] -translate-y-0.5 translate-x-0 flex-col items-center justify-center gap-3 text-center sm:translate-y-0 sm:translate-x-8 sm:gap-4 md:translate-x-32 md:gap-5">
          <div className="flex flex-wrap items-end justify-center gap-3 md:gap-4">
            <motion.div
              initial={reduced ? false : { opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/album/things-i-shouldnt-say"
                className="block transition-opacity hover:opacity-90"
                aria-label="Open Things I Shouldn't Say album"
              >
                <motion.p
                  className="font-moralana text-[clamp(1.15rem,4.2vw,3.1rem)] leading-[1.08] tracking-wide text-ivory md:text-[clamp(2.1rem,4.6vw,3.45rem)]"
                  style={{
                    textShadow:
                      "0 0 3px hsl(40 100% 94% / 0.9), 0 0 12px hsl(38 88% 70% / 0.75), 0 0 26px hsl(35 80% 56% / 0.55), 0 0 52px hsl(30 72% 44% / 0.35), 0 2px 16px hsl(0 0% 0% / 0.7)",
                  }}
                  animate={
                    reduced
                      ? {}
                      : {
                          opacity: [1, 1, 1, 1, 0.55, 1, 0.9, 1, 1, 1, 1, 1, 0.52, 1, 1, 0.88, 0.5, 1, 1, 1, 1],
                          scale: [1, 1.006, 1, 1.004, 1, 1, 1, 1.005, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.004, 1, 1],
                        }
                  }
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.08, 0.2, 0.34, 0.35, 0.36, 0.38, 0.42, 0.5, 0.58, 0.64, 0.69, 0.70, 0.71, 0.78, 0.83, 0.84, 0.85, 0.9, 0.96, 1],
                  }}
                >
                  Things I Shouldn&apos;t Say
                </motion.p>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.6, duration: 1 }}
            />
          </div>

          <p
            className="max-w-[22rem] font-serif text-[12px] font-light leading-relaxed tracking-[0.26em] text-ivory md:text-[14px] md:tracking-[0.28em]"
            style={{ textShadow: "0 1px 12px hsl(0 0% 0% / 0.85)", minHeight: "1.5em" }}
          >
            <TypewriterText text="STREAM THE ALBUM NOW" reduced={reduced} />
          </p>

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.9, duration: 0.8 }}
            onClick={(e) => {
              e.preventDefault();
              onEnterWorld();
            }}
            className="relative z-[2] -mx-2 min-h-11 cursor-pointer touch-manipulation border-0 bg-transparent px-4 py-2 font-serif text-[12px] font-light tracking-[0.32em] text-ivory underline decoration-gold/45 decoration-[0.5px] underline-offset-[7px] transition-colors hover:text-ivory hover:decoration-gold/75 md:mx-0 md:min-h-0 md:px-0 md:py-0 md:text-[14px] md:tracking-[0.34em]"
            style={{ textShadow: "0 1px 10px hsl(0 0% 0% / 0.8)" }}
          >
            ENTER MY WORLD
          </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnnotationLabel({ objectLabel, actionLabel }: { objectLabel: string; actionLabel: string }) {
  const showAction = Boolean(actionLabel.trim());

  return (
    <div className="flex items-start gap-2 md:gap-2.5">
      <div className="flex min-w-0 flex-col gap-0.5 text-left">
        <span
          className={`font-serif uppercase leading-tight tracking-[0.18em] text-ivory/[0.9] ${
            showAction ? "text-[11px] md:text-[13px]" : "text-[13px] md:text-[16px]"
          } font-light`}
          style={{
            textShadow:
              "0 0 10px hsl(0 0% 0% / 0.75), 0 0 18px hsl(38 45% 42% / 0.12)",
          }}
        >
          {objectLabel}
        </span>
        {showAction ? (
          <span
            className="font-serif text-[10px] font-light uppercase leading-tight tracking-[0.14em] text-gold/80 md:text-[12px] md:tracking-[0.16em]"
            style={{
              textShadow: "0 0 10px hsl(43 50% 40% / 0.2), 0 1px 8px hsl(0 0% 0% / 0.65)",
            }}
          >
            {actionLabel}
          </span>
        ) : null}
      </div>
      {showAction ? (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ivory/[0.22] text-ivory/75 shadow-[0_0_12px_hsl(38_45%_40%/0.12)] md:h-6 md:w-6"
          aria-hidden
        >
          <Plus className="h-[10px] w-[10px] md:h-[11px] md:w-[11px]" strokeWidth={1.25} />
        </span>
      ) : null}
    </div>
  );
}

function DustMotes({ reduced }: { reduced: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${(i * 41 + 7) % 100}%`,
        top: `${(i * 47 + 3) % 94}%`,
        size: 1 + (i % 3),
        duration: 16 + (i % 11) * 2.2,
        delay: (i % 9) * 0.35,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[26] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[hsl(40_28%_92%/0.1)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={
            reduced
              ? { opacity: 0.05 }
              : {
                  y: [0, -12, 4, -8, 0],
                  x: [0, 4, -3, 6, 0],
                  opacity: [0.03, 0.1, 0.04, 0.08, 0.03],
                }
          }
          transition={{
            duration: p.duration,
            repeat: reduced ? 0 : Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Vignette only - no warm "light leak" blobs (those read as stray glow on the mirror). */
function HeroVignette({ reduced }: { reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[18] overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_82%_58%_at_50%_48%,transparent_0%,hsl(350_30%_6%/0.22)_82%,hsl(350_34%_4%/0.58)_100%)]"
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[46%]"
        style={{
          background: "linear-gradient(to top, hsl(350 36% 4% / 0.58) 0%, transparent 100%)",
        }}
        animate={reduced ? {} : { opacity: [0.72, 0.8, 0.74, 0.78, 0.72] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const reduced = Boolean(reduceMotion);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const uiOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const uiY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const parallaxX = useSpring(
    useTransform(normX, [0, 0.5, 1], [PARALLAX_MAX, 0, -PARALLAX_MAX]),
    reduced ? { stiffness: 500, damping: 50 } : SPRING
  );
  const parallaxY = useSpring(
    useTransform(normY, [0, 0.5, 1], [PARALLAX_MAX * 0.7, 0, -PARALLAX_MAX * 0.7]),
    reduced ? { stiffness: 500, damping: 50 } : SPRING
  );

  const [finePointer, setFinePointer] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [spotActive, setSpotActive] = useState(false);
  const [candlesHover, setCandlesHover] = useState(false);
  const candleGlowActive = candlesHover;

  const cursorX = useSpring(motionValue(-9999), CANDLE_CURSOR_SPRING);
  const cursorY = useSpring(motionValue(-9999), CANDLE_CURSOR_SPRING);
  const flameY = useTransform(cursorY, (y) => y - 28);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || reduced || !finePointer) return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      setSpotActive(inside);
      if (!inside) return;
      normX.set((e.clientX - r.left) / r.width);
      normY.set((e.clientY - r.top) / r.height);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [normX, normY, cursorX, cursorY, reduced, finePointer]
  );

  const onMouseLeave = useCallback(() => {
    setSpotActive(false);
    normX.set(0.5);
    normY.set(0.5);
  }, [normX, normY]);

  useEffect(() => {
    if (reduced) {
      normX.set(0.5);
      normY.set(0.5);
    }
  }, [reduced, normX, normY]);

  const scrollToNewAlbum = useCallback(() => {
    const target = document.getElementById("new-album");
    if (!target) return;
    const headerOffset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  return (
    <>
      <SiteHeader variant="cinematic" />
      <section
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[hsl(350_28%_5%)]"
      >
        <h1 className="sr-only">DashaDay - Things I Shouldn&apos;t Say, debut album</h1>

        {!reduced && finePointer ? (
          <CandleCursorLight cursorX={cursorX} cursorY={cursorY} flameY={flameY} active={spotActive} />
        ) : null}

        <motion.div
          className="absolute inset-0"
          animate={
            reduced
              ? { x: 0, y: 0 }
              : { x: [0, 1.2, -0.8, 0.4, 0], y: [0, -0.8, 0.6, -0.3, 0] }
          }
          transition={
            reduced ? { duration: 0 } : { duration: 26, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
          }
        >
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute -inset-[14px] will-change-transform"
          >
            <motion.img
              src={BG_SRC}
              alt=""
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover object-center select-none"
              draggable={false}
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  "radial-gradient(ellipse 90% 74% at 48% 52%, transparent 16%, hsl(350 32% 8% / 0.38) 100%), linear-gradient(100deg, hsl(350 30% 7% / 0.34) 0%, transparent 34%, transparent 64%, hsl(350 26% 6% / 0.32) 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[hsl(350_30%_4%/0.78)] via-[hsl(350_26%_8%/0.12)] to-[hsl(25_20%_10%/0.28)]"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute z-[16]"
          style={{ left: "45%", top: "26%", width: "24%", height: "52%" }}
          aria-hidden="true"
        >
          {/* Base warm ambient glow — always present, brightens on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ opacity: candleGlowActive ? 1 : 0.6 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 62%, hsl(28 88% 52% / 0.2) 0%, hsl(22 70% 38% / 0.08) 55%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Bright flame core — visible on hover, flickers when letter is open */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ opacity: candlesHover ? 0.9 : 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 36%, hsl(46 100% 78% / 0.32) 0%, hsl(32 94% 60% / 0.2) 34%, transparent 62%)",
              filter: "blur(0.5px)",
            }}
            aria-hidden="true"
          />

          {/* Wide room warmth — spreads when the letter is open */}
          <motion.div
            className="absolute rounded-full"
            style={{
              inset: "-55%",
              background:
                "radial-gradient(ellipse at 50% 64%, hsl(28 68% 44% / 0.12) 0%, transparent 68%)",
            }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            aria-hidden="true"
          />
        </div>

        <HeroVignette reduced={reduced} />

        <motion.img
          src="/image/dust.png"
          alt=""
          role="presentation"
          className="pointer-events-none absolute inset-0 z-[19] h-full w-full object-cover opacity-[0.048] mix-blend-overlay"
          draggable={false}
          animate={reduced ? { x: 0, y: 0 } : { y: [0, -2, 1, -1, 0], x: [0, 1, -0.6, 0] }}
          transition={
            reduced ? { duration: 0 } : { duration: 32, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
          }
        />

        <img
          src="/image/grain.png"
          alt=""
          role="presentation"
          className="pointer-events-none absolute inset-0 z-[20] h-full w-full object-cover opacity-[0.036] mix-blend-overlay"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[20] opacity-[0.026] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <DustMotes reduced={reduced} />

        <MirrorCopyOnGlass reduced={reduced} onEnterWorld={scrollToNewAlbum} />

        <motion.div className="pointer-events-none absolute inset-0 z-[55]">
          {HERO_HOTSPOTS.map((spot) => (
            <Link
              key={spot.id}
              to={spot.to}
              className={HOTSPOT_TAP_CLASS}
              style={{ ...resolveHeroHotspotStyle(spot, isMobileViewport), zIndex: heroHotspotZIndex(spot.id) }}
              onMouseEnter={spot.id === "candles" ? () => setCandlesHover(true) : undefined}
              onMouseLeave={spot.id === "candles" ? () => setCandlesHover(false) : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">
                {spot.objectLabel} — {spot.actionLabel}
              </span>
              <div className={spot.labelClassName}>
                <AnnotationLabel objectLabel={spot.objectLabel} actionLabel={spot.actionLabel} />
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: uiOpacity, y: uiY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[50] flex w-full flex-col items-stretch gap-3 px-3 pb-5 pb-safe pt-8 sm:items-center sm:gap-4 sm:px-6 sm:pb-10 sm:pt-12 md:grid md:grid-cols-3 md:items-end md:gap-4 md:px-12 md:pb-12 md:pt-14"
        >
          <div className="pointer-events-auto relative z-[51] mx-auto w-full max-w-sm md:max-w-none md:justify-self-start">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start md:gap-5">
            {STREAMING.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center touch-manipulation opacity-90 transition-opacity hover:opacity-100 sm:h-11 sm:w-11 md:h-12 md:w-12"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
            </div>
          </div>

          <div className="pointer-events-auto flex flex-row items-center justify-center gap-3 md:flex-col md:justify-end md:gap-2">
            <span className="text-center font-serif text-[9px] font-light leading-snug tracking-[0.22em] text-ivory/[0.82] drop-shadow-[0_1px_10px_hsl(0_0%_0%/0.65)] sm:max-w-[12rem] sm:text-[10px] sm:tracking-[0.26em] md:max-w-none md:text-[12px] md:tracking-[0.28em]">
              SCROLL TO ENTER
            </span>
            <motion.button
              type="button"
              aria-label="Scroll to enter album"
              onClick={scrollToNewAlbum}
              className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-ivory/22 text-ivory/80 shadow-[0_0_16px_hsl(0_0%_0%/0.35)] transition-colors hover:border-gold/35 hover:text-gold sm:h-11 sm:w-11 md:h-10 md:w-10"
            >
              <motion.span
                animate={reduced ? {} : { y: [0, 2, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.2} />
              </motion.span>
            </motion.button>
          </div>

          <motion.p
            className="pointer-events-none hidden max-w-[20rem] text-center font-hand text-[clamp(1.05rem,3.2vw,1.45rem)] font-light leading-snug text-ivory/[0.82] sm:block md:max-w-[22rem] md:justify-self-end md:text-right md:text-[clamp(1.1rem,2.6vw,1.4rem)]"
            style={{
              textShadow: "0 2px 14px hsl(0 0% 0% / 0.78), 0 0 32px hsl(350 35% 6% / 0.35)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            Still thinking of me,   are you?
          </motion.p>
        </motion.div>

      </section>
    </>
  );
};

export default HeroSection;
