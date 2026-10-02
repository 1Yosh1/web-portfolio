"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ArrowRight,
  CalendarCheck,
  ShoppingBag,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { PRICING_TIERS, MILESTONES } from "../data/pricingData";
import { CheckoutPayload } from "./CheckoutModal";

interface PaymentSectionProps {
  onSelectTier: (payload: CheckoutPayload) => void;
  onOpenContact: (subject?: string) => void;
}

const TIER_ICONS = [Rocket, CalendarCheck, ShoppingBag];

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  onSelectTier,
  onOpenContact,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#FBF9F4] border-b border-[#DED9CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
          className="max-w-3xl space-y-4"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#315B46]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315B46]" />
            Prezzi fissi, scegli il tuo pacchetto
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
            Un solo prezzo. Tutto incluso.
            <br />
            <span className="text-[#96998E]">Nessuna sorpresa dopo.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-2xl">
            Il prezzo che vedi è quello finale — design, sviluppo, lancio e supporto inclusi.
            Il 30% riserva il tuo sprint, il resto lo saldi solo quando sei soddisfatto al 100%.
          </p>
        </motion.div>

        {/* Three package cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            const Icon = TIER_ICONS[idx % TIER_ICONS.length];
            const deposit = Math.round(tier.price * (tier.depositPercent / 100));
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: idx * 0.07 }}
                className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 transition-shadow duration-300 ${
                  isPopular
                    ? "bg-[#20271F] text-white border-[#20271F] shadow-[0_24px_70px_rgba(32,39,31,0.25)]"
                    : "bg-[#FBF9F4] border-[#DED9CE] hover:shadow-[0_16px_44px_rgba(32,39,31,0.08)]"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#315B46] text-white text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                    Il più scelto
                  </span>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isPopular ? "bg-[#FBF9F4]/10" : "bg-[#E3E9DF]"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isPopular ? "text-[#7B93FF]" : "text-[#315B46]"}`} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      isPopular ? "bg-[#FBF9F4]/10 text-white/70" : "bg-[#EAE5DA] text-[#62695F]"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-semibold tracking-tight ${isPopular ? "text-white" : "text-[#20271F]"}`}>
                  {tier.name}
                </h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${isPopular ? "text-white/60" : "text-[#62695F]"}`}>
                  {tier.tagline}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`text-[44px] leading-none font-semibold tracking-[-0.02em] ${isPopular ? "text-white" : "text-[#20271F]"}`}>
                    €{tier.price}
                  </span>
                  <span className={`text-sm font-medium ${isPopular ? "text-white/50" : "text-[#96998E]"}`}>
                    una tantum
                  </span>
                  <span
                    className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-md ${
                      isPopular ? "bg-[#FBF9F4]/10 text-white/80" : "bg-[#EAE5DA] text-[#20271F]"
                    }`}
                  >
                    {tier.deliveryTime}
                  </span>
                </div>

                <div className={`mt-2 text-xs font-medium flex items-center gap-1.5 ${isPopular ? "text-[#7B93FF]" : "text-[#0E8A5F]"}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Riserva ora con {deposit} € — saldi alla consegna
                </div>

                {/* Features */}
                <div className={`mt-7 pt-6 border-t space-y-3 flex-1 ${isPopular ? "border-white/10" : "border-[#DED9CE]"}`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${isPopular ? "text-white/40" : "text-[#96998E]"}`}>
                    Cosa ottieni
                  </div>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <span
                        className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isPopular ? "bg-[#315B46]/30" : "bg-[#E3E9DF]"
                        }`}
                      >
                        <Check className={`w-3 h-3 ${isPopular ? "text-[#7B93FF]" : "text-[#315B46]"}`} />
                      </span>
                      <span className={`text-[13px] leading-snug ${isPopular ? "text-white/85" : "text-[#20271F]"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ideal for */}
                <div className={`mt-6 text-xs leading-relaxed ${isPopular ? "text-white/50" : "text-[#96998E]"}`}>
                  <span className="font-semibold">Ideale per:</span> {tier.idealFor}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectTier({
                      tierId: tier.id,
                      tierName: tier.name,
                      totalAmount: tier.price,
                      depositAmount: deposit,
                      billingPeriod: tier.billingPeriod,
                      deliveryTime: tier.deliveryTime,
                      includedFeatures: tier.features,
                    })
                  }
                  className={`btn-press mt-7 w-full min-h-[46px] py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    isPopular
                      ? "bg-[#FBF9F4] text-[#20271F] hover:bg-[#E3E9DF]"
                      : "bg-[#20271F] text-white hover:bg-[#315B46]"
                  }`}
                >
                  <span>Scegli questo pacchetto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Payment milestones */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold tracking-tight text-[#20271F]">
              Come funziona il pagamento
            </h3>
            <span className="text-xs font-medium text-[#96998E]">
              Approvi ogni fase prima di saldare la tranche successiva
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MILESTONES.map((milestone) => (
              <div
                key={milestone.step}
                className="rounded-xl bg-[#F4F0E8] border border-[#DED9CE] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#315B46] font-mono">
                    {milestone.step}
                  </span>
                  <span className="text-xs font-semibold text-[#20271F] bg-[#FBF9F4] border border-[#DED9CE] px-2 py-0.5 rounded-md">
                    {milestone.percent}%
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#20271F] mb-1.5">{milestone.phase}</div>
                <p className="text-xs text-[#62695F] leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Custom project banner */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
          className="mt-6 rounded-xl border border-[#DED9CE] bg-[#F4F0E8] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#20271F]">
              Hai in mente qualcosa di diverso o più grande?
            </h3>
            <p className="text-sm text-[#62695F] mt-1 max-w-2xl leading-relaxed">
              Siti multilingua, portali su misura, configuratori 3D o piattaforme complesse —
              spiegaci la tua idea e la quantificheremo con chiarezza e trasparenza.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenContact("Richiesta Progetto Personalizzato")}
            className="btn-press shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#20271F] text-white text-sm font-semibold hover:bg-[#315B46] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Parlaci del tuo progetto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
