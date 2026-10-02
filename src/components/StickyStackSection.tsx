"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, MessageSquare, PenTool, Rocket, ArrowRight } from "lucide-react";

interface StickyStackProps {
  onOpenContact: (subject?: string) => void;
}

export const StickyStackSection: React.FC<StickyStackProps> = ({ onOpenContact }) => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      step: "01",
      icon: <MessageSquare className="w-4 h-4 text-[#315B46]" />,
      title: "Raccontaci cosa serve alla tua attività",
      duration: "Giorno 1 — Chiamata di 20 minuti",
      description:
        "Una breve conversazione sui tuoi clienti e sugli obiettivi del sito. Gestiamo noi tutte le questioni tecniche — non dovrai mai imparare il nostro gergo.",
      points: [
        "Scriviamo il piano in linguaggio chiaro e semplice",
        "Prezzo fisso concordato prima dell'inizio dei lavori",
        "Nessun pagamento fino all'approvazione del design",
      ],
      action: "Inizia con una chiamata gratuita",
      visual: (
        <div className="h-full rounded-xl bg-[#EAE5DA] border border-[#DED9CE] p-5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#96998E] uppercase tracking-wider pb-2.5 border-b border-[#DED9CE]">
              <span>Il tuo brief</span>
              <span className="text-[#315B46]">Giorno 1</span>
            </div>
            {[
              { w: "w-4/5", label: "“Ho bisogno di prenotazioni senza telefonate”" },
              { w: "w-3/5", label: "“I clienti devono trovarmi su Google”" },
              { w: "w-2/3", label: "“Voglio caparre anticipate”" },
            ].map((item) => (
              <div key={item.label} className={`${item.w} rounded-lg bg-[#FBF9F4] border border-[#DED9CE] px-3.5 py-2.5 text-xs text-[#20271F] font-medium`}>
                {item.label}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#96998E] pt-3">Tu parli. Noi traduciamo in un piano operativo.</div>
        </div>
      ),
    },
    {
      step: "02",
      icon: <PenTool className="w-4 h-4 text-[#315B46]" />,
      title: "Approva il design, poi passiamo al codice",
      duration: "Giorni 2–10 — vedi il sito prendere vita",
      description:
        "Avrai un link di anteprima live già dal secondo giorno e potrai commentare direttamente sulla pagina — senza allegati PDF o scambi infiniti di email. Approvi il design prima che scriviamo una riga di codice.",
      points: [
        "Link di anteprima aggiornato ogni giorno",
        "Revisioni illimitate durante lo sprint",
        "Test completo su smartphone reali prima del lancio",
      ],
      action: "Scopri come si svolge lo sprint",
      visual: (
        <div className="h-full rounded-xl bg-[#20271F] p-5 flex flex-col justify-between overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-white/40 uppercase tracking-wider pb-2.5 border-b border-white/10">
              <span>Anteprima live · bozza-4</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                In sviluppo
              </span>
            </div>
            {[
              { label: "Layout homepage approvato", ok: true },
              { label: "Calendario prenotazioni collegato", ok: true },
              { label: "Rifinitura mobile in corso", ok: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-xs text-white/80 bg-[#FBF9F4]/5 rounded-lg px-3 py-2">
                <span>{row.label}</span>
                <span className={`text-[10px] font-semibold uppercase ${row.ok ? "text-emerald-400" : "text-[#315B46]"}`}>
                  {row.ok ? "Fatto" : "In corso"}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-white/40 pt-3">Il tuo link privato si aggiorna ogni giorno.</div>
        </div>
      ),
    },
    {
      step: "03",
      icon: <Rocket className="w-4 h-4 text-[#315B46]" />,
      title: "Lancio, consegna e il sito è tuo al 100%",
      duration: "Giorno di lancio + supporto gratuito",
      description:
        "Colleghiamo il tuo dominio, andiamo online e ti consegniamo tutto: codice, account e credenziali. Poi hai un periodo di supporto gratuito incluso per qualsiasi necessità o domanda.",
      points: [
        "Proprietà al 100%: codice, dominio e ogni account",
        "14–60 giorni di supporto gratuito in base al pacchetto",
        "Video tutorial dedicato per gestire il sito in autonomia",
      ],
      action: "Prenota la data di lancio",
      visual: (
        <div className="h-full rounded-xl bg-[#EAE5DA] border border-[#DED9CE] p-5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#96998E] uppercase tracking-wider pb-2.5 border-b border-[#DED9CE]">
              <span>Pacchetto consegna</span>
              <span className="text-[#0E8A5F]">Completato</span>
            </div>
            {[
              "Dominio e hosting intestati a te",
              "Repository completo del codice sorgente",
              "Video: come modificare il tuo sito",
              "Periodo di assistenza attivato",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-xs text-[#20271F] font-medium">
                <span className="w-4.5 h-4.5 w-[18px] h-[18px] rounded-full bg-[#E8F5EF] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#0E8A5F]" />
                </span>
                {item}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#96998E] pt-3">È tutto tuo. Nessun vincolo, mai.</div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FBF9F4] border-b border-[#DED9CE] relative overflow-hidden">
      {/* Hairline rails */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl page-rails opacity-70" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Cosa facciamo per te
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
            Tre passaggi. Nessun gergo tecnico.
            <br />
            <span className="text-[#96998E]">Saprai sempre cosa succede dopo.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-2xl">
            Tu ti occupi della tua attività; noi pensiamo al sito. Ecco l'intero percorso dalla prima chiamata al
            giorno del lancio — e ciò che ricevi alla fine.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-12 space-y-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: idx * 0.05 }}
              className="rounded-2xl bg-[#F4F0E8] border border-[#DED9CE] p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left copy */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] flex items-center justify-center">
                      {step.icon}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#96998E]">
                      Passo {step.step} · {step.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#20271F]">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#62695F] leading-relaxed max-w-xl">
                    {step.description}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {step.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-sm text-[#20271F]">
                        <span className="w-[18px] h-[18px] rounded-full bg-[#E3E9DF] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#315B46]" />
                        </span>
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenContact(`Process: ${step.title}`)}
                    className="btn-press mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#20271F] text-white text-sm font-semibold hover:bg-[#315B46] transition-colors cursor-pointer"
                  >
                    <span>{step.action}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right visual */}
                <div className="lg:col-span-5 min-h-[220px]">{step.visual}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
