import './styles.css';
import { content as copy, LANGS } from './i18n.js';
import { renderSite } from './render.js';
import { initOverlay, initMotion, refreshScroll } from './motion.js';
import { publicUrl } from './art.js';

const content = copy.en;
const LANG_KEY = 'invite-lang';
const root = document.documentElement;
let lang = savedLang();
root.dataset.lang = lang;

document.querySelector('#app').innerHTML = renderSite();
root.classList.add('is-locked');

const main = document.querySelector('#main');
const overlay = document.querySelector('[data-overlay]');
const music = setupMusic(content.music);

applyLang(lang);
document.querySelectorAll('[data-set-lang]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.setLang === lang) return;
    applyLang(button.dataset.setLang);
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* private mode: choice just isn't remembered */ }
    refreshScroll();
  });
});

function savedLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* storage blocked */ }
  return (navigator.language || '').toLowerCase().startsWith('hi') ? 'hi' : 'en';
}

function applyLang(next) {
  lang = next;
  root.dataset.lang = next;
  root.lang = next;
  document.querySelectorAll('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === next)));
  for (const attr of ['alt', 'aria-label']) {
    document.querySelectorAll(`[data-${attr}-${next}]`).forEach((el) => el.setAttribute(attr, el.getAttribute(`data-${attr}-${next}`)));
  }
  document.title = copy[next].meta.title;
  music?.refresh();
}

const sealed = initOverlay(overlay);
initMotion();

overlay.querySelector('[data-open]').addEventListener('click', () => {
  music?.play();
  sealed.open(() => {
    root.classList.remove('is-locked');
    main.inert = false;
    // A reload can restore the old scroll position behind the overlay; always open at the hero.
    window.scrollTo(0, 0);
    if (music) music.button.hidden = false;
    document.querySelector('#hero-title').focus({ preventScroll: true });
    refreshScroll();
  });
}, { once: true });

startCountdown(document.querySelector('[data-countdown]'), content.countdownTarget);

function startCountdown(section, target) {
  const end = new Date(target).getTime();
  if (!section || Number.isNaN(end)) return;
  const nums = Object.fromEntries([...section.querySelectorAll('[data-count]')].map((el) => [el.dataset.count, el]));
  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    const diff = end - Date.now();
    if (diff <= 0) {
      section.querySelector('[data-count-units]').hidden = true;
      section.querySelector('[data-count-done]').hidden = false;
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    nums.days.textContent = Math.floor(s / 86400);
    nums.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    nums.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    nums.seconds.textContent = pad(s % 60);
  };
  const timer = setInterval(tick, 1000);
  tick();
}

function setupMusic(config) {
  const button = document.querySelector('[data-music]');
  if (!config?.enabled || !button) return null;
  button.hidden = true;

  const audio = new Audio(publicUrl(config.src));
  audio.loop = true;
  audio.preload = 'none';

  const render = (playing) => {
    const ui = copy[lang].ui;
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? ui.musicPause : ui.musicPlay);
    button.querySelector('[data-music-on]').hidden = !playing;
    button.querySelector('[data-music-off]').hidden = playing;
  };
  const play = () => audio.play().then(() => render(true), () => render(false));
  const pause = () => { audio.pause(); render(false); };

  button.addEventListener('click', () => (audio.paused ? play() : pause()));
  document.addEventListener('visibilitychange', () => { if (document.hidden && !audio.paused) pause(); });

  return { button, play, refresh: () => render(!audio.paused) };
}
