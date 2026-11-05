/* An Event With Us - Diwali welcome animation
   Add right after the opening <body> tag of index.html (home page only):
   <script src="/assets/diwali-splash.js"></script>
   It stops by itself after END_DATE, so it can stay on the site.
   Test any time by adding ?diwali=preview to the page address. */
(function () {
  'use strict';

  /* ---------- Easy settings ---------- */
  var CONFIG = {
    START_DATE: '2026-11-05T00:00:00+05:30',
    END_DATE: '2026-11-11T23:59:59+05:30',
    DURATION_MS: 6500,
    EYEBROW: 'An Event With Us wishes you',
    HINDI: 'शुभ दीपावली',
    ENGLISH: 'Happy Diwali',
    WISH: 'May your home glow with light, your table with loved ones, and your year with moments worth remembering.',
    SIGNOFF: 'Plan · Create · Celebrate',
    SKIP: 'Enter website'
  };

  /* ---------- When to show ---------- */
  var KEY = 'aewu_diwali_seen_2026';
  var forced = window.AEWU_DIWALI_PREVIEW === true || /[?&]diwali=preview\b/.test(location.search);
  var now = Date.now();
  var isHome = /^\/(index\.html?)?$/i.test(location.pathname);
  if (!forced) {
    if (!isHome) return;
    if (now < Date.parse(CONFIG.START_DATE) || now > Date.parse(CONFIG.END_DATE)) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, '1');
    } catch (e) { /* storage blocked: still show */ }
  }

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---------- Fonts ---------- */
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Tiro+Devanagari+Hindi&display=swap';
  document.head.appendChild(font);

  /* ---------- Styles ---------- */
  var css = document.createElement('style');
  css.textContent = [
    '#aewu-d{position:fixed;inset:0;z-index:2147483000;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#fff6df;text-align:center;cursor:pointer;background:radial-gradient(ellipse at 50% 55%,#5b1f86 0%,#401461 38%,#1c0730 100%);transition:opacity .8s ease,visibility .8s;font-family:Georgia,"Times New Roman",serif}',
    '#aewu-d.out{opacity:0;visibility:hidden}',
    '#aewu-d canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
    '#aewu-d .toran{position:absolute;top:0;left:0;pointer-events:none;animation:aewuDrop 1.1s cubic-bezier(.2,.9,.3,1.15) both}',
    '#aewu-d .rangoli{position:absolute;top:50%;left:50%;width:min(92vw,680px);height:min(92vw,680px);margin:calc(min(92vw,680px)/-2) 0 0 calc(min(92vw,680px)/-2);opacity:.17;animation:aewuSpin 60s linear infinite;pointer-events:none}',
    '#aewu-d .box{position:relative;z-index:2;width:min(88vw,640px);padding:48px 0 16px}',
    '#aewu-d .eb{font:600 clamp(11px,2.6vw,13px)/1.5 Arial,Helvetica,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#f4cf7a}',
    '#aewu-d h2{margin:12px 0 0;font:400 clamp(50px,13vw,96px)/1.2 "Tiro Devanagari Hindi","Noto Serif Devanagari",serif;color:#ffd777;background:linear-gradient(100deg,#e9a92f 20%,#fff3c4 50%,#e9a92f 80%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:aewuRise .9s .55s both,aewuShine 3.2s 1.2s linear infinite}',
    '#aewu-d .en{margin:0;font:italic 500 clamp(24px,6vw,38px)/1.25 "Playfair Display",Georgia,serif;color:#fff6df}',
    '#aewu-d .wish{margin:14px auto 0;max-width:30em;font-size:clamp(15px,3.7vw,18px);line-height:1.6;color:#f3e6f8}',
    '#aewu-d .eb,#aewu-d .en,#aewu-d .wish,#aewu-d .diyas,#aewu-d .sign{animation:aewuRise .9s both}',
    '#aewu-d .eb{animation-delay:.3s}#aewu-d .en{animation-delay:.9s}#aewu-d .wish{animation-delay:1.3s}#aewu-d .diyas{animation-delay:1.6s}#aewu-d .sign{animation-delay:2s}',
    '#aewu-d .diyas{display:flex;justify-content:center;gap:clamp(8px,3vw,20px);margin:22px 0 10px}',
    '#aewu-d .diyas svg{width:clamp(42px,11vw,62px);height:auto;overflow:visible}',
    '#aewu-d .flame{transform-box:fill-box;transform-origin:50% 100%;animation:aewuLight .5s both,aewuFlick 1.1s .5s ease-in-out infinite alternate}',
    '#aewu-d .glow{animation:aewuGlow .9s both}',
    '#aewu-d .sign{font:600 clamp(10px,2.4vw,12px)/1.5 Arial,Helvetica,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#f4cf7a}',
    '#aewu-d button{position:absolute;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:3;min-height:44px;padding:0 18px;overflow:hidden;border:1px solid rgba(244,207,122,.65);border-radius:999px;background:rgba(28,7,48,.55);color:#fff6df;font:600 13px Arial,Helvetica,sans-serif;letter-spacing:.03em;cursor:pointer}',
    '#aewu-d button:hover{background:#f4cf7a;color:#2a0d42}',
    '#aewu-d button:focus-visible{outline:2px solid #fff;outline-offset:3px}',
    '@keyframes aewuRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}',
    '@keyframes aewuDrop{from{transform:translateY(-100%)}to{transform:none}}',
    '@keyframes aewuSpin{to{transform:rotate(360deg)}}',
    '@keyframes aewuShine{to{background-position:-220% 0}}',
    '@keyframes aewuLight{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}',
    '@keyframes aewuGlow{from{opacity:0}to{opacity:.75}}',
    '@keyframes aewuFlick{from{transform:scale(1) skewX(-3deg)}to{transform:scale(.88,1.1) skewX(4deg)}}',
    '@media (max-height:560px){#aewu-d .box{padding-top:24px}#aewu-d h2{font-size:44px}#aewu-d .diyas{margin:10px 0 6px}#aewu-d .diyas svg{width:36px}#aewu-d .toran{display:none}}',
    '@media (prefers-reduced-motion:reduce){#aewu-d *{animation:none!important}}'
  ].join('');
  document.head.appendChild(css);

  /* ---------- Markup ---------- */
  function rangoli() {
    var s = '<svg class="rangoli" viewBox="-100 -100 200 200" fill="none" stroke="#f4cf7a" stroke-width=".6" aria-hidden="true">';
    var rings = [[16, 92, 8, 'M0-92C15-78 15-62 0-48C-15-62-15-78 0-92Z'], [12, 0, 0, 'M0-50C9-40 9-30 0-20C-9-30-9-40 0-50Z'], [32, 0, 0, 'M0-97v-2']];
    rings.forEach(function (r) {
      for (var i = 0; i < r[0]; i++) s += '<path transform="rotate(' + (360 / r[0]) * i + ')" d="' + r[3] + '"/>';
    });
    return s + '<circle r="98"/><circle r="50"/><circle r="20"/></svg>';
  }

  function diya(i) {
    var d = (1.8 + i * 0.28).toFixed(2) + 's';
    var id = 'aewuG' + i;
    return '<svg viewBox="0 0 64 60" aria-hidden="true"><defs><radialGradient id="' + id + '"><stop offset="0" stop-color="#ffc54d" stop-opacity=".9"/><stop offset="1" stop-color="#ffc54d" stop-opacity="0"/></radialGradient></defs>' +
      '<circle class="glow" cx="32" cy="22" r="24" fill="url(#' + id + ')" style="animation-delay:' + d + '"/>' +
      '<path class="flame" style="animation-delay:' + d + ',calc(' + d + ' + .5s)" d="M32 8C37 16 40 20 40 26C40 31 36 34 32 34C28 34 24 31 24 26C24 20 28 16 32 8Z" fill="#ffb52e"/>' +
      '<path class="flame" style="animation-delay:' + d + ',calc(' + d + ' + .5s)" d="M32 19C34 23 36 25 36 28C36 31 34 33 32 33C30 33 28 31 28 28C28 25 30 23 32 19Z" fill="#fff4c8"/>' +
      '<path d="M4 35C14 40 50 40 60 35C58 49 46 56 32 56C18 56 6 49 4 35Z" fill="#d9662a"/>' +
      '<path d="M4 35C14 40 50 40 60 35C50 32 14 32 4 35Z" fill="#7a2b14"/>' +
      '<path d="M15 47C24 51 40 51 49 47" fill="none" stroke="#ffd777" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/></svg>';
  }

  function toran() {
    var w = window.innerWidth;
    var swags = w < 640 ? 2 : 4;
    var swagW = w / swags;
    var dip = Math.min(64, swagW * 0.2);
    var r = w < 640 ? 5.5 : 7;
    var colors = ['#ff9d1e', '#ffc42e', '#ef7a12'];
    var n = Math.round(swagW / (r * 1.7));
    var s = '<svg class="toran" width="' + w + '" height="' + (dip + 60) + '" aria-hidden="true">';
    for (var k = 0; k < swags; k++) {
      for (var i = 0; i <= n; i++) {
        var t = i / n;
        var x = k * swagW + t * swagW;
        var y = 4 + 4 * dip * t * (1 - t);
        s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" fill="' + colors[i % 3] + '"/>';
      }
      var hx = (k + 1) * swagW;
      if (k < swags - 1) {
        for (var j = 1; j < 4; j++) s += '<circle cx="' + hx + '" cy="' + (4 + j * r * 1.8) + '" r="' + r + '" fill="' + colors[j % 3] + '"/>';
        s += '<path d="M' + (hx - r) + ' ' + (4 + 4 * r * 1.8) + 'h' + 2 * r + 'l-' + r + ' ' + r * 2.4 + 'z" fill="#2f9e5b"/>';
      }
    }
    return s + '</svg>';
  }

  var el = document.createElement('div');
  el.id = 'aewu-d';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', CONFIG.ENGLISH + ' from An Event With Us');
  var diyas = '';
  for (var n = 0; n < 5; n++) diyas += diya(n);
  el.innerHTML = rangoli() + '<canvas aria-hidden="true"></canvas>' + toran() +
    '<div class="box"><div class="eb">' + CONFIG.EYEBROW + '</div>' +
    '<h2 lang="hi">' + CONFIG.HINDI + '</h2>' +
    '<p class="en">' + CONFIG.ENGLISH + '</p>' +
    '<p class="wish">' + CONFIG.WISH + '</p>' +
    '<div class="diyas">' + diyas + '</div>' +
    '<div class="sign">' + CONFIG.SIGNOFF + '</div></div>' +
    '<button type="button">' + CONFIG.SKIP + ' →</button>';

  var prevOverflow = root.style.overflow;
  root.style.overflow = 'hidden';
  root.appendChild(el);

  /* ---------- Fireworks ---------- */
  var canvas = el.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var raf = 0;
  var running = !reduced && !!ctx;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  function size() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener('resize', size);

  var palette = ['#ffd777', '#ffb52e', '#ff7a3d', '#ff5fa2', '#fff3c4', '#c58bff'];
  var rockets = [], sparks = [], lastLaunch = 0;
  var maxSparks = W < 640 ? 40 : 70;

  function launch() {
    /* Bursts stay at the sides so the wish remains readable. */
    var left = Math.random() < 0.5;
    var edge = W < 640 ? 0.2 : 0.26;
    var x = left ? Math.random() * W * edge : W - Math.random() * W * edge;
    var targetY = W < 640 ? H * (0.09 + Math.random() * 0.14) : H * (0.14 + Math.random() * 0.34);
    rockets.push({ x: x, y: H, vy: -Math.sqrt(2 * 0.09 * (H - targetY)), color: palette[Math.floor(Math.random() * palette.length)] });
  }
  function burst(r) {
    var second = palette[Math.floor(Math.random() * palette.length)];
    for (var i = 0; i < maxSparks; i++) {
      var a = (Math.PI * 2 * i) / maxSparks;
      var v = (i % 2 ? 2.8 : 1.6) + Math.random() * 1.2;
      sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: 0.012 + Math.random() * 0.01, color: i % 3 ? r.color : second });
    }
  }
  function frame(t) {
    if (!running) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,.3)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    if (t - lastLaunch > 620) { launch(); lastLaunch = t; }
    for (var i = rockets.length - 1; i >= 0; i--) {
      var r = rockets[i];
      r.y += r.vy; r.vy += 0.09;
      ctx.fillStyle = r.color;
      ctx.fillRect(r.x - 1, r.y, 2, 7);
      if (r.vy >= -0.4) { burst(r); rockets.splice(i, 1); }
    }
    for (var k = sparks.length - 1; k >= 0; k--) {
      var s = sparks[k];
      s.x += s.vx; s.y += s.vy; s.vx *= 0.985; s.vy = s.vy * 0.985 + 0.028; s.life -= s.decay;
      if (s.life <= 0) { sparks.splice(k, 1); continue; }
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, 1.7, 0, 6.3); ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }
  if (running) raf = requestAnimationFrame(frame);

  /* ---------- Closing ---------- */
  var closed = false;
  function close() {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    el.classList.add('out');
    root.style.overflow = prevOverflow;
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', size);
    setTimeout(function () {
      running = false;
      cancelAnimationFrame(raf);
      if (el.parentNode) el.parentNode.removeChild(el);
      if (css.parentNode) css.parentNode.removeChild(css);
    }, 850);
  }
  function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter') close(); }
  var timer = setTimeout(close, CONFIG.DURATION_MS);
  el.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
})();
