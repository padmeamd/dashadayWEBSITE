import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [80, 280], [0, 1]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { label: "Music", href: "#music", isSection: true },
    { label: "Lyrics", href: "#lyrics", isSection: true },
    { label: "Visuals", href: "#visuals", isSection: true },
    { label: "DAYD Media", href: "/dayd-media", isSection: false },
    { label: "Contact", href: "/contact", isSection: false },
  ];

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkClass = cn(
    "link-subtle tracking-[0.2em] uppercase transition-colors duration-500",
    isHomePage
      ? "text-[13px] text-ivory/[0.94] hover:text-ivory md:text-[15px] md:tracking-[0.22em] drop-shadow-[0_1px_10px_hsl(0_0%_0%/0.55)]"
      : "text-[13px] text-ivory/60 hover:text-ivory md:text-[14px]"
  );

  return (
    <motion.nav
      className={cn(
        "relative fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-14 md:py-6",
        isHomePage
          ? "border-b border-ivory/[0.12] shadow-[0_12px_40px_hsl(0_0%_0%/0.22)]"
          : "bg-night/80 backdrop-blur-sm"
      )}
    >
      {isHomePage ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-night/90 backdrop-blur-md"
          style={{ opacity: navBgOpacity }}
        />
      ) : null}
      <Link
        to="/"
        className={cn(
          "transition-colors duration-500 hover:text-gold",
          isHomePage
            ? "font-serif text-xl font-light tracking-[0.14em] text-ivory drop-shadow-[0_2px_14px_hsl(0_0%_0%/0.72),0_0_1px_hsl(40_20%_96%/0.35)] md:text-2xl"
            : "text-editorial text-sm tracking-[0.3em] text-ivory/80"
        )}
      >
        DashaDay
      </Link>

      <div className="flex items-center gap-4 md:gap-8 lg:gap-10">
        {navItems.map((item) =>
          item.isSection ? (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className={cn(linkClass, "hidden md:block")}
            >
              {item.label}
            </button>
          ) : (
            <Link key={item.label} to={item.href} className={linkClass}>
              {item.label}
            </Link>
          )
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
