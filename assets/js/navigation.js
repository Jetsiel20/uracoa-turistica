export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.menu-toggle');
  const nav = header?.querySelector('.desktop-nav');
  if (!toggle || !nav || header.dataset.navigationReady) return;

  // Use the CSS layout as the source of truth for the mobile breakpoint.
  const isMobile = () => getComputedStyle(toggle).display !== 'none';

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      if (open) nav.querySelector('a[href]')?.focus();
    }
  });

  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !isMobile() || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    setOpen(false);
    const href = link.getAttribute('href');
    const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
    if (target) {
      const temporaryTabIndex = !target.hasAttribute('tabindex');
      if (temporaryTabIndex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (temporaryTabIndex) {
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    } else {
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });

  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setOpen(false);
  });

  let wasMobile;
  window.addEventListener('resize', () => {
    const mobile = isMobile();
    if (mobile === wasMobile) return;
    wasMobile = mobile;
    const focused = document.activeElement;
    setOpen(false);
    if (mobile && nav.contains(focused)) toggle.focus();
    if (!mobile && focused === toggle) nav.querySelector('a[href]')?.focus();
  });

  setOpen(false);
  header.dataset.navigationReady = 'true';
  wasMobile = isMobile();
}
