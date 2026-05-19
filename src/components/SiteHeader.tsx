import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE_NAV_ITEMS } from "@/data/siteNav";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  variant?: "cinematic" | "page";
};

function useNavActions() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const goToSection = useCallback(
    (hash: string) => {
      if (!isHome) {
        window.location.href = `/${hash}`;
        return;
      }
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [isHome]
  );

  return { isHome, goToSection };
}

function MobileNavMenu({
  open,
  onClose,
  linkClass,
  goToSection,
}: {
  open: boolean;
  onClose: () => void;
  linkClass: string;
  goToSection: (hash: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const itemClass = cn(
    linkClass,
    "block w-full border-b border-ivory/[0.08] py-4 text-left text-[15px] tracking-[0.28em] last:border-b-0"
  );

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[75] bg-night/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Mobile"
            className="fixed right-0 top-0 z-[80] flex h-full w-[min(100%,20rem)] flex-col border-l border-ivory/[0.1] bg-[hsl(350_28%_5%/0.97)] px-6 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-[-24px_0_80px_hsl(0_0%_0%/0.45)] backdrop-blur-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mb-8 flex items-center justify-between"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
            >
              <span className="font-serif text-[11px] font-light uppercase tracking-[0.32em] text-ivory/50">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold/40 hover:text-ivory"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </motion.div>

            <div className="flex flex-1 flex-col">
              {SITE_NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                >
                  {item.type === "section" ? (
                    <button
                      type="button"
                      className={itemClass}
                      onClick={() => {
                        goToSection(item.href);
                        onClose();
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link to={item.href} className={itemClass} onClick={onClose}>
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-auto border-t border-ivory/[0.08] pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                to="/"
                className="font-serif text-[12px] font-light uppercase tracking-[0.26em] text-gold/80 transition-colors hover:text-gold"
                onClick={onClose}
              >
                Home
              </Link>
            </motion.div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function SiteHeader({ variant = "page" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { goToSection } = useNavActions();
  const { scrollY } = useScroll();
  const tint = useTransform(scrollY, [0, 220], [0, 1]);
  const isCinematic = variant === "cinematic";

  const linkClass = cn(
    "font-serif font-light uppercase transition-colors duration-500 hover:text-ivory",
    isCinematic
      ? "text-[14px] tracking-[0.24em] text-ivory/[0.88] md:text-[16px] md:tracking-[0.26em]"
      : "text-[15px] tracking-[0.22em] text-ivory/70 md:text-[16px]"
  );
  const glow = isCinematic
    ? "drop-shadow-[0_0_12px_hsl(38_55%_48%/0.18)] drop-shadow-[0_1px_8px_hsl(0_0%_0%/0.55)]"
    : "";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-[60]",
          isCinematic ? "pointer-events-none" : "border-b border-ivory/[0.08] bg-night/85 backdrop-blur-md"
        )}
      >
        {isCinematic ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[hsl(350_28%_5%/0.35)] to-transparent"
            style={{ opacity: tint }}
          />
        ) : null}

        <motion.div
          className={cn(
            "relative flex items-center justify-between gap-4",
            isCinematic
              ? "pointer-events-auto px-4 pb-3 pt-safe sm:px-5 md:px-12 md:pt-6"
              : "px-4 py-3 pt-safe sm:px-5 sm:py-4 md:px-12 md:py-5"
          )}
        >
          <Link
            to="/"
            className={cn(
              "transition-opacity hover:opacity-90",
              isCinematic
                ? `font-hand text-[clamp(1.35rem,3.4vw,1.95rem)] leading-none text-ivory ${glow}`
                : "font-serif text-xl font-light tracking-[0.14em] text-ivory md:text-2xl"
            )}
          >
            DashaDay
          </Link>

          <nav className="hidden items-center gap-x-7 md:flex" aria-label="Primary">
            {SITE_NAV_ITEMS.map((item) =>
              item.type === "section" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goToSection(item.href)}
                  className={cn(linkClass, glow, "uppercase")}
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} to={item.href} className={cn(linkClass, glow, "uppercase")}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/90 transition-colors hover:border-gold/35 hover:text-ivory md:hidden",
              glow
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.25} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            )}
          </button>
        </motion.div>
      </motion.header>

      <MobileNavMenu open={menuOpen} onClose={closeMenu} linkClass={linkClass} goToSection={goToSection} />
    </>
  );
}

export default SiteHeader;
