import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const CONTACT_INBOX = "dlaremetra@gmail.com";
const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_INBOX)}`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSUBMIT_AJAX_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          _subject: `[Site contact] ${formData.subject.trim()}`,
          message: formData.message.trim(),
          _captcha: false,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.message || data.error || "Could not send your message.");
      }

      toast.success("Message sent. We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-8 md:px-16 py-24">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-hero text-editorial-display text-ivory mb-4">
              Get in Touch
            </h1>
            <div className="w-24 h-px bg-gold/50 mx-auto mb-8" />
            <p className="text-ivory/50 text-lg max-w-2xl mx-auto">
              Have a creative project in mind? Want to collaborate? 
              Drop a message and let's create something beautiful together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-ivory/40 text-sm tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-base text-ivory focus:border-ivory/20 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ivory/40 text-sm tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-base text-ivory focus:border-ivory/20 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ivory/40 text-sm tracking-widest uppercase mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-base text-ivory focus:border-ivory/20 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-ivory/40 text-sm tracking-widest uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full bg-transparent border border-ivory/20 px-4 py-3 text-base text-ivory focus:border-ivory/20 focus:outline-none focus:ring-0 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-500 text-base tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-ivory/40 text-xs tracking-widest uppercase mb-6">
                  Direct Contact
                </h3>
                <a
                  href="mailto:hello@dashaday.com"
                  className="flex items-center gap-4 text-ivory hover:text-gold transition-colors group"
                >
                  <Mail className="w-5 h-5 text-gold" />
                  <span className="text-lg">hello@dashaday.com</span>
                </a>
              </div>

              <div>
                <h3 className="text-ivory/40 text-xs tracking-widest uppercase mb-6">
                  Social Media
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://instagram.com/dashaday"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-gold" />
                    <span>@dashaday</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors group"
                  >
                    <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                  </a>
                </div>
              </div>

              <div className="p-8 border border-ivory/10 bg-night/50">
                <h3 className="text-ivory text-lg font-serif mb-4">
                  For Business Inquiries
                </h3>
                <p className="text-ivory/50 text-sm leading-relaxed">
                  For collaborations, licensing, or press inquiries, 
                  please reach out via email with your proposal. 
                  We typically respond within 48 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
