"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { BentoSection } from "../components/BentoSection";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { StickyStackSection } from "../components/StickyStackSection";
import { PaymentSection } from "../components/PaymentSection";
import { FaqSection } from "../components/FaqSection";
import { Footer } from "../components/Footer";
import { ProjectModal } from "../components/ProjectModal";
import { CheckoutModal, CheckoutPayload } from "../components/CheckoutModal";
import { ContactDrawer } from "../components/ContactDrawer";
import { Project } from "../data/projectsData";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [checkoutPayload, setCheckoutPayload] = useState<CheckoutPayload | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState("");

  const handleOpenContact = (subject?: string) => {
    setContactPrefill(subject || "");
    setContactOpen(true);
  };

  const handleSelectTierForCheckout = (payload: CheckoutPayload) => {
    setCheckoutPayload(payload);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0D12]">
      <Navbar onOpenContact={handleOpenContact} />

      {/* 1. Hero — outcomes first, flagship video stage */}
      <HeroSection onSelectProject={(project) => setSelectedProject(project)} />

      {/* 2. What your website does for you (outcomes grid) */}
      <BentoSection />

      {/* 3. Projects showcase — outcome-first cards */}
      <ProjectsShowcase
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenContact={handleOpenContact}
      />

      {/* 4. What we do for you — 3-step process */}
      <StickyStackSection onOpenContact={handleOpenContact} />

      {/* 5. Pricing — 3 packages + milestones */}
      <PaymentSection
        onSelectTier={handleSelectTierForCheckout}
        onOpenContact={handleOpenContact}
      />

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive modals and drawer (functionality preserved) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={handleOpenContact}
      />

      <CheckoutModal
        payload={checkoutPayload}
        onClose={() => setCheckoutPayload(null)}
      />

      <ContactDrawer
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        prefillSubject={contactPrefill}
      />
    </main>
  );
}
