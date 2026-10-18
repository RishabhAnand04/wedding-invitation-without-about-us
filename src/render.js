import { art, publicUrl } from './art.js';
import { icon } from './icons.js';
import { content, fill } from './i18n.js';

const assetUrls = import.meta.glob('./assets/*.{webp,avif,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
const assetUrl = (file) => (file ? assetUrls[`./assets/${file}`] : undefined);

const esc = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Text in both languages; CSS shows the one matching <html data-lang>.
const t = (get) => {
  const en = get(content.en) ?? '';
  const hi = get(content.hi) ?? en;
  if (en === hi) return esc(en);
  return `<span data-lang-en>${esc(en)}</span><span data-lang-hi lang="hi">${esc(hi)}</span>`;
};

// Attribute in both languages; main.js swaps it when the language changes.
const ta = (attr, get) => {
  const en = esc(get(content.en) ?? '');
  const hi = esc(get(content.hi) ?? '');
  return `${attr}="${en}" data-${attr}-en="${en}" data-${attr}-hi="${hi}"`;
};

// Only http(s) links are rendered, so a bad config value can't inject javascript: URLs.
const safeUrl = (url) => (/^https?:\/\//i.test(url ?? '') ? esc(url) : null);
const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;

const divider = (width = 160) =>
  `<div class="divider" style="--w:${width}px" aria-hidden="true"><span></span><i></i><span></span></div>`;

const corners = (size = '') =>
  ['tl', 'tr', 'bl', 'br']
    .map((pos) => `<img class="corner corner--${pos} ${size}" src="${art('corner-ornament')}" alt="" aria-hidden="true" width="256" height="262" decoding="async">`)
    .join('');

const floater = (name, cls, style) =>
  `<div class="floater ${cls}" style="${style}" aria-hidden="true"><img src="${art(name)}" alt="" loading="lazy" decoding="async"></div>`;

const sectionHead = (get, id) => {
  const { eyebrow, subtitle } = get(content.en);
  return `
  <header class="section-head">
    ${eyebrow ? `<p class="eyebrow">${t((k) => get(k).eyebrow)}</p>` : ''}
    <h2 id="${id}">${t((k) => get(k).title)}</h2>
    ${subtitle ? `<p class="subtitle">${t((k) => get(k).subtitle)}</p>` : ''}
    <div class="section-head__divider">${divider()}</div>
  </header>`;
};

const strands = (variant) => `
  <img class="strand strand--left strand--${variant}" src="${art('marigold-strand')}" alt="" aria-hidden="true" width="106" height="897" decoding="async">
  <img class="strand strand--right strand--${variant}" src="${art('marigold-strand')}" alt="" aria-hidden="true" width="106" height="897" decoding="async">`;

function ambient() {
  return `
  <div class="ambient" aria-hidden="true">
    <div class="ambient__layer ambient__base"></div>
    <div class="ambient__layer paper-tile"></div>
    <div class="ambient__layer damask-tile"></div>
    <div class="ambient__layer ambient__glow"></div>
    <img class="ambient__sun" src="${art('sun-medallion')}" alt="" width="300" height="301" decoding="async">
    <img class="ambient__cloud ambient__cloud--a" src="${art('cloud-a')}" alt="" width="520" height="382" decoding="async">
    <img class="ambient__cloud ambient__cloud--b" src="${art('cloud-b')}" alt="" width="420" height="308" decoding="async">
    <div class="ambient__layer ambient__dusk" data-dusk></div>
    <div class="ambient__layer ambient__vignette"></div>
    ${strands('ambient')}
  </div>`;
}

function overlay(c) {
  return `
  <div class="overlay" role="dialog" aria-modal="true" aria-labelledby="overlay-names" data-overlay>
    <div class="overlay__decor" aria-hidden="true">
      <div class="ambient__layer paper-tile"></div>
      <div class="ambient__layer damask-tile"></div>
      <div class="ambient__layer overlay__glow"></div>
      ${strands('overlay')}
    </div>
    <div class="frame overlay__card">
      ${corners('corner--md')}
      <div class="plate" aria-hidden="true">
        <img class="plate__img" src="${art('plate')}" alt="" width="750" height="767" decoding="async">
        <div class="plate__medallion"><img src="${art('ganesh-medallion')}" alt="" width="256" height="259" decoding="async"></div>
      </div>
      <p class="deva overlay__deva" lang="hi">${esc(c.invocation)}</p>
      <p class="overlay__invite">${t((k) => k.overlay.invite)}</p>
      <p class="overlay__names" id="overlay-names">${t((k) => k.bride)} <span class="amp">&amp;</span> ${t((k) => k.groom)}</p>
      ${c.overlay.afterNames ? `<p class="overlay__after">${t((k) => k.overlay.afterNames)}</p>` : ''}
      <button class="pill" type="button" data-open>${t((k) => k.overlay.button)}</button>
    </div>
  </div>`;
}

function hero(c) {
  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__backdrop" data-layer="backdrop">
      <img src="${art('hero-backdrop')}" alt="" width="1080" height="717" fetchpriority="high" decoding="async">
    </div>
    <div class="hero__couple" data-layer="couple">
      <img src="${art('hero-couple')}" ${ta('alt', (k) => fill(k.ui.coupleAlt, { bride: k.bride, groom: k.groom }))} width="640" height="964" decoding="async">
    </div>
    <div class="hero__foreground" data-layer="foreground" aria-hidden="true">
      <img src="${art('hero-foreground')}" alt="" width="1080" height="384" decoding="async">
    </div>
    <div class="hero__text" data-layer="text">
      <div class="hero__panel">
        <p class="deva hero__deva" lang="hi" data-hero-reveal>${esc(c.invocation)}</p>
        <div class="hero__divider" data-hero-reveal>${divider(90)}</div>
        <h1 id="hero-title" tabindex="-1">
          <span data-hero-reveal>${t((k) => k.bride)}</span>
          <span class="hero__weds" data-hero-reveal>${t((k) => k.ui.weds)}</span>
          <span data-hero-reveal>${t((k) => k.groom)}</span>
        </h1>
        ${c.hero.tagline ? `<p class="hero__tagline" data-hero-reveal>${t((k) => k.hero.tagline)}</p>` : ''}
        <div class="hero__pill" data-hero-reveal>
          <p class="hero__date">${t((k) => k.heroDateText)}</p>
          <p class="hero__city"><span aria-hidden="true">✦</span>${t((k) => k.city)}<span aria-hidden="true">✦</span></p>
        </div>
      </div>
    </div>
  </section>`;
}

function families(c) {
  const f = c.families;
  const side = (key) => `
      <div class="families__side">
        <p class="families__label">${t((k) => k.families[key].label)}</p>
        <p class="families__parents">${t((k) => k.families[key].parents)}</p>
        ${f[key].grandparents ? `<p class="families__grand">${t((k) => k.families[key].grandparents)}</p>` : ''}
      </div>`;
  return `
  <section class="section families" ${ta('aria-label', (k) => k.ui.invitationLabel)}>
    ${floater('parrots', 'floater--sm-up floater--sway', 'top:2rem;right:13%;width:clamp(80px,11vw,150px)')}
    ${floater('cloud-b', 'floater--md-up floater--drift', 'top:16%;left:-1%;width:clamp(90px,13vw,180px);opacity:.5')}
    <div class="frame frame--lg families__card" data-reveal>
      ${corners('corner--lg')}
      <p class="deva families__deva" lang="hi">${esc(f.invocation)}</p>
      <p class="families__blessing">${t((k) => k.families.blessingLine)}</p>
      <div class="families__cols">
        ${side('bride')}
        <div class="families__sep" aria-hidden="true">✦</div>
        ${side('groom')}
      </div>
      ${divider(110)}
      <p class="families__request">${t((k) => k.families.request)}</p>
      <p class="families__closing">${t((k) => k.families.closing)}</p>
    </div>
  </section>`;
}

function scene(e, i) {
  const map = safeUrl(e.mapUrl);
  const ev = (k) => k.events[i];
  return `
    <article class="scene" data-scene aria-labelledby="event-${esc(e.key)}">
      <div class="scene__art">
        <img src="${art(e.art)}" alt="" width="1080" height="717" ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async">
      </div>
      <div class="scene__shade" aria-hidden="true"></div>
      <div class="scene__inner">
        <div class="event-card">
          ${corners('corner--sm')}
          <p class="label">${String(i + 1).padStart(2, '0')} <span class="star" aria-hidden="true">✦</span> ${t((k) => ev(k).date)}</p>
          <h3 id="event-${esc(e.key)}">${t((k) => ev(k).name)}</h3>
          <p class="event-card__time">${t((k) => ev(k).time)}</p>
          <p class="event-card__row">${icon('map-pin')}<span><strong>${t((k) => ev(k).venue)}</strong>${e.area ? `<span class="muted"> · ${t((k) => ev(k).area)}</span>` : ''}</span></p>
          ${e.dress ? `<p class="event-card__row">${icon('shirt')}<span>${t((k) => `${k.ui.dress}: ${ev(k).dress}`)}</span></p>` : ''}
          ${e.note ? `<p class="event-card__note">${t((k) => ev(k).note)}</p>` : ''}
          ${map ? `<a class="map-link" href="${map}" target="_blank" rel="noopener">${icon('navigation', { size: 14 })}${t((k) => k.ui.openMaps)}<span class="sr-only"> ${t((k) => fill(k.ui.mapsSr, { name: ev(k).name, venue: ev(k).venue }))}</span></a>` : ''}
        </div>
      </div>
    </article>`;
}

function celebrations(c) {
  return `
  <section class="celebrations" aria-labelledby="celebrations-title">
    <div class="celebrations__head">${sectionHead((k) => k.celebrations, 'celebrations-title')}</div>
    <div class="stage">
      ${c.events.map(scene).join('')}
    </div>
    <div class="celebrations__foot">${divider()}</div>
  </section>`;
}

function story(c) {
  const s = c.story;
  if (!s?.enabled || !s.items?.length) return '';
  return `
  <section class="section story" aria-labelledby="story-title">
    ${floater('vine-sprig', 'floater--bob', 'top:5%;left:-1.5%;width:clamp(90px,13vw,190px);opacity:.9')}
    ${floater('vine-sprig', 'floater--bob floater--flip', 'top:12%;right:-1.5%;width:clamp(90px,13vw,190px);opacity:.9')}
    ${floater('parrots', 'floater--sm-up floater--sway', 'top:4%;left:10%;width:clamp(76px,10vw,140px)')}
    ${floater('lotus-cluster', 'floater--md-up floater--bob', 'bottom:0;right:6%;width:clamp(70px,9vw,130px)')}
    ${sectionHead((k) => k.story, 'story-title')}
    <div class="story__grid" data-reveal-group>
      ${s.items.map((item, i) => `
        <div class="story__item" data-reveal-item>
          <div class="story__photo"><img src="${item.asset ? assetUrl(item.asset) : item.art ? art(item.art) : publicUrl(`photos/${item.img}`)}" ${ta('alt', (k) => k.story.items[i].title)}${item.position || item.transform ? ` style="${item.position ? `object-position:${esc(item.position)};` : ''}${item.transform ? `transform:${esc(item.transform)};` : ''}"` : ''} loading="lazy" decoding="async"></div>
          <p class="label">${t((k) => k.story.items[i].year)}</p>
          <h3>${t((k) => k.story.items[i].title)}</h3>
          <p class="story__text">${t((k) => k.story.items[i].text)}</p>
        </div>`).join('')}
    </div>
  </section>`;
}

function details(c) {
  const d = c.details;
  if (!d?.enabled) return '';
  return `
  <section class="section details" aria-labelledby="details-title">
    ${floater('elephant-walk', 'floater--bob', 'bottom:0;right:2%;width:clamp(110px,16vw,230px)')}
    ${floater('cloud-a', 'floater--sm-up floater--drift', 'top:3%;left:-2%;width:clamp(100px,14vw,200px);opacity:.45')}
    ${sectionHead((k) => k.details, 'details-title')}
    ${d.hashtag ? `
    <div class="details__hashtag" data-reveal>
      <p class="details__tag">${t((k) => k.details.hashtag)}</p>
      ${d.hashtagNote ? `<p class="details__tag-note">${t((k) => k.details.hashtagNote)}</p>` : ''}
    </div>` : ''}
    <div class="details__grid" data-reveal-group>
      ${(d.items ?? []).map((item, i) => `
        <div class="details__item" data-reveal-item>
          ${icon(item.icon, { size: 38, stroke: 1.1, cls: 'details__icon' })}
          <h3>${t((k) => k.details.items[i].title)}</h3>
          <p>${t((k) => k.details.items[i].text)}</p>
        </div>`).join('')}
    </div>
  </section>`;
}

function venues(c) {
  if (!c.venues?.enabled) return '';
  const byVenue = new Map();
  c.events.forEach((e, i) => {
    const id = `${e.venue}|${e.area}`;
    if (!byVenue.has(id)) byVenue.set(id, { ...e, first: i, indexes: [] });
    byVenue.get(id).indexes.push(i);
  });
  return `
  <section class="section venues" aria-labelledby="venues-title">
    ${floater('lotus-cluster', 'floater--bob', 'bottom:0;left:4%;width:clamp(80px,11vw,150px)')}
    ${floater('parrots', 'floater--sm-up floater--sway', 'top:6%;right:12%;width:clamp(72px,9vw,130px)')}
    ${sectionHead((k) => k.venues, 'venues-title')}
    <ul class="venues__list" data-reveal-group>
      ${[...byVenue.values()].map((v) => {
        const map = safeUrl(v.mapUrl);
        const photoCfg = c.venues.photos?.[v.venue];
        const photo = assetUrl(photoCfg?.file ?? photoCfg);
        const ev = (k) => k.events[v.first];
        return `
        <li class="venue" data-reveal-item>
          ${photo ? `<div class="venue__photo"${photoCfg.aspect ? ` style="aspect-ratio:${esc(photoCfg.aspect)}"` : ''}><img src="${photo}" ${ta('alt', (k) => ev(k).venue)} loading="lazy" decoding="async"></div>` : ''}
          <p class="label">${t((k) => v.indexes.map((i) => k.events[i].name).join(' · '))}</p>
          <h3>${t((k) => ev(k).venue)}</h3>
          <p class="venue__address">${icon('map-pin')}<span>${t((k) => ev(k).address || ev(k).area)}</span></p>
          ${map ? `<a class="pill pill--sm" href="${map}" target="_blank" rel="noopener">${icon('navigation', { size: 14 })}${t((k) => k.ui.openMaps)}<span class="sr-only"> ${t((k) => fill(k.ui.venueMapsSr, { venue: ev(k).venue }))}</span></a>` : ''}
        </li>`;
      }).join('')}
    </ul>
  </section>`;
}

function countdown(c) {
  const unit = (key, label) => `
        <div class="countdown__unit"><p class="countdown__num" data-count="${key}">00</p><p class="label">${label}</p></div>`;
  return `
  <section class="section countdown" aria-labelledby="countdown-title" data-countdown>
    ${floater('cloud-b', 'floater--drift', 'top:6%;right:1%;width:clamp(90px,12vw,170px);opacity:.5')}
    ${floater('cloud-a', 'floater--sm-up floater--drift', 'bottom:8%;left:-2%;width:clamp(110px,15vw,210px);opacity:.45')}
    <div class="frame countdown__card" data-reveal>
      ${corners('corner--lg')}
      <h2 id="countdown-title">${t((k) => k.countdown.title)}</h2>
      <div class="countdown__units" data-count-units>
        ${['days', 'hours', 'minutes', 'seconds'].map((key) => unit(key, t((k) => k.ui[key]))).join('')}
      </div>
      <p class="countdown__done" data-count-done hidden>${t((k) => k.countdown.doneText)}</p>
      <div class="countdown__divider">${divider(90)}</div>
    </div>
  </section>`;
}

function footer(c) {
  const f = c.footer;
  return `
  <footer class="footer">
    <div class="footer__skyline" aria-hidden="true"><img src="${art('skyline')}" alt="" width="1820" height="1024" loading="lazy" decoding="async"></div>
    ${floater('lotus-cluster', 'floater--bob', 'bottom:.25rem;left:6%;width:clamp(80px,11vw,150px)')}
    ${floater('parrots', 'floater--sm-up floater--sway', 'top:6%;right:12%;width:clamp(70px,9vw,120px)')}
    ${divider()}
    <p class="footer__families">${t((k) => k.footer.families)}</p>
    <p class="footer__line">${t((k) => k.footer.line)}</p>
    ${f.contacts?.length ? `
    <ul class="footer__contacts">
      ${f.contacts.map((p, i) => `<li><span class="footer__contact-name">${t((k) => k.footer.contacts[i].name)}</span><a href="${telHref(p.phone)}">${icon('phone', { size: 14 })}${esc(p.phone)}</a></li>`).join('')}
    </ul>` : ''}
  </footer>`;
}

function langSwitch() {
  return `
  <div class="lang-switch" role="group" aria-label="Language / भाषा">
    <button type="button" data-set-lang="en" aria-pressed="false">English</button>
    <button type="button" data-set-lang="hi" lang="hi" aria-pressed="false">हिन्दी</button>
  </div>`;
}

function musicToggle(c) {
  if (!c.music?.enabled) return '';
  return `<button class="music-toggle" type="button" aria-pressed="false" aria-label="${esc(c.ui.musicPlay)}" data-music>
    <span data-music-on hidden>${icon('volume-2', { size: 20 })}</span><span data-music-off>${icon('volume-x', { size: 20 })}</span>
  </button>`;
}

export function renderSite() {
  const c = content.en;
  return `
  ${ambient()}
  ${langSwitch()}
  ${overlay(c)}
  <div class="petals" data-petals aria-hidden="true"></div>
  <main class="site" id="main" inert>
    ${hero(c)}
    ${families(c)}
    ${celebrations(c)}
    ${story(c)}
    ${details(c)}
    ${venues(c)}
    ${countdown(c)}
    ${footer(c)}
  </main>
  ${musicToggle(c)}`;
}
