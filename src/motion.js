import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { art } from './art.js';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.clearScrollMemory('manual');

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const rand = gsap.utils.random;

function petals(layer, count = 16) {
  const imgs = Array.from({ length: count }, () => {
    const img = document.createElement('img');
    img.src = art('petal');
    img.alt = '';
    img.width = 28;
    img.height = 31;
    img.className = 'petal';
    layer.append(img);
    return img;
  });

  const drop = (img, scatter) => {
    const w = layer.clientWidth;
    const h = layer.clientHeight;
    const x = rand(0, w);
    const y = scatter ? rand(-40, h) : -40;
    gsap.set(img, { x, y, rotation: rand(0, 360), scale: rand(0.4, 1), opacity: rand(0.4, 0.72) });
    gsap.to(img, {
      x: x + rand(-120, 120),
      y: h + 40,
      rotation: `+=${rand(120, 420)}`,
      duration: rand(7, 14) * ((h + 40 - y) / (h + 80)),
      ease: 'none',
      onComplete: () => drop(img, false),
    });
  };

  return {
    play() {
      imgs.forEach((img) => drop(img, true));
    },
  };
}

/** Runs behind the sealed overlay: petals, initial hero state. */
export function initOverlay(overlay) {
  if (reducedMotion) return { open: (done) => { overlay.remove(); done(); } };

  // One viewport-fixed layer: petals fall over the overlay and keep falling on every section.
  petals(document.querySelector('[data-petals]')).play();
  gsap.set('[data-hero-reveal]', { autoAlpha: 0, y: 24 });

  return {
    open(done) {
      gsap.to(overlay, {
        autoAlpha: 0,
        scale: 1.04,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          overlay.remove();
          done();
          gsap.to('[data-hero-reveal]', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
        },
      });
    },
  };
}

function heroMotion() {
  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
    .to('[data-layer="backdrop"]', { yPercent: 10 }, 0)
    .to('[data-layer="couple"]', { yPercent: 8 }, 0)
    .to('[data-layer="foreground"]', { yPercent: -45 }, 0)
    .to('[data-layer="text"]', { y: -90, opacity: 0 }, 0);
}

function reveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 32, autoAlpha: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
    gsap.from(group.querySelectorAll('[data-reveal-item]'), {
      y: 36,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
}

function duskTint() {
  gsap.to('[data-dusk]', { opacity: 0.25, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
}

function floaterParallax() {
  gsap.utils.toArray('.floater--drift').forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function celebrationEntrance() {
  const scenes = document.querySelectorAll('[data-scene]');
  if (!scenes.length || !('IntersectionObserver' in window)) {
    scenes.forEach((scene) => scene.classList.add('is-seen'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-seen');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45, rootMargin: '0px 0px -6% 0px' });

  scenes.forEach((scene) => observer.observe(scene));
}

export function initMotion() {
  if (reducedMotion) return;
  heroMotion();
  celebrationEntrance();
  reveals();
  duskTint();
  floaterParallax();
}

export const refreshScroll = () => ScrollTrigger.refresh();
