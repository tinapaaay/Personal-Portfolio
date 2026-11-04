/* Tinapay — plum editorial
   Live project previews, Lenis smooth scroll, and GSAP scroll scenes.
   Falls back to light CSS animations if the libraries don't load. */

(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) root.classList.add("has-gsap");

  let lenis = null;

  document.addEventListener("DOMContentLoaded", () => {
    splitHeroName();
    setupHeader();
    setupMenu();
    setupForm();
    setupLive();
    setupShapes();

    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      if (window.SplitText) gsap.registerPlugin(SplitText);
      if (!reduceMotion && window.Lenis) setupLenis();
      setupAnchors();
      if (reduceMotion) {
        document.body.classList.add("is-loaded");
      } else {
        // Wait for fonts so split lines measure correctly.
        const go = () => scenes();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
        else go();
      }
    } else {
      setupFallbackSmoothScroll();
      setupAnchors();
      setupFallbackReveals();
      requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("is-loaded")));
    }
  });

  /* =========================================================
     Live previews: a real website running in a browser frame
     ========================================================= */
  function setupLive() {
    const lives = [...document.querySelectorAll(".live")];
    if (!lives.length) return;

    const smallScreen = window.matchMedia("(max-width: 720px)").matches;
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    // On phones and data-saver, a live site loads only when tapped.
    const autoLoad = !smallScreen && !saveData;

    lives.forEach((live) => {
      const screen = live.querySelector(".live-screen");
      const viewport = live.querySelector(".live-viewport");
      const iframe = live.querySelector("iframe");
      const cover = live.querySelector(".live-cover");
      if (smallScreen) live.dataset.mode = "mobile";
      if (!autoLoad) {
        const label = live.querySelector(".live-cover span");
        if (label) label.textContent = "Tap to load the live site";
      }
      if (!live.dataset.mode) live.dataset.mode = "desktop";

      const layout = () => {
        const w = screen.clientWidth;
        const h = screen.clientHeight;
        if (!w || !h) return;
        let vw, vh, s, x = 0, y = 0;
        if (live.dataset.mode === "mobile" && w > 520) {
          // Phone in the middle of the frame
          vw = 390; vh = 844;
          s = Math.min((h * 0.88) / vh, 1);
          x = (w - vw * s) / 2;
          y = (h - vh * s) / 2;
        } else {
          // Fill the frame (desktop width, or phone width on small screens)
          vw = live.dataset.mode === "mobile" ? 390 : 1280;
          s = w / vw;
          vh = h / s;
        }
        live.classList.toggle("is-fill", live.dataset.mode === "mobile" && w <= 520);
        viewport.style.width = vw + "px";
        viewport.style.height = vh + "px";
        viewport.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      };

      if ("ResizeObserver" in window) new ResizeObserver(layout).observe(screen);
      window.addEventListener("resize", layout);
      layout();

      live.querySelectorAll(".live-modes button").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.mode === live.dataset.mode));
        btn.addEventListener("click", () => {
          live.dataset.mode = btn.dataset.mode;
          live.querySelectorAll(".live-modes button").forEach((b) =>
            b.setAttribute("aria-pressed", String(b === btn)));
          layout();
        });
      });

      iframe.addEventListener("load", () => {
        if (iframe.src) live.classList.add("is-loaded");
      });

      // Click to use the site; leave the frame to keep scrolling the page.
      cover.addEventListener("click", () => {
        load(live);
        live.classList.add("is-active");
        iframe.focus();
      });
      live.addEventListener("mouseleave", () => live.classList.remove("is-active"));
    });

    document.addEventListener("pointerdown", (e) => {
      lives.forEach((live) => { if (!live.contains(e.target)) live.classList.remove("is-active"); });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lives.forEach((l) => l.classList.remove("is-active"));
    });

    function load(live) {
      const iframe = live.querySelector("iframe");
      live.classList.add("is-requested");
      if (!iframe.src) iframe.src = live.dataset.src;
    }

    if (!autoLoad) return;
    if (!("IntersectionObserver" in window)) {
      lives.forEach(load);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "60% 120% 60% 120%" });
    lives.forEach((l) => io.observe(l));
  }

  /* =========================================================
     Smooth scroll
     ========================================================= */
  function setupLenis() {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToY(y) {
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else if (fallbackScroll) fallbackScroll(y);
    else window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href").slice(1);
        const el = id && id !== "top" ? document.getElementById(id) : null;
        if (!el && id !== "top") return;
        e.preventDefault();
        scrollToY(el ? el.getBoundingClientRect().top + window.scrollY - 80 : 0);
        if (el && el.id === "main") el.focus({ preventScroll: true });
      });
    });
  }

  /* =========================================================
     GSAP scroll scenes
     ========================================================= */
  function scenes() {
    const mm = gsap.matchMedia();
    const ease = "expo.out";

    // --- hero intro + scroll ---
    const hero = document.querySelector(".hero");
    if (hero) {
      const chars = hero.querySelectorAll(".hero-name .ch");
      const portrait = hero.querySelector(".hero-portrait");
      const plinth = hero.querySelector(".hero-plinth");
      const shadow = hero.querySelector(".hero-shadow");
      const sides = hero.querySelectorAll(".hero-left");

      // Intro and scroll scenes move different layers, so they never collide.
      gsap.timeline({ defaults: { ease } })
        .from(".site-header", { y: -30, opacity: 0, duration: 1.2 }, 0.2)
        .from(plinth, { scale: 0.2, duration: 1.8 }, 0)
        .from(hero.querySelectorAll(".ch-in"), { yPercent: 105, opacity: 0, duration: 1.5, stagger: 0.07 }, 0.15)
        .from(portrait, { y: 120, opacity: 0, duration: 1.8 }, 0.4)
        .from(shadow, { opacity: 0, duration: 2 }, 0.9)
        .from(hero.querySelectorAll(".hero-left > *"), { y: 30, opacity: 0, duration: 1.2, stagger: 0.08 }, 1);

      mm.add("(min-width: 721px)", () => {
        const mid = (chars.length - 1) / 2;
        const first = chars[0];
        const last = chars[chars.length - 1];
        // Spread the letters only into the empty space beside the word,
        // so the outer letters never leave the screen. (offset* ignores transforms.)
        const step = () => {
          const word = last.offsetLeft + last.offsetWidth - first.offsetLeft;
          const free = Math.max(0, (window.innerWidth - word) / 2 - 24);
          return Math.min(free / mid, 40);
        };
        gsap.timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        })
          .to(chars, { x: (i) => (i - mid) * step(), ease: "none" }, 0)
          .to(hero.querySelector(".hero-name"), { yPercent: -60, opacity: 0.25, ease: "none" }, 0)
          .to(hero.querySelector(".hero-stage"), { y: 90, scale: 1.05, transformOrigin: "50% 100%", ease: "none" }, 0)
          .to(sides, { y: -80, opacity: 0, ease: "none" }, 0);
      });
    }

    // --- headings: words rise out of masked lines ---
    if (window.SplitText) {
      document.querySelectorAll(".title, .display").forEach((el) => {
        SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 115,
              duration: 1.3,
              ease,
              stagger: 0.05,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      // Intro statement: words light up as you read
      document.querySelectorAll(".intro-statement").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(split.words, { opacity: 0.14 }, {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      // Footer wordmark rises letter by letter
      document.querySelectorAll(".footer-word").forEach((el) => {
        const split = SplitText.create(el, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      });
    }

    // --- general reveals ---
    const reveals = gsap.utils.toArray("[data-reveal]");
    gsap.set(reveals, { opacity: 0, y: 46 });
    ScrollTrigger.batch(reveals, {
      start: "top 90%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, ease, stagger: 0.1, overwrite: "auto" }),
    });

    // --- parallax ---
    gsap.utils.toArray("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0;
      gsap.fromTo(el, { y: speed * 400 }, {
        y: speed * -400,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // --- live works: pinned horizontal scroll ---
    const works = document.querySelector(".works");
    if (works) {
      const track = works.querySelector(".works-track");
      const count = works.querySelector(".works-count b");
      const bar = works.querySelector(".works-progress i");
      const total = works.querySelectorAll(".work-slide").length;

      mm.add("(min-width: 961px)", () => {
        works.classList.add("is-pinned");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: works,
            pin: true,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              if (count) count.textContent = String(Math.min(total, 1 + Math.floor(self.progress * total))).padStart(2, "0");
            },
          },
        });
        gsap.utils.toArray(works.querySelectorAll(".work-slide .live")).forEach((el, i) => {
          if (i === 0) return;
          gsap.from(el, { rotate: 3, scale: 0.9, ease: "none",
            scrollTrigger: { trigger: works, start: "top top", end: () => "+=" + window.innerWidth * (i * 0.8), scrub: true } });
        });
        return () => works.classList.remove("is-pinned");
      });
    }

    // --- projects page: previews open up as they enter ---
    gsap.utils.toArray(".feature .live").forEach((el) => {
      gsap.fromTo(el,
        { clipPath: "inset(14% 10% 14% 10% round 14px)", scale: 0.94 },
        { clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true } });
    });

    // --- quote: the plum drop grows and floods the screen ---
    mm.add("(min-width: 721px)", () => {
      document.querySelectorAll(".quote").forEach((quote) => {
        const drop = quote.querySelector(".drop");
        if (!drop) return;
        const text = quote.querySelectorAll(".wrap .cap, .wrap blockquote, .wrap .rule");
        const token = (name) => getComputedStyle(root).getPropertyValue(name).trim();
        gsap.timeline({
          scrollTrigger: { trigger: quote, start: "top top", end: "+=110%", pin: true, scrub: 1 },
        })
          .to(drop, { scale: 5.2, ease: "power2.in", duration: 1 }, 0)
          .to(text, { color: token("--cream"), duration: 0.25 }, 0.3)
          .to(quote.querySelectorAll("blockquote em"), { color: token("--cream-3"), duration: 0.25 }, 0.3)
          .to(quote, { backgroundColor: token("--plum"), duration: 0.05 }, 0.95);
      });
    });

    // --- skill rows slide in ---
    gsap.utils.toArray(".skill h3").forEach((el) => {
      gsap.from(el, { x: 60, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 60%", scrub: true } });
    });

    // --- word stack: fill one word at a time as the section scrolls by ---
    document.querySelectorAll(".word-stack").forEach((stack) => {
      const words = stack.querySelectorAll("span");
      ScrollTrigger.create({
        trigger: stack,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate(self) {
          const on = Math.min(words.length - 1, Math.floor(self.progress * words.length));
          words.forEach((w, i) => w.classList.toggle("is-on", i === on));
        },
      });
    });

    // --- floating shapes drift and turn as you scroll ---
    gsap.utils.toArray(".shapes").forEach((box) => {
      box.querySelectorAll(".shape").forEach((el, i) => {
        const depth = 40 + (i % 3) * 45;
        gsap.fromTo(el, { y: depth, rotate: 0 }, {
          y: -depth, rotate: i % 2 ? -40 : 50, ease: "none",
          scrollTrigger: { trigger: box.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    // Recalculate after images and live frames settle.
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* =========================================================
     Shared bits
     ========================================================= */

  // Thin outline shapes scattered around section headings.
  // Each section gets one of a few layouts, picked in turn.
  const SHAPE_LAYOUTS = [
    [["ring", 96, "auto", "30%", "auto", "6%"], ["square rose", 44, "auto", "16%", "auto", "14%"], ["dot", 12, "3%", "auto", "auto", "30%"], ["ring", 24, "22%", "auto", "auto", "10%"]],
    [["square", 70, "auto", "5%", "18%"], ["ring rose", 30, "8%", "auto", "auto", "16%"], ["dot", 10, "auto", "26%", "12%"], ["ring", 54, "40%", "auto", "auto", "-2%"]],
    [["ring rose", 120, "auto", "-2%", "auto", "10%"], ["square", 36, "48%", "auto", "9%"], ["dot", 14, "auto", "12%", "16%"], ["square rose", 22, "30%", "auto", "auto", "12%"]],
  ];
  function setupShapes() {
    // Reading pages stay calm: no floating shapes on articles.
    if (document.querySelector(".post")) return;
    const sections = document.querySelectorAll(".page-hero, .section, .closing");
    sections.forEach((section, n) => {
      if (section.querySelector(":scope > .shapes")) return;
      const box = document.createElement("div");
      box.className = "shapes";
      box.setAttribute("aria-hidden", "true");
      SHAPE_LAYOUTS[n % SHAPE_LAYOUTS.length].forEach(([kind, size, left, right, top, bottom]) => {
        const el = document.createElement("i");
        el.className = "shape " + kind;
        el.style.setProperty("--s", size + "px");
        Object.assign(el.style, { left, right, top: top || "auto", bottom: bottom || "auto" });
        box.appendChild(el);
      });
      section.prepend(box);
    });
  }
  function splitHeroName() {
    const name = document.querySelector(".hero-name");
    if (!name) return;
    const text = name.textContent.trim();
    name.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      const inner = document.createElement("span");
      inner.className = "ch-in";
      inner.textContent = ch;
      span.appendChild(inner);
      span.style.transitionDelay = `${0.05 * i}s`;
      name.appendChild(span);
    });
  }

  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;
    const label = toggle.querySelector(".label");
    const setOpen = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close" : "Menu";
      if (lenis) open ? lenis.stop() : lenis.start();
    };
    toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 961px)").addEventListener("change", () => setOpen(false));
    document.querySelectorAll(".site-nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  function setupForm() {
    const form = document.querySelector(".form");
    if (!form) return;
    const note = form.querySelector(".form-note");
    const button = form.querySelector('button[type="submit"]');
    const endpoint = form.dataset.endpoint;
    const email = form.dataset.email;

    const say = (html) => { if (note) note.innerHTML = html; };

    // Inline errors: mark the field, say what's missing, and clear it as they type.
    const messages = {
      name: { valueMissing: "Please add your name." },
      email: { valueMissing: "Please add your email.", typeMismatch: "Please check your email address." },
      message: { valueMissing: "Please write a short message." },
    };
    const fields = [...form.querySelectorAll(".field input, .field textarea")];
    const showError = (input) => {
      const field = input.closest(".field");
      let error = field.querySelector(".field-error");
      const problem = input.validity.valueMissing ? "valueMissing" : input.validity.typeMismatch ? "typeMismatch" : null;
      if (!problem) {
        field.classList.remove("is-invalid");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
        if (error) error.remove();
        return true;
      }
      if (!error) {
        error = document.createElement("p");
        error.className = "field-error";
        error.id = `${input.id}-error`;
        field.appendChild(error);
      }
      error.textContent = (messages[input.name] || {})[problem] || "Please check this field.";
      field.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
      return false;
    };
    fields.forEach((input) => input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("is-invalid")) showError(input);
    }));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalid = fields.filter((input) => !showError(input));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      if (data._honey) return; // bot filled the hidden field
      const first = String(data.name).trim().split(" ")[0];

      button.disabled = true;
      say("Sending…");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _template: "table" }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || "failed");
        say(`Thank you, ${first}. Your message is on its way — I’ll reply soon.`);
        form.reset();
      } catch (err) {
        // Fall back to the visitor's own email app with the message filled in.
        const mail = `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
        say(`Sorry, that didn’t send. <a href="${mail}">Send it by email instead</a>.`);
      } finally {
        button.disabled = false;
      }
    });
  }

  /* =========================================================
     Fallback (no GSAP): eased wheel scroll + fade-up reveals
     ========================================================= */
  let fallbackScroll = null;

  function setupFallbackSmoothScroll() {
    if (reduceMotion || !finePointer) return;
    root.classList.add("smooth-scroll");
    let current = window.scrollY;
    let target = current;
    let running = false;
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    const clamp = (v) => Math.max(0, Math.min(v, maxScroll()));
    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) { current = target; running = false; }
      window.scrollTo(0, current);
      if (running) requestAnimationFrame(tick);
    };
    const start = () => { if (!running) { running = true; requestAnimationFrame(tick); } };
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey || document.body.classList.contains("menu-open")) return;
      e.preventDefault();
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 32; else if (e.deltaMode === 2) d *= window.innerHeight;
      if (!running) current = window.scrollY;
      target = clamp(target + d);
      start();
    }, { passive: false });
    window.addEventListener("scroll", () => { if (!running) current = target = window.scrollY; }, { passive: true });
    fallbackScroll = (y) => { if (!running) current = window.scrollY; target = clamp(y); start(); };
  }

  function setupFallbackReveals() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }
})();
