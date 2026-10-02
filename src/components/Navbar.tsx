"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: (projectOrTier?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Progetti", href: "#projects" },
    { label: "Cosa ottieni", href: "#outcomes" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Recensioni", href: "#reviews" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div
        className={`rounded-xl border bg-[#F8F6F0]/92 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? "border-[#DED9CE] shadow-[0_8px_30px_rgba(32,39,31,0.10)]"
            : "border-[#DED9CE] shadow-none"
        } px-4 sm:px-5 py-2.5 flex items-center justify-between`}
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2 group" aria-label="Studio Strada home">
          <span className="w-2.5 h-2.5 rounded-[4px] bg-[#315B46] group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-semibold text-[15px] tracking-tight text-[#20271F]">
            Studio Strada
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigazione principale">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#62695F] hover:text-[#20271F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenContact("Richiesta Progetto")}
            className="btn-press group inline-flex items-center gap-1.5 pl-4 pr-1.5 py-1.5 rounded-lg bg-[#315B46] text-white text-[13px] font-semibold hover:bg-[#315B46] transition-colors cursor-pointer"
          >
            <span>Ottieni il tuo sito</span>
            <span className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-200">
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Apri menu navigazione"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg border border-[#DED9CE] text-[#20271F] active:scale-95 transition-transform"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-xl border border-[#DED9CE] bg-[#FBF9F4] shadow-[0_16px_40px_rgba(32,39,31,0.12)] p-3">
          <nav className="flex flex-col" aria-label="Navigazione mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-medium text-[#20271F] py-2.5 px-3 rounded-lg hover:bg-[#EAE5DA] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact("Richiesta Mobile");
              }}
              className="btn-press mt-2 w-full py-3 rounded-lg bg-[#315B46] text-white text-sm font-semibold active:scale-[0.98]"
            >
              Ottieni il tuo sito
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
