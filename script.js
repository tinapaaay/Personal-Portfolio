/* Tinapay portfolio — quiet scroll motion, no libraries. */

(function () {
  const root = document.documentElement;
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  document.addEventListener("DOMContentLoaded", () => {
    splitWords("[data-split]", "w");
    splitWords("[data-fill]", "f");
    setupReveals();
    setupHeader();
    setupMenu();
    setupPageTransitions();
    if (!reduceMotion) setupScrollScenes();
  });

  /* Wrap every word in spans so it can be animated on its own.
     Keeps inner elements such as <em>, <strong> and <br>. */
  function splitWords(selector, kind) {
    document.querySelectorAll(selector).forEach((el) => {
      let index = 0;

      const walk = (node) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const parts = child.textContent.split(/(\s+)/);
            const frag = document.createDocumentFragment();

            parts.forEach((part) => {
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

      // Screen readers keep reading the original sentence
      el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
      walk(el);
      [...el.children].forEach((c) => c.setAttribute("aria-hidden", "true"));
    });
  }

  /* Fade, rise and un-blur elements as they enter the viewport.
     Children of [data-stagger] get increasing delays. */
  function setupReveals() {
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const step = parseFloat(group.dataset.stagger) || 0.1;
      group.querySelectorAll(":scope > [data-reveal]").forEach((child, i) => {
        child.style.setProperty("--d", `${i * step}s`);
      });
    });

    const targets = document.querySelectorAll("[data-reveal], [data-split]");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* Header hides while reading down and returns when scrolling up. */
  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (!document.body.classList.contains("menu-open")) {
        header.classList.toggle("is-hidden", y > 300 && y > lastY + 2);
        if (y < lastY - 2) header.classList.remove("is-hidden");
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

    toggle.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("menu-open"));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", () => setOpen(false));
  }

  /* Soft fade between pages. */
  function setupPageTransitions() {
    if (reduceMotion) return;

    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const internal =
        href.endsWith(".html") && !link.target && !href.startsWith("http") && !href.startsWith("#");
      if (!internal) return;

      link.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        document.body.classList.add("is-leaving");
        setTimeout(() => (window.location.href = href), 420);
      });
    });

    // Coming back with the browser's back button should not show a blank page
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) document.body.classList.remove("is-leaving", "menu-open");
    });
  }

  /* Everything tied directly to scroll position, run in one animation frame. */
  function setupScrollScenes() {
    const progressBar = document.querySelector(".progress span");
    const fills = [...document.querySelectorAll("[data-fill]")].map((el) => ({
      el,
      words: [...el.querySelectorAll(".f")],
    }));
    const parallax = [...document.querySelectorAll("[data-speed]")];
    const journeys = [...document.querySelectorAll(".journey")];
    const hscroll = document.querySelector(".hscroll");
    const pinQuery = window.matchMedia("(min-width: 901px)");

    let ticking = false;
    let vh = window.innerHeight;

    /* Horizontal gallery: the section gets tall enough that scrolling
       down slides the track sideways while it stays pinned. */
    const layoutHScroll = () => {
      if (!hscroll) return;
      const track = hscroll.querySelector(".hscroll-track");
      if (pinQuery.matches) {
        hscroll.classList.add("is-pinned");
        const distance = Math.max(0, track.scrollWidth - window.innerWidth);
        hscroll.style.height = `${distance + vh}px`;
        hscroll.dataset.distance = distance;
      } else {
        hscroll.classList.remove("is-pinned");
        hscroll.style.height = "";
        track.style.transform = "";
      }
    };

    const render = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;

      if (progressBar) {
        progressBar.style.transform = `scaleY(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
      }

      // Words fill with ink as the paragraph travels up the screen
      fills.forEach(({ el, words }) => {
        const rect = el.getBoundingClientRect();
        const p = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.3), 0, 1);
        const lit = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
      });

      parallax.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = parseFloat(el.dataset.speed) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });

      // Timeline line draws itself and dots light up as it passes them
      journeys.forEach((list) => {
        const rect = list.getBoundingClientRect();
        const p = clamp((vh * 0.6 - rect.top) / rect.height, 0, 1);
        list.style.setProperty("--p", p.toFixed(4));
        const lineY = rect.top + p * rect.height;
        list.querySelectorAll(".journey-item").forEach((item) => {
          const dot = item.querySelector(".journey-dot");
          item.classList.toggle("is-lit", dot.getBoundingClientRect().top < lineY);
        });
      });

      if (hscroll && hscroll.classList.contains("is-pinned")) {
        const track = hscroll.querySelector(".hscroll-track");
        const bar = hscroll.querySelector(".hscroll-bar span");
        const count = hscroll.querySelector(".hscroll-count b");
        const cards = hscroll.querySelectorAll(".work-card");
        const distance = parseFloat(hscroll.dataset.distance) || 0;
        const rect = hscroll.getBoundingClientRect();
        const p = clamp(-rect.top / (hscroll.offsetHeight - vh || 1), 0, 1);

        track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
        if (bar) bar.style.transform = `scaleX(${p})`;
        if (count && cards.length) {
          const current = Math.min(cards.length, Math.floor(p * cards.length) + 1);
          count.textContent = String(current).padStart(2, "0");
        }
      }
    };

    const requestRender = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    const onResize = () => {
      vh = window.innerHeight;
      layoutHScroll();
      requestRender();
    };

    layoutHScroll();
    render();

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
  }
})();
