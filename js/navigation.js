/**
 * ═══════════════════════════════════════════════════════
 * NAVIGATION, SPA ROUTING & LIGHTBOX — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

/**
 * ═══════════════════════════════════════════════════════
 * ORBIT CYCLE CONTROLLER (AUTO-ADVANCE, HOVER PAUSE, PROGRESS)
 * ═══════════════════════════════════════════════════════
 */
(function initOrbitProcess() {
  const tabs = document.querySelectorAll('.ptab');
  const panels = document.querySelectorAll('.pp');
  const STEP_COUNT = tabs.length || 5;
  const STEP_DURATION = 6000; // 6 seconds per step for comfortable reading

  let currentStep = 0;
  let elapsed = 0;
  let lastTimestamp = null;
  let rafId = null;
  let isHovered = false;
  let isIntersecting = false;

  const processSec = document.getElementById('process');
  const ptabsContainer = document.getElementById('ptabs');

  if (!processSec || tabs.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateTabProgress(index, progress) {
    tabs.forEach((tab, j) => {
      if (j === index) {
        tab.style.setProperty('--tab-p', progress.toFixed(4));
      } else {
        tab.style.setProperty('--tab-p', '0');
      }
    });
  }

  function setStep(index, fromManualClick = false) {
    if (index < 0 || index >= STEP_COUNT) return;

    currentStep = index;
    elapsed = 0;
    lastTimestamp = null;

    tabs.forEach((tab, j) => {
      const isActive = j === index;
      tab.classList.toggle('on', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach((panel, j) => {
      const isActive = j === index;
      panel.classList.toggle('on', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    updateTabProgress(currentStep, 0);
  }

  // Global tab switcher function
  window.swTab = function (index, isManual = true) {
    setStep(index, isManual);
  };

  // Keyboard navigation for tablist
  if (ptabsContainer) {
    ptabsContainer.setAttribute('role', 'tablist');
    ptabsContainer.setAttribute('aria-label', 'Orbit Cycle Steps');

    tabs.forEach((tab, idx) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', `ptab-${idx}`);
      tab.setAttribute('aria-controls', `pp${idx}`);
      tab.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      tab.setAttribute('tabindex', idx === 0 ? '0' : '-1');

      tab.addEventListener('keydown', (e) => {
        let newIdx = currentStep;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIdx = (currentStep + 1) % STEP_COUNT;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIdx = (currentStep - 1 + STEP_COUNT) % STEP_COUNT;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIdx = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIdx = STEP_COUNT - 1;
        }
        if (newIdx !== currentStep) {
          setStep(newIdx, true);
          tabs[newIdx].focus();
        }
      });
    });

    panels.forEach((panel, idx) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `ptab-${idx}`);
      panel.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');
    });
  }

  // Pause on hover over process section or tabs, resume on leave
  processSec.addEventListener('mouseenter', () => {
    isHovered = true;
    lastTimestamp = null;
  });

  processSec.addEventListener('mouseleave', () => {
    isHovered = false;
    lastTimestamp = null;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      lastTimestamp = null;
    }
  });

  // Main animation frame loop
  function tick(timestamp) {
    if (prefersReducedMotion.matches) {
      updateTabProgress(currentStep, 1);
      return;
    }

    if (!isIntersecting || isHovered || document.hidden) {
      lastTimestamp = null;
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    elapsed += delta;

    const progress = Math.min(1, elapsed / STEP_DURATION);
    updateTabProgress(currentStep, progress);

    if (elapsed >= STEP_DURATION) {
      const nextStep = (currentStep + 1) % STEP_COUNT;
      setStep(nextStep, false);
    }

    rafId = requestAnimationFrame(tick);
  }

  // IntersectionObserver to auto-advance only when visible in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          lastTimestamp = null;
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(processSec);

  // Initialize initial state
  setStep(0, false);
  rafId = requestAnimationFrame(tick);
})();

/**
 * Open Project Detail view for a given project ID
 * @param {number} id - Index in PROJECTS array
 * @param {boolean} [pushState=true] - Whether to push state to browser history
 */
function openProject(id, pushState = true) {
  if (typeof PROJECTS === 'undefined' || !PROJECTS[id]) return;
  const p = PROJECTS[id];

  // Update Dynamic SEO Title & Meta Description
  if (p.seoTitle) {
    document.title = p.seoTitle;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && p.metaDesc) {
    metaDesc.setAttribute('content', p.metaDesc);
  }

  // Update Canonical URL if present
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl && p.cleanSlug) {
    canonicalEl.setAttribute('href', `https://axilyn-studio.vercel.app/concepts/${p.cleanSlug}/`);
  }

  // Push clean URL to browser history
  if (pushState && window.history && window.history.pushState && !window.location.protocol.startsWith('file')) {
    const cleanUrl = `/concepts/${p.cleanSlug || p.slug}/`;
    try {
      history.pushState({ projectId: id }, p.seoTitle || p.title, cleanUrl);
    } catch (e) {
      // Fallback for strict origins
    }
  }

  // 1. Sticky Nav Bar
  const pNavCat = document.getElementById('pNavCat');
  const pNavTitle = document.getElementById('pNavTitle');
  if (pNavCat) pNavCat.textContent = p.cat ? p.cat.toUpperCase() : 'SELF-INITIATED CONCEPT';
  if (pNavTitle) pNavTitle.textContent = p.title ? p.title.toUpperCase() : '';

  // 2. Hero / Intro
  const phEyebrow = document.getElementById('phEyebrow');
  const phTitle = document.getElementById('phTitle');
  const phDesc = document.getElementById('phDesc');
  const pmClient = document.getElementById('pmClient');
  const pmYear = document.getElementById('pmYear');
  const pmDur = document.getElementById('pmDur');
  const tagsEl = document.getElementById('pmTags');

  if (phEyebrow) phEyebrow.textContent = p.eyebrow || 'SELF-INITIATED CONCEPT / 2026';
  if (phTitle) phTitle.innerHTML = p.title.split(' ').join('<br/>');
  if (phDesc) phDesc.textContent = p.desc;
  if (pmClient) pmClient.textContent = p.client;
  if (pmYear) pmYear.textContent = p.year;
  if (pmDur) pmDur.textContent = p.duration;
  if (tagsEl && p.tags) {
    tagsEl.innerHTML = p.tags.map((t) => `<span class="ptag">${t}</span>`).join('');
  }

  // 3. The Idea
  if (p.idea) {
    const pIdeaEyebrow = document.getElementById('pIdeaEyebrow');
    const pIdeaHeading = document.getElementById('pIdeaHeading');
    const pIdeaP1 = document.getElementById('pIdeaP1');
    const pIdeaP2 = document.getElementById('pIdeaP2');
    if (pIdeaEyebrow) pIdeaEyebrow.textContent = p.idea.eyebrow;
    if (pIdeaHeading) pIdeaHeading.innerHTML = p.idea.heading.split('. ').join('.<br/>');
    if (pIdeaP1) pIdeaP1.textContent = p.idea.p1;
    if (pIdeaP2) pIdeaP2.textContent = p.idea.p2;
  }

  // 4. The Problem
  if (p.problem) {
    const pProblemEyebrow = document.getElementById('pProblemEyebrow');
    const pProblemHeading = document.getElementById('pProblemHeading');
    const pProblemGrid = document.getElementById('pProblemGrid');
    if (pProblemEyebrow) pProblemEyebrow.textContent = p.problem.eyebrow;
    if (pProblemHeading) pProblemHeading.innerHTML = p.problem.heading.split(' OFTEN ').join('<br/>OFTEN<br/>');
    if (pProblemGrid && p.problem.items) {
      pProblemGrid.innerHTML = p.problem.items.map(item => `
        <div class="pproblem-card pprob-card">
          <div class="pprob-num">${item.num}</div>
          <h3 class="pprob-title">${item.title}</h3>
          <p class="pprob-desc">${item.desc}</p>
        </div>
      `).join('');
    }
  }

  // 5. Design Direction
  if (p.direction) {
    const pDirEyebrow = document.getElementById('pDirEyebrow');
    const pDirHeading = document.getElementById('pDirHeading');
    const pDirSupporting = document.getElementById('pDirSupporting');
    const pDirGrid = document.getElementById('pDirGrid');
    if (pDirEyebrow) pDirEyebrow.textContent = p.direction.eyebrow;
    if (pDirHeading) pDirHeading.innerHTML = p.direction.heading.split('. ').join('.<br/>');
    if (pDirSupporting) pDirSupporting.textContent = p.direction.supporting;
    if (pDirGrid && p.direction.principles) {
      pDirGrid.innerHTML = p.direction.principles.map(item => `
        <div class="pdir-card">
          <span class="pdir-pill">PRINCIPLE</span>
          <h3 class="pdir-title pdir-card-title">${item.title}</h3>
          <p class="pdir-desc pdir-card-desc">${item.desc}</p>
        </div>
      `).join('');
    }
  }

  // 6. The Experience (Key Screens)
  const pExpEyebrow = document.getElementById('pExpEyebrow');
  const pExpIntro = document.getElementById('pExpIntro');
  if (p.experience) {
    if (pExpEyebrow) pExpEyebrow.textContent = p.experience.eyebrow;
    if (pExpIntro) pExpIntro.textContent = p.experience.intro;
  }
  const pScreensList = document.getElementById('pScreensList');
  if (pScreensList && p.screens) {
    pScreensList.innerHTML = p.screens.map((s, idx) => `
      <article class="pscreen-item">
        <header class="pscreen-header pscreen-meta">
          <div class="pscreen-num pscreen-step">${s.num}</div>
          <h3 class="pscreen-title">${s.heading}</h3>
          <p class="pscreen-desc">${s.desc}</p>
        </header>
        <div class="pscreen-frame" onclick="openLb('${s.img}')" role="button" tabindex="0" aria-label="Click to enlarge ${s.heading}">
          <div class="pscreen-browser-bar">
            <div class="pscreen-dots">
              <span class="pscreen-dot red"></span>
              <span class="pscreen-dot yellow"></span>
              <span class="pscreen-dot green"></span>
            </div>
            <div class="pscreen-url-pill">axilyn.studio / concepts / ${p.cleanSlug || p.slug} / screen-0${idx + 1}</div>
            <span class="pscreen-zoom-hint">⤢ Enlarge View</span>
          </div>
          <div class="pscreen-img-wrap">
            <img src="${s.img}" alt="${s.heading} — ${p.title} digital concept designed by Axilyn" loading="lazy" decoding="async" class="pscreen-img"/>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 7. Details That Matter
  if (p.details) {
    const pDetailsEyebrow = document.getElementById('pDetailsEyebrow');
    const pDetailsHeading = document.getElementById('pDetailsHeading');
    const pDetailsGrid = document.getElementById('pDetailsGrid');
    if (pDetailsEyebrow) pDetailsEyebrow.textContent = p.details.eyebrow;
    if (pDetailsHeading) pDetailsHeading.innerHTML = p.details.heading.split('. ').join('.<br/>');
    if (pDetailsGrid && p.details.items) {
      pDetailsGrid.innerHTML = p.details.items.map(item => `
        <div class="pdetail-card">
          <span class="pdetail-tag">${item.tag || 'SYSTEM'}</span>
          <h3 class="pdetail-title">${item.title}</h3>
          <p class="pdetail-desc">${item.desc}</p>
        </div>
      `).join('');
    }
  }

  // 8. Design System
  if (p.designSystem) {
    const pSystemEyebrow = document.getElementById('pSystemEyebrow');
    const pSystemHeading = document.getElementById('pSystemHeading');
    const pSystemContainer = document.getElementById('pSystemContainer');
    if (pSystemEyebrow) pSystemEyebrow.textContent = p.designSystem.eyebrow;
    if (pSystemHeading) pSystemHeading.innerHTML = p.designSystem.heading.split('. ').join('.<br/>');
    if (pSystemContainer) {
      const colorsHtml = p.designSystem.colors ? `
        <div class="psystem-block">
          <h4 class="psystem-label">COLOR PALETTE</h4>
          <div class="pcolors-list psystem-colors">
            ${p.designSystem.colors.map(c => `
              <div class="pcolor-item pcolor-card">
                <div class="pcolor-swatch" style="background:${c.hex};"></div>
                <div class="pcolor-info">
                  <span class="pcolor-name">${c.name}</span>
                  <span class="pcolor-hex">${c.hex}</span>
                  <span class="pcolor-role">${c.role}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '';

      const typoHtml = p.designSystem.typography ? `
        <div class="psystem-block">
          <h4 class="psystem-label">TYPOGRAPHY SYSTEM</h4>
          <div class="ptype-box psystem-typo">
            <div class="ptype-item ptypo-row">
              <span class="ptype-role ptypo-kind">Display / Headlines</span>
              <div class="ptype-display-sample">Aa Bb Cc 1 2 3</div>
              <div class="ptype-desc ptypo-font">${p.designSystem.typography.display}</div>
            </div>
            <div class="ptype-item ptypo-row">
              <span class="ptype-role ptypo-kind">Body / Narrative</span>
              <div class="ptype-body-sample">Thoughtful digital experiences built for trust.</div>
              <div class="ptype-desc ptypo-font">${p.designSystem.typography.body}</div>
            </div>
          </div>
        </div>
      ` : '';

      pSystemContainer.innerHTML = colorsHtml + typoHtml;
    }
  }

  // 9. What This Concept Explores (Takeaway)
  if (p.takeaway) {
    const pTakeawayEyebrow = document.getElementById('pTakeawayEyebrow');
    const pTakeawayHeading = document.getElementById('pTakeawayHeading');
    const pTakeawayQuote = document.getElementById('pTakeawayQuote');
    const pTakeawayGrid = document.getElementById('pTakeawayGrid');
    if (pTakeawayEyebrow) pTakeawayEyebrow.textContent = p.takeaway.eyebrow;
    if (pTakeawayHeading) pTakeawayHeading.innerHTML = p.takeaway.heading.split(' EXPLORES').join('<br/>EXPLORES');
    if (pTakeawayQuote) pTakeawayQuote.textContent = `"${p.takeaway.quote}"`;
    if (pTakeawayGrid && p.takeaway.points) {
      pTakeawayGrid.innerHTML = p.takeaway.points.map(pt => `
        <div class="ptakeaway-card">
          <div class="ptakeaway-num">${pt.num}</div>
          <h3 class="ptakeaway-title">${pt.title}</h3>
          <p class="ptakeaway-desc">${pt.desc}</p>
        </div>
      `).join('');
    }
  }

  // 10. Subtle Disclaimer
  const pDisclaimerText = document.getElementById('pDisclaimerText');
  if (pDisclaimerText) {
    pDisclaimerText.textContent = p.disclaimer || 'Self-initiated concept created by AXILYN. This project is an exploration of digital experience design and is not a commissioned client project.';
  }

  // 11. Project CTA
  if (p.cta) {
    const pCtaHeading = document.getElementById('pCtaHeading');
    const pCtaText = document.getElementById('pCtaText');
    const pCtaBtn = document.getElementById('pCtaBtn');
    if (pCtaHeading) pCtaHeading.innerHTML = p.cta.heading;
    if (pCtaText) pCtaText.textContent = p.cta.text;
    if (pCtaBtn) pCtaBtn.textContent = p.cta.btnText || 'BUILD WITH AXILYN →';
  }

  // 12. More Concepts (exclude current project)
  const relEl = document.getElementById('relGrid');
  if (relEl) {
    const others = PROJECTS.filter((x) => x.id !== id).slice(0, 3);
    relEl.innerHTML = others
      .map(
        (o) => `
      <div class="rel-card" onclick="openProject(${o.id})">
        <img src="${o.hero}" alt="${o.title}" loading="lazy"/>
        <div class="rel-over">
          <small>${o.cat}</small>
          <span>${o.title}</span>
        </div>
      </div>`
      )
      .join('');
  }

  // Switch SPA views
  const mainSite = document.getElementById('mainSite');
  const projectPage = document.getElementById('projectPage');
  if (mainSite) mainSite.style.display = 'none';
  if (projectPage) projectPage.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Return to Main Site homepage (always scrolls to top #hero)
 * @param {boolean} [pushState=true]
 */
function goHome(pushState = true) {
  const mainSite = document.getElementById('mainSite');
  const projectPage = document.getElementById('projectPage');
  if (mainSite) mainSite.style.display = 'block';
  if (projectPage) projectPage.style.display = 'none';

  // Restore Homepage SEO title & meta description
  document.title = 'AXILYN | Web Design, UI/UX & Digital Growth Studio';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Axilyn is a design-led digital studio creating high-performing websites, UI/UX experiences, SEO strategies and digital growth solutions for ambitious businesses.');
  }
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', 'https://axilyn-studio.vercel.app/');
  }

  if (pushState && window.history && window.history.pushState && !window.location.protocol.startsWith('file')) {
    if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
      try {
        history.pushState({}, 'AXILYN | Web Design, UI/UX & Digital Growth Studio', '/');
      } catch (e) {}
    }
  }

  swTab(0); // Reset process tabs to 01 Discover

  // Double rAF ensures browser layout repaint before smooth scroll
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/**
 * Return to Work section on the main site
 * @param {boolean} [pushState=true]
 */
function backToWork(pushState = true) {
  const main = document.getElementById('mainSite');
  const proj = document.getElementById('projectPage');
  if (proj) proj.style.display = 'none';
  if (main) main.style.display = 'block';

  document.title = 'AXILYN | Web Design, UI/UX & Digital Growth Studio';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Axilyn is a design-led digital studio creating high-performing websites, UI/UX experiences, SEO strategies and digital growth solutions for ambitious businesses.');
  }
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', 'https://axilyn-studio.vercel.app/');
  }

  if (pushState && window.history && window.history.pushState && !window.location.protocol.startsWith('file')) {
    try {
      history.pushState({}, 'AXILYN | Web Design, UI/UX & Digital Growth Studio', '/#work');
    } catch (e) {}
  }

  swTab(0);

  // Double rAF ensures browser layout repaint before smooth scroll
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Browser Back / Forward button navigation
window.addEventListener('popstate', (e) => {
  if (e.state && typeof e.state.projectId === 'number') {
    openProject(e.state.projectId, false);
  } else {
    goHome(false);
  }
});

/**
 * Open Fullscreen Lightbox Modal
 * @param {string} src - Image URL
 */
function openLb(src) {
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  if (lb && lbImg) {
    lbImg.src = src;
    lb.classList.add('on');
  }
}

/**
 * Close Fullscreen Lightbox Modal
 */
function closeLb() {
  const lb = document.getElementById('lb');
  if (lb) {
    lb.classList.remove('on');
  }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLb();
});

/**
 * ═══════════════════════════════════════════════════════
 * INTERACTIVE "WHAT COULD WE BUILD FOR YOU?" CONTROLLER
 * ═══════════════════════════════════════════════════════
 */
(function initPossibilities() {
  const tabs = document.querySelectorAll('.poss-tab');
  const imgEl = document.getElementById('possImg');
  const badgeEl = document.getElementById('possBadge');
  const quoteEl = document.getElementById('possQuote');
  const descEl = document.getElementById('possDesc');
  const tagsEl = document.getElementById('possTags');
  const ctaEl = document.getElementById('possCta');

  if (!tabs.length || !imgEl) return;

  const data = {
    dental: {
      badge: 'CONCEPT EXPLORATION · DENTAL CLINICS',
      quote: '"Turn a clinic website into a patient experience."',
      desc: 'We build patient trust before the first consultation with clear treatment pathways, seamless booking integration, and calming, modern aesthetics.',
      tags: ['PATIENT FLOW', 'APPOINTMENT BOOKING', 'TRUST ARCHITECTURE'],
      cta: 'START A DENTAL PROJECT →',
      img: 'assets/concepts/dental-concept.jpg',
      serviceOption: 'Website Design & Development'
    },
    interiors: {
      badge: 'CONCEPT EXPLORATION · INTERIOR DESIGN',
      quote: '"Let the space speak before the first meeting."',
      desc: 'A premium digital experience built to make architectural work feel as refined online as it does in the real world through editorial pacing and high-resolution spatial storytelling.',
      tags: ['SPATIAL PACING', 'EDITORIAL PORTFOLIO', 'ARCHITECTURAL SHOWCASE'],
      cta: 'START AN INTERIOR PROJECT →',
      img: 'assets/concepts/interior-concept.jpg',
      serviceOption: 'UI/UX Design'
    },
    restaurants: {
      badge: 'CONCEPT EXPLORATION · RESTAURANTS',
      quote: '"Make people hungry before they arrive."',
      desc: 'Sensory-led digital dining experiences featuring immersive photography, atmospheric menus, instant table reservations, and distinct brand character.',
      tags: ['MENU EXPERIENCE', 'TABLE RESERVATIONS', 'ATMOSPHERIC BRANDING'],
      cta: 'START A RESTAURANT PROJECT →',
      img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=80',
      serviceOption: 'Website Design & Development'
    },
    perfume: {
      badge: 'CONCEPT EXPLORATION · LUXURY & E-COMMERCE',
      quote: '"Turn a product into an experience."',
      desc: 'A luxury e-commerce concept focused on olfactory storytelling, product discovery and visual identity that elevates perceived product value.',
      tags: ['OLFACTORY STORYTELLING', 'LUXURY COMMERCE', 'VISUAL IDENTITY'],
      cta: 'START A LUXURY PROJECT →',
      img: 'assets/concepts/perfume-concept.jpg',
      serviceOption: 'UI/UX Design'
    },
    realestate: {
      badge: 'CONCEPT EXPLORATION · REAL ESTATE',
      quote: '"Make the property feel valuable before the visit."',
      desc: 'Architectural elevation showcases, floorplan exploration, and neighbourhood context designed to engage high-intent buyers and investors.',
      tags: ['DEVELOPMENT SHOWCASE', 'HIGH-INTENT LEADS', 'PROPERTY TOURS'],
      cta: 'START A REAL ESTATE PROJECT →',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
      serviceOption: 'Website Design & Development'
    },
    saas: {
      badge: 'CONCEPT EXPLORATION · SAAS & DIGITAL PRODUCTS',
      quote: '"Turn complex software into an intuitive narrative."',
      desc: 'A modern SaaS landing page concept focused on product clarity, interface storytelling and conversion-oriented customer journeys.',
      tags: ['PRODUCT CLARITY', 'USER ONBOARDING', 'CONVERSION FLOWS'],
      cta: 'START A SAAS PROJECT →',
      img: 'assets/concepts/saas-concept.jpg',
      serviceOption: 'UI/UX Design'
    }
  };

  function selectCategory(catKey) {
    const item = data[catKey];
    if (!item) return;

    tabs.forEach((t) => {
      const isMatch = t.getAttribute('data-cat') === catKey;
      t.classList.toggle('on', isMatch);
      t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    imgEl.style.opacity = '0.08';
    setTimeout(() => {
      imgEl.src = item.img;
      if (badgeEl) badgeEl.textContent = item.badge;
      if (quoteEl) quoteEl.textContent = item.quote;
      if (descEl) descEl.textContent = item.desc;
      if (tagsEl) {
        tagsEl.innerHTML = item.tags.map((tg) => `<span class="stag">${tg}</span>`).join(' ');
      }
      if (ctaEl) ctaEl.textContent = item.cta;
      imgEl.style.opacity = '0.3';
    }, 120);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('mouseenter', () => {
      const cat = tab.getAttribute('data-cat');
      selectCategory(cat);
    });
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-cat');
      selectCategory(cat);
    });
  });

  window.selectPossService = function(catKey) {
    const item = data[catKey];
    if (!item) return;
    const select = document.getElementById('cf_service');
    if (select && item.serviceOption) {
      select.value = item.serviceOption;
    }
  };
})();

