/* ============================================================
   Aarnika's Herba Hue — script.js
   Vanilla JS: nav scroll, mobile menu, reveal-on-scroll,
   counter animation, dynamic content rendering.
   ============================================================ */

(function () {
  'use strict';

  const WA = '919600347691';
  const waLink = (msg) =>
    `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    })
  );

  /* ---------- Smooth scroll (extra polish for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Products data & render ---------- */
  const PRODUCTS = [
    { title: "Herbal Hair Oil", img: "assets/oil.png",
      desc: "Slow-infused with 18 Ayurvedic herbs to nourish roots and reduce hair fall.", tag: "Bestseller" },
    { title: "Glow Face Pack", img: "assets/face_pack.png",
      desc: "Rose, neem & multani — a gentle weekly ritual for clear, radiant skin.", tag: "New" },
    { title: "Kerala Hair Growth Shampoo", img: "assets/shampoo.png",
      desc: "Hibiscus & curry leaf cleanser that strengthens strands without sulphates.", tag: "Loved" },
    { title: "Traditional Bath Powder", img: "assets/bath.jpg",
      desc: "Sandalwood, vetiver & green-gram — a fragrant, skin-softening daily soak.", tag: "Family" },
    { title: "Pathimuga Pattai", img: "assets/product-pathimuga.jpg",
      desc: "Sacred red bark for naturally cooling, immunity-boosting daily water.", tag: "Heritage" },
  ];

  const grid = document.getElementById('productsGrid');
  PRODUCTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'product-card reveal';
    card.style.transitionDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="product-img">
        <span class="product-tag">${p.tag}</span>
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        <a class="btn btn-leaf btn-shine product-cta" target="_blank" rel="noreferrer"
           href="${waLink(`Hi! I'd like to order: ${p.title}. Please share details.`)}">
          <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
        </a>
      </div>`;
    grid.appendChild(card);
  });

  /* ---------- Features render ---------- */
  const FEATURES = [
    { i: 'fa-leaf',          t: '100% Herbal',        d: 'Pure plant-based formulas, nothing synthetic.' },
    { i: 'fa-handshake-angle',t:'Family Safe',        d: 'Gentle for kids, parents and elders alike.' },
    { i: 'fa-shield-halved', t: 'Chemical Free',      d: 'No sulphates, parabens or artificial fragrance.' },
    { i: 'fa-flask',         t: 'Ayurvedic Formula',  d: 'Time-tested Kerala recipes, modern care.' },
    { i: 'fa-truck',         t: 'Fast Delivery',      d: 'Freshly packed and shipped pan-India.' },
    { i: 'fa-sparkles',      t: 'Natural Ingredients',d: 'Single-origin herbs from trusted farms.' },
  ];
  const fGrid = document.getElementById('featuresGrid');
  FEATURES.forEach((f, i) => {
    const div = document.createElement('div');
    div.className = 'feature reveal';
    div.style.transitionDelay = `${i * 50}ms`;
    div.innerHTML = `
      <div class="feature-ic"><i class="fa-solid ${f.i}"></i></div>
      <h3>${f.t}</h3>
      <p>${f.d}</p>`;
    fGrid.appendChild(div);
  });

  /* ---------- Reviews render ---------- */
  const REVIEWS = [
    { name: 'Priya R.',   city: 'Chennai',    initials: 'PR',
      text: 'The hair oil is magical — my hair fall reduced in just three weeks. Smells beautiful too!' },
    { name: 'Anitha K.',  city: 'Coimbatore', initials: 'AK',
      text: 'The bath powder is so gentle, I use it for my baby and myself. Truly family safe.' },
    { name: 'Lakshmi V.', city: 'Bengaluru',  initials: 'LV',
      text: 'The face pack gave me the glow my skin had lost. Authentic, pure and lovingly packed.' },
  ];
  const rGrid = document.getElementById('reviewsGrid');
  REVIEWS.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review reveal';
    div.style.transitionDelay = `${i * 80}ms`;
    div.innerHTML = `
      <div class="quote-mark">&ldquo;</div>
      <div class="stars">
        ${'<i class="fa-solid fa-star"></i>'.repeat(5)}
      </div>
      <p class="review-text">&ldquo;${r.text}&rdquo;</p>
      <div class="review-foot">
        <div class="avatar">${r.initials}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-city">${r.city}</div>
        </div>
      </div>`;
    rGrid.appendChild(div);
  });

  /* ---------- Gallery ---------- */
  const galleryImgs = [
    'assets/product-hair-oil.jpg', 'assets/product-face-pack.jpg',
    'assets/product-shampoo.jpg',  'assets/product-bath-powder.jpg',
    'assets/product-pathimuga.jpg','assets/about-herbs.jpg',
    'assets/product-hair-oil.jpg', 'assets/product-face-pack.jpg',
  ];
  const gallery = document.getElementById('gallery');
  galleryImgs.forEach((src, i) => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'reveal';
    a.style.transitionDelay = `${i * 40}ms`;
    a.innerHTML = `<img src="${src}" alt="Gallery" loading="lazy" />`;
    gallery.appendChild(a);
  });

  /* ---------- Reveal-on-scroll observer ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

  /* ---------- Counter animation ---------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const to = parseInt(el.dataset.to, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const v = Math.round(to * (1 - Math.pow(1 - p, 3)));
          el.textContent = v.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll('.counter').forEach((el) => counterIO.observe(el));
})();
