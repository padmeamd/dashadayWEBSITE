import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ticket } from "lucide-react";

const DISMISSED_KEY = "concert-popup-dismissed";

const TICKET_URL =
  "https://www.bandsintown.com/t/108619704?app_id=50017ce9c97df54ca7dfca64854274b1&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket";

export default function ConcertPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold/20 bg-[hsl(350_28%_7%)] shadow-[0_0_80px_hsl(38_60%_30%/0.15),0_0_0_1px_hsl(38_40%_20%/0.1)]"
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-ivory/70 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-ivory"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Concert poster */}
              <img
                src="/image/concert.JPG"
                alt="DashaDay Pre-Birthday Celebration Concert — Live in London, August 2nd 2026 at Aces & Eights Saloon Bar"
                className="w-full"
                draggable={false}
              />

              {/* CTA */}
              <div className="px-5 pb-5 pt-4">
                <a
                  href={TICKET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold/90 to-[hsl(38_70%_42%)] px-5 py-3 font-serif text-sm font-medium tracking-[0.15em] text-[hsl(350_28%_7%)] shadow-[0_2px_20px_hsl(38_60%_40%/0.3)] transition-all hover:shadow-[0_4px_28px_hsl(38_60%_40%/0.45)] hover:brightness-110"
                >
                  <Ticket className="h-4 w-4" />
                  GET TICKETS
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
