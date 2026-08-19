/**
 * ═══════════════════════════════════════════════════════
 * SCROLL REVEAL & STATS COUNTER — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

(function initScrollAnimations() {
  // Scroll reveal observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.rev').forEach((el) => revealObserver.observe(el));

  // Animated statistics counter
  function animCount(el, target, suffix) {
    if (!el) return;
    let current = 0;
    const step = Math.ceil(target / 55) || 1;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  let hasCounted = false;
  const statsContainer = document.querySelector('.hstats');

  if (statsContainer) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            animCount(document.getElementById('s1'), 50, '+');
            animCount(document.getElementById('s2'), 30, '+');
          }
        });
      },
      { threshold: 0.5 }
    );

    counterObserver.observe(statsContainer);
  }
})();

/**
 * ═══════════════════════════════════════════════════════
 * FOOTER MASSIVE AXILYN LOGO CONTINUOUS REVEAL CONTROLLER
 * ═══════════════════════════════════════════════════════
 */
(function initFooterWordmarkReveal() {
  const clipRect = document.getElementById('axilynClipRect');
  const cursorLine = document.getElementById('axilynCursorLine');
  const textEl = document.getElementById('axilynLogoText');
  const wrapEl = document.querySelector('.footer-giant-wrap');
  const glowLight = document.querySelector('.footer-rising-light');

  if (!clipRect || !cursorLine || !wrapEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    clipRect.setAttribute('x', '0');
    clipRect.setAttribute('width', '1200');
    cursorLine.style.display = 'none';
    return;
  }

  // Exact BBox bounds of the SVG text
  let startX = 295;
  let endX = 905;
  let textWidth = 610;
  let textY = 25;
  let textHeight = 175;

  function measureBounds() {
    if (textEl && typeof textEl.getBBox === 'function') {
      try {
        const bbox = textEl.getBBox();
        if (bbox && bbox.width > 50) {
          startX = Math.max(0, bbox.x - 2);
          textWidth = bbox.width + 4;
          endX = startX + textWidth;
          textY = Math.max(0, bbox.y - 2);
          textHeight = bbox.height + 4;
          
          cursorLine.setAttribute('y1', String(textY));
          cursorLine.setAttribute('y2', String(textY + textHeight));
        }
      } catch (e) {
        // Fallback to default measured coordinates
      }
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureBounds);
  } else {
    setTimeout(measureBounds, 100);
  }

  let state = 'REVEALING'; // 'REVEALING' | 'HOLD' | 'RETRACTING' | 'PAUSE'
  let stateStartTime = performance.now();
  let isVisible = false;
  let rafId = null;

  const REVEAL_DURATION = 2600;   // 2.6s continuous smooth reveal
  const HOLD_DURATION = 1800;     // 1.8s fully visible with purple illumination
  const RETRACT_DURATION = 1800;  // 1.8s continuous smooth reverse
  const PAUSE_DURATION = 800;     // 0.8s resting empty pause

  // Subtle smooth easing
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function setVisual(progress) {
    // progress: 0.0 to 1.0
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const currentX = startX + clampedProgress * textWidth;

    // Reveal from left (0 to currentX)
    clipRect.setAttribute('x', '0');
    clipRect.setAttribute('width', String(currentX));

    // Cursor position immediately beside the reveal boundary
    cursorLine.setAttribute('x1', String(currentX + 2));
    cursorLine.setAttribute('x2', String(currentX + 2));
    cursorLine.style.opacity = '0.95';

    // Synchronize rising purple light intensity with reveal progress
    if (glowLight) {
      const glowOpacity = 0.35 + clampedProgress * 0.55;
      const glowScale = 0.75 + clampedProgress * 0.4;
      const glowY = 12 - clampedProgress * 18;
      glowLight.style.opacity = String(glowOpacity);
      glowLight.style.transform = `translateX(-50%) translateY(${glowY}px) scaleY(${glowScale})`;
    }
  }

  function loop(now) {
    if (!isVisible) return;

    const elapsed = now - stateStartTime;

    if (state === 'REVEALING') {
      const p = Math.min(1, elapsed / REVEAL_DURATION);
      const eased = easeInOutQuad(p);
      setVisual(eased);

      if (elapsed >= REVEAL_DURATION) {
        state = 'HOLD';
        stateStartTime = now;
        setVisual(1.0);
      }
    } else if (state === 'HOLD') {
      setVisual(1.0);
      if (elapsed >= HOLD_DURATION) {
        state = 'RETRACTING';
        stateStartTime = now;
      }
    } else if (state === 'RETRACTING') {
      const p = Math.min(1, elapsed / RETRACT_DURATION);
      const eased = easeInOutQuad(1 - p);
      setVisual(eased);

      if (elapsed >= RETRACT_DURATION) {
        state = 'PAUSE';
        stateStartTime = now;
        setVisual(0.0);
      }
    } else if (state === 'PAUSE') {
      setVisual(0.0);
      if (elapsed >= PAUSE_DURATION) {
        state = 'REVEALING';
        stateStartTime = now;
      }
    }

    rafId = requestAnimationFrame(loop);
  }

  // IntersectionObserver to run animation only when visible in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            measureBounds();
            stateStartTime = performance.now();
            rafId = requestAnimationFrame(loop);
          }
        } else {
          isVisible = false;
          if (rafId) cancelAnimationFrame(rafId);
        }
      });
    },
    { threshold: 0.05, rootMargin: '100px' }
  );

  observer.observe(wrapEl);
})();



