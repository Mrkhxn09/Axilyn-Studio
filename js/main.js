/**
 * ═══════════════════════════════════════════════════════
 * MAIN BOOTSTRAP & SPLASH SCREEN — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 */

// Initialize Splash Screen
(function initSplash() {
  const splash = document.getElementById('splash');
  const fill = document.getElementById('splashFill');
  if (!splash || !fill) return;

  let prog = 0;
  const interval = setInterval(() => {
    prog += (100 - prog) * 0.12 + 1;
    if (prog > 99) prog = 99;
    fill.style.width = prog + '%';
  }, 30);

  setTimeout(() => {
    clearInterval(interval);
    fill.style.transition = 'width 0.15s linear';
    fill.style.width = '100%';

    setTimeout(() => {
      splash.classList.add('hide');
      setTimeout(() => {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 800);
    }, 180);
  }, 1000);
})();
