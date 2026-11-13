# Artem portfolio implementation plan

> Execute inline with superpowers:executing-plans. User chose the dark concept and delegated design decisions.

**Goal:** Turn the existing static portfolio into a complete English presentation for Senior / Lead full-stack roles.

**Architecture:** Keep GitHub Pages-compatible HTML, CSS and vanilla JavaScript. Use the existing portrait, resume and credential links. No build step or external runtime dependencies.

**Design:** Graphite background, warm ivory type, amber accent, editorial scale, a portrait composition and diagrams built in HTML/SVG. Work comes before skills and certifications. Interactive project presentations explain context, contribution and results; their visuals are clearly marked as conceptual illustrations.

**Files:** index.html for semantic content; assets/css/portfolio.css for responsive design; assets/js/portfolio.js for navigation, project presentations, clipboard feedback and motion. Preserve original vendor assets and resume PDF.

**Constraints:** All professional claims come from the supplied resume. Keep ~20% cost reduction tied to Reenbit deployment improvements and ~50% response-time reduction tied to SweetSoft query optimization. Say building since 2019 rather than extrapolating years. Do not present diagrams as client screenshots. Keep reduced-motion and no-JavaScript content readable. Work in the current checkout on codex/portfolio-redesign; do not push or alter the existing public site as part of local redesign.

**Review focus:** narrow screens and overflow; keyboard navigation and dialog focus; clipboard rejection; readable content with reduced motion or absent JS; working local paths, resume download and credential links.

- [x] Rebuild narrative: hero, selected projects, AI workflow, approach/skills, experience, credentials, contact.
- [x] Implement responsive editorial design and purposeful, lightweight motion.
- [x] Implement accessible project slide dialog, mobile navigation and honest clipboard feedback.
- [x] Review desktop/mobile in the browser, exercise presentation and navigation controls, inspect console, check syntax/assets and git diff.
- [x] Deliver a portable copy and review notes under the chat outputs directory.

## Completion record

Browser QA: 320 / 390 / 768 / 1024 / 1440px with no horizontal overflow. All 12 presentation slides, boundary buttons, native arrow keys, Escape and focus restoration passed. Mobile navigation and RAG steps passed. Syntax, local resources, IDs and anchors checked. Clipboard promise resolved; actual system clipboard could not be independently confirmed through the IAB clipboard bridge.

Independent read-only review found two important defects: decorative orbit overflow at 768px and focused Next becoming disabled on slide 4. Both were reproduced, fixed and verified in the browser. No critical or deferred minor findings. Rendered appearance was reviewed by the main agent; no screen reader was run. Reduced motion and no-JS readable-content fallbacks were reviewed in source.

Decisions delegated by the user: preserve static architecture, use English, show conceptual diagrams with labels and use professional-experience cases until actual mini-project links arrive. The existing PDF and unused legacy assets remain intact. Added a lightweight AY SVG favicon instead of loading the original embedded bitmap favicon. No merge or push; keep the completed local feature branch for review.
