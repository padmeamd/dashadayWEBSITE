import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { ALDERWICK_ACT, PLAYERS, STAGE, type Player } from "@/data/theatre";

/**
 * SCENE THREE — meet the players.
 *
 * Three miniature theatres from one collection. Each holds a photographed
 * portrait until it is chosen; choosing it opens the stage and hangs the paper
 * puppet inside, lit by its own wash.
 *
 * It is built as buttons and a dialog rather than hover-only decoration, so
 * the whole thing works from a keyboard and on a touchscreen, where hover does
 * not exist. The puppets are single flattened cut-outs — there are no joint
 * layers in the artwork — so they are moved as whole pieces: a slow sway from
 * a pivot above the head, nothing stretched or warped.
 */

const PlayerStage = ({
  player,
  swayClass,
  onClose,
}: {
  player: Player;
  swayClass: string;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // Focus moves into the opened stage, and Escape closes it: the two things a
  // dialog has to do before it is allowed to call itself one.
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      layoutId={reduced ? undefined : `stage-${player.id}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${player.name} — ${player.title}`}
      className="tf-proscenium mx-auto w-full max-w-4xl"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <img
          src={STAGE.empty.src}
          width={STAGE.empty.width}
          height={STAGE.empty.height}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* The wash is what changes between characters: same theatre, different
            light. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${player.wash}, transparent 70%)` }}
        />
        {/* Two elements on purpose. The sway is a keyframe on `transform`,
            and a keyframe on transform replaces any transform already on the
            element — centring the puppet with -translate-x-1/2 on the same
            node makes it jump half its own width to the right the moment the
            animation starts. The outer box places it; the inner image moves. */}
        <div className="pointer-events-none absolute bottom-[7%] left-1/2 h-[80%] -translate-x-1/2 overflow-hidden">
          {/* A slow sheen crossing the figure. The puppets are flattened
              cut-outs, so there is no baton or sleeve to rotate on its own;
              moving light is the one addition that does not require taking
              the artwork apart. */}
          <span className="tf-glint z-10" aria-hidden />
          <img
            src={player.puppet.src}
            width={player.puppet.width}
            height={player.puppet.height}
            alt={player.puppet.alt}
            className={`tf-puppet h-full w-auto object-contain ${swayClass}`}
            style={{ filter: "drop-shadow(0 22px 26px rgba(0,0,0,0.6))" }}
          />
        </div>
        <div className="tf-footlight tf-flicker" aria-hidden />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close and return to the players"
          className="absolute right-3 top-3 rounded-full border p-2 transition-colors"
          style={{ borderColor: "var(--tf-gold-faint)", background: "rgba(25,21,17,0.75)" }}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="px-6 py-8 text-center sm:px-10 sm:py-10">
        <h3 className="tf-display text-3xl uppercase tracking-[0.18em] sm:text-4xl">
          {player.name}
        </h3>
        <p className="tf-label mt-3">{player.title}</p>
        <p
          className="tf-display mx-auto mt-6 max-w-xl text-lg italic leading-[1.65] sm:text-xl"
          style={{ color: "var(--tf-ivory-soft)" }}
        >
          {player.quote}
        </p>
      </div>
    </motion.div>
  );
};

const Players = () => {
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  const open = PLAYERS.find((p) => p.id === openId) ?? null;

  // Where focus goes once the gallery is back. It cannot be restored in the
  // same breath as the close: AnimatePresence holds the open stage for the
  // length of its exit, so the button being returned to does not exist yet.
  // The effect below waits for it to come back rather than guessing a delay.
  const [returnTo, setReturnTo] = useState<string | null>(null);

  const close = useCallback(() => {
    setReturnTo(openId);
    setOpenId(null);
  }, [openId]);

  useEffect(() => {
    if (!returnTo || openId) return;
    let frame = 0;
    let tries = 0;
    const settle = () => {
      const button = triggers.current.get(returnTo);
      if (button?.isConnected) {
        button.focus();
        setReturnTo(null);
        return;
      }
      // Bounded: if the gallery never comes back, stop rather than spin.
      if (tries++ > 60) return;
      frame = window.requestAnimationFrame(settle);
    };
    frame = window.requestAnimationFrame(settle);
    return () => window.cancelAnimationFrame(frame);
  }, [returnTo, openId]);

  const sway = ["tf-sway", "tf-sway tf-sway--slow", "tf-sway tf-sway--fast"];

  return (
    <section
      id="players"
      className="relative px-4 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14"
      style={{ background: "linear-gradient(#120f0c, var(--tf-black))" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* The university's introduction now stands here rather than in a
            block of its own: it is the sentence that explains who these three
            are, and it was being read a whole section away from them. */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="tf-label">{ALDERWICK_ACT.place}</p>
          <p className="tf-display mt-5 text-xl leading-[1.5] sm:text-[1.6rem]">
            {ALDERWICK_ACT.body}
          </p>
          <h2 className="tf-display mt-9 text-3xl uppercase tracking-[0.12em] sm:text-4xl">
            Meet the characters
          </h2>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="open"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-14"
            >
              <PlayerStage
                player={open}
                swayClass={sway[PLAYERS.indexOf(open) % sway.length]}
                onClose={close}
              />
            </motion.div>
          ) : (
            <motion.ul
              key="gallery"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PLAYERS.map((player, i) => (
                <li key={player.id}>
                  <motion.button
                    layoutId={reduced ? undefined : `stage-${player.id}`}
                    ref={(el) => {
                      if (el) triggers.current.set(player.id, el);
                    }}
                    type="button"
                    onClick={() => setOpenId(player.id)}
                    aria-label={`${player.name}, ${player.title} — open`}
                    className="tf-proscenium tf-playbill group block w-full text-left"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={player.portrait.src}
                        width={player.portrait.width}
                        height={player.portrait.height}
                        alt={player.portrait.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      {/* The gold only arrives on attention — it is the sign
                          that a thing can be opened, so it should not be on
                          all the time. */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 78%, rgba(183,150,92,0.38), transparent 62%)",
                          mixBlendMode: "screen",
                        }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/2"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(25,21,17,0.94), transparent)",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                        <p className="tf-display text-2xl uppercase tracking-[0.2em]">
                          {player.name}
                        </p>
                        <p className="tf-label mt-2 text-[0.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                          {player.title}
                        </p>
                      </div>
                      <div className="tf-footlight" aria-hidden />
                    </div>
                  </motion.button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Players;
