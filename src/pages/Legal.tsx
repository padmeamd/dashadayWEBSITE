import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";
import Seo from "@/components/Seo";

/**
 * Privacy policy and terms, on one component because they are the same shape.
 *
 * Written from what the site actually does, not from a template: Google checks
 * that a policy matches an app's real data use, and a page claiming analytics
 * we do not run would be worse than no page. What is described here was read
 * off the code — AdSense in index.html, the two forms that post to FormSubmit —
 * so it stays true only as long as that does.
 */

const UPDATED = "24 October 2026";
const CONTACT = "dashadaymanagement@gmail.com";

type Block = { heading: string; body: string[] };

const PRIVACY: Block[] = [
  {
    heading: "The short version",
    body: [
      "This is a personal site for an independent artist. There are no accounts, no logins and no profiles. I do not sell anything about you, because I do not have anything about you to sell.",
      "Two things do collect data: Google AdSense, which shows the advertising on some pages, and the two forms below, which exist so you can write to me.",
    ],
  },
  {
    heading: "When you write to me",
    body: [
      "The contact form asks for your name, your email address, a subject and a message. The newsletter form asks for your email address alone.",
      "Both are delivered by FormSubmit, a form-handling service, which passes them on to my inbox. I use what you send to answer you, and for the newsletter, to send you occasional messages about new work. Nothing is passed to anyone else.",
      "Ask me to delete what you have sent and I will. Write to " + CONTACT + ".",
    ],
  },
  {
    heading: "Advertising",
    body: [
      "Some pages carry advertising through Google AdSense. Google and its partners may set cookies and use them to show advertising based on your previous visits to this and other sites.",
      "You can turn personalised advertising off at google.com/settings/ads, and you can refuse cookies in your browser. The site works either way.",
    ],
  },
  {
    heading: "Hosting",
    body: [
      "The site is served by Cloudflare Pages. Like any web host, it logs requests — addresses, times, which pages were asked for — to keep the site up and to stop abuse. I do not use those logs for anything else.",
    ],
  },
  {
    heading: "What I do not do",
    body: [
      "No analytics beyond what AdSense and the host do on their own. No tracking pixels of my own. No selling or sharing of email addresses. No profiling.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is not aimed at children under 13, and I do not knowingly collect anything from them.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this changes, the date at the top changes with it. Anything substantial will be said plainly rather than buried.",
    ],
  },
];

const TERMS: Block[] = [
  {
    heading: "What this is",
    body: [
      "heydashaday.com is the website of Dasha Day, an independent artist, songwriter and filmmaker. It exists to share music, films and the series Things I Shouldn't Say.",
    ],
  },
  {
    heading: "The work on it",
    body: [
      "The music, films, images, writing and the world of Alderwick are mine, and are protected by copyright. You are welcome to watch, listen, link and share the pages themselves.",
      "You may not re-upload the work as your own, use it in advertising, train models on it, or sell it, without my written permission. Ask: the answer is sometimes yes.",
    ],
  },
  {
    heading: "Links away from here",
    body: [
      "Some links lead to YouTube, Spotify, Instagram, Telegram and others. What happens there is governed by their terms, not mine.",
    ],
  },
  {
    heading: "What I can promise",
    body: [
      "The site is offered as it is. I keep it working and accurate as best I can, but I cannot promise it will never be down, and nothing here is professional advice of any kind.",
    ],
  },
  {
    heading: "Getting in touch",
    body: [
      "For permissions, corrections, press or anything else: " + CONTACT + ".",
    ],
  },
];

const Legal = () => {
  const { pathname } = useLocation();
  const isTerms = pathname.startsWith("/terms");
  const blocks = isTerms ? TERMS : PRIVACY;
  const title = isTerms ? "Terms of Use" : "Privacy Policy";

  return (
    <main className="relative min-h-screen overflow-hidden bg-night">
      <Seo />
      <FilmGrain />
      <LightLeaksOverlay />

      <div className="shell band relative z-10">
        <Link
          to="/"
          className="tap tap-pad inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.26em] text-ivory/55 no-underline transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <h1 className="font-serif text-[clamp(2rem,6vw,3rem)] font-light leading-none tracking-[0.04em] text-ivory">
            {title}
          </h1>
          <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.26em] text-gold/70">
            Last updated {UPDATED}
          </p>

          <div className="mt-12 max-w-[68ch]">
            {blocks.map((block) => (
              <section key={block.heading} className="mb-10">
                <h2 className="font-serif text-[1.25rem] font-light tracking-[0.02em] text-ivory/90">
                  {block.heading}
                </h2>
                {block.body.map((line) => (
                  <p key={line.slice(0, 40)} className="mt-4 text-[0.98rem] leading-[1.75] text-ivory/65">
                    {line}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-6 border-t border-ivory/10 pt-8 font-sans text-[12px] leading-relaxed text-ivory/40">
            {isTerms ? (
              <>Looking for the privacy policy? <Link to="/privacy" className="text-gold/80 underline underline-offset-4">It is here</Link>.</>
            ) : (
              <>Looking for the terms? <Link to="/terms" className="text-gold/80 underline underline-offset-4">They are here</Link>.</>
            )}
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Legal;
