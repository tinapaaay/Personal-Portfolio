/* Tinapay portfolio — motion, no libraries.
   The <head> of each page sets html.js and decides whether the loader
   (first visit this session) or the clay curtain (moving between pages) shows. */

(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const store = {
    get(key) {
      try { return sessionStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { sessionStorage.setItem(key, value); } catch (e) { /* private mode */ }
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    splitWords("[data-split]", "w");
    splitWords("[data-fill]", "f");
    setupHeader();
    setupMenu();
    setupPageTransitions();

    if (reduceMotion) {
      root.classList.remove("show-loader", "from-nav");
      document.querySelectorAll("[data-reveal], [data-split]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    setupCursor();
    setupScrollScenes();
    intro().then(setupReveals);
  });

  /* First visit: count to 100 while an arch fills. Between pages: lift the curtain. */
  function intro() {
    return new Promise((resolve) => {
      if (root.classList.contains("show-loader")) {
        const loader = document.querySelector(".loader");
        const num = loader && loader.querySelector(".loader-num");
        const arch = loader && loader.querySelector(".loader-arch");
        if (!loader) { resolve(); return; }

        const duration = 1900;
        const start = performance.now();
        const tick = (now) => {
          const t = clamp((now - start) / duration, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = Math.round(eased * 100);
          if (num) num.textContent = `${value}%`;
          if (arch) arch.style.setProperty("--fill", `${100 - value}%`);
          if (t < 1) {
            requestAnimationFrame(tick);
          } else {
            store.set("tp-seen", "1");
            setTimeout(() => {
              loader.classList.add("is-done");
              setTimeout(resolve, 250);
              setTimeout(() => root.classList.remove("show-loader"), 1300);
            }, 250);
          }
        };
        requestAnimationFrame(tick);
        return;
      }

      if (root.classList.contains("from-nav")) {
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-ready")));
        setTimeout(resolve, 450);
        return;
      }

      store.set("tp-seen", "1");
      resolve();
    });
  }

  /* Wrap words in spans (keeps <em>, <strong>, <br>). */
  function splitWords(selector, kind) {
    document.querySelectorAll(selector).forEach((el) => {
      let index = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(" "));
                return;
              }
              if (kind === "w") {
                const outer = document.createElement("span");
                const inner = document.createElement("span");
                outer.className = "w";
                inner.className = "w-i";
                inner.style.setProperty("--i", index++);
                inner.textContent = part;
                outer.appendChild(inner);
                frag.appendChild(outer);
              } else {
                const span = document.createElement("span");
                span.className = "f";
                span.textContent = part;
                frag.appendChild(span);
              }
            });
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
            walk(child);
          }
        });
      };
      el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
      walk(el);
      [...el.children].forEach((c) => c.setAttribute("aria-hidden", "true"));
    });
  }

  function setupReveals() {
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const step = parseFloat(group.dataset.stagger) || 0.1;
      group.querySelectorAll(":scope > [data-reveal]").forEach((child, i) => {
        child.style.setProperty("--d", `${i * step}s`);
      });
    });

    const targets = document.querySelectorAll("[data-reveal], [data-split]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    // Fully clipped shapes count as invisible, so watch their parent instead
    const proxies = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (proxies.get(entry.target) || []).forEach((el) => el.classList.add("is-in"));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    targets.forEach((el) => {
      const clipped = ["rise", "band"].includes(el.dataset.reveal);
      const watch = clipped ? el.parentElement : el;
      if (!proxies.has(watch)) proxies.set(watch, []);
      proxies.get(watch).push(el);
      observer.observe(watch);
    });
  }

  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (!document.body.classList.contains("menu-open")) {
        if (y > 320 && y > lastY + 2) header.classList.add("is-hidden");
        if (y < lastY - 2 || y < 320) header.classList.remove("is-hidden");
      }
      lastY = y;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

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
  }

  /* A terracotta curtain rises before leaving and lifts on the next page. */
  function setupPageTransitions() {
    if (reduceMotion) return;
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const internal = /\.html($|#)/.test(href) && !link.target && !/^https?:/.test(href);
      if (!internal) return;
      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        store.set("tp-nav", "1");
        document.body.classList.add("is-leaving");
        setTimeout(() => (window.location.href = href), 650);
      });
    });

    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        document.body.classList.remove("is-leaving", "menu-open");
        root.classList.remove("from-nav", "show-loader");
      }
    });
  }

  /* A small clay dot that follows the pointer and grows over links. */
  function setupCursor() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = document.createElement("div");
    dot.className = "cursor";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);
    root.classList.add("has-cursor");

    let x = -100, y = -100, cx = x, cy = y;
    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });

    document.addEventListener("mouseover", (e) => {
      const view = e.target.closest("[data-cursor='view']");
      const link = e.target.closest("a, button, label, input, textarea");
      dot.classList.toggle("is-view", Boolean(view));
      dot.classList.toggle("is-link", Boolean(link) && !view);
      dot.textContent = view ? "View" : "";
    });

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  function setupScrollScenes() {
    const meter = document.querySelector(".scroll-meter");
    const meterNum = meter && meter.querySelector("b");
    const fills = [...document.querySelectorAll("[data-fill]")].map((el) => ({
      el,
      words: [...el.querySelectorAll(".f")],
    }));
    const parallax = [...document.querySelectorAll("[data-speed]")];
    const leaves = [...document.querySelectorAll(".leaves")];
    const bands = [...document.querySelectorAll(".band")];
    const badges = [...document.querySelectorAll(".badge svg")];
    const journeyItems = [...document.querySelectorAll(".journey-item")];
    const journeyCounter = document.querySelector(".journey-shape .counter");

    let vh = window.innerHeight;
    let ticking = false;

    const render = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? scrollY / max : 0;

      if (meter) {
        meter.style.setProperty("--p", p.toFixed(4));
        if (meterNum) meterNum.textContent = `${Math.round(p * 100)}%`;
      }

      fills.forEach(({ el, words }) => {
        const rect = el.getBoundingClientRect();
        const t = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.3), 0, 1);
        const lit = Math.round(t * words.length);
        words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
      });

      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -300 || rect.top > vh + 300) return;
        const speed = parseFloat(el.dataset.speed) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${(-offset).toFixed(1)}px`;
      });

      leaves.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        el.style.setProperty("--ly", `${(rect.top * -0.12).toFixed(1)}px`);
      });

      bands.forEach((band) => {
        const rect = band.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const t = (rect.top + rect.height / 2) / vh;
        band.style.setProperty("--by", `${(t * 100).toFixed(1)}%`);
      });

      badges.forEach((svg) => svg.style.setProperty("--spin", `${scrollY * 0.15}deg`));

      if (journeyCounter && journeyItems.length) {
        let current = 0;
        journeyItems.forEach((item, i) => {
          if (item.getBoundingClientRect().top < vh * 0.55) current = i;
        });
        const label = journeyItems[current].dataset.count || String(current + 1).padStart(2, "0");
        if (journeyCounter.textContent !== label) journeyCounter.textContent = label;
      }
    };

    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", () => { vh = window.innerHeight; request(); });
  }
})();
