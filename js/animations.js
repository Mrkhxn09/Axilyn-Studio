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

/**
 * ═══════════════════════════════════════════════════════
 * HERO PROCESS FLOW CONTROLLER — AXILYN STUDIO
 * ═══════════════════════════════════════════════════════
 * Dynamic organic curve calculation, slow traveling glowing particle,
 * active node pulse lighting, and smooth hover-pause interactions.
 */
(function initHeroProcessFlow() {
  const container = document.getElementById('pflowContainer');
  const pathTrack = document.getElementById('pflowTrack');
  const pathGlow = document.getElementById('pflowTrackGlow');
  const pathActive = document.getElementById('pflowTrackActive');
  const particle = document.getElementById('pflowParticle');
  const nodes = document.querySelectorAll('.pflow-node');

  if (!container || !pathTrack || !particle || nodes.length < 4) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let totalLength = 0;
  let nodeRatios = [0, 0.333, 0.666, 1];
  let isPaused = false;
  let isVisible = false;
  let animProgress = 0.666; // Start smoothly around BUILD
  let lastTimestamp = null;
  let rafId = null;

  const DURATION_MS = 8000; // 8.0s continuous elegant loop

  // Update SVG curve geometry to pass perfectly through all node centers
  function updateCurve() {
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0) return;

    const centers = [];
    nodes.forEach((node) => {
      const icon = node.querySelector('.pflow-icon-wrap');
      if (icon) {
        const iRect = icon.getBoundingClientRect();
        centers.push({
          x: iRect.left + iRect.width / 2 - cRect.left,
          y: iRect.top + iRect.height / 2 - cRect.top
        });
      }
    });

    if (centers.length < 4) return;

    const isVertical = window.innerWidth <= 680;
    let d = '';

    if (!isVertical) {
      // Desktop: Horizontal organic wave with subtle sine-like curves
      const [p0, p1, p2, p3] = centers;
      const dx01 = p1.x - p0.x;
      const dx12 = p2.x - p1.x;
      const dx23 = p3.x - p2.x;

      d = `M ${p0.x},${p0.y} ` +
          `C ${p0.x + dx01 * 0.4},${p0.y - 12} ${p0.x + dx01 * 0.6},${p0.y + 12} ${p1.x},${p1.y} ` +
          `C ${p1.x + dx12 * 0.4},${p1.y - 12} ${p1.x + dx12 * 0.6},${p1.y + 12} ${p2.x},${p2.y} ` +
          `C ${p2.x + dx23 * 0.4},${p2.y - 12} ${p2.x + dx23 * 0.6},${p2.y + 12} ${p3.x},${p3.y}`;
    } else {
      // Mobile: Vertical organic wave with subtle S-curves
      const [p0, p1, p2, p3] = centers;
      const dy01 = p1.y - p0.y;
      const dy12 = p2.y - p1.y;
      const dy23 = p3.y - p2.y;

      d = `M ${p0.x},${p0.y} ` +
          `C ${p0.x - 9},${p0.y + dy01 * 0.4} ${p0.x + 9},${p0.y + dy01 * 0.6} ${p1.x},${p1.y} ` +
          `C ${p1.x - 9},${p1.y + dy12 * 0.4} ${p1.x + 9},${p1.y + dy12 * 0.6} ${p2.x},${p2.y} ` +
          `C ${p2.x - 9},${p2.y + dy23 * 0.4} ${p2.x + 9},${p2.y + dy23 * 0.6} ${p3.x},${p3.y}`;
    }

    pathTrack.setAttribute('d', d);
    if (pathGlow) pathGlow.setAttribute('d', d);
    if (pathActive) pathActive.setAttribute('d', d);

    try {
      totalLength = pathTrack.getTotalLength();
      if (pathActive) {
        pathActive.style.strokeDasharray = `${totalLength} ${totalLength}`;
      }
    } catch (e) {}

    renderFrame();
  }

  function setActiveNode(index) {
    nodes.forEach((n, i) => {
      n.classList.toggle('is-active', i === index);
    });
  }

  function renderFrame() {
    if (!totalLength || totalLength <= 0) return;

    const currentDist = Math.max(0, Math.min(totalLength, animProgress * totalLength));
    try {
      const pt = pathTrack.getPointAtLength(currentDist);
      particle.setAttribute('cx', pt.x.toFixed(1));
      particle.setAttribute('cy', pt.y.toFixed(1));

      // Luminous active trailing line
      if (pathActive) {
        pathActive.style.strokeDashoffset = `${totalLength * (1 - animProgress)}`;
      }

      // Check proximity to nodes for subtle node lighting
      nodes.forEach((n, i) => {
        const targetRatio = nodeRatios[i];
        const dist = Math.abs(animProgress - targetRatio);
        const isClose = dist < 0.065;
        n.classList.toggle('is-pulsing', isClose);
      });
    } catch (e) {}
  }

  function tick(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isPaused && isVisible) {
      animProgress += dt / DURATION_MS;
      if (animProgress > 1.0) {
        animProgress = 0.0;
        particle.style.opacity = '0';
        setTimeout(() => { particle.style.opacity = '1'; }, 100);
      }
      renderFrame();
    }

    rafId = requestAnimationFrame(tick);
  }

  // Hover & Focus Interactions: Pause particle & highlight stage
  nodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => {
      isPaused = true;
      setActiveNode(idx);
    });

    node.addEventListener('mouseleave', () => {
      isPaused = false;
      // Re-anchor BUILD as active when cursor leaves
      setActiveNode(2);
    });

    node.addEventListener('focus', () => {
      isPaused = true;
      setActiveNode(idx);
    });

    node.addEventListener('blur', () => {
      isPaused = false;
      setActiveNode(2);
    });
  });

  // Responsive resize observation
  const ro = new ResizeObserver(() => {
    updateCurve();
  });
  ro.observe(container);
  window.addEventListener('resize', updateCurve);

  // Initialize after fonts and layout settle
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateCurve);
  } else {
    setTimeout(updateCurve, 150);
  }

  if (prefersReducedMotion) {
    // Static placement at BUILD node
    animProgress = 0.666;
    setTimeout(renderFrame, 200);
    return;
  }

  // Viewport IntersectionObserver to conserve resources
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            updateCurve();
            lastTimestamp = performance.now();
            rafId = requestAnimationFrame(tick);
          }
        } else {
          isVisible = false;
          if (rafId) cancelAnimationFrame(rafId);
        }
      });
    },
    { threshold: 0.05 }
  );

  heroObserver.observe(container);
})();
