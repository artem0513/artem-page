# Classic portfolio refinement

The user rejected the editorial redesign and requested the original dark/yellow/photo direction with visual improvements, stronger experience and skills, actual certificate images directly after the hero, and a section for three future mini-project links. Employers must not appear in the experience or project sections. The user delegated visual choices earlier and asked this iteration to finish within one hour (deadline 2026-11-13 01:39 UTC / 03:39 Europe/Bucharest).

## Scope and decisions

Reuse the original layout vocabulary, fonts, geometric assets, portrait and visible certificate images. Keep original style.css and vendor CSS unchanged; isolate refinements in assets/css/refinement.css. Replace the previous presentation and RAG interactions with a small native script for navigation, reveals, sticky header and clipboard feedback. Leave the original downloadable CV unchanged.

Order: hero → certifications (three real images) → about → skills → experience → projects (three clearly labelled future entries) → contact. Experience retains dates, responsibilities, domains and supported outcomes, with no employer names. Future projects have no fabricated names, features, metrics or links. Since 2019 avoids extrapolating experience length.

## Execution

- [x] Restore the original visual direction in index.html and refinement.css.
- [x] Show all three original certificate images before the About section.
- [x] Strengthen About and Skills and add employer-free experience.
- [x] Add three honest mini-project slots pending user links.
- [x] Check five viewport widths, local assets, anchors, company-name omission, menus and console.
- [x] Obtain independent read-only review: no Critical, Important or Minor findings.
- [x] Save updated browser screenshots and a portable classic version in chat outputs.
- [x] Commit local changes without publishing.

## Verification record

320 / 390 / 768 / 1024 / 1440px: no horizontal document overflow or overflowing headings/paragraphs/skill tags. All three certificate images load. They are the first section after the hero. Mobile menu opens/closes, follows anchors and closes with Escape. No browser errors observed. JavaScript syntax passes. Main-agent visual QA caught a mobile line-break issue in the role subtitle; the original two-line layout was restored. No screen reader or remote credential verification was run.

Final QA also restored responsive heading word boundaries, constrained the inherited full-width contact button and replaced an unavailable code-icon glyph with text. Desktop contact buttons share one row. Repeated five-width browser checks passed after fixes. The portable copy matches source, all 16 local references and 10 CSS/font resources resolve, and the ZIP passes integrity checks. Completed at approximately 00:57 UTC, within the one-hour limit; project contents still await the user's three links.
