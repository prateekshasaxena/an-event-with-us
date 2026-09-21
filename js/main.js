/* =========================================================
   AN EVENT WITH US — shared site script
   Used by every page (index / about / services / gallery / contact).
   All blocks are guarded so pages that don't have a given element
   (hero, gallery, contact form, etc.) simply skip that piece.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- header scroll shadow ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    function updateHeader() { header.classList.toggle("scrolled", window.scrollY > 10); }
    window.addEventListener("scroll", updateHeader);
    updateHeader();
  }

  /* ---------- scroll progress bar ---------- */
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = pct + "%";
    }
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  /* ---------- mobile menu toggle ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll(".nav-link, .nav-cta");
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen
        ? '<span class="ico" aria-hidden="true">✕</span>'
        : '<span class="ico" aria-hidden="true">☰</span>';
    });
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<span class="ico" aria-hidden="true">☰</span>';
      });
    });
  }

  /* ---------- hero cursor spotlight ---------- */
  const heroSection = document.querySelector(".hero");
  const heroGlow = document.getElementById("heroGlow");
  if (heroSection && heroGlow && window.matchMedia("(hover: hover)").matches) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100 + "%";
      const my = ((e.clientY - rect.top) / rect.height) * 100 + "%";
      heroGlow.style.setProperty("--mx", mx);
      heroGlow.style.setProperty("--my", my);
    });
  }

  /* ---------- subtle parallax on the hero photo ---------- */
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const shift = Math.min(window.scrollY * 0.22, 140);
      heroSection.style.backgroundPositionY = `calc(30% + ${shift}px)`;
    }, { passive: true });
  }

  /* ---------- 3D tilt on service / project / feature cards ---------- */
  function addTilt(selector, intensity) {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * intensity;
        const rotateX = ((y / rect.height) - 0.5) * -intensity;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }
  if (window.matchMedia("(hover: hover)").matches) {
    addTilt(".service-card", 7);
    addTilt(".project-card", 5);
  }

  /* ---------- animated count-up stats ---------- */
  const countEls = document.querySelectorAll(".count-up");
  function runCountUp(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCountUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach((el) => countObserver.observe(el));
  }

  /* ---------- scroll-reveal ---------- */
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  }

  /* ---------- contact form (mailto submit) ---------- */
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const eventType = document.getElementById("event").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent("New Event Enquiry — An Event With Us");
      const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Event Type: " + eventType + "\n\n" +
        "Event Details:\n" + message
      );

      window.location.href = "mailto:aneventswithus@gmail.com?subject=" + subject + "&body=" + body;
      formMessage.classList.add("show");
    });
  }

  /* ---------- gallery: category filters ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        galleryItems.forEach(item => {
          const show = cat === "all" || item.dataset.category === cat;
          item.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* ---------- gallery: lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox && galleryItems.length) {
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    const itemsArr = Array.from(galleryItems);
    let currentIndex = 0;

    function visibleItems() {
      return itemsArr.filter(item => !item.classList.contains("hide"));
    }

    function openLightbox(item) {
      const list = visibleItems();
      currentIndex = list.indexOf(item);
      showCurrent(list);
      lightbox.classList.add("open");
      document.body.classList.add("menu-open");
    }

    function showCurrent(list) {
      const item = list[currentIndex];
      if (!item) return;
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightboxCaption.textContent = img.alt || "";
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    function step(dir) {
      const list = visibleItems();
      if (!list.length) return;
      currentIndex = (currentIndex + dir + list.length) % list.length;
      showCurrent(list);
    }

    itemsArr.forEach(item => {
      item.addEventListener("click", () => openLightbox(item));
    });
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
