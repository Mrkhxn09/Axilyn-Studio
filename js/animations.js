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
 * FOOTER GIANT WORDMARK TYPEWRITER ANIMATION
 * ═══════════════════════════════════════════════════════
 */
(function initFooterTypewriter() {
  const typedEl = document.getElementById('footerGiantTyped');
  const cursorEl = document.getElementById('footerGiantCursor');
  const wrapEl = document.querySelector('.footer-giant-wrap');

  if (!typedEl || !cursorEl || !wrapEl) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typedEl.textContent = 'AXILYN';
    cursorEl.classList.add('hidden');
    return;
  }

  const word = 'AXILYN';
  let charIndex = 0;
  let isDeleting = false;
  let isVisible = false;
  let timeoutId = null;

  function typeStep() {
    if (!isVisible) return;

    if (!isDeleting) {
      // Typing mode
      charIndex++;
      typedEl.textContent = word.slice(0, charIndex);
      cursorEl.classList.remove('hidden');

      if (charIndex === word.length) {
        // Finished typing entire word, pause before erasing (1.8s)
        isDeleting = true;
        timeoutId = setTimeout(typeStep, 1800);
      } else {
        // Next character typing pace (~380ms)
        timeoutId = setTimeout(typeStep, 380);
      }
    } else {
      // Deleting mode
      charIndex--;
      typedEl.textContent = word.slice(0, charIndex);

      if (charIndex === 0) {
        // Fully erased: hide cursor and pause before retyping (~850ms)
        cursorEl.classList.add('hidden');
        isDeleting = false;
        timeoutId = setTimeout(typeStep, 850);
      } else {
        // Next character deleting pace (~220ms)
        timeoutId = setTimeout(typeStep, 220);
      }
    }
  }

  // IntersectionObserver to run animation only when footer is in or near viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            typeStep();
          }
        } else {
          isVisible = false;
          if (timeoutId) clearTimeout(timeoutId);
        }
      });
    },
    { threshold: 0.05, rootMargin: '100px' }
  );

  observer.observe(wrapEl);
})();

