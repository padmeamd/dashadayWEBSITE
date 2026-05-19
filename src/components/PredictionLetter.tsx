import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Prediction } from "@/data/predictions";

function LetterDust({ reduced }: { reduced: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + (i % 3),
        duration: 2.6 + (i % 7) * 0.35,
        delay: (i % 6) * 0.11,
      })),
    []
  );

  if (reduced) return null;

  return (
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[hsl(40_35%_96%/0.12)]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ opacity: [0.05, 0.18, 0.06], y: [0, -10, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

export type PredictionLetterProps = {
  prediction: Prediction;
  open: boolean;
  reduced: boolean;
  layout?: "overlay" | "page";
  onNext?: () => void;
  onClose?: () => void;
};

export default function PredictionLetter({
  prediction,
  open,
  reduced,
  layout = "overlay",
  onNext,
  onClose,
}: PredictionLetterProps) {
  useEffect(() => {
    if (!open || !onClose) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const shellClass =
    layout === "page"
      ? "relative flex min-h-[100dvh] w-full items-center justify-center px-5 py-12 md:px-10"
      : "pointer-events-none absolute inset-0 z-[70] flex items-center justify-center p-5 md:p-10";

  return (
    <motion.div
      className={shellClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-auto relative w-full"
        style={{ maxWidth: "430px", perspective: 1000, transformStyle: "preserve-3d" }}
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
            : { opacity: 0, y: 24, rotateX: 10, scale: 0.97 }
        }
        transition={{ duration: 1.05, delay: open ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={false}
          animate={open ? { scaleY: 1, opacity: 1 } : { scaleY: 0.08, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 0%" }}
        >
          <motion.div
            style={{
              background:
                "linear-gradient(170deg, #f6eedc 0%, #ede4c8 30%, #e9dfc2 58%, #e5d8ba 82%, #e2d3b4 100%)",
              boxShadow: [
                "0 2px 6px rgba(0,0,0,0.14)",
                "0 16px 40px rgba(0,0,0,0.32)",
                "0 44px 100px rgba(0,0,0,0.62)",
                "0 80px 160px rgba(0,0,0,0.38)",
                "0 0 0 1px rgba(20,12,4,0.07)",
                "inset 0 0 80px rgba(160,110,40,0.04)",
              ].join(", "),
              borderRadius: "1px",
              position: "relative",
              overflow: "hidden",
              cursor: onNext ? "pointer" : "default",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            role="article"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.13'/%3E%3C/svg%3E\")",
                mixBlendMode: "multiply",
                opacity: 0.55,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 28px rgba(20,10,2,0.07)" }}
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 78% 6%, rgba(220,155,30,0.18) 0%, rgba(200,130,20,0) 52%)",
                mixBlendMode: "multiply",
              }}
              animate={
                open ? { opacity: [0.4, 0.85, 0.48, 0.9, 0.38, 0.75, 0.52] } : { opacity: 0 }
              }
              transition={
                open ? { duration: 4.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }
              }
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 55% 0%, rgba(200,140,20,0.1) 0%, rgba(180,110,10,0) 45%)",
                mixBlendMode: "multiply",
              }}
              animate={
                open ? { opacity: [0.6, 0.3, 0.7, 0.25, 0.65, 0.35, 0.55] } : { opacity: 0 }
              }
              transition={
                open
                  ? { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                  : { duration: 0.2 }
              }
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0"
              style={{
                top: "67%",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent 4%, rgba(18,10,2,0.055) 22%, rgba(18,10,2,0.055) 78%, transparent 96%)",
              }}
              aria-hidden
            />
            <LetterDust reduced={reduced} />
            <div className="relative z-[5] p-6 sm:p-8 md:px-10 md:py-9 lg:px-[42px] lg:pt-11 lg:pb-[38px]">
              {onClose ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border-0 bg-transparent font-serif text-lg leading-none text-[rgba(25,14,4,0.35)] transition-colors hover:text-[rgba(25,14,4,0.6)] sm:right-5 sm:top-4"
                  aria-label="Close"
                >
                  ✕
                </button>
              ) : null}
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color: "rgba(45,26,8,0.55)",
                    marginBottom: "14px",
                  }}
                >
                  The Letter Has Spoken
                </p>
                <motion.div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent 2%, rgba(140,95,28,0.35) 28%, rgba(160,110,32,0.45) 50%, rgba(140,95,28,0.35) 72%, transparent 98%)",
                  }}
                  aria-hidden
                />
              </div>
              <motion.div
                key={prediction.song}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: open ? 0.28 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(1.7rem, 4vw, 2.3rem)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    lineHeight: 1.08,
                    marginBottom: "1.25rem",
                    color: "#180902",
                    textShadow: "0 1px 0 rgba(255,245,220,0.6), 0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {prediction.song}
                </p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(0.95rem, 2.1vw, 1.1rem)",
                    color: "#2c1606",
                    lineHeight: 1.9,
                    marginBottom: "2rem",
                  }}
                >
                  &#8220;
                  {prediction.lyric.split("\n").map((line, idx, arr) => (
                    <span key={idx}>
                      {line}
                      {idx < arr.length - 1 ? <br /> : null}
                    </span>
                  ))}
                  &#8221;
                </p>
              </motion.div>
              <motion.div style={{ textAlign: "center" }}>
                <motion.div
                  style={{
                    height: "1px",
                    marginBottom: "20px",
                    background:
                      "linear-gradient(to right, transparent 2%, rgba(140,95,28,0.28) 28%, rgba(155,105,30,0.38) 50%, rgba(140,95,28,0.28) 72%, transparent 98%)",
                  }}
                  aria-hidden
                />
                <Link
                  to="/listen"
                  state={{ song: prediction.song }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-block",
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.36em",
                    textTransform: "uppercase",
                    color: "rgba(110,68,14,0.82)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(110,68,14,0.3)",
                    paddingBottom: "3px",
                  }}
                >
                  Listen to the Song
                </Link>
                {onNext ? (
                  <p
                    style={{
                      marginTop: "12px",
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(50,28,8,0.45)",
                    }}
                  >
                    Tap for another prophecy
                  </p>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
