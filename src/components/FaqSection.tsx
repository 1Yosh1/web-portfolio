"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Come funziona la struttura di pagamento?",
    answer:
      "La struttura è semplice e trasparente: versi un acconto del 30% all'avvio dei lavori per riservare lo slot di sviluppo. Durante i lavori non ci sono pagamenti intermedi. Il restante 70% lo saldi solo alla consegna, dopo che hai testato e approvato il sito al 100% prima della pubblicazione online.",
  },
  {
    question: "Chi è il proprietario del sito web e del codice?",
    answer:
      "Tu, al 100%. A fine lavori ti consegno l'intero codice sorgente, l'accesso ai pannelli e la piena titolarità. Non uso licenze proprietarie a canone obbligatorio e non trattengo mai i tuoi file.",
  },
  {
    question: "Chi paga per il dominio e l'hosting ogni anno?",
    answer:
      "Per garantirti la piena proprietà, dominio e hosting sono a carico tuo (in media circa 15 € – 25 € all'anno). Ti guido passo passo nella registrazione e configurazione, così le credenziali e le fatture rimangono intestate direttamente alla tua attività, senza intermediari.",
  },
  {
    question: "Cosa succede dopo il lancio del sito?",
    answer:
      "Ogni pacchetto include un periodo di assistenza gratuita (da 14 a 60 giorni in base alla formula scelta) per correggere qualsiasi dettaglio, effettuare modifiche ai testi o rispondere a dubbi. Se in seguito desideri che continui a seguire il sito, puoi attivare il Piano Manutenzione facoltativo a 39 €/mese.",
  },
  {
    question: "Lavori a Messina o solo da remoto?",
    answer:
      "Ho base a Messina. Possiamo incontrarci di persona se la tua attività si trova a Messina e provincia, oppure gestire l'intero progetto da remoto via WhatsApp, telefono e Google Meet con aggiornamenti quotidiani su link di prova privato.",
  },
  {
    question: "Quanto tempo serve per avere il sito online?",
    answer:
      "I tempi sono certi e indicati chiaramente: da 5 a 7 giorni per il Sito Starter, da 10 a 14 giorni per il pacchetto Business & Prenotazioni, e da 2 a 3 settimane per soluzioni e-commerce o 3D complete.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F4F0E8] border-b border-[#DED9CE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#315B46]">
            <HelpCircle className="w-4 h-4 text-[#315B46]" />
            Domande frequenti
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
            Tutto chiaro, prima di iniziare.
          </h2>
          <p className="text-base text-[#62695F] max-w-xl mx-auto">
            Risposte dirette su pagamenti, proprietà del sito e supporto post-lancio.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#DED9CE] bg-[#FBF9F4] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#20271F]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#315B46] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#62695F] leading-relaxed border-t border-[#DED9CE]/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
