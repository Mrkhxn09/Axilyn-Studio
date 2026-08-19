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
 * FOOTER MASSIVE AXILYN LOGO PROGRESSIVE REVEAL CONTROLLER
 * ═══════════════════════════════════════════════════════
 */
(function initFooterWordmarkReveal() {
  const clipRect = document.getElementById('axilynClipRect');
  const cursorLine = document.getElementById('axilynCursorLine');
  const wrapEl = document.querySelector('.footer-giant-wrap');

  if (!clipRect || !wrapEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    clipRect.setAttribute('width', '1200');
    if (cursorLine) cursorLine.style.opacity = '0';
    return;
  }

  // Letter reveal width milestones in 1200px SVG viewBox
  const milestones = [0, 270, 440, 560, 710, 860, 1200];
  let currentStep = 0;
  let isDeleting = false;
  let isVisible = false;
  let timerId = null;

  function updateVisual(widthVal, showCursor) {
    clipRect.setAttribute('width', widthVal);
    if (cursorLine) {
      if (showCursor && widthVal > 0 && widthVal < 1200) {
        cursorLine.setAttribute('x1', widthVal + 4);
        cursorLine.setAttribute('x2', widthVal + 4);
        cursorLine.style.opacity = '0.85';
      } else if (showCursor && widthVal >= 1200) {
        cursorLine.setAttribute('x1', 1110);
        cursorLine.setAttribute('x2', 1110);
        cursorLine.style.opacity = '0.85';
      } else {
        cursorLine.style.opacity = '0';
      }
    }
  }

  function step() {
    if (!isVisible) return;

    if (!isDeleting) {
      // Reveal letters progressively (A -> AX -> AXI -> AXIL -> AXILY -> AXILYN)
      currentStep++;
      const targetWidth = milestones[currentStep];
      updateVisual(targetWidth, true);

      if (currentStep >= milestones.length - 1) {
        // Fully revealed: hold with purple illumination for 1.8s
        isDeleting = true;
        timerId = setTimeout(step, 1800);
      } else {
        // Character reveal timing (~360ms)
        timerId = setTimeout(step, 360);
      }
    } else {
      // Retract letters (AXILY -> AXIL -> AXI -> AX -> A -> empty)
      currentStep--;
      const targetWidth = milestones[currentStep];
      updateVisual(targetWidth, currentStep > 0);

      if (currentStep <= 0) {
        // Fully retracted: hide cursor and pause (~850ms) before next loop
        updateVisual(0, false);
        isDeleting = false;
        timerId = setTimeout(step, 850);
      } else {
        // Character retraction timing (~200ms)
        timerId = setTimeout(step, 200);
      }
    }
  }

  // IntersectionObserver to run animation only when visible in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            step();
          }
        } else {
          isVisible = false;
          if (timerId) clearTimeout(timerId);
        }
      });
    },
    { threshold: 0.05, rootMargin: '100px' }
  );

  observer.observe(wrapEl);
})();


