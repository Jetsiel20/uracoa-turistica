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
    '.intro-content', '.intro-image', '.section-heading', '.experience-card',
    '.river-content', 'main > .section > .container > h2'
  ].join(', '));

  let observer;
  if ('IntersectionObserver' in window) {
    const pending = new Set(targets);
    observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || !pending.has(target)) continue;
        pending.delete(target);
        observer.unobserve(target);
        // Nothing is hidden before observation: content remains usable on failure.
        if (!preference.matches && !target.matches(':focus-within')) {
          target.classList.add('motion-enter');
        }
      }
      if (!pending.size) observer.disconnect();
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

    targets.forEach((target) => observer.observe(target));
  }

  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer?.disconnect();
    hero?.classList.remove('hero-intro-active');
    targets.forEach((target) => target.classList.remove('motion-enter'));
  });
}

export function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const media = hero?.querySelector('.hero-media');
  if (!media || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let frame = 0;

  function render() {
    frame = 0;
    const { top, height } = hero.getBoundingClientRect();
    const distance = Math.max(0, Math.min(-top, height));
    // The 8% overscan in CSS covers the entire bounded displacement.
    const offset = Math.min(distance * 0.12, height * 0.07, 64);
    media.style.setProperty('--hero-offset', `${offset.toFixed(2)}px`);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function sync() {
    const active = visible && !reducedMotion.matches && !document.hidden;
    hero.classList.toggle('hero-parallax-active', active);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    cancelAnimationFrame(frame);
    frame = 0;

    if (active) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      schedule();
    } else if (reducedMotion.matches) {
      media.style.removeProperty('--hero-offset');
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  observer.observe(hero);
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
}
