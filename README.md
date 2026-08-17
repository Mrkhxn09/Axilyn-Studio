<div align="center">

# ✨ Axilyn Studio

**Modern Web Design & Digital Marketing Agency Landing Page**

[![Live Demo](https://img.shields.io/badge/demo-online-2DDAB4?style=for-the-badge&logo=vercel&logoColor=white)](https://axilyn-studio.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-7C6FFF?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  A state-of-the-art, high-performance web application built for <strong>Axilyn Studio</strong> — a boutique digital marketing & web design agency based in Bangalore. Features dark-mode aesthetics, custom orbital micro-animations, single-page case study viewer, interactive spotlight effects, and EmailJS integration.
</p>

</div>

---

## 🚀 Key Features

- 🌌 **Sleek Cyber-Dark Aesthetic**: Curated color tokens (`#04040a` dark background, `#7C6FFF` neon ring, `#2DDAB4` teal accents).
- 🖱️ **Interactive Custom Cursor & Spotlight**: Smooth lerping mouse follower and dynamic radial gradient tracking across the hero section.
- 🪐 **Orbital Process Animations**: Interactive 4-stage "Orbit Cycle" (Discover, Design, Build, Launch) with animated SVGs.
- 💼 **Case Studies & SPA Viewer**: Dynamic project detail router with modal gallery, project metadata sidebar, and full-screen lightbox.
- ✉️ **Integrated Contact System**: Client-side validated contact form with EmailJS integration, Honeypot anti-spam, and rate-limiting.
- 📱 **Fully Responsive & Accessible**: Mobile-first responsive layout with touch-friendly interactions and `prefers-reduced-motion` support.
- ⚡ **Zero-Build Vanilla Architecture**: Pure HTML5, modular CSS3, and modern ES6 JavaScript — zero build dependencies needed.

---

## 📂 Project Architecture

```
Axilyn-Studio/
├── index.html                   # Clean, semantic HTML5 structure with SEO & JSON-LD
├── README.md                    # Project documentation
├── css/
│   ├── variables.css            # Design tokens, color palette, fonts & radii
│   ├── reset.css                # CSS reset, base styling, cursor & texture
│   ├── animations.css           # Keyframes (orbital rotations, pulse, reveals)
│   ├── layout.css               # Header, nav, section containers, grid systems, footer
│   ├── components.css           # Cards, buttons, tabs, form inputs, FAQ details
│   └── project-view.css         # Case study detail view & lightbox modal
└── js/
    ├── projects-data.js         # Structured data for all 6 case studies
    ├── cursor.js                # Interactive cursor follower & hero dynamic spotlight
    ├── animations.js            # IntersectionObservers for scroll reveals & counters
    ├── navigation.js            # Process tabs switcher, SPA routing, lightbox controller
    ├── contact.js               # EmailJS integration, live validation, honeypot & rate limiting
    └── main.js                  # Application bootstrap & splash screen lifecycle
```

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 with Schema.org JSON-LD structured data (Organization, LocalBusiness, FAQPage).
- **Styling**: Vanilla CSS3 (Custom Properties, Flexbox, Grid, Keyframe Animations).
- **Scripting**: Modern Vanilla ES6+ JavaScript.
- **Typography**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts.
- **Email Service**: [EmailJS](https://www.emailjs.com/) browser SDK.

---

## 💻 Getting Started Locally

No installation or build steps required. Simply clone and open:

```bash
# Clone the repository
git clone https://github.com/Mrkhxn09/Axilyn-Studio.git

# Navigate to project directory
cd Axilyn-Studio

# Open index.html in your default browser
start index.html
```

Or serve with any static HTTP server:
```bash
npx serve .
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Crafted with 💜 for <strong>Axilyn Studio</strong>
</div>
