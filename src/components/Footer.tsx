"use client";

import React from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUp,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Phone,
  Shield,
  X,
} from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

interface FooterProps {
  onOpenContact?: (subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [legalModal, setLegalModal] = React.useState<"privacy" | "cookie" | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Cosa realizzo",
      links: [
        { label: "Sistemi di prenotazione", href: "#outcomes" },
        { label: "Negozi online", href: "#outcomes" },
        { label: "Vetrine 3D", href: "#outcomes" },
        { label: "Visibilità su Google a Messina", href: "#outcomes" },
      ],
    },
    {
      title: "Progetti dimostrativi",
      links: [
        { label: "The Yoz Shop (E-Commerce 3D)", href: "#projects" },
        { label: "Medo Spa (Prenotazioni)", href: "#projects" },
        { label: "Essenza Moda Capelli (Messina)", href: "#projects" },
        { label: "La Locanda Dei Mori (Ristorante)", href: "#projects" },
        { label: "Discover Messina (Mappa)", href: "#projects" },
      ],
    },
    {
      title: "Informazioni utili",
      links: [
        { label: "Prezzi e pacchetti", href: "#pricing" },
        { label: "Domande frequenti (FAQ)", href: "#faq" },
        { label: "Come lavoro (3 step)", href: "#outcomes" },
        { label: "100% proprietà del codice", href: "#pricing" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Phone size={16} className="text-[#315B46]" />,
      text: "+39 351 000 0000 (WhatsApp & Tel)",
      href: "https://wa.me/393510000000?text=Ciao,%20vorrei%20informazioni%20per%20un%20sito%20web%20a%20Messina",
    },
    {
      icon: <Mail size={16} className="text-[#315B46]" />,
      text: "info@studiostrada.it",
      href: "mailto:info@studiostrada.it",
    },
    {
      icon: <MapPin size={16} className="text-[#315B46]" />,
      text: "Messina (ME), Sicilia",
      href: undefined,
    },
    {
      icon: <Github size={16} className="text-[#315B46]" />,
      text: "github.com/1Yosh1",
      href: "https://github.com/1Yosh1",
    },
  ];

  const socialLinks = [
    { icon: <MessageCircle size={18} />, label: "WhatsApp", href: "https://wa.me/393510000000" },
    { icon: <Mail size={18} />, label: "Email", href: "mailto:info@studiostrada.it" },
    { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/1Yosh1" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/eyoas-zewd" },
  ];

  return (
    <footer className="bg-[#F4F0E8] pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#DED9CE]">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#FBF9F4] border border-[#DED9CE] text-[#20271F] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-[0_16px_48px_rgba(32,39,31,0.04)]">
        <FooterBackgroundGradient />

        {/* Top CTA banner */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#DED9CE]">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] leading-[1.1] text-[#20271F]">
              Pronto per un sito che lavora sodo quanto te?
            </h2>
            <p className="text-base text-[#62695F] leading-relaxed">
              Spiegaci le esigenze della tua attività. Riceverai un preventivo a prezzo fisso e una data di lancio —
              con chiarezza e trasparenza, entro 24 ore.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenContact?.("Richiesta Generale Footer")}
            className="btn-press shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#20271F] text-white text-sm font-semibold hover:bg-[#315B46] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Inizia il tuo progetto</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Main 4-column content grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 py-12">
          {/* Brand col */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-3 h-3 rounded-[4px] bg-[#315B46]" />
              <span className="text-[#20271F] text-2xl font-bold tracking-tight">Studio Strada</span>
            </div>
            <p className="text-sm text-[#62695F] leading-relaxed max-w-xs">
              Sviluppatore web indipendente a Messina. Siti web su misura, prenotazioni online ed e-commerce per attività locali.
            </p>
            <div className="text-xs text-[#96998E] leading-relaxed pt-1">
              Sede operativa: Messina (ME), Sicilia.
              <br />
              Attività professionale in fase di avvio / reg. forfettario.
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-[#96998E] text-[13px] font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#62695F]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-[#315B46] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="space-y-4">
            <h3 className="text-[#96998E] text-[13px] font-semibold uppercase tracking-wider">
              Contatti diretti
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-2.5 text-[13px] text-[#62695F]">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-[#315B46] transition-colors truncate"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-[#DED9CE] my-6 relative z-10" />

        {/* Footer bottom bar */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-[#96998E] space-y-4 md:space-y-0">
          <div className="flex space-x-5">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-[#96998E] hover:text-[#315B46] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span>&copy; {year} Studio Strada · Messina</span>
            <button
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="hover:text-[#20271F] underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal("cookie")}
              className="hover:text-[#20271F] underline transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn-press flex items-center gap-1.5 text-[#96998E] hover:text-[#315B46] transition-colors cursor-pointer"
          >
            <span>Torna in cima</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal notice modal */}
        {legalModal && (
          <div className="fixed inset-0 z-50 bg-[#0A0D12]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FBF9F4] border border-[#DED9CE] rounded-2xl max-w-lg w-full p-6 text-[#20271F] shadow-2xl relative">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#DED9CE] text-[#62695F] hover:text-[#20271F]"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#315B46]" />
                {legalModal === "privacy" ? "Informativa sulla Privacy (GDPR)" : "Informativa sui Cookie"}
              </h3>
              <div className="text-xs text-[#62695F] space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                {legalModal === "privacy" ? (
                  <>
                    <p>
                      Ai sensi del Regolamento UE 2016/679 (GDPR), ti informo che i dati personali inviati tramite i moduli di contatto (nome, email, messaggio) vengono utilizzati unicamente per rispondere alle tue richieste di preventivo o informazioni relative ai servizi di sviluppo web.
                    </p>
                    <p>
                      <strong>Titolare del trattamento:</strong> Eyoas Zewdu — Studio Strada (Messina, Italia). Email di contatto: info@studiostrada.it.
                    </p>
                    <p>
                      I dati non vengono ceduti a terzi né utilizzati per scopi promozionali senza il tuo consenso esplicito. Puoi richiederne la cancellazione in ogni momento scrivendo a info@studiostrada.it.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Questo sito web non utilizza cookie di profilazione o tracciamento pubblicitario di terze parti.
                    </p>
                    <p>
                      Vengono utilizzati esclusivamente cookie tecnici o impostazioni di sessione necessari al corretto funzionamento della navigazione e delle preferenze utente.
                    </p>
                    <p>
                      Navigando sul sito acconsenti all&apos;uso dei cookie tecnici essenziali. Per qualsiasi informazione contatta info@studiostrada.it.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Large Text hover effect */}
        <div className="lg:flex hidden h-[22rem] sm:h-[28rem] -mt-16 -mb-28 justify-center items-center relative z-20 pointer-events-auto">
          <TextHoverEffect text="STRADA" className="w-full max-w-5xl" />
        </div>
      </div>
    </footer>
  );
};
