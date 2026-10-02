"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Activity,
  ArrowRight,
  Layers,
  Target,
} from "lucide-react";
import { Project } from "../data/projectsData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [mediaFormat, setMediaFormat] = useState<"video" | "gif">("video");
  const [videoLang, setVideoLang] = useState<"en" | "it">("it");

  useEffect(() => {
    if (project) {
      triggerRef.current = document.activeElement;
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

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
      const closeBtn = modalRef.current?.querySelector<HTMLElement>(
        'button[aria-label="Close project modal"]'
      );
      closeBtn?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const displayUrl = project.links.live
    ? project.links.live.replace(/^https?:\/\//, "")
    : `${project.id}.production.app`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#20271F]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FBF9F4] border border-[#DED9CE] shadow-[0_32px_90px_rgba(32,39,31,0.28)] z-10 text-[#20271F]"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 px-5 sm:px-7 py-3.5 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#DED9CE] rounded-t-2xl">
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            <span className="px-2.5 py-1 rounded-md bg-[#EAE5DA] text-[11px] font-semibold text-[#62695F]">
              {project.category}
            </span>
            <h2 id="project-modal-title" className="text-sm font-semibold text-[#20271F] truncate">
              {project.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8F5EF] text-[10px] font-semibold text-[#0E8A5F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A5F]" />
              Online & operativo
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi scheda progetto"
            className="btn-press w-8 h-8 flex items-center justify-center rounded-lg border border-[#DED9CE] hover:bg-[#EAE5DA] text-[#20271F] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT: media + numbers */}
            <div className="lg:col-span-6 space-y-5">
              {/* Media card */}
              <div className="rounded-xl border border-[#DED9CE] p-3.5 space-y-3 bg-[#F4F0E8]">
                {/* Media toolbar */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#FBF9F4] border border-[#DED9CE] text-[11px] font-medium text-[#62695F] max-w-[220px] truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A5F] shrink-0" />
                    <span className="truncate">{displayUrl}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Language switcher */}
                    {project.videoUrlIt && mediaFormat === "video" && (
                      <div className="flex items-center gap-0.5 bg-[#FBF9F4] border border-[#DED9CE] p-0.5 rounded-md">
                        {(["it", "en"] as const).map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setVideoLang(lang)}
                            className={`btn-press px-2 py-0.5 rounded text-[10px] font-semibold uppercase transition-colors cursor-pointer ${
                              videoLang === lang
                                ? "bg-[#20271F] text-white"
                                : "text-[#96998E] hover:text-[#20271F]"
                            }`}
                            title={lang === "it" ? "Versione italiana" : "English version"}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Media type toggle */}
                    <div className="flex items-center gap-0.5 bg-[#FBF9F4] border border-[#DED9CE] p-0.5 rounded-md">
                      <button
                        type="button"
                        onClick={() => setMediaFormat("video")}
                        aria-label="Watch the video walkthrough"
                        className={`btn-press px-2 py-0.5 rounded text-[10px] font-semibold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer ${
                          mediaFormat === "video"
                            ? "bg-[#20271F] text-white"
                            : "text-[#96998E] hover:text-[#20271F]"
                        }`}
                      >
                        <Film className="w-3 h-3" />
                        <span>Video</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMediaFormat("gif")}
                        aria-label="View static preview"
                        className={`btn-press px-2 py-0.5 rounded text-[10px] font-semibold uppercase inline-flex items-center gap-1 transition-colors cursor-pointer ${
                          mediaFormat === "gif"
                            ? "bg-[#20271F] text-white"
                            : "text-[#96998E] hover:text-[#20271F]"
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Static</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="relative rounded-lg overflow-hidden bg-[#EAE5DA] aspect-[16/10] border border-[#DED9CE]">
                  {mediaFormat === "video" ? (
                    <video
                      key={videoLang === "it" && project.videoUrlIt ? project.videoUrlIt : project.videoUrl}
                      src={videoLang === "it" && project.videoUrlIt ? project.videoUrlIt : project.videoUrl}
                      poster={project.previewUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.gifUrl || project.previewUrl}
                      alt={`${project.title} live demo`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#20271F]/85 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {project.devicePreview.tagline}
                  </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-2.5">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press flex-1 min-h-[40px] px-4 py-2 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-[13px] inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Visita il sito online</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press min-h-[40px] px-4 py-2 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] hover:border-[#20271F] text-[#20271F] font-semibold text-[13px] transition-colors inline-flex items-center gap-2"
                      aria-label={`Visualizza ${project.title} su GitHub`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Codice</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Numbers */}
              <div className="rounded-xl bg-[#FBF9F4] border border-[#DED9CE] p-5 space-y-4">
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#20271F]">
                  <Activity className="w-4 h-4 text-[#315B46]" />
                  <span>I numeri dal lancio</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.benchmarks.map((b, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#EAE5DA] space-y-1">
                      <div className="text-[10px] font-semibold text-[#96998E] uppercase tracking-wide truncate">
                        {b.label}
                      </div>
                      <div className="text-lg font-semibold tracking-tight text-[#20271F]">
                        {b.value}
                      </div>
                      {b.badge && (
                        <div className="text-[10px] font-medium text-[#62695F] truncate">
                          {b.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: story */}
            <div className="lg:col-span-6 space-y-5">
              {/* Overview */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#315B46]">
                  {project.clientType}
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#20271F]">
                  {project.title}
                </h3>
                <p className="text-sm text-[#62695F] leading-relaxed">
                  {project.fullCaseStudy.overview}
                </p>
              </div>

              {/* Problem → fix */}
              <div className="space-y-3">
                <div className="p-[18px] rounded-xl bg-[#F4F0E8] border border-[#DED9CE] space-y-1.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#62695F] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#315B46]" />
                    <span>La sfida iniziale</span>
                  </div>
                  <p className="text-[13px] text-[#20271F] leading-relaxed">
                    {project.fullCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-[18px] rounded-xl bg-[#E3E9DF] border border-[#315B46]/15 space-y-1.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#315B46] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cosa abbiamo realizzato</span>
                  </div>
                  <p className="text-[13px] text-[#20271F] leading-relaxed">
                    {project.fullCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#96998E]">
                  Cosa hanno ricevuto
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {project.fullCaseStudy.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-[13px] text-[#20271F]">
                      <CheckCircle2 className="w-4 h-4 text-[#0E8A5F] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code architecture */}
              <div className="rounded-xl bg-[#20271F] text-white overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                  <span className="text-xs font-medium text-white/70 font-mono">
                    {project.codeArchitecture.filename}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FBF9F4]/10 text-white/60 uppercase">
                    {project.codeArchitecture.language}
                  </span>
                </div>
                <div className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto text-emerald-300/90">
                  <pre>{project.codeArchitecture.code}</pre>
                </div>
                <div className="px-4 py-2.5 border-t border-white/10 text-[11px] text-white/50 leading-relaxed">
                  {project.codeArchitecture.explanation}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#96998E] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#315B46]" />
                  <span>Architettura tecnica</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {project.architectureHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-[#FBF9F4] border border-[#DED9CE] text-[13px] space-y-1"
                    >
                      <div className="font-semibold text-[#20271F]">{highlight.label}</div>
                      <div className="text-[#62695F] leading-relaxed">{highlight.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#96998E]">
                  Tecnologie utilizzate
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#EAE5DA] text-[#20271F]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-5 rounded-xl bg-[#E3E9DF] border border-[#315B46]/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-[#20271F] text-sm sm:text-base">
                    Vuoi una soluzione simile per la tua attività?
                  </h4>
                  <p className="text-xs text-[#62695F] mt-0.5">
                    Sprint da 5 giorni a 3 settimane, a prezzo fisso. Spiegaci le tue esigenze.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContact(`Progetto simile a ${project.title}`);
                  }}
                  className="btn-press px-5 py-2.5 rounded-lg bg-[#20271F] text-white hover:bg-[#315B46] font-semibold text-[13px] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Richiedi un preventivo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
