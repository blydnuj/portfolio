(() => {
  const P = window.PORTFOLIO;
  const cases = P.cases.slice(0, 4);
  const app = document.getElementById('app');
  const bar = document.querySelector('.bar');
  const progress = document.querySelector('.progress');
  const cursor = document.querySelector('.cursor');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = null;   // slug of the open case, or null on home
  let lastCase = null;  // to return to the right card on home
  let observers = [];

  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = s => String(s ?? '').replace(/<[^>]+>/g, '');
  const list = v => (Array.isArray(v) ? v : v ? [v] : []);
  const paras = body => list(body).map(p => `<p>${p}</p>`).join('');

  /* ───────── Placeholder screens (grey, so real screens bring the colour) ───────── */

  function placeholder(kind = 'desktop', label = '') {
    const [type, tone] = kind.split('-');
    const dark = tone === 'dark';
    const c = dark
      ? { bg: '#141414', surf: '#1d1d1d', ui: '#262626', ui2: '#333', ink: '#474747', strong: '#e8e8e8', bezel: '#2e2e2e', txt: '#5c5c5c' }
      : { bg: '#ececec', surf: '#ffffff', ui: '#f1f1f1', ui2: '#dcdcdc', ink: '#c4c4c4', strong: '#111', bezel: '#111', txt: '#9a9a9a' };
    const [W, H] = { desktop: [1600, 1000], mobile: [1600, 1000], wide: [2400, 1028], tall: [1200, 1500] }[type] || [1600, 1000];
    const r = (x, y, w, h, f, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`;

    const browser = (x, y, w, h) => {
      let s = r(x, y, w, h, c.surf, 18);
      s += [0, 1, 2].map(i => `<circle cx="${x + 30 + i * 22}" cy="${y + 26}" r="6" fill="${c.ui2}"/>`).join('');
      s += r(x, y + 52, w, 1, c.ui2, 0);
      const sb = w * 0.17;
      s += r(x + 1, y + 53, sb, h - 54, c.ui, 0);
      for (let i = 0; i < 7; i++) s += r(x + 28, y + 96 + i * 44, sb * 0.62 - (i % 3) * 22, 12, c.ui2, 6);
      const cx = x + sb + 44, cw = w - sb - 88;
      s += r(cx, y + 92, cw * 0.3, 26, c.ink, 8);
      s += r(cx + cw - 150, y + 86, 150, 40, c.strong, 20);
      const gw = (cw - 48) / 3;
      for (let i = 0; i < 3; i++) {
        const gx = cx + i * (gw + 24);
        s += r(gx, y + 156, gw, 124, c.ui, 14) + r(gx + 24, y + 184, gw * 0.4, 12, c.ui2, 6) + r(gx + 24, y + 214, gw * 0.55, 34, c.ink, 8);
      }
      const ch = h - 156 - 124 - 72, chy = y + 304, chw = cw * 0.63;
      s += r(cx, chy, chw, ch, c.ui, 14);
      const pts = Array.from({ length: 9 }, (_, i) => `${cx + 30 + i * (chw - 60) / 8},${chy + ch - 40 - [20, 60, 45, 110, 90, 150, 130, 190, 210][i] * (ch - 80) / 230}`).join(' ');
      s += `<polyline points="${pts}" fill="none" stroke="${c.strong}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity=".75"/>`;
      const tx = cx + chw + 24, tw = cw - chw - 24;
      s += r(tx, chy, tw, ch, c.ui, 14);
      for (let i = 0; i < 6; i++) s += r(tx + 22, chy + 26 + i * ((ch - 40) / 6), tw * (0.75 - (i % 2) * 0.2), 12, c.ui2, 6);
      return s;
    };

    const phone = (x, y, w, h) => {
      let s = r(x, y, w, h, c.bezel, w * 0.14);
      const i = w * 0.035, sx = x + i, sy = y + i, sw = w - 2 * i, sh = h - 2 * i;
      s += r(sx, sy, sw, sh, c.surf, w * 0.115);
      s += r(x + w / 2 - w * 0.14, sy + 14, w * 0.28, 26, c.bezel, 13);
      const p = sw * 0.08, cx = sx + p, cw = sw - 2 * p;
      s += r(cx, sy + 80, cw * 0.55, 22, c.ink, 8);
      s += r(cx, sy + 116, cw * 0.35, 12, c.ui2, 6);
      s += r(cx, sy + 150, cw, sh * 0.26, c.ui, 18);
      for (let k = 0; k < 4; k++) {
        const ry = sy + 170 + sh * 0.26 + k * 64;
        s += `<circle cx="${cx + 20}" cy="${ry + 18}" r="20" fill="${c.ui2}"/>` + r(cx + 56, ry + 6, cw * 0.5, 12, c.ink, 6) + r(cx + 56, ry + 26, cw * 0.32, 10, c.ui2, 5);
      }
      s += r(cx, sy + sh - 96, cw, 56, c.strong, 28);
      return s;
    };

    let art = '';
    if (type === 'mobile') {
      const ph = H * 0.74, pw = ph * 0.48, gap = pw * 0.22, total = pw * 3 + gap * 2, x0 = (W - total) / 2;
      [0, 1, 2].forEach(k => { art += phone(x0 + k * (pw + gap), (H - ph) / 2 - 24 + (k === 1 ? -26 : 14), pw, ph); });
    } else if (type === 'tall') {
      const ph = H * 0.76, pw = ph * 0.48;
      art = phone((W - pw) / 2, (H - ph) / 2 - 30, pw, ph);
    } else {
      const w = Math.min(W * 0.82, H * 1.55), h = H * 0.78;
      art = browser((W - w) / 2, (H - h) / 2 - 22, w, h);
    }
    const lab = `<text x="${W / 2}" y="${H - 30}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="${Math.round(W / 90)}" fill="${c.txt}">${esc(label)}</text>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${c.bg}"/>${art}${lab}</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // Missing image file → swap in the placeholder.
  window.addEventListener('error', e => {
    const t = e.target;
    if (t.tagName === 'IMG' && t.dataset.kind && !t.dataset.failed) {
      t.dataset.failed = '1';
      t.src = placeholder(t.dataset.kind, t.dataset.label);
    }
  }, true);

  /* ───────── Templates ───────── */

  function media(m = {}, cls = '') {
    const kind = m.kind || 'desktop';
    const type = kind.split('-')[0];
    const src = m.src || placeholder(kind, 'image');
    const ratio = m.ratio === 'auto' ? 'is-auto' : `r-${type}`;
    return `<figure class="media ${ratio} ${cls}">
      <div class="media__frame"><img src="${esc(src)}" alt="${esc(m.alt || strip(m.caption))}" loading="lazy" decoding="async" data-kind="${esc(kind)}" data-label="${esc(m.src || '')}"></div>
      ${m.caption ? `<figcaption>${m.caption}</figcaption>` : ''}
    </figure>`;
  }

  function block(b) {
    switch (b.type) {
      case 'image': {
        const size = b.size || 'wide';
        const cls = size === 'full' ? 'block--full' : size === 'text' ? 'wrap-text' : 'wrap';
        return `<div class="block ${cls} reveal">${media(b)}</div>`;
      }
      case 'pair':
      case 'trio':
        return `<div class="block wrap grid grid--${b.type} reveal">${b.items.map(m => media(m)).join('')}</div>`;
      case 'stat':
        return `<div class="block wrap-head stat reveal"><div class="stat__value">${b.value}</div><p class="stat__label">${b.label}</p></div>`;
      case 'quote':
        return `<blockquote class="block wrap-head quote reveal"><p>“${b.text}”</p>${b.by ? `<cite>${b.by}</cite>` : ''}</blockquote>`;
      case 'list':
        return `<ol class="block wrap principles reveal">${b.items.map(it => `<li><h3>${it.title}</h3><p>${it.text}</p></li>`).join('')}</ol>`;
      case 'metrics':
        return `<dl class="block wrap metrics reveal">${b.items.map(it => `<div><dt>${it.label}</dt><dd>${it.value}</dd></div>`).join('')}</dl>`;
      case 'compare': {
        const kind = b.before.kind || 'desktop';
        return `<figure class="block wrap compare-wrap reveal">
          <div class="compare r-${kind.split('-')[0]}" style="--pos:50%">
            ${['before', 'after'].map(k => `<img class="compare__${k}" src="${esc(b[k].src || placeholder(b[k].kind, k))}" alt="${k}" data-kind="${esc(b[k].kind || kind)}" data-label="${esc((b[k].src || '') + '  ·  ' + k)}">`).join('')}
            <span class="compare__tag compare__tag--l">Before</span><span class="compare__tag compare__tag--r">After</span>
            <span class="compare__handle" aria-hidden="true"></span>
            <input type="range" min="0" max="100" value="50" aria-label="Compare before and after">
          </div>
          ${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}
        </figure>`;
      }
      case 'text':
        return `<div class="block wrap-text prose reveal">${paras(b.body)}</div>`;
      default:
        return '';
    }
  }

  function chapter(ch, i, total) {
    return `<section class="chapter${ch.dark ? ' chapter--dark' : ''}" id="ch-${ch.id}" data-index="${i}">
      <header class="chapter__head wrap-head reveal">
        <span class="eyebrow">${ch.label}</span>
        ${ch.heading ? `<h2>${ch.heading}</h2>` : ''}
      </header>
      ${ch.body ? `<div class="prose wrap-text reveal">${paras(ch.body)}</div>` : ''}
      ${list(ch.blocks).map(block).join('')}
    </section>`;
  }

  function readingTime(c) {
    const text = [c.hook, ...c.chapters.flatMap(ch => [ch.heading, ...list(ch.body), ...list(ch.blocks).flatMap(b => [b.text, b.label, ...list(b.body), ...list(b.items).map(it => `${it.title || ''} ${it.text || ''} ${it.caption || ''}`)])])].join(' ');
    return Math.max(2, Math.round(strip(text).split(/\s+/).length / 200) + 2);
  }

  function renderHome() {
    const p = P.profile;
    app.innerHTML = `
      <section class="hero wrap">
        <h1 class="hero__statement">${p.statement}</h1>
        <p class="hero__current">${p.current}</p>
        <button class="hero__scroll" type="button" aria-label="Scroll to projects">
          <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true"><path d="M10 2v23M2.5 17.5 10 25l7.5-7.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </section>

      <section class="work">${cases.map(c => `
        <article class="card wrap" id="card-${c.slug}">
          <div class="card__box reveal">
          <a class="card__media" href="#/work/${c.slug}" data-cursor aria-label="Open case: ${esc(strip(c.title))}">${media({ ...c.cover, caption: '' })}</a>
          <div class="card__info">
            <div>
              <ul class="tags"><li>${c.year}</li><li>${c.impact}</li></ul>
              <h2 class="card__title"><a href="#/work/${c.slug}">${c.title}</a></h2>
              <p class="card__desc">${c.summary}</p>
            </div>
          </div>
          </div>
        </article>`).join('')}
      </section>

      ${footer()}`;
  }

  function renderAbout() {
    const p = P.profile;
    app.innerHTML = `
      <section class="about about--page wrap">
        <p class="eyebrow">About</p>
        <div class="about__body">
          <div class="about__lead">${paras(p.about)}</div>
          <div class="about__cols">
            <div>
              <p class="eyebrow">Experience</p>
              <ul class="xp">${p.experience.map(x => `<li><span>${x.company}</span><span>${x.role}</span><span>${x.years}</span></li>`).join('')}</ul>
            </div>
            <div>
              <p class="eyebrow">What I bring</p>
              <ul class="skills">${p.skills.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
          </div>
          <a class="btn about__cta" href="#/">See the work <b aria-hidden="true">→</b></a>
        </div>
      </section>
      ${footer()}`;
  }

  function footer() {
    return `<footer class="foot"><div class="wrap">© ${new Date().getFullYear()} ${P.profile.name}</div></footer>`;
  }

  function renderCase(slug) {
    const i = cases.findIndex(c => c.slug === slug);
    const c = cases[i], n = cases.length;
    const next = cases[(i + 1) % n], prev = cases[(i - 1 + n) % n];
    const total = c.chapters.length;

    app.innerHTML = `
      <article class="case">
        <section class="open">
          <div class="wrap">
            <div class="open__meta eyebrow"><span>${c.client} · ${c.year}</span><span>${readingTime(c)} min read</span></div>
            <h1 class="open__title">${c.title}</h1>
            <p class="open__hook">${c.hook}</p>
          </div>
          <div class="open__media">${media({ ...c.cover, caption: '' })}</div>
        </section>

        <section class="tldr wrap" aria-label="Case summary">
          <div><h2 class="eyebrow">My role</h2><p>${c.role}</p></div>
          <div><h2 class="eyebrow">Team & time</h2><p>${c.team}</p></div>
          <div><h2 class="eyebrow">Challenge</h2><p>${c.challenge}</p></div>
          <div class="tldr__outcome"><h2 class="eyebrow">Outcome</h2><p>${c.outcome}</p></div>
        </section>

        <nav class="rail" aria-label="Chapters">
          <ol>${c.chapters.map((ch, k) => `<li><a href="#/work/${slug}/${ch.id}" data-chapter="${ch.id}"><em>${ch.label}</em></a></li>`).join('')}</ol>
        </nav>

        <div class="chapters">${c.chapters.map((ch, k) => chapter(ch, k, total)).join('')}</div>

        <a class="next" href="#/work/${next.slug}">
          <div class="wrap">
            <p class="eyebrow">Up next</p>
            <h2 class="next__title">${next.title}</h2>
            <p class="next__hook">${next.summary}</p>
          </div>
          <div class="next__media">${media({ ...next.cover, caption: '' })}</div>
        </a>
      </article>

      ${footer()}

      <nav class="dock" aria-label="Case navigation">
        <a href="#/work/${prev.slug}" class="dock__btn" title="Previous case (←)"><b aria-hidden="true">←</b><span class="dock__lbl">${prev.client}</span></a>
        <div class="dock__scene-wrap">
          <button class="dock__btn dock__scene" aria-expanded="false" aria-haspopup="true">
            <span class="dock__chapter">${c.chapters[0].label}</span><svg class="dock__chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 6.5 5 3l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="dock__menu" role="menu">
            ${c.chapters.map(ch => `<a role="menuitem" href="#/work/${slug}/${ch.id}" data-chapter="${ch.id}">${ch.label}</a>`).join('')}
            <a role="menuitem" href="#/" class="dock__all"><span>↖</span>All case studies</a>
          </div>
        </div>
        <a href="#/work/${next.slug}" class="dock__btn" title="Next case (→)"><span class="dock__lbl">${next.client}</span><b aria-hidden="true">→</b></a>
      </nav>`;

    setupCase(c);
  }

  /* ───────── Behaviour ───────── */

  function setupReveal() {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    app.querySelectorAll('.reveal').forEach(el => io.observe(el));
    observers.push(io);
  }

  function setupCase(c) {
    const dock = app.querySelector('.dock');
    const scene = dock.querySelector('.dock__scene');
    const setActive = id => {
      const k = c.chapters.findIndex(ch => ch.id === id);
      if (k < 0) return;
      app.querySelectorAll('[data-chapter]').forEach(a => a.classList.toggle('is-active', a.dataset.chapter === id));
      dock.querySelector('.dock__chapter').textContent = c.chapters[k].label;
    };
    setActive(c.chapters[0].id);

    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id.replace(/^ch-/, ''));
    }), { rootMargin: '-50% 0px -50% 0px' });
    app.querySelectorAll('.chapter').forEach(el => io.observe(el));
    observers.push(io);

    scene.addEventListener('click', e => {
      e.stopPropagation();
      const open = dock.classList.toggle('is-open');
      scene.setAttribute('aria-expanded', open);
    });

    app.querySelectorAll('.compare').forEach(cmp => {
      cmp.querySelector('input').addEventListener('input', e => cmp.style.setProperty('--pos', e.target.value + '%'));
    });
  }

  function closeMenu() {
    const dock = app.querySelector('.dock.is-open');
    if (!dock) return false;
    dock.classList.remove('is-open');
    dock.querySelector('.dock__scene').setAttribute('aria-expanded', 'false');
    return true;
  }

  function scrollToChapter(id, smooth = true) {
    const el = document.getElementById('ch-' + id);
    if (el) el.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'instant', block: 'start' });
  }

  // Chapter links scroll in place instead of re-rendering the case.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-chapter]');
    if (a) {
      e.preventDefault();
      closeMenu();
      scrollToChapter(a.dataset.chapter);
      history.replaceState(null, '', a.getAttribute('href'));
      return;
    }
    // "See the work" opens the home page at the top, not at the last case read.
    if (e.target.closest('.about__cta')) lastCase = null;
    // The logo always means "home, at the top".
    if (e.target.closest('.bar__name')) {
      lastCase = null;
      if (location.hash.replace(/^#\/?/, '') === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
      }
      return;
    }
    if (e.target.closest('.hero__scroll')) {
      app.querySelector('.work').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
      return;
    }
    if (!e.target.closest('.dock')) closeMenu();
  });

  let ticking = false, lastY = 0;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      // Bar steps aside while reading down, returns on scroll up.
      bar.classList.toggle('is-hidden', scrollY > lastY && scrollY > innerHeight * 0.6);
      lastY = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${current && max > 0 ? Math.min(1, scrollY / max) : 0})`;
      app.querySelector('.hero__scroll')?.classList.toggle('is-gone', scrollY > 8);
      if (!current) return;
      const dock = app.querySelector('.dock');
      const rail = app.querySelector('.rail');
      const chapters = app.querySelector('.chapters').getBoundingClientRect();
      const mid = innerHeight / 2;
      rail.classList.toggle('is-visible', chapters.top < mid && chapters.bottom > mid);
      dock.classList.toggle('is-visible', scrollY > innerHeight * 0.4);
      if (!reduced) {
        const cover = app.querySelector('.open__media img');
        const t = Math.min(1, scrollY / innerHeight);
        if (cover) cover.style.transform = `scale(${1.08 - 0.08 * t})`;
      }
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  // Keyboard: ← → switch cases, 1–4 jump to a case, Esc goes home.
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest('input, textarea, select')) return;
    const i = cases.findIndex(c => c.slug === current);
    if (/^[1-9]$/.test(e.key) && cases[+e.key - 1]) location.hash = `#/work/${cases[+e.key - 1].slug}`;
    else if (e.key === 'Escape') { if (!closeMenu() && current) location.hash = '#/'; }
    else if (current && e.key === 'ArrowRight') location.hash = `#/work/${cases[(i + 1) % cases.length].slug}`;
    else if (current && e.key === 'ArrowLeft') location.hash = `#/work/${cases[(i - 1 + cases.length) % cases.length].slug}`;
  });

  // "View case" cursor badge on case covers (mouse only).
  if (matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', e => {
      cursor.style.translate = `${e.clientX}px ${e.clientY}px`;
      cursor.classList.toggle('on', !!e.target.closest('[data-cursor]'));
    });
  }

  /* ───────── Router ───────── */

  function route() {
    const [section, slug, ch] = location.hash.replace(/^#\/?/, '').split('/');
    const isCase = section === 'work' && cases.some(c => c.slug === slug);

    if (isCase && slug === current) { if (ch) scrollToChapter(ch); return; }

    const paint = () => {
      observers.forEach(o => o.disconnect());
      observers = [];
      cursor.classList.remove('on');
      if (isCase) {
        renderCase(slug);
        current = lastCase = slug;
        const c = cases.find(x => x.slug === slug);
        document.title = `${strip(c.title)} — ${P.profile.name}`;
      } else if (section === 'about') {
        renderAbout();
        current = null;
        document.title = `About — ${P.profile.name}`;
      } else {
        renderHome();
        current = null;
        document.title = `${P.profile.name} — ${P.profile.role}`;
      }
      bar.querySelector('.bar__link').toggleAttribute('aria-current', section === 'about');
      document.body.classList.toggle('is-case', !!current);
      setupReveal();

      const target = isCase ? (ch && document.getElementById('ch-' + ch))
        : lastCase && !section ? document.getElementById('card-' + lastCase) : null;
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        // Re-align once web fonts have settled the layout.
        document.fonts.ready.then(() => requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' })));
      } else window.scrollTo({ top: 0, behavior: 'instant' });
      onScroll();
    };

    if (document.startViewTransition && !reduced && !first) {
      const t = document.startViewTransition(paint);
      [t.ready, t.finished, t.updateCallbackDone].forEach(p => p.catch(() => {}));
    } else paint();
    first = false;
  }
  let first = true;

  history.scrollRestoration = 'manual';
  addEventListener('hashchange', route);
  route();
})();
