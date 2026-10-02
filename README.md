# appx.uz

AppX landing page — built from the `appx.pen` design.

**Stack:** Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis · lucide-react

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run typecheck
npm run format
```

## Structure

```
src/
  index.css                  design tokens (@theme), fonts, base styles
  App.tsx                    page shell; sections after the hero are lazy-loaded
  components/
    SmoothScroll.tsx         Lenis smooth scroll + anchor links
    ui/                      Section, SectionHeader, Reveal, Logo
    phones/                  PhoneFrame + 7 app-screen mockups (authored at 236px, scaled with CSS zoom)
    sections/                one file per page section (+ subfolders for larger ones)
  assets/img, assets/apps    optimized WebP images
```
