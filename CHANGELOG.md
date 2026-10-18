# Changelog

What changed on vpcodes.in, newest first.

## 2026-10-18

### Nav: Work link
- Added a **Work** link to the nav bar, left of Contact
  (`components/SiteNav.tsx`).
  - Home page: smooth-scrolls to the Work section, leaving room for the fixed
    nav.
  - Case study pages: goes to `/#work`. The home page corrects the landing
    spot after the hero's scroll pinning is set up, so it doesn't stop short.
  - Clicking it closes the Contact menu if it's open.
- The Work link and the Contact menu now sit in a `.nav__links` wrapper.
- New styles in `app/globals.css`: `.nav__links` and `.nav__link`, matching
  the Contact button (size, colour, hover). It also gets Contact's taller tap
  target on tablets and phones and the same JetBrains Mono letter-spacing.

### Work section and case studies
- Added a "Selected work" section under About (`components/WorkSection.tsx`,
  `#work` anchor in `app/page.tsx`).
- Added the **Mr. Plastic Repair** case study at `/work/mr-plastic-repair`.
- Added the **Deccan Produce** case study at `/work/deccan-produce`, replacing
  its "coming soon" card. The two case studies link to each other.
- Moved the case study styles to `app/work/case-study.css` so both pages share
  them.
- The nav logo goes home from a case study page and still scrolls to the top
  on the home page.

### Docs
- `README.md` and `Context.md` now cover the Work section, the case study
  pages and the Work link.
