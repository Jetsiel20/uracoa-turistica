// La primera fotografía permanece en el CSS como respaldo sin JavaScript.
const nextScenes = [
  { src: './assets/imagenes/hero-2.webp' },
  { src: './assets/imagenes/hero-3.webp' },
  { src: './assets/imagenes/hero-4.webp' },
];

export function initHeroSequence() {
  const hero = document.querySelector('.hero');
  const media = hero?.querySelector('.hero-media');
  const scenes = nextScenes;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!media || media.dataset.sequenceReady || !scenes.length || preference.matches ||
      !('IntersectionObserver' in window)) return;
  media.dataset.sequenceReady = 'true';

  let index = 0;
  let visible = false;
  let timer;
  let pending = null;
  let stopped = false;
  let generation = 0;
  let delay = 5000;

  const active = () => visible && !document.hidden && !stopped;

  function stop() {
    stopped = true;
    generation += 1;
    clearTimeout(timer);
    observer.disconnect();
    document.removeEventListener('visibilitychange', schedule);
    preference.removeEventListener('change', onPreferenceChange);
  }

  function prepare() {
    if (!pending && index < scenes.length) {
      const scene = scenes[index];
      const image = new Image();
      image.src = scene.src;
      pending = image.decode().then(() => scene).catch(() => null);
    }
  }

  async function advance(expectedGeneration) {
    prepare();
    const scene = await pending;
    // Ignore an old load after visibility or motion preferences change.
    if (!active() || expectedGeneration !== generation) return;
    pending = null;
    index += 1;
    if (scene) {
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = `url("${scene.src}")`;
      media.append(slide);
      // Establish the transparent state before starting the crossfade.
      void slide.offsetWidth;
      slide.classList.add('is-visible');
      delay = 7000; // Two seconds of fade, then five seconds at rest.
    }
    if (index >= scenes.length) stop();
    else schedule();
  }

  function schedule() {
    const expectedGeneration = ++generation;
    clearTimeout(timer);
    if (!active()) return;
    prepare();
    timer = setTimeout(() => advance(expectedGeneration), delay);
  }

  function onPreferenceChange() {
    if (preference.matches) stop();
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  observer.observe(hero);
  document.addEventListener('visibilitychange', schedule);
  preference.addEventListener('change', onPreferenceChange);
}
