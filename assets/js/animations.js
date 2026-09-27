let pageMotionInitialized = false;

export function initPageMotion() {
  if (pageMotionInitialized) return;
  pageMotionInitialized = true;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;

  const hero = document.querySelector('.hero');
  // Do not replay the introduction when following a deep link or restoring scroll.
  if (window.scrollY < 20 && !window.location.hash) {
    hero?.classList.add('hero-intro-active');
  }

  const targets = document.querySelectorAll([
    '.section-heading', '.experience-card',
    '.river-content', 'main > .section > .container > h2'
  ].join(', '));

  const observers = [];
  if ('IntersectionObserver' in window) {
    function observeGroup(elements, threshold, rootMargin) {
      if (!elements.length) return;
      const pending = new Set(elements);
      const observer = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting, intersectionRatio } of entries) {
          // Initial observer notifications can arrive below the requested threshold.
          if (!isIntersecting || intersectionRatio < threshold || !pending.has(target)) continue;
          pending.delete(target);
          observer.unobserve(target);
          // Content remains visible even if motion is disabled or unavailable.
          if (!preference.matches && !target.matches(':focus-within')) {
            target.classList.add('motion-enter');
          }
        }
        if (!pending.size) observer.disconnect();
      }, { threshold, rootMargin });
      elements.forEach((target) => observer.observe(target));
      observers.push(observer);
    }

    const cards = [...targets].filter((target) => target.matches('.experience-card'));
    const otherTargets = [...targets].filter((target) => !target.matches('.experience-card'));
    observeGroup(cards, 0.3, '0px');
    observeGroup(otherTargets, 0, '0px 0px -32px 0px');
  }

  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observers.forEach((observer) => observer.disconnect());
    hero?.classList.remove('hero-intro-active');
    targets.forEach((target) => target.classList.remove('motion-enter'));
  });
}
