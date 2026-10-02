"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  Phone,
  Mail,
  CreditCard,
  MapPin,
  Gauge,
  Smartphone,
  Search,
  ShoppingBag,
  Box,
  Star,
  Wallet,
} from "lucide-react";

interface Outcome {
  icon: React.ReactNode;
  title: string;
  description: string;
  proof: string;
}

const OUTCOMES: Outcome[] = [
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Prenotazioni mentre dormi",
    description:
      "I clienti scelgono servizio, giorno e orario online — giorno e notte. Ricevi la prenotazione, loro ricevono conferma via email. Addio telefonate a vuoto.",
    proof: "Medo Spa: prenotazioni raddoppiate, chiamate ridotte del 65%",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Meno chiamate tipo «a che ora aprite?»",
    description:
      "Orari, listino prezzi, menu e risposte alle domande frequenti sono sul sito — così le chiamate che ricevi sono solo quelle che contano davvero.",
    proof: "Menu e listini si caricano in meno di un secondo",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Pagati prima del loro arrivo",
    description:
      "Accetta acconti o saldo completo online con carta, Apple Pay o Google Pay. Le disdette dell'ultimo minuto crollano quando c'è una caparra.",
    proof: "Checkout Stripe integrato in ogni flusso di prenotazione",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Trovati su Google Maps",
    description:
      "Configuriamo scheda Google Business, posizione su Maps e snippet di ricerca per far trovare te a chi cerca nelle vicinanze, non la concorrenza.",
    proof: "La Locanda: oltre 4.200 visualizzazioni menu al mese da Google",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Velocità per non perdere visite",
    description:
      "La metà degli utenti abbandona un sito se impiega più di 3 secondi. I nostri caricano in meno di uno — persino in 3G o con Wi-Fi lento.",
    proof: "Caricamento istantaneo, punteggio Lighthouse 95+",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Perfetto su qualsiasi smartphone",
    description:
      "La maggior parte dei clienti ti scoprirà da mobile. Ogni schermata nasce ottimizzata per smartphone e testata su dispositivi reali.",
    proof: "Testato su iOS Safari e Android Chrome",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "Posizionati per ciò che vendi",
    description:
      "Dati strutturati, parole chiave locali e codice leggero — l'ottimizzazione tecnica essenziale che decide se Google ti premia o ti nasconde.",
    proof: "Dati strutturati Schema.org inclusi in ogni progetto",
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Vendi senza un negozio fisico",
    description:
      "E-commerce completo: carrello, magazzino, coupon e pagamento istantaneo. Aggiungi nuovi prodotti dal telefono in due minuti.",
    proof: "Video tutorial guidato incluso con ogni negozio",
  },
  {
    icon: <Box className="w-5 h-5" />,
    title: "Effetto 3D unico e inimitabile",
    description:
      "I clienti ruotano, personalizzano ed esplorano i tuoi prodotti sullo schermo. Memorabile, coinvolgente e difficile da replicare per gli altri.",
    proof: "The Yoz Shop: configuratore 3D a 60 FPS su iPhone",
  },
];

export const BentoSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="outcomes" className="py-20 md:py-28 bg-[#F4F0E8] border-b border-[#DED9CE]">
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
            Cosa fa il tuo sito per te
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
            Un sito web non è una brochure.
            <br />
            <span className="text-[#96998E]">È il tuo collaboratore più instancabile.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-2xl">
            Ogni sito che consegniamo ha un obiettivo preciso: raccoglie prenotazioni, vende prodotti, risponde a domande e
            porta clienti nel tuo locale o studio. Ecco cosa farà il tuo.
          </p>
        </motion.div>

        {/* Outcomes grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OUTCOMES.map((outcome, idx) => (
            <motion.div
              key={outcome.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: (idx % 3) * 0.06 }}
              className="group relative rounded-xl bg-[#FBF9F4] border border-[#DED9CE] p-6 hover:border-[#315B46]/40 hover:shadow-[0_12px_36px_rgba(49,91,70,0.08)] transition-all duration-200 flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E3E9DF] text-[#315B46] flex items-center justify-center mb-5 group-hover:bg-[#315B46] group-hover:text-white transition-all duration-200">
                {outcome.icon}
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-[#20271F] mb-2">
                {outcome.title}
              </h3>
              <p className="text-sm text-[#62695F] leading-relaxed flex-1">
                {outcome.description}
              </p>

              <div className="mt-5 pt-4 border-t border-[#DED9CE] flex items-start gap-2">
                <Star className="w-3.5 h-3.5 fill-[#315B46] text-[#315B46] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-[#20271F] leading-snug">{outcome.proof}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom assurance line */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
          className="mt-10 rounded-xl bg-[#20271F] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <Wallet className="w-5 h-5 text-[#315B46] shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold tracking-tight">
                Se il tuo sito non genera valore, non abbiamo fatto il nostro lavoro.
              </div>
              <div className="text-sm text-white/60 mt-0.5">
                Ecco perché ogni pacchetto è pensato per ripagarsi da solo — vedi i dettagli sotto.
              </div>
            </div>
          </div>
          <a
            href="#pricing"
            className="btn-press shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FBF9F4] text-[#20271F] text-sm font-semibold hover:bg-[#E3E9DF] transition-colors"
          >
            Vedi pacchetti
          </a>
        </motion.div>
      </div>
    </section>
  );
};
