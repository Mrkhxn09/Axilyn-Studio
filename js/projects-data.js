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
    slug: 'brandcore',
    title: 'BrandCore Dashboard',
    cat: 'UI/UX DESIGN · WEB DEVELOPMENT',
    hero: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85',
    desc: 'BrandCore needed a command-centre dashboard for managing brand assets across 40+ markets. We designed a data-dense yet breathable UI system with real-time analytics, dark-mode-first design and a component library of 120+ elements. The result: a 38% reduction in workflow time for brand managers.',
    client: 'BrandCore Inc.',
    year: '2024',
    duration: '14 weeks',
    tags: ['UI/UX Design', 'Web Development', 'Design System', 'Figma'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', wide: false }
    ]
  },
  {
    id: 1,
    slug: 'novasite',
    title: 'NovaSite',
    cat: 'WEB DESIGN',
    hero: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=85',
    desc: 'NovaSite is a SaaS landing page we designed from scratch for a website-builder startup. The goal was to convey simplicity, speed and modernity. We used bold typography, micro-animations on scroll and a clean 3-column feature grid. Conversion rate increased by 62% vs the previous page.',
    client: 'NovaSite Ltd.',
    year: '2024',
    duration: '6 weeks',
    tags: ['Web Design', 'Landing Page', 'HTML/CSS', 'Conversion Optimisation'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80', wide: true }
    ]
  },
  {
    id: 2,
    slug: 'inkwell',
    title: 'Inkwell Studio',
    cat: 'BRAND IDENTITY · GRAPHIC DESIGN',
    hero: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=85',
    desc: 'Inkwell is a boutique content studio that needed a full visual identity — from logo system and brand guidelines to stationery, social templates and packaging. We developed a rich monochrome palette with a single ink-drop accent colour, paired with editorial serif typography.',
    client: 'Inkwell Studio',
    year: '2023',
    duration: '8 weeks',
    tags: ['Brand Identity', 'Logo Design', 'Graphic Design', 'Brand Guidelines'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1603575448878-868a20723f5d?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', wide: false }
    ]
  },
  {
    id: 3,
    slug: 'socialpulse',
    title: 'SocialPulse',
    cat: 'SOCIAL MEDIA MANAGEMENT',
    hero: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=85',
    desc: 'SocialPulse is a D2C skincare brand we manage across Instagram, LinkedIn and Pinterest. We built a 12-month content calendar, designed a custom template library of 60+ reusable assets, and ran a UGC campaign that generated 2.4M impressions in the first month. Follower growth: +340% in 6 months.',
    client: 'SocialPulse Beauty',
    year: '2024',
    duration: 'Ongoing retainer',
    tags: ['Social Media', 'Content Design', 'Strategy', 'Instagram', 'Pinterest'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80', wide: true }
    ]
  },
  {
    id: 4,
    slug: 'finova',
    title: 'Finova App',
    cat: 'UI/UX DESIGN',
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',
    desc: 'Finova is a personal finance app for Gen-Z. We ran 3 rounds of user research, mapped 14 core user journeys and produced a full Figma prototype with 80+ screens. The design system uses a warm dark theme with colour-coded spending categories, making financial data feel approachable and even enjoyable.',
    client: 'Finova Technologies',
    year: '2024',
    duration: '12 weeks',
    tags: ['UI/UX Design', 'Mobile App', 'Figma', 'User Research', 'Prototype'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80', wide: false }
    ]
  },
  {
    id: 5,
    slug: 'orion',
    title: 'Orion Mobile Platform',
    cat: 'WEB DEVELOPMENT · UI/UX DESIGN',
    hero: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=85',
    desc: 'Orion is a logistics coordination platform used by 200+ fleet operators. We built the full React frontend with real-time map tracking, drag-and-drop route planning and a native-feeling mobile PWA. The platform processes 50,000+ route events daily with sub-200ms UI response times.',
    client: 'Orion Logistics',
    year: '2024',
    duration: '20 weeks',
    tags: ['React', 'PWA', 'Web Development', 'UI/UX', 'Real-time', 'Maps'],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=800&q=80', wide: true },
      { url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80', wide: false },
      { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', wide: false }
    ]
  }
];
