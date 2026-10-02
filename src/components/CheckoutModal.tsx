"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface CheckoutPayload {
  tierId: string;
  tierName: string;
  totalAmount: number;
  depositAmount: number;
  billingPeriod: "one-time" | "monthly";
  deliveryTime?: string;
  includedFeatures?: string[];
  isCustomQuote?: boolean;
}

interface ReceiptData {
  transactionId: string;
  tierName: string;
  depositAmount: number;
  totalProjectAmount: number;
  clientName: string;
  clientEmail: string;
  timestamp: string;
}

interface CheckoutModalProps {
  payload: CheckoutPayload | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  payload,
  onClose,
}) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (payload) {
      triggerRef.current = document.activeElement;
    }
  }, [payload]);

  useEffect(() => {
    if (!payload) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
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

    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLInputElement>("input");
      firstInput?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [payload, onClose]);

  if (!payload) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) {
      setError("Inserisci il tuo nome e indirizzo email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId: payload.tierId,
          tierName: payload.tierName,
          amount: payload.totalAmount,
          depositAmount: payload.depositAmount,
          clientName,
          clientEmail,
          projectDetails: `${businessName ? businessName + " - " : ""}${projectBrief || payload.tierName}`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.simulated) {
        setReceipt(data.receipt);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Impossibile avviare il pagamento";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copyReceiptId = () => {
    if (receipt?.transactionId) {
      navigator.clipboard.writeText(receipt.transactionId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-[#20271F]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        className="relative w-full max-w-lg rounded-2xl bg-[#FBF9F4] border border-[#DED9CE] shadow-[0_32px_90px_rgba(32,39,31,0.28)] z-10 text-[#20271F] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DED9CE]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#315B46]" />
            <h2 id="checkout-modal-title" className="font-semibold text-sm text-[#20271F]">
              {receipt ? "Posto riservato" : "Riserva il tuo posto"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi finestra di pagamento"
            className="btn-press w-8 h-8 flex items-center justify-center rounded-lg border border-[#DED9CE] hover:bg-[#EAE5DA] text-[#20271F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {receipt ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EF] flex items-center justify-center mx-auto text-[#0E8A5F]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#20271F]">
                Sei nel nostro calendario
              </h3>
              <p className="text-sm text-[#62695F] mt-1.5 max-w-md mx-auto leading-relaxed">
                Grazie, <span className="text-[#20271F] font-semibold">{receipt.clientName}</span>.
                Il tuo posto per <span className="text-[#20271F] font-semibold">{receipt.tierName}</span> è
                riservato. A breve riceverai i dettagli per l'avvio via email.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F4F0E8] border border-[#DED9CE] text-left space-y-2.5 text-[13px]">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#DED9CE]">
                <span className="text-[#62695F]">Riferimento:</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#20271F]">
                  <span className="font-mono">{receipt.transactionId}</span>
                  <button
                    type="button"
                    onClick={copyReceiptId}
                    aria-label="Copia ID transazione"
                    className="btn-press text-[#96998E] hover:text-[#20271F] cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#0E8A5F]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#62695F]">Acconto oggi:</span>
                <span className="text-[#0E8A5F] font-semibold">€{receipt.depositAmount}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#62695F]">Totale progetto:</span>
                <span className="text-[#20271F] font-semibold">€{receipt.totalProjectAmount}</span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-[#DED9CE] text-[#62695F]">
                <span>Conferma inviata a:</span>
                <span className="text-[#20271F] font-medium">{receipt.clientEmail}</span>
              </div>
            </div>

            <div className="text-xs text-[#62695F] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E8A5F]" />
              <span>Prossimo passo: invito di avvio entro 24 ore</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-press w-full min-h-[44px] py-3 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-sm transition-colors cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="p-6 space-y-5">
            {/* Order summary */}
            <div className="p-4 rounded-xl bg-[#F4F0E8] border border-[#DED9CE] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#96998E] uppercase tracking-wider">
                    Il tuo pacchetto
                  </div>
                  <div className="font-semibold text-[#20271F] text-sm">
                    {payload.tierName}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-semibold text-[#96998E] uppercase tracking-wider">
                    Totale
                  </div>
                  <div className="text-base font-semibold text-[#20271F]">
                    €{payload.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#E3E9DF] flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-1.5 text-[#315B46] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acconto oggi (30%):</span>
                </div>
                <div className="text-[#315B46] font-semibold">
                  €{payload.depositAmount.toLocaleString()}
                </div>
              </div>

              <div className="text-[11px] text-[#96998E]">
                Il saldo viene fatturato all'approvazione del design (40%) e al lancio (30%). Nulla è
                dovuto in caso di disdetta prima dell'approvazione del design.
              </div>
            </div>

            {error && (
              <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <label htmlFor="checkout-name" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Nome e cognome *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  aria-required="true"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="es. Marco Rossi"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="checkout-email" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                    Email *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    aria-required="true"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="marco@tuodominio.it"
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-business" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                    Nome dell'attività
                  </label>
                  <input
                    id="checkout-business"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="es. Yoz Skate Co."
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-brief" className="block text-[12px] font-semibold text-[#20271F] mb-1.5">
                  Altre informazioni o note? (opzionale)
                </label>
                <textarea
                  id="checkout-brief"
                  rows={2}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Data di lancio desiderata, domande, richieste specifiche..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-sm text-[#20271F] placeholder:text-[#96998E] focus:outline-none focus:border-[#315B46] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#96998E]">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Checkout sicuro con Stripe · 100% proprietà del codice alla consegna</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-press w-full min-h-[46px] py-3 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Connessione a Stripe in corso...</span>
              ) : (
                <>
                  <span>Riserva per €{payload.depositAmount.toLocaleString()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
