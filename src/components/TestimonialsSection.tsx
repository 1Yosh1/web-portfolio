"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonialsData";

export const TestimonialsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F4F0E8] border-b border-[#DED9CE]">
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
            Cosa dicono i clienti dopo il lancio
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
            I risultati parlano da soli.
            <br />
            <span className="text-[#96998E]">Con i loro numeri, non con le nostre parole.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-2xl">
            Ognuna delle attività qui sotto utilizza un sito web Studio Strada attivo e operativo.
            Questi sono i loro dati reali dal momento del lancio.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: (idx % 2) * 0.06 }}
              className="flex flex-col rounded-2xl bg-[#FBF9F4] border border-[#DED9CE] p-7 sm:p-9 hover:border-[#20271F]/15 hover:shadow-[0_16px_44px_rgba(32,39,31,0.08)] transition-all duration-300"
            >
              {/* Result highlight */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E3E9DF] text-[13px] font-semibold text-[#315B46]">
                  <Star className="w-3.5 h-3.5 fill-[#315B46]" />
                  {item.highlight}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#20271F] text-[#20271F]" />
                  ))}
                </div>
              </div>

              <Quote className="w-5 h-5 text-[#DED9CE] mb-3" aria-hidden="true" />

              <blockquote className="text-base sm:text-lg text-[#20271F] leading-relaxed flex-1">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-7 pt-6 border-t border-[#DED9CE] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.clientName}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border border-[#DED9CE]"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#20271F]">{item.clientName}</div>
                    <div className="text-xs text-[#62695F]">
                      {item.role}, {item.company}
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-medium text-[#96998E] bg-[#EAE5DA] px-2.5 py-1 rounded-md">
                  {item.project}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
