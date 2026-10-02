"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prefillSubject?: string;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  prefillSubject = "",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(prefillSubject);
  const [budget, setBudget] = useState("€500 (Business & Booking)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefillSubject) {
      setSubject(prefillSubject);
    }
  }, [prefillSubject]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    setTimeout(() => firstInputRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // POST to the existing /api/contact route (previously pointed at
      // /api/inquiries which does not exist, so submissions always failed)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, budget, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send your message");
      }

      setSubmitted(true);
      if (typeof window !== "undefined") {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending your message";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20271F]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-drawer-title"
        className="relative w-full max-w-lg h-full bg-[#FBF9F4] border-l border-[#DED9CE] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-[#20271F] z-10 shadow-2xl"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#DED9CE]">
            <div>
              <h2 id="contact-drawer-title" className="text-lg font-semibold tracking-tight text-[#20271F]">
                Parlaci del tuo progetto
              </h2>
              <p className="text-xs text-[#62695F] mt-0.5">
                Preventivo a prezzo fisso e data di lancio entro 24 ore.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi modulo di contatto"
              className="btn-press w-8 h-8 flex items-center justify-center rounded-lg border border-[#DED9CE] hover:bg-[#EAE5DA] text-[#20271F] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8F5EF] flex items-center justify-center mx-auto text-[#0E8A5F]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#20271F]">
                Messaggio inviato
              </h3>
              <p className="text-sm text-[#62695F] max-w-xs mx-auto leading-relaxed">
                Grazie, <span className="text-[#20271F] font-semibold">{name}</span>. Esamineremo
                la tua richiesta e risponderemo entro 12 ore con i prossimi passi.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-press mt-4 min-h-[42px] px-6 py-2.5 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-sm transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">
              <p className="text-[13px] text-[#62695F] leading-relaxed">
                Nessun gergo tecnico — descrivi solo ciò che desideri che il sito faccia per la tua
                attività. Lo tradurremo noi in un piano operativo.
              </p>

              {error && (
                <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Nome e cognome *
                </label>
                <input
                  id="contact-name"
                  ref={firstInputRef}
                  type="text"
                  required
                  aria-required="true"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="es. Marco Rossi"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marco@tuodominio.it"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Di cosa hai bisogno?
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="es. Prenotazioni online per il mio salone"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-budget" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Budget stimato
                </label>
                <select
                  id="contact-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-[13px] font-medium text-[#20271F] focus:outline-none focus:border-[#315B46] transition-colors cursor-pointer"
                >
                  <option value="€300 (Starter Website)">300 € — Sito Starter</option>
                  <option value="€500 (Business & Booking)">500 € — Business & Prenotazioni</option>
                  <option value="€700 (E-Commerce & 3D Flagship)">700 € — E-Commerce & Vetrina 3D</option>
                  <option value="Custom Request">Richiesta personalizzata</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Descrizione del progetto *
                </label>
                <textarea
                  id="contact-message"
                  required
                  aria-required="true"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cosa dovrebbe fare il tuo sito? Hai scadenze particolari o esempi di siti che ti piacciono?"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-press w-full min-h-[46px] py-3 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Invio in corso...</span>
                ) : (
                  <>
                    <span>Invia la richiesta di progetto</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[#DED9CE] text-[11px] text-[#96998E] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#315B46]" />
            <span>Risposta media: entro 2 ore</span>
          </span>
          <span>Accordo di riservatezza (NDA) disponibile</span>
        </div>
      </div>
    </div>
  );
};
