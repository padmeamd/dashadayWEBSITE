import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const NEWSLETTER_INBOX = "dlaremetra@gmail.com";
const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${encodeURIComponent(NEWSLETTER_INBOX)}`;

const NewsletterSignup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setIsSubmitting(true);
    try {
      const trimmed = email.trim();
      const res = await fetch(FORMSUBMIT_AJAX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmed,
          _replyto: trimmed,
          _subject: "[Newsletter] New signup",
          message: `Newsletter signup — ${trimmed}`,
          _captcha: false,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.message || data.error || "Could not subscribe right now.");
      }

      toast.success("You are on the list. Thank you.");
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto mb-16 md:mb-20"
    >
      <div className="relative border border-ivory/15 bg-night-soft/40 px-6 py-10 md:px-10 md:py-12 text-center">
        <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
        <h2 className="text-editorial-display text-2xl md:text-3xl text-ivory mb-3 tracking-tight">
          The Things I Shouldn&apos;t Say letter
        </h2>
        <p className="text-ivory/45 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
          New drops, live dates, and behind-the-scenes notes—no spam, just the good stuff.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="newsletter-company">Company</label>
            <input
              id="newsletter-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 min-w-0 bg-transparent border border-ivory/20 px-4 py-3 text-ivory text-sm placeholder:text-ivory/25 focus:border-ivory/20 focus:outline-none focus:ring-0 text-left"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-gold/50 px-6 py-3 text-xs uppercase tracking-widest text-gold transition-all duration-500 hover:bg-gold/10 disabled:pointer-events-none disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {isSubmitting ? "Joining…" : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;
