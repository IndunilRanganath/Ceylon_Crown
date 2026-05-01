/* ============================================
   Ceylon Crown — Site JavaScript
   ============================================ */

(function () {
  'use strict';

  // Replace this with the real Amazon storefront URL when published.
  const AMAZON_STOREFRONT = 'https://www.amazon.com/stores/CeylonCrown';
  const WHATSAPP_NUMBER = '94771234567'; // Sri Lanka country code + number

  /* ---- Sticky nav shadow on scroll ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 16) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Reveal-on-scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Testimonial carousel ---- */
  const tTrack = document.querySelector('.t-slides');
  const tDots = document.querySelectorAll('.t-dot');
  if (tTrack && tDots.length) {
    let idx = 0;
    const total = tDots.length;
    const setSlide = (i) => {
      idx = (i + total) % total;
      tTrack.style.transform = `translateX(-${idx * 100}%)`;
      tDots.forEach((d, n) => d.classList.toggle('active', n === idx));
    };
    tDots.forEach((d, n) => d.addEventListener('click', () => setSlide(n)));
    let auto = setInterval(() => setSlide(idx + 1), 6500);
    tTrack.parentElement.addEventListener('mouseenter', () => clearInterval(auto));
    tTrack.parentElement.addEventListener('mouseleave', () => {
      auto = setInterval(() => setSlide(idx + 1), 6500);
    });
    setSlide(0);
  }

  /* ---- Cookie banner ---- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    const cookieAccepted = localStorage.getItem('cc_cookie_consent');
    if (!cookieAccepted) {
      setTimeout(() => cookieBanner.classList.add('show'), 1500);
    }
    cookieBanner.querySelectorAll('[data-cookie-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('cc_cookie_consent', btn.dataset.cookieAction);
        cookieBanner.classList.remove('show');
      });
    });
  }

  /* ---- Newsletter form ---- */
  document.querySelectorAll('form[data-newsletter]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (!input || !input.value) return;
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.querySelector('form[data-contact]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = contactForm.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thank you — your message has been received. We will reply within 24 hours.';
        status.style.color = 'var(--emerald)';
      }
      contactForm.reset();
    });
  }

  /* ---- Product gallery (detail page) ---- */
  const galleryMainImg = document.getElementById('gallery-main-img');
  const galleryThumbs = document.querySelectorAll('.gallery-thumbs button');
  if (galleryMainImg && galleryThumbs.length) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.img;
        if (!src) return;
        galleryMainImg.src = src;
        galleryThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  /* ---- Inject Amazon storefront URL into all relevant CTAs ----
     Anchors with data-amazon will have href set to the storefront. */
  document.querySelectorAll('[data-amazon]').forEach(el => {
    el.setAttribute('href', AMAZON_STOREFRONT);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  /* ---- WhatsApp link ---- */
  const wa = document.querySelector('.whatsapp-float');
  if (wa) {
    const msg = encodeURIComponent("Hello Ceylon Crown! I'd like to learn more about your products.");
    wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  /* ---- Year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
