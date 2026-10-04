"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, ArrowRight } from "lucide-react";
import { PROJECTS, CATEGORIES, Project } from "../data/projectsData";

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenContact: (projectName: string) => void;
}

/** Plain-language "what this site does for its owner" line, keyed by project id. */
const CLIENT_OUTCOMES: Record<string, { result: string; proof: string }> = {
  "yoz-shop": {
    result: "Vende prodotti con un configuratore 3D interattivo su cui i clienti interagiscono",
    proof: "60 FPS su smartphone · catalogo istantaneo",
  },
  "medo-spa": {
    result: "Gestisce prenotazioni trattamenti 24/7 con calendario sincronizzato",
    proof: "Carica in 0.62s · zero doppie prenotazioni",
  },
  "essenza-moda-capelli": {
    result: "Vetrina lookbook per salone parrucchiere a Messina con richiesta appuntamenti",
    proof: "Lighthouse 98/100 · impeccabile su mobile",
  },
  locanda: {
    result: "Menu digitale QR ultra-veloce per ristorante o pizzeria a Messina",
    proof: "Dati Schema.org · carica in 110ms",
  },
  "discover-messina": {
    result: "Guida culturale e mappa interattiva per valorizzare le attività di Messina",
    proof: "84 kB totali · filtri mappa istantanei",
  },
};

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Only play the video of the card under the pointer (saves bandwidth)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (id === playingId) {
        el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    });
  }, [playingId]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const [featured, ...rest] = filteredProjects;

  const springTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", duration: 0.45, bounce: 0.1 };

  const registerVideo = (id: string) => (el: HTMLVideoElement | null) => {
    videoRefs.current[id] = el;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F4F0E8] border-b border-[#DED9CE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#315B46]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#315B46]" />
              Progetti dimostrativi & architetture live
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
              Esempi concreti di ciò che posso
              <br />
              <span className="text-[#96998E]">costruire per la tua attività.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-2xl">
              Progetti dimostrativi funzionanti ed esempi di architettura per attività locali
              — passa sopra con il cursore per vederli in azione.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] overflow-x-auto no-scrollbar self-start lg:self-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`btn-press px-3.5 py-1.5 rounded-md text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#20271F] text-white"
                      : "text-[#62695F] hover:text-[#20271F]"
                  }`}
                >
                  {cat === "All" ? "Tutti i lavori" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured card: full-bleed outcome-first */}
        {featured && (
          <motion.article
            key={featured.id}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={springTransition}
            onMouseEnter={() => setPlayingId(featured.id)}
            onMouseLeave={() => setPlayingId(null)}
            className="mt-12 group rounded-2xl bg-[#FBF9F4] border border-[#DED9CE] overflow-hidden hover:shadow-[0_24px_70px_rgba(32,39,31,0.10)] hover:border-[#20271F]/15 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Video side */}
              <button
                type="button"
                onClick={() => onSelectProject(featured)}
                className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[#EAE5DA] text-left cursor-pointer overflow-hidden"
                aria-label={`Apri caso studio: ${featured.title}`}
              >
                <video
                  ref={registerVideo(featured.id)}
                  src={featured.videoUrlIt || featured.videoUrl}
                  poster={featured.posterUrl || featured.previewUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#FBF9F4]/90 backdrop-blur-sm text-[11px] font-semibold text-[#20271F]">
                    Progetto in evidenza
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#20271F]/85 text-white text-[11px] font-semibold backdrop-blur-sm">
                    {featured.category}
                  </span>
                </div>
              </button>

              {/* Copy side */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#96998E]">
                      {featured.clientType}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {featured.links.github && (
                        <a
                          href={featured.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visualizza ${featured.title} su GitHub`}
                          className="btn-press w-8 h-8 rounded-lg border border-[#DED9CE] text-[#62695F] hover:text-[#20271F] flex items-center justify-center transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {featured.links.live && (
                        <a
                          href={featured.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Apri sito live di ${featured.title}`}
                          className="btn-press w-8 h-8 rounded-lg border border-[#DED9CE] text-[#62695F] hover:text-[#20271F] flex items-center justify-center transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#20271F]">
                      {featured.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#62695F] leading-relaxed max-w-lg">
                      {featured.subtitle}
                    </p>
                  </div>

                  {/* The outcome block */}
                  <div className="rounded-xl bg-[#E3E9DF] border border-[#315B46]/15 p-4 sm:p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#315B46] mb-1.5">
                      Cosa fa per il proprietario
                    </div>
                    <div className="text-sm sm:text-base font-medium text-[#20271F] leading-snug">
                      {CLIENT_OUTCOMES[featured.id]?.result ?? featured.subtitle}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-[#62695F]">
                      {CLIENT_OUTCOMES[featured.id]?.proof}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProject(featured)}
                    className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#20271F] text-white text-sm font-semibold hover:bg-[#315B46] transition-colors cursor-pointer"
                  >
                    Leggi il caso studio
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex flex-wrap gap-1.5">
                    {featured.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium text-[#62695F] bg-[#EAE5DA] px-2 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Remaining cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, idx) => {
            const outcome = CLIENT_OUTCOMES[project.id];
            return (
              <motion.article
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springTransition, delay: idx * 0.05 }}
                onMouseEnter={() => setPlayingId(project.id)}
                onMouseLeave={() => setPlayingId(null)}
                className="group flex flex-col rounded-2xl bg-[#FBF9F4] border border-[#DED9CE] overflow-hidden hover:border-[#20271F]/15 hover:shadow-[0_16px_44px_rgba(32,39,31,0.08)] transition-all duration-300"
              >
                {/* Media */}
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] bg-[#EAE5DA] cursor-pointer overflow-hidden"
                  aria-label={`Apri caso studio: ${project.title}`}
                >
                  <video
                    ref={registerVideo(project.id)}
                    src={project.videoUrlIt || project.videoUrl}
                    poster={project.posterUrl || project.previewUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-[#FBF9F4]/90 backdrop-blur-sm text-[11px] font-semibold text-[#20271F]">
                    {project.category}
                  </span>
                </button>

                {/* Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold tracking-tight text-[#20271F]">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visualizza ${project.title} su GitHub`}
                            className="w-7 h-7 rounded-md text-[#96998E] hover:text-[#20271F] flex items-center justify-center transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Apri sito live di ${project.title}`}
                            className="w-7 h-7 rounded-md text-[#96998E] hover:text-[#20271F] flex items-center justify-center transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-[13px] text-[#96998E]">{project.clientType}</p>
                  </div>

                  {/* Outcome line */}
                  <div className="flex-1">
                    <p className="text-sm text-[#20271F] font-medium leading-snug">
                      {outcome?.result ?? project.subtitle}
                    </p>
                    {outcome && (
                      <p className="mt-1.5 text-xs font-semibold text-[#315B46]">{outcome.proof}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="btn-press w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#DED9CE] text-sm font-semibold text-[#20271F] hover:border-[#20271F] transition-colors cursor-pointer"
                  >
                    <span>Caso studio</span>
                    <ArrowUpRight className="w-4 h-4 text-[#315B46]" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-sm text-[#62695F] max-w-md">
            La tua attività potrebbe essere la prossima su questa pagina — attiva e operativa entro tre settimane.
          </p>
          <a
            href="#pricing"
            className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#20271F] text-white text-sm font-semibold hover:bg-[#315B46] transition-colors whitespace-nowrap"
          >
            Inizia il tuo progetto
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
