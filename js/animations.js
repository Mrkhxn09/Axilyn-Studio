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
