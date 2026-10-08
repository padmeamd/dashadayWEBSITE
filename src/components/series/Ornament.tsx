import { cn } from "@/lib/utils";

/**
 * Victorian book-plate rule: two hairlines running out from a small
 * diamond-and-leaf ornament. Purely decorative.
 */
const Ornament = ({ className, width = "max-w-md" }: { className?: string; width?: string }) => (
  <div className={cn("mx-auto flex w-full items-center justify-center gap-4", width, className)} aria-hidden>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
    <svg viewBox="0 0 48 12" className="h-3 w-12 shrink-0 text-gold/45" fill="none" stroke="currentColor">
      <path d="M4 6c4-4 8-4 12 0-4 4-8 4-12 0Z" strokeWidth=".7" />
      <path d="M44 6c-4-4-8-4-12 0 4 4 8 4 12 0Z" strokeWidth=".7" />
      <path d="M24 1.5 27 6l-3 4.5L21 6l3-4.5Z" strokeWidth=".7" fill="currentColor" fillOpacity=".35" />
      <path d="M17.5 6h2.2M28.3 6h2.2" strokeWidth=".7" strokeLinecap="round" />
    </svg>
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
  </div>
);

export default Ornament;
