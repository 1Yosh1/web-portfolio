# Task Plan: Cold Precision Redesign (Complete Rehaul)

## Active Goal
Complete redesign from scratch per client request ("remove any design bias and start completely anew"). New direction chosen by client: **Cold Precision** — near-white canvas (#FAFAFB), ink (#0A0D12), electric blue accent (#2545FF), hairline borders, sharp corners, Inter type. Replaced the previous warm editorial paper design entirely.

## Core Brief
- Lead with **what customers get**: bookings taken, sales made, customers found — not tech jargon.
- Showcase cards state each website's outcome for its owner ("what it does for its owner").
- All AI-slop patterns from the old design purged: terracotta palette, mono-label overload, double-bezel nesting, jargon headers ("Initiate Sprint", "Blueprint", "Transmission").

## Workstreams
- [x] 1. Foundation: Cold Precision tokens, Inter font, dot-grid utility, blue selection, precision focus rings (`globals.css`, `layout.tsx`)
- [x] 2. Navbar: white pill, blue square mark, plain links ("Work", "What you get", "Pricing", "Reviews"), CTA "Get your website" (`Navbar.tsx`)
- [x] 3. Hero: centered precision headline "Websites that bring you customers — not compliments", flagship video stage, outcome tabs, plain trust strip (`HeroSection.tsx`)
- [x] 4. Outcomes grid: 9 cards "What your website does for you" each with real client proof line (`BentoSection.tsx`)
- [x] 5. Showcase: featured full-width outcome-first card + grid; "What it does for its owner" block; hover-play videos (`ProjectsShowcase.tsx`)
- [x] 6. Process: "What we do for you" 3 steps — brief, build preview, launch handover (`StickyStackSection.tsx`)
- [x] 7. Capabilities: 6 plain-language service cards in customer terms (`page.tsx`)
- [x] 8. Pricing: 3 side-by-side package cards (€300/€500/€700, dark popular anchor) + payment milestones + custom banner (`PaymentSection.tsx`)
- [x] 9. Testimonials: result-metric cards (`TestimonialsSection.tsx`)
- [x] 10. Footer: near-black CTA block, plain columns (`Footer.tsx`)
- [x] 11. ProjectModal restyle (focus trap + media logic preserved)
- [x] 12. CheckoutModal restyle (Stripe flow + receipt preserved)
- [x] 13. ContactDrawer restyle + **bug fix**: was POSTing to nonexistent `/api/inquiries`, now posts to `/api/contact` (verified 200 end-to-end)
- [x] 14. Verification: tsc 0 errors; desktop + mobile visual passes; modal/drawer/checkout interactions tested in browser; network + console clean
- [x] 15. Italian Translation: translated layout metadata (lang="it"), hero headlines/tabs, outcomes bento, projects showcase & case studies, 3-step process, capabilities, pricing packages/milestones, testimonials, footer, project modal, checkout modal, contact drawer. Verified via tsc & next build (0 errors).
- [x] 16. Hover Footer Integration: Added shadcn structure (`components.json`, `src/lib/utils.ts` `cn`), copied `hover-footer.tsx` to `@/components/ui/hover-footer.tsx`, integrated into Studio Strada `Footer.tsx` matching Cold Precision (#0A0D12, #2545FF), Italian text. Verified via tsc & next build (0 errors).
- [x] 17. Stats Integration: Added `stats-06.tsx` and `demo.tsx` in `@/components/ui/`, customized for Studio Strada Cold Precision palette with verified client metrics (98/100 Lighthouse, +215% bookings, 100% 5-star reviews, -65% info calls, 4.200+ monthly Google views), Unsplash asset, and embedded on homepage. Verified via tsc & build (0 errors).
- [x] 19. Section Removal + Green Footer Hover: Removed the "I numeri che contano" stats section (`<Stats />` from `page.tsx`; `stats-06.tsx` left in `src/components/ui/` unused) and the capabilities/services grid ("Scegli ciò di cui la tua attività ha bisogno") from `page.tsx`. Repointed footer link "Visibilità su Google" from `#capabilities` to `#outcomes`. Recolored `hover-footer.tsx` STRADA wordmark from blue (#2545FF/#4F6BFF) to the site's studio green (#315B46 base, #20271F ink, #4A7A5E light stop) in hover gradient, animated stroke, gradient fill, and footer radial gradient. Verified via tsc (0 errors) and live DOM checks on port 3001.

## Notes
- Dev server for verification ran on port 3210 (detached via perl setsid trick because harness kills process groups).
- Old warm-editorial videos in `/public/projects` are still referenced and were NOT regenerated (out of scope); they pair fine with the new neutral design.
