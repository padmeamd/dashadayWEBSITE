import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  driftX: number;
  driftY: number;
  duration: number;
};

const COLORS = [
  "hsl(43 90% 72%)",
  "hsl(38 85% 62%)",
  "hsl(46 100% 80%)",
  "hsl(40 35% 94%)",
  "hsl(30 80% 62%)",
];

let uid = 0;

function StarShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%" aria-hidden>
      <path
        d="M10 1L11.5 8.5L19 10L11.5 11.5L10 19L8.5 11.5L1 10L8.5 8.5Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
}

export default function SparklesCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastSpawn = useRef(0);
  const lastPos = useRef({ x: -999, y: -999 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const sync = () => setFinePointer(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current < 38) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < 6) return;

    lastPos.current = { x: e.clientX, y: e.clientY };
    lastSpawn.current = now;

    const sparkle: Sparkle = {
      id: uid++,
      x: e.clientX + (Math.random() - 0.5) * 12,
      y: e.clientY + (Math.random() - 0.5) * 12,
      size: 5 + Math.random() * 9,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 30,
      driftY: -(10 + Math.random() * 22),
      duration: 0.5 + Math.random() * 0.35,
    };

    setSparkles((prev) => [...prev.slice(-28), sparkle]);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [finePointer, onMouseMove]);

  if (!finePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]" aria-hidden>
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
            initial={{ opacity: 0.9, scale: 1, rotate: s.angle, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.1, x: s.driftX, y: s.driftY, rotate: s.angle + 80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: s.duration, ease: "easeOut" }}
            onAnimationComplete={() =>
              setSparkles((prev) => prev.filter((p) => p.id !== s.id))
            }
          >
            <StarShape color={s.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
