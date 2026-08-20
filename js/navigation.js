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
  const STEP_COUNT = 4;
  const STEP_DURATION = 6000; // 6 seconds per step for comfortable reading

  let currentStep = 0;
  let elapsed = 0;
  let lastTimestamp = null;
  let rafId = null;
  let isHovered = false;
  let isIntersecting = false;

  const processSec = document.getElementById('process');
  const tabs = document.querySelectorAll('.ptab');
  const panels = document.querySelectorAll('.pp');
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
 */
function openProject(id) {
  if (typeof PROJECTS === 'undefined' || !PROJECTS[id]) return;
  const p = PROJECTS[id];

  // Populate hero & header
  const phImg = document.getElementById('phImg');
  const phCat = document.getElementById('phCat');
  const phTitle = document.getElementById('phTitle');
  const phDesc = document.getElementById('phDesc');
  const pmClient = document.getElementById('pmClient');
  const pmYear = document.getElementById('pmYear');
  const pmDur = document.getElementById('pmDur');
  const tagsEl = document.getElementById('pmTags');
  const gEl = document.getElementById('phGallery');
  const relEl = document.getElementById('relGrid');

  if (phImg) phImg.src = p.hero;
  if (phCat) phCat.textContent = p.cat;
  if (phTitle) phTitle.textContent = p.title;
  if (phDesc) phDesc.textContent = p.desc;
  if (pmClient) pmClient.textContent = p.client;
  if (pmYear) pmYear.textContent = p.year;
  if (pmDur) pmDur.textContent = p.duration;

  // Render tags
  if (tagsEl) {
    tagsEl.innerHTML = p.tags.map((t) => `<span class="ptag">${t}</span>`).join('');
  }

  // Render gallery
  if (gEl) {
    gEl.innerHTML = p.gallery
      .map(
        (g) =>
          `<img src="${g.url}" alt="${p.title} gallery asset" class="${
            g.wide ? 'wide' : ''
          }" onclick="openLb('${g.url}')" loading="lazy"/>`
      )
      .join('');
  }

  // Render related projects (excluding current)
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
 * Return to Main Site homepage
 */
function goHome() {
  const mainSite = document.getElementById('mainSite');
  const projectPage = document.getElementById('projectPage');
  if (mainSite) mainSite.style.display = 'block';
  if (projectPage) projectPage.style.display = 'none';

  swTab(0); // Reset process tabs to 01 Discover

  setTimeout(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 50);
}

/**
 * Return to Work section on the main site
 */
function backToWork() {
  const main = document.getElementById('mainSite');
  const proj = document.getElementById('projectPage');
  if (proj) proj.style.display = 'none';
  if (main) main.style.display = 'block';

  swTab(0);

  // Double rAF ensures browser layout repaint before smooth scroll
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

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
