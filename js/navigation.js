/**
 * ═══════════════════════════════════════════════════════
 * NAVIGATION, SPA ROUTING & LIGHTBOX — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

/**
 * Switch Process Orbit Cycle tab
 * @param {number} index - Active tab index (0: Discover, 1: Design, 2: Build, 3: Launch)
 */
function swTab(index) {
  const tabs = document.querySelectorAll('.ptab');
  const panels = document.querySelectorAll('.pp');
  tabs.forEach((tab, j) => tab.classList.toggle('on', j === index));
  panels.forEach((panel, j) => panel.classList.toggle('on', j === index));
}

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
