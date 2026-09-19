/**
 * ═══════════════════════════════════════════════════════
 * CASE STUDIES & PORTFOLIO DATA — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 * Structure:
 * - id: unique integer index
 * - slug: URL-friendly identifier
 * - title: Case study display title
 * - cat: Category badge text
 * - hero: Main high-res hero image
 * - desc: Full project description
 * - client: Client name
 * - year: Year completed
 * - duration: Project turnaround time
 * - tags: Array of service/skill tags
 * - gallery: Array of image objects ({ url, wide })
 */

const PROJECTS = [
  {
    id: 0,
    slug: 'dental-experience',
    cleanSlug: 'modern-dental-experience',
    seoTitle: 'A Modern Dental Website Concept | Axilyn',
    metaDesc: "Explore Axilyn's self-initiated dental website concept focused on patient trust, treatment clarity, UX design and a simpler appointment journey.",
    eyebrow: 'SELF-INITIATED CONCEPT / 2026',
    title: 'A MODERN DENTAL EXPERIENCE',
    cat: 'SELF-INITIATED CONCEPT · DENTAL CLINIC',
    hero: '/assets/concepts/dental-concept.jpg',
    desc: 'Most dental websites communicate treatments. This concept explores how a dental website can communicate confidence, comfort and clarity before a patient ever walks through the door.',
    client: 'Self-Initiated Concept',
    year: '2026',
    duration: 'Studio Concept Sprint',
    tags: ['Web Design', 'UI/UX', 'Patient Experience', 'Design System'],
    idea: {
      eyebrow: 'THE IDEA',
      heading: 'MAKE THE FIRST VISIT FEEL LESS UNCERTAIN.',
      p1: 'Choosing a dentist can feel unfamiliar. Patients want to know who they are trusting, what will happen, what treatment they may need and how much the experience will disrupt their routine.',
      p2: 'This concept uses calm visual hierarchy, transparent treatment information and a simplified booking journey to remove unnecessary friction.'
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      heading: 'DENTAL WEBSITES OFTEN ANSWER THE WRONG QUESTIONS.',
      items: [
        {
          num: '01',
          title: 'TOO MUCH INFORMATION',
          desc: 'Treatment lists can overwhelm visitors before they understand what matters to them.'
        },
        {
          num: '02',
          title: 'NOT ENOUGH TRUST',
          desc: 'Patients need confidence in the people, environment and process — not just a list of procedures.'
        },
        {
          num: '03',
          title: 'BOOKING FRICTION',
          desc: 'If taking the next step feels complicated, visitors may postpone it.'
        }
      ]
    },
    direction: {
      eyebrow: 'DESIGN DIRECTION',
      heading: 'CALM. CLEAR. CONFIDENT.',
      supporting: 'The visual system intentionally avoids the overly clinical feeling common in healthcare interfaces. Soft spatial layouts, restrained contrast and focused calls-to-action create a calmer digital environment.',
      principles: [
        {
          title: 'CALM SPACING',
          desc: 'Generous layouts reduce visual pressure.'
        },
        {
          title: 'CLEAR INFORMATION',
          desc: 'Treatments and important information are structured around what patients need to know.'
        },
        {
          title: 'CONFIDENT ACTIONS',
          desc: 'The next step is always easy to understand.'
        }
      ]
    },
    experience: {
      eyebrow: 'THE EXPERIENCE',
      intro: 'Every screen is designed around one goal: helping the patient move from uncertainty to confidence.'
    },
    screens: [
      {
        num: '01 / HOMEPAGE',
        heading: 'A CALMER FIRST IMPRESSION',
        desc: 'The homepage immediately communicates what the clinic stands for, what patients can expect and where to take the next step.',
        img: '/assets/concepts/dental-concept.jpg'
      },
      {
        num: '02 / TREATMENTS',
        heading: 'INFORMATION WITHOUT THE OVERLOAD',
        desc: 'Treatments are structured around patient questions rather than simply listing procedures. Visitors can understand what a treatment is, who it is for and what to expect.',
        img: '/assets/concepts/dental-treatments.jpg'
      },
      {
        num: '03 / PATIENT EXPERIENCE',
        heading: 'SHOW PEOPLE WHAT TO EXPECT',
        desc: 'From the clinic environment to the treatment journey, the interface uses visual storytelling to make an unfamiliar experience feel more understandable.',
        img: '/assets/concepts/dental-experience-ui.jpg'
      },
      {
        num: '04 / APPOINTMENT',
        heading: 'THE NEXT STEP SHOULD BE OBVIOUS',
        desc: 'The booking experience is intentionally simple: choose the service, select a convenient time and confirm the appointment without unnecessary steps.',
        img: '/assets/concepts/dental-booking.jpg'
      }
    ],
    details: {
      eyebrow: 'DETAILS THAT MATTER',
      heading: 'SMALL DECISIONS. BETTER EXPERIENCE.',
      items: [
        {
          tag: 'NAV',
          title: 'NAVIGATION',
          desc: 'Important actions remain visible without competing with the content.'
        },
        {
          tag: 'CTA',
          title: 'CTA SYSTEM',
          desc: 'Primary actions use a consistent visual language throughout the experience.'
        },
        {
          tag: 'TYPE',
          title: 'TYPOGRAPHY',
          desc: 'Large, readable type creates hierarchy without overwhelming the visitor.'
        },
        {
          tag: 'SPACE',
          title: 'SPACING',
          desc: 'Generous spacing creates a calmer healthcare experience.'
        }
      ]
    },
    designSystem: {
      eyebrow: 'DESIGN SYSTEM',
      heading: 'A VISUAL LANGUAGE BUILT FOR TRUST.',
      colors: [
        { name: 'Obsidian Canvas', hex: '#0B0D12', role: 'Primary Background' },
        { name: 'Clinical Cyan', hex: '#2DDAB4', role: 'Confidence & Focus' },
        { name: 'Soft Ice Glaze', hex: '#E8FBF8', role: 'Calm Highlighting' },
        { name: 'Slate Neutral', hex: '#1A1E26', role: 'Card Surface' }
      ],
      typography: {
        display: 'Bebas Neue — Confident, Architectural, Clear',
        body: 'DM Sans — Human, Empathetic, Highly Legible'
      }
    },
    takeaway: {
      eyebrow: 'CONCEPT TAKEAWAY',
      heading: 'WHAT THIS CONCEPT EXPLORES',
      quote: 'How thoughtful digital design can make a traditionally clinical experience feel clearer, calmer and more human.',
      points: [
        {
          num: '01',
          title: 'TRUST BEFORE CONVERSION',
          desc: 'Build confidence before asking for the appointment.'
        },
        {
          num: '02',
          title: 'CLARITY BEFORE COMPLEXITY',
          desc: 'Give patients the information they actually need.'
        },
        {
          num: '03',
          title: 'EXPERIENCE BEFORE DECORATION',
          desc: 'Every visual decision should serve the journey.'
        }
      ]
    },
    disclaimer: 'Self-initiated concept created by AXILYN. This project is an exploration of digital experience design and is not a commissioned client project.',
    cta: {
      heading: 'HAVE A BUSINESS THAT COULD USE A BETTER EXPERIENCE?',
      text: "Let's turn your idea, brand or business into a digital experience people remember.",
      btnText: 'BUILD WITH AXILYN →'
    }
  },
  {
    id: 1,
    slug: 'spaces-presented',
    cleanSlug: 'interior-design',
    seoTitle: 'Interior Design Studio Website Concept | Axilyn',
    metaDesc: "Explore Axilyn's self-initiated interior design website concept focused on presenting architecture, spaces and project storytelling through a premium digital experience.",
    eyebrow: 'SELF-INITIATED CONCEPT / 2026',
    title: 'SPACES, PRESENTED DIFFERENTLY',
    cat: 'SELF-INITIATED CONCEPT · INTERIOR DESIGN',
    hero: '/assets/concepts/interior-concept.jpg',
    desc: 'Most architectural websites present spaces as static image galleries. This concept explores how digital pacing, materiality and editorial storytelling can make interior architecture feel as sensory online as it does in the physical world.',
    client: 'Self-Initiated Concept',
    year: '2026',
    duration: 'Studio Concept Sprint',
    tags: ['Interior Architecture', 'Editorial UI', 'Visual Identity', 'Spatial Pacing'],
    idea: {
      eyebrow: 'THE IDEA',
      heading: 'LET CRAFTSMANSHIP BREATHE BEFORE THE FIRST MEETING.',
      p1: "High-end architectural clients don't choose an architect from a crowded grid of small thumbnail images. They evaluate taste, spatial atmosphere, material restraint and intentionality.",
      p2: 'This concept uses asymmetric editorial pacing, macro material breakdowns and private commission questionnaires to create a digital salon experience rather than an impersonal portfolio.'
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      heading: 'PORTFOLIOS OFTEN FLAT-LINE THE EMOTION OF PHYSICAL SPACES.',
      items: [
        {
          num: '01',
          title: 'DILUTED SCALE',
          desc: 'Small thumbnail grids strip monolithic architecture of its true physical weight and volume.'
        },
        {
          num: '02',
          title: 'MISSING MATERIALITY',
          desc: 'Without texture and lighting context, high-end craftsmanship looks like generic stock interiors.'
        },
        {
          num: '03',
          title: 'TRANSACTIONAL INQUIRIES',
          desc: 'Standard web forms feel out of place for bespoke, multi-million architectural commissions.'
        }
      ]
    },
    direction: {
      eyebrow: 'DESIGN DIRECTION',
      heading: 'TACTILE. EDITORIAL. MONOLITHIC.',
      supporting: 'Drawing cues from luxury architectural monographs, the interface balances raw concrete tones, warm Hinoki cypress accents and serene typographic pacing that respects the work.',
      principles: [
        {
          title: 'MONUMENTAL SPACING',
          desc: 'Generous negative space echoes the quiet grandeur of private residences.'
        },
        {
          title: 'MATERIAL REVEAL',
          desc: 'Every material specification is given the scrutiny of an art monograph.'
        },
        {
          title: 'PRIVATE DIALOGUE',
          desc: 'The commission inquiry feels like an invitation into a private design atelier.'
        }
      ]
    },
    experience: {
      eyebrow: 'THE EXPERIENCE',
      intro: 'Every screen is orchestrated to evoke the physical sensation of stepping into an architecturally commissioned space.'
    },
    screens: [
      {
        num: '01 / HOMEPAGE',
        heading: 'SPATIAL PROPORTIONS ON SCREEN',
        desc: "The homepage introduces the studio's architectural ethos with full-bleed spatial vistas and unhurried editorial navigation.",
        img: '/assets/concepts/interior-concept.jpg'
      },
      {
        num: '02 / SELECTED SPACES',
        heading: 'EDITORIAL CURATION OVER THUMBNAIL GRIDS',
        desc: "Residential works are presented with asymmetric architectural cadence, allowing each room's natural light and materiality to command attention.",
        img: '/assets/concepts/interior-portfolio.jpg'
      },
      {
        num: '03 / CRAFTSMANSHIP',
        heading: 'MATERIALITY DECONSTRUCTED',
        desc: 'Detailed structural case studies reveal the tactile specifications: cast concrete (450 MPa), oiled Hinoki timber and honed travertine.',
        img: '/assets/concepts/interior-craft.jpg'
      },
      {
        num: '04 / COMMISSIONS',
        heading: 'A PRIVATE CONVERSATION',
        desc: 'A multi-step architectural briefing interface allows prospective clients to articulate scale, aesthetic vision and typology with ease.',
        img: '/assets/concepts/interior-inquiry.jpg'
      }
    ],
    details: {
      eyebrow: 'DETAILS THAT MATTER',
      heading: 'SMALL DECISIONS. BETTER EXPERIENCE.',
      items: [
        {
          tag: 'NAV',
          title: 'EDITORIAL NAVIGATION',
          desc: 'A restrained top bar and drawer that disappear to let the photography dominate.'
        },
        {
          tag: 'CADENCE',
          title: 'TYPOGRAPHIC CADENCE',
          desc: 'Refined serif headings paired with clean technical monospace annotations.'
        },
        {
          tag: 'DATA',
          title: 'MATERIAL ANNOTATIONS',
          desc: 'Interactive hotspots connecting visual textures to structural origin data.'
        },
        {
          tag: 'MA',
          title: 'SPATIAL PADDING',
          desc: 'Asymmetric gutters inspired by the Japanese architectural concept of Ma (negative space).'
        }
      ]
    },
    designSystem: {
      eyebrow: 'DESIGN SYSTEM',
      heading: 'A VISUAL LANGUAGE BUILT FOR TACTILE RESTRAINT.',
      colors: [
        { name: 'Architectural Charcoal', hex: '#0A0C10', role: 'Serene Foundation' },
        { name: 'Muted Bronze', hex: '#C8A876', role: 'Warm Accents & Links' },
        { name: 'Travertine Cream', hex: '#E4DFD7', role: 'Textural Highlight' },
        { name: 'Cast Concrete Slate', hex: '#181A20', role: 'Panel Grounding' }
      ],
      typography: {
        display: 'Editorial Serif — Monolithic, Timeless, Refined',
        body: 'DM Sans & Monospace — Crisp, Technical, Understated'
      }
    },
    takeaway: {
      eyebrow: 'CONCEPT TAKEAWAY',
      heading: 'WHAT THIS CONCEPT EXPLORES',
      quote: 'How digital editorial design can convey the sensory weight, silence and elegance of physical architecture.',
      points: [
        {
          num: '01',
          title: 'ATMOSPHERE BEFORE ASSETS',
          desc: 'Evoke spatial emotion before presenting technical floorplans.'
        },
        {
          num: '02',
          title: 'MATERIAL HONESTY',
          desc: 'Celebrate raw textures and craftsmanship over digital gimmicks.'
        },
        {
          num: '03',
          title: 'CURATED INTENTION',
          desc: 'Treat every project as an exhibition, not a commodity catalog.'
        }
      ]
    },
    disclaimer: 'Self-initiated concept created by AXILYN. This project is an exploration of digital experience design and is not a commissioned client project.',
    cta: {
      heading: 'HAVE A BUSINESS THAT COULD USE A BETTER EXPERIENCE?',
      text: "Let's turn your idea, brand or business into a digital experience people remember.",
      btnText: 'BUILD WITH AXILYN →'
    }
  },
  {
    id: 2,
    slug: 'digital-scent',
    cleanSlug: 'perfume',
    seoTitle: 'Luxury Perfume E-Commerce Website Concept | Axilyn',
    metaDesc: "Explore Axilyn's self-initiated luxury perfume e-commerce concept exploring product storytelling, discovery and visual identity.",
    eyebrow: 'SELF-INITIATED CONCEPT / 2026',
    title: 'THE DIGITAL SCENT EXPERIENCE',
    cat: 'SELF-INITIATED CONCEPT · PERFUME BRAND',
    hero: '/assets/concepts/perfume-concept.jpg',
    desc: 'Perfume is invisible. Most fragrance websites rely strictly on bottle photographs. This concept explores how olfactory storytelling, interactive fragrance pyramids and sensory discovery kits can visualize an invisible fragrance online.',
    client: 'Self-Initiated Concept',
    year: '2026',
    duration: 'Studio Concept Sprint',
    tags: ['Luxury E-Commerce', 'Brand Storytelling', 'Visual Identity', 'Art Direction'],
    idea: {
      eyebrow: 'THE IDEA',
      heading: 'TRANSLATING INVISIBLE NOTES INTO SENSORY DIGITAL LIGHT.',
      p1: 'Buying niche luxury perfume online is traditionally a leap of faith. Without smelling the juice, customers need visual metaphors that convey top notes, heart transitions and dry-down longevity.',
      p2: 'This concept translates the olfactory pyramid into interactive light, evaporation curves and a curated 5-vial discovery set that converts curiosity into confidence.'
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      heading: 'FRAGRANCE E-COMMERCE RELIES TOO HEAVILY ON GUESSWORK.',
      items: [
        {
          num: '01',
          title: 'INVISIBLE INGREDIENTS',
          desc: "Listing 'amber, fig, bergamot' does not explain how a fragrance actually blooms on skin."
        },
        {
          num: '02',
          title: 'HIGH BLIND-BUY RISK',
          desc: 'Expecting customers to purchase a $240 bottle without smelling it causes high hesitation.'
        },
        {
          num: '03',
          title: 'GENERIC GLAMOUR',
          desc: 'Stock perfume photos fail to capture the nocturnal mood and artisanal bottle craftsmanship.'
        }
      ]
    },
    direction: {
      eyebrow: 'DESIGN DIRECTION',
      heading: 'NOCTURNAL. TACTILE. POETIC.',
      supporting: 'Deep plum and obsidian shadows illuminated by warm amber backlighting mirror the experience of entering a high-perfumery laboratory at dusk.',
      principles: [
        {
          title: 'OLFACTORY HIERARCHY',
          desc: 'Visualizing top, heart and base note evaporation timelines.'
        },
        {
          title: 'VESSEL MATERIALITY',
          desc: 'Emphasizing the tactile 420g flint crystal and magnetic brass closure.'
        },
        {
          title: 'LOW-FRICTION DISCOVERY',
          desc: 'A risk-free discovery box redeemable against future full-size bottles.'
        }
      ]
    },
    experience: {
      eyebrow: 'THE EXPERIENCE',
      intro: 'Every interface interaction gives visual form to the sensory nuances of niche luxury perfumery.'
    },
    screens: [
      {
        num: '01 / HOMEPAGE',
        heading: 'OLFACTORY POETRY IN LIGHT',
        desc: 'The hero experience immediately sets the nocturnal mood with glowing flacon lighting and interactive scent pyramids.',
        img: '/assets/concepts/perfume-concept.jpg'
      },
      {
        num: '02 / OLFACTORY NOTES',
        heading: 'THE ARCHITECTURE OF SCENT',
        desc: 'Interactive botanical note breakdowns showing evaporation curves from crisp Calabrian bergamot to deep Atlas cedarwood.',
        img: '/assets/concepts/perfume-notes.jpg'
      },
      {
        num: '03 / CRAFTSMANSHIP',
        heading: 'THE WEIGHT OF LUXURY',
        desc: 'Macro exploration of the physical bottle: 420g flint glass, micro-fine mist actuator, and magnetic tactile closure.',
        img: '/assets/concepts/perfume-bottle.jpg'
      },
      {
        num: '04 / DISCOVERY SET',
        heading: 'CURATE BEFORE COMMITTING',
        desc: 'A customizable 5-vial discovery wardrobe in a black velvet presentation tray, fully redeemable toward full flacons.',
        img: '/assets/concepts/perfume-discovery.jpg'
      }
    ],
    details: {
      eyebrow: 'DETAILS THAT MATTER',
      heading: 'SMALL DECISIONS. BETTER EXPERIENCE.',
      items: [
        {
          tag: 'CURVE',
          title: 'EVAPORATION CURVES',
          desc: 'Visual curves illustrating how scent notes evolve over 8+ hours on skin.'
        },
        {
          tag: 'CREDIT',
          title: 'DISCOVERY CREDIT',
          desc: 'Transparent indicator showing discovery sets credit directly toward full bottles.'
        },
        {
          tag: 'LIGHT',
          title: 'VOLUMETRIC LIGHT',
          desc: 'Warm amber backlit flacon photography conveying scent temperature and density.'
        },
        {
          tag: 'VELVET',
          title: 'TACTILE TRAY UI',
          desc: 'Interactive tray interface with tactile animations mirroring luxury unboxing.'
        }
      ]
    },
    designSystem: {
      eyebrow: 'DESIGN SYSTEM',
      heading: 'A VISUAL LANGUAGE BUILT FOR INVISIBLE SENSES.',
      colors: [
        { name: 'Nocturnal Obsidian', hex: '#090A10', role: 'Nocturnal Atelier' },
        { name: 'Amber Extract', hex: '#E5A04D', role: 'Glowing Warmth & Notes' },
        { name: 'Plum Iris Shadow', hex: '#1B1424', role: 'Subtle Atmosphere' },
        { name: 'Velvet Silk', hex: '#F4EFE6', role: 'Pristine Typography' }
      ],
      typography: {
        display: 'High-Contrast Luxury Serif — Elegant, Poetic, Parisian',
        body: 'DM Sans — Modern, Editorial, Clear'
      }
    },
    takeaway: {
      eyebrow: 'CONCEPT TAKEAWAY',
      heading: 'WHAT THIS CONCEPT EXPLORES',
      quote: 'How digital interaction can evoke invisible senses and eliminate the anxiety of luxury e-commerce blind purchases.',
      points: [
        {
          num: '01',
          title: 'SENSORY VISUALIZATION',
          desc: 'Turn invisible notes into tangible interactive diagrams.'
        },
        {
          num: '02',
          title: 'SAMPLE-FIRST CONVERSION',
          desc: 'De-risk high-ticket luxury with structured discovery sets.'
        },
        {
          num: '03',
          title: 'POETIC PRECISION',
          desc: 'Balance emotional storytelling with clear olfactory data.'
        }
      ]
    },
    disclaimer: 'Self-initiated concept created by AXILYN. This project is an exploration of digital experience design and is not a commissioned client project.',
    cta: {
      heading: 'HAVE A BUSINESS THAT COULD USE A BETTER EXPERIENCE?',
      text: "Let's turn your idea, brand or business into a digital experience people remember.",
      btnText: 'BUILD WITH AXILYN →'
    }
  },
  {
    id: 3,
    slug: 'idea-to-interface',
    cleanSlug: 'saas',
    seoTitle: 'Modern SaaS Landing Page Concept | Axilyn',
    metaDesc: "Explore Axilyn's self-initiated SaaS landing page concept focused on product clarity, interface storytelling and conversion-oriented user journeys.",
    eyebrow: 'SELF-INITIATED CONCEPT / 2026',
    title: 'FROM IDEA TO INTERFACE',
    cat: 'SELF-INITIATED CONCEPT · SAAS / DIGITAL PRODUCT',
    hero: '/assets/concepts/saas-concept.jpg',
    desc: 'Most developer tools bury their product in marketing jargon. This concept explores how live sandboxes, interactive telemetry and visual runtime graphs turn complex developer infrastructure into immediate clarity.',
    client: 'Self-Initiated Concept',
    year: '2026',
    duration: 'Studio Concept Sprint',
    tags: ['SaaS Landing', 'Product Storytelling', 'UI/UX', 'Conversion Architecture'],
    idea: {
      eyebrow: 'THE IDEA',
      heading: "SHOW THE RUNTIME. DON'T JUST PITCH THE FEATURES.",
      p1: 'Developers and technical founders are skeptical of marketing buzzwords. They want to inspect the syntax, see real-time latency graphs, and understand how code moves to the edge.',
      p2: 'This concept replaces generic tech landing pages with an interactive telemetry canvas, live terminal deployment simulator, and instant multi-cloud mesh visualizer.'
    },
    problem: {
      eyebrow: 'THE PROBLEM',
      heading: 'DEVELOPER TOOLS OFTEN HIDE THE ACTUAL PRODUCT.',
      items: [
        {
          num: '01',
          title: 'ABSTRACT JARGON',
          desc: "Words like 'scalable' and 'seamless' explain nothing to an engineer evaluating infrastructure."
        },
        {
          num: '02',
          title: 'CONCEALED WORKFLOWS',
          desc: 'Forcing users to create an account before seeing how code is written causes immediate bounce.'
        },
        {
          num: '03',
          title: 'VISUAL CLUTTER',
          desc: 'Over-complicated dashboard mockups that make simple deployment look intimidating.'
        }
      ]
    },
    direction: {
      eyebrow: 'DESIGN DIRECTION',
      heading: 'DARK. PRECISE. REAL-TIME.',
      supporting: 'A high-performance developer aesthetic featuring neon latency spectrums, crisp monospace telemetry, and glass panel modularity inspired by modern IDEs.',
      principles: [
        {
          title: 'CODE-FIRST PROOF',
          desc: 'Real code snippets and CLI benchmarks front and center.'
        },
        {
          title: 'LIVE TELEMETRY',
          desc: 'Real-time interactive graphs demonstrating sub-15ms edge routing.'
        },
        {
          title: 'ZERO-FRICTION TRIAL',
          desc: 'Interactive browser sandbox that does not require signup.'
        }
      ]
    },
    experience: {
      eyebrow: 'THE EXPERIENCE',
      intro: 'Every screen turns abstract cloud computing infrastructure into tangible, interactive proof.'
    },
    screens: [
      {
        num: '01 / HOMEPAGE',
        heading: 'A DEVELOPER EXPERIENCE THAT DELIVERS',
        desc: 'The landing interface proves immediate value with a live analytics preview and simulated terminal commands.',
        img: '/assets/concepts/saas-concept.jpg'
      },
      {
        num: '02 / TELEMETRY DASHBOARD',
        heading: 'OBSERVABILITY AT A GLANCE',
        desc: 'Real-time P99 latency tracking, 2.4M req/sec health maps, and live event streaming in dark glass panels.',
        img: '/assets/concepts/saas-dashboard.jpg'
      },
      {
        num: '03 / LIVE TERMINAL',
        heading: 'COMPOSE, SIMULATE & SHIP',
        desc: 'Split-pane interface pairing TypeScript configuration directly with real-time edge deployment output.',
        img: '/assets/concepts/saas-terminal.jpg'
      },
      {
        num: '04 / EDGE MESH PIPELINE',
        heading: 'ORCHESTRATE WITHOUT CODE FRICTION',
        desc: 'Interactive visual node canvas illustrating automatic micro-builds, 180+ global PoP distribution, and zero downtime switches.',
        img: '/assets/concepts/saas-deploy.jpg'
      }
    ],
    details: {
      eyebrow: 'DETAILS THAT MATTER',
      heading: 'SMALL DECISIONS. BETTER EXPERIENCE.',
      items: [
        {
          tag: 'BENCH',
          title: 'LIVE TELEMETRY',
          desc: 'Millisecond-level benchmarks verified directly in the interactive UI.'
        },
        {
          tag: 'GRAPH',
          title: 'NODE-GRAPH FLOW',
          desc: 'Visual connections between Git commits and global edge invalidations.'
        },
        {
          tag: 'CONTRAST',
          title: 'DUAL-THEME CONTRAST',
          desc: 'Ultra-dark matte containers accented by electric violet and cyan status pills.'
        },
        {
          tag: 'CLI',
          title: 'COMMAND QUICK-COPY',
          desc: 'One-click CLI commands with instant copy feedback state animations.'
        }
      ]
    },
    designSystem: {
      eyebrow: 'DESIGN SYSTEM',
      heading: 'A VISUAL LANGUAGE BUILT FOR TECHNICAL CLARITY.',
      colors: [
        { name: 'Terminal Obsidian', hex: '#08090E', role: 'IDE Canvas Ground' },
        { name: 'Electric Violet', hex: '#7C6FFF', role: 'Primary Focus & Action' },
        { name: 'Runtime Cyan', hex: '#2DDAB4', role: 'Health & Status Active' },
        { name: 'Console Slate', hex: '#12151E', role: 'Code Block Surface' }
      ],
      typography: {
        display: 'Bebas Neue & Monospace — High Velocity, Structured',
        body: 'DM Sans — Clean, Technical, Readable'
      }
    },
    takeaway: {
      eyebrow: 'CONCEPT TAKEAWAY',
      heading: 'WHAT THIS CONCEPT EXPLORES',
      quote: 'How developer tool marketing can earn trust by letting the product, syntax, and live performance speak for itself.',
      points: [
        {
          num: '01',
          title: 'PROOF OVER PROMISES',
          desc: 'Let developers inspect the real API before asking for a signup.'
        },
        {
          num: '02',
          title: 'VISUALIZE COMPLEXITY',
          desc: 'Translate invisible cloud orchestration into intuitive node graphs.'
        },
        {
          num: '03',
          title: 'SPEED AS AN AESTHETIC',
          desc: 'Make fast performance palpable through instantaneous micro-interactions.'
        }
      ]
    },
    disclaimer: 'Self-initiated concept created by AXILYN. This project is an exploration of digital experience design and is not a commissioned client project.',
    cta: {
      heading: 'HAVE A BUSINESS THAT COULD USE A BETTER EXPERIENCE?',
      text: "Let's turn your idea, brand or business into a digital experience people remember.",
      btnText: 'BUILD WITH AXILYN →'
    }
  }
];

// Normalize all concept image paths to root-relative URLs
(function normalizeProjectAssetPaths() {
  if (typeof PROJECTS === 'undefined' || !Array.isArray(PROJECTS)) return;
  PROJECTS.forEach((proj) => {
    if (proj.hero && !proj.hero.startsWith('http') && !proj.hero.startsWith('data:') && !proj.hero.startsWith('/')) {
      proj.hero = '/' + proj.hero.replace(/^(\.{1,2}\/)+/, '');
    }
    if (Array.isArray(proj.screens)) {
      proj.screens.forEach((screen) => {
        if (screen.img && !screen.img.startsWith('http') && !screen.img.startsWith('data:') && !screen.img.startsWith('/')) {
          screen.img = '/' + screen.img.replace(/^(\.{1,2}\/)+/, '');
        }
      });
    }
  });
})();

