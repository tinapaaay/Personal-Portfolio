/* Tinapay — plum editorial
   Smooth scroll, reveals, hero intro, header state, mobile menu. */

(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    splitHeroName();
    setupHeader();
    setupMenu();
    setupReveals();
    setupForm();
    const smooth = setupSmoothScroll();
    setupAnchors(smooth);
    setupParallax(smooth);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.body.classList.add("is-loaded"));
    });
  });

  /* ---------- smooth scroll ----------
     Eases mouse-wheel and trackpad scrolling toward a target.
     Touch and keyboard keep native scrolling. */
  function setupSmoothScroll() {
    const api = {
      active: false,
      to(y) { window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" }); },
      onScroll(fn) { window.addEventListener("scroll", fn, { passive: true }); },
    };
    if (reduceMotion || !finePointer) return api;

    root.classList.add("smooth-scroll");
    api.active = true;

    let current = window.scrollY;
    let target = current;
    let running = false;
    const listeners = [];
    const ease = 0.1;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    const clamp = (v) => Math.max(0, Math.min(v, maxScroll()));

    function tick() {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
      }
      window.scrollTo(0, current);
      listeners.forEach((fn) => fn());
      if (running) requestAnimationFrame(tick);
    }

    function start() {
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }

    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || document.body.classList.contains("menu-open")) return;
      // Let scrollable inner elements (like the message box) scroll themselves.
      const inner = e.target.closest && e.target.closest("textarea");
      if (inner && inner.scrollHeight > inner.clientHeight) return;

      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      else if (e.deltaMode === 2) delta *= window.innerHeight;
      if (!running) current = window.scrollY;
      target = clamp(target + delta);
      start();
    }, { passive: false });

    // Keep in sync when the page is moved some other way (keyboard, scrollbar drag).
    window.addEventListener("scroll", () => {
      if (!running) {
        current = target = window.scrollY;
        listeners.forEach((fn) => fn());
      }
    }, { passive: true });

    window.addEventListener("resize", () => { target = clamp(target); });

    api.to = (y) => {
      if (!running) current = window.scrollY;
      target = clamp(y);
      start();
    };
    api.onScroll = (fn) => listeners.push(fn);
    return api;
  }

  function setupAnchors(smooth) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href").slice(1);
        const el = id ? document.getElementById(id) : null;
        if (!el && id !== "top") return;
        e.preventDefault();
        const y = el && id !== "top" ? el.getBoundingClientRect().top + window.scrollY - 80 : 0;
        smooth.to(y);
        if (el && el.id === "main") el.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- hero name letters ---------- */
  function splitHeroName() {
    const name = document.querySelector(".hero-name");
    if (!name) return;
    const text = name.textContent.trim();
    name.setAttribute("aria-label", text);
    name.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch;
      span.style.transitionDelay = `${0.05 * i}s`;
      name.appendChild(span);
    });
  }

  /* ---------- header ---------- */
  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;
    const label = toggle.querySelector(".label");
    const setOpen = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 961px)").addEventListener("change", () => setOpen(false));
    document.querySelectorAll(".site-nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  /* ---------- reveal on scroll ---------- */
  function setupReveals() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- gentle parallax ---------- */
  function setupParallax(smooth) {
    if (reduceMotion) return;
    const items = [...document.querySelectorAll("[data-speed]")];
    if (!items.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    smooth.onScroll(request);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }

  /* ---------- contact form ---------- */
  function setupForm() {
    const form = document.querySelector(".form");
    if (!form) return;
    const note = form.querySelector(".form-note");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = form.querySelector("#name").value.trim().split(" ")[0];
      if (note) note.textContent = `Thank you, ${name}. Your message is noted.`;
      form.reset();
    });
  }
})();
