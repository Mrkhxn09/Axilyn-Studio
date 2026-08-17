/**
 * ═══════════════════════════════════════════════════════
 * CUSTOM CURSOR & SPOTLIGHT GRADIENT — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

(function initCursor() {
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  const hero = document.getElementById('hero');
  const grad = document.getElementById('heroGradient');

  if (!cur || !curR) return;

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  // Track mouse coordinates & dynamic hero spotlight
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';

    if (hero && grad) {
      const r = hero.getBoundingClientRect();
      if (e.clientY >= r.top && e.clientY <= r.bottom) {
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
        grad.style.background = `radial-gradient(700px circle at ${x}% ${y}%, rgba(124, 111, 255, 0.18), rgba(45, 218, 180, 0.06) 40%, transparent 70%)`;
      }
    }
  });

  // Smooth lerp follower for outer ring
  function tick() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    curR.style.left = rx + 'px';
    curR.style.top = ry + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Hover expansion on interactive elements
  function curHover(big) {
    cur.style.width = big ? '18px' : '10px';
    cur.style.height = big ? '18px' : '10px';
    cur.style.background = big ? 'var(--teal)' : 'var(--ring)';
  }

  const interactiveSelectors = 'a, button, .wcard, .sc, .rel-card, .proj-gallery img, .ptab, summary';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      curHover(true);
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      curHover(false);
    }
  });
})();
