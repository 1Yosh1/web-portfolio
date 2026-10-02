"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, X, ExternalLink, CalendarCheck, ShoppingBag, Box } from "lucide-react";
import { PROJECTS, Project } from "../data/projectsData";

interface HeroSectionProps {
  onSelectProject: (project: Project) => void;
}

const OUTCOME_TABS = [
  {
    id: "booking",
    icon: CalendarCheck,
    label: "Prenotazioni",
    headline: "I clienti prenotano online, 24/7 — il telefono smette di squillare",
    bullets: [
      "Scelta servizio, giorno e orario in meno di un minuto",
      "Conferme e promemoria automatici via email",
      "Acconti incassati prima del loro arrivo",
    ],
  },
  {
    id: "store",
    icon: ShoppingBag,
    label: "E-commerce",
    headline: "Vendi a chiunque, ovunque, direttamente dal tuo sito web",
    bullets: [
      "Carrello completo, inventario e codici sconto",
      "Carte, Apple Pay e Google Pay al checkout",
      "Aggiungi tu stesso i prodotti — senza sviluppatori",
    ],
  },
  {
    id: "3d",
    icon: Box,
    label: "3D",
    headline: "Mostra il tuo prodotto in 3D — i clienti possono toccarlo con mano",
    bullets: [
      "Ruota e personalizza gli articoli in tempo reale sullo schermo",
      "Gira a 60 FPS fluidi anche su smartphone",
      "Impossibile da copiare rapidamente dai concorrenti",
    ],
  },
] as const;

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectProject }) => {
  const heroProjects = useMemo(() => PROJECTS.slice(0, 3), []);
  const [activeProject, setActiveProject] = useState<Project>(heroProjects[0]);
  const [videoLang, setVideoLang] = useState<"it" | "en">("it");
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [reelLang, setReelLang] = useState<"en" | "it">("it");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsShowreelOpen(false);
    };
    if (isShowreelOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShowreelOpen]);

  const currentVideoSrc =
    videoLang === "it" && activeProject.videoUrlIt ? activeProject.videoUrlIt : activeProject.videoUrl;

  const motionInitial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 };
  const motionAnimate = { opacity: 1, y: 0 };
  const motionTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.4 };

  return (
    <section id="top" className="relative bg-[#F4F0E8] border-b border-[#DED9CE] overflow-hidden">
      {/* Fine dot-grid backdrop */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 editorial-grain pointer-events-none" aria-hidden="true" />
      {/* Soft blue horizon glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(49,91,70,0.11), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Availability pill */}
        <motion.div
          initial={motionInitial}
          animate={motionAnimate}
          transition={motionTransition}
          className="flex justify-start mb-7"
        >
          <a
            href="#pricing"
            className="btn-press inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full bg-[#E8E8DD] border border-[#D5D6C9] text-[12px] font-medium text-[#20271F] hover:border-[#315B46]/40 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2545FF] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2545FF]" />
            </span>
            <span className="text-[#5A6472]">Accettiamo progetti per questo trimestre</span>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.06 }}
          className="max-w-5xl mr-auto text-left space-y-5"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[96px] font-medium tracking-[-0.065em] leading-[0.94] text-[#20271F]">
            Siti web che portano
            <br className="hidden sm:block" />
            {" "}
            <span className="text-[#315B46] italic font-normal">clienti — non solo complimenti.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#62695F] max-w-2xl mr-auto leading-relaxed">
            Progettiamo e realizziamo il tuo sito web in pochi giorni, non mesi. Prenotazioni online, negozio e-commerce,
            perfino visualizzazioni 3D — tutto funzionante dal primo giorno, da{" "}
            <span className="text-[#20271F] font-semibold">300 € a prezzo fisso</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-start gap-3 pt-3">
            <a
              href="#pricing"
              className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#315B46] text-white text-sm font-semibold hover:bg-[#244634] transition-colors"
            >
              Vedi prezzi e pacchetti
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-[#BFC2B5] text-[#20271F] text-sm font-semibold hover:border-[#0A0D12] transition-colors"
            >
              Guarda i siti dei nostri clienti
            </a>
            <button
              type="button"
              onClick={() => setIsShowreelOpen(true)}
              className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[#62695F] hover:text-[#20271F] text-sm font-semibold transition-colors cursor-pointer"
              aria-label="Guarda lo showreel di Studio Strada"
            >
              <span className="w-6 h-6 rounded-full bg-[#E3E9DF] flex items-center justify-center">
                <Play className="w-3 h-3 fill-[#2545FF] text-[#315B46]" />
              </span>
              Guardalo in azione (28s)
            </button>
          </div>
        </motion.div>

        {/* Flagship video stage + outcome tabs */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.14 }}
          className="mt-14 md:mt-16 max-w-6xl ml-auto"
        >
          {/* Outcome tab bar */}
          <div className="flex items-center justify-center gap-1.5 mb-4 overflow-x-auto no-scrollbar" role="tablist" aria-label="Cosa fa il tuo sito">
            {OUTCOME_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={false}
                  onClick={() => {
                    const target = document.getElementById("outcomes");
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-press shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#E6E8EC] text-[12px] font-semibold text-[#62695F] hover:text-[#20271F] hover:border-[#0A0D12]/20 transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#315B46]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Video card */}
          <div className="rounded-xl border border-[#D8D2C6] bg-[#FBF9F4] shadow-[0_28px_80px_rgba(32,39,31,0.16)] overflow-hidden">
            {/* Stage header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#DED9CE]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Siti clienti in primo piano">
                {heroProjects.map((p) => {
                  const isActive = activeProject.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveProject(p)}
                      className={`btn-press px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#20271F] text-white"
                          : "text-[#62695F] hover:text-[#20271F] hover:bg-[#EAE5DA]"
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>

              {/* Video language toggle */}
              <div className="flex items-center gap-0.5 bg-[#EAE5DA] p-0.5 rounded-md">
                {(["it", "en"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setVideoLang(lang)}
                    className={`btn-press px-2.5 py-0.5 text-[11px] font-semibold uppercase rounded transition-colors cursor-pointer ${
                      videoLang === lang ? "bg-white text-[#0A0D12] shadow-sm" : "text-[#96998E] hover:text-[#0A0D12]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-[16/9] bg-[#EAE5DA] group">
              <video
                key={`${activeProject.id}-${videoLang}`}
                src={currentVideoSrc}
                poster={activeProject.posterUrl || activeProject.previewUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/85 via-[#0A0D12]/10 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">
                      {activeProject.category}
                    </div>
                    <div className="text-white font-semibold text-lg tracking-tight">
                      {activeProject.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectProject(activeProject)}
                    className="btn-press inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0A0D12] text-[13px] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Vedi caso studio
                    <ExternalLink className="w-3.5 h-3.5 text-[#315B46]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-[#5A6472]">
            {[
              "Prezzi fissi — nessuna sorpresa",
              "Online in 5–21 giorni",
              "100% tuo, codice compreso",
              "14–60 giorni di assistenza inclusa",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#2545FF]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Showreel modal */}
      {isShowreelOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0D12]/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel di Studio Strada"
          onClick={() => setIsShowreelOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-[#0A0D12] border border-white/10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold tracking-wide text-white uppercase">
                  Studio Strada · Showreel
                </span>
                <div className="flex items-center gap-0.5 bg-white/10 p-0.5 rounded-md">
                  {(["it", "en"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setReelLang(lang)}
                      className={`btn-press px-2.5 py-0.5 text-[11px] font-semibold uppercase rounded transition-colors cursor-pointer ${
                        reelLang === lang ? "bg-white text-[#0A0D12]" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {lang === "it" ? "IT" : "EN"}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsShowreelOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Chiudi showreel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                key={reelLang}
                src={reelLang === "it" ? "/studio-strada-showcase-it.mp4" : "/studio-strada-showcase.mp4"}
                poster="/studio-strada-showcase.jpg"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
