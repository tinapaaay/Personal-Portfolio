/* ==========================================================
   Typewriter Calculator — logic, sound and motion
   ========================================================== */
(() => {
  const MAX_DIGITS = 10;
  const OP_SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  const $ = (s) => document.querySelector(s);
  const displayEl = $("#display");
  const opInd = $("#opInd");
  const tape = $("#tape");
  const paper = $(".paper");
  const carriage = $("#carriage");
  const machine = $("#machine");
  const typebar = $("#typebar");
  const keysEl = $("#keys");
  const soundBtn = $("#soundBtn");

  /* ---------------- Calculator state ---------------- */
  const state = {
    current: "0",     // what's on the display (string)
    stored: null,     // left operand
    op: null,         // pending operator
    waiting: false,   // next digit starts a new number
    lastOp: null,     // for repeated "="
    lastOperand: null,
    error: false,
  };

  const countDigits = (s) => s.replace(/[^0-9]/g, "").length;

  function format(n) {
    if (!isFinite(n)) return "Error";
    if (Object.is(n, -0)) n = 0;
    let s = String(parseFloat(n.toPrecision(MAX_DIGITS)));
    if (countDigits(s) <= MAX_DIGITS && !s.includes("e")) return s;
    const abs = Math.abs(n);
    if (abs >= 1e10 || abs < 1e-6) {
      // compact exponent form that the 7-segment font can show
      return n.toExponential(4).replace(/\.?0+e/, "e").replace("e+", "e");
    }
    const intLen = String(Math.trunc(abs)).length;
    s = n.toFixed(Math.max(0, MAX_DIGITS - intLen));
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s;
  }

  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
    }
    return b;
  }

  function render() {
    displayEl.textContent = state.current;
    opInd.textContent = state.op ? OP_SYMBOL[state.op] : "";
    keysEl.querySelectorAll(".key[data-op]").forEach((k) =>
      k.classList.toggle("active-op", state.waiting && k.dataset.op === state.op)
    );
  }

  function setError() {
    Object.assign(state, { current: "Error", stored: null, op: null, waiting: true, error: true, lastOp: null });
    printLine("ERROR", "", "err");
    displayEl.classList.remove("blink"); void displayEl.offsetWidth; displayEl.classList.add("blink");
  }

  function resetIfError() {
    if (state.error) Object.assign(state, { current: "0", error: false, waiting: false });
  }

  const actions = {
    digit(d) {
      resetIfError();
      if (state.waiting) { state.current = d; state.waiting = false; }
      else if (state.current === "0") state.current = d;
      else if (state.current === "-0") state.current = "-" + d;
      else if (countDigits(state.current) < MAX_DIGITS) state.current += d;
      else return false;
      carriageStep();
    },
    dot() {
      resetIfError();
      if (state.waiting) { state.current = "0."; state.waiting = false; }
      else if (!state.current.includes(".")) state.current += ".";
      else return false;
    },
    op(op) {
      resetIfError();
      const value = parseFloat(state.current);
      if (state.op && !state.waiting) {
        printLine(format(value), OP_SYMBOL[state.op]);
        const r = compute(state.stored, value, state.op);
        if (!isFinite(r)) return setError();
        state.current = format(r);
        state.stored = r;
      } else if (state.op && state.waiting) {
        // operator changed — just swap it
        state.op = op;
        return;
      } else {
        printLine(format(value), "");
        state.stored = value;
      }
      state.op = op;
      state.waiting = true;
    },
    equals() {
      if (state.error) return false;
      let a, b, op;
      if (state.op) {
        a = state.stored;
        b = state.waiting ? state.stored : parseFloat(state.current);
        op = state.op;
        printLine(format(b), OP_SYMBOL[op]);
      } else if (state.lastOp) {
        a = parseFloat(state.current);
        b = state.lastOperand;
        op = state.lastOp;
        printLine(format(b), OP_SYMBOL[op]);
      } else {
        return false;
      }
      const r = compute(a, b, op);
      if (!isFinite(r)) return setError();
      state.current = format(r);
      state.lastOp = op;
      state.lastOperand = b;
      state.stored = null;
      state.op = null;
      state.waiting = true;
      printLine(state.current, "=", "total");
      ding();
      machine.classList.remove("thunk"); void machine.offsetWidth; machine.classList.add("thunk");
      carriageReturn();
    },
    clear() {
      Object.assign(state, { current: "0", stored: null, op: null, waiting: false, lastOp: null, lastOperand: null, error: false });
      carriageReturn();
      pullLever();
      ding();
    },
    back() {
      if (state.error || state.waiting) return false;
      state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
      if (state.current === "-" || state.current === "-0") state.current = "0";
    },
    sign() {
      if (state.error) return false;
      if (state.current === "0") { state.current = "-0"; state.waiting = false; return; }
      state.current = state.current.startsWith("-") ? state.current.slice(1) : "-" + state.current;
    },
    percent() {
      if (state.error) return false;
      const v = parseFloat(state.current);
      // 200 + 10% → 200 + 20 ; otherwise just divide by 100
      const r = state.op && (state.op === "+" || state.op === "-") ? (state.stored * v) / 100 : v / 100;
      state.current = format(r);
      state.waiting = false;
    },
  };

  function run(action, value) {
    const result = actions[action]?.(value);
    if (result !== false) strike();
    render();
  }

  /* ---------------- Paper tape ---------------- */
  function printLine(num, op, cls = "") {
    const li = document.createElement("li");
    if (cls) li.className = cls;
    li.innerHTML = `<span class="n"></span><span class="o"></span>`;
    li.firstChild.textContent = num;
    li.lastChild.textContent = op;
    tape.appendChild(li);
    while (tape.children.length > 40) tape.firstChild.remove();
    paper.classList.remove("feed"); void paper.offsetWidth; paper.classList.add("feed");
  }

  function feedBlank() {
    printLine(" ", "");
  }

  function tearTape() {
    if (!tape.children.length) return;
    paper.classList.add("tear");
    playNoise(0.25, 2400, 0.5);
    setTimeout(() => {
      tape.innerHTML = "";
      paper.classList.remove("tear");
      paper.animate([{ transform: "translateX(-50%) translateY(40%)" }, { transform: "translateX(-50%)" }],
        { duration: 400, easing: "cubic-bezier(.2,.8,.2,1)" });
    }, 700);
  }

  /* ---------------- Motion helpers ---------------- */
  let shiftTimer;
  function carriageStep() {
    carriage.classList.add("shift");
    clearTimeout(shiftTimer);
    shiftTimer = setTimeout(() => carriage.classList.remove("shift"), 120);
  }
  function carriageReturn() {
    carriage.classList.remove("return"); void carriage.offsetWidth; carriage.classList.add("return");
  }
  function pullLever() {
    const l = $("#lever");
    l.classList.remove("pull"); void l.offsetWidth; l.classList.add("pull");
  }
  function strike() {
    typebar.style.setProperty("--from", `${(Math.random() < 0.5 ? -1 : 1) * (40 + Math.random() * 45)}deg`);
    typebar.classList.remove("strike"); void typebar.offsetWidth; typebar.classList.add("strike");
    clack();
  }
  function pressVisual(el) {
    if (!el) return;
    el.classList.add("down");
    setTimeout(() => el.classList.remove("down"), 110);
  }

  /* ---------------- Sound (Web Audio, no files) ---------------- */
  let ctx = null;
  let soundOn = true;
  try { soundOn = localStorage.getItem("tc-sound") !== "off"; } catch (e) {}

  function audio() {
    if (!soundOn) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function playNoise(dur, freq, gain) {
    const a = audio(); if (!a) return;
    const len = Math.floor(a.sampleRate * dur);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
    const src = a.createBufferSource(); src.buffer = buf;
    const f = a.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = 1.2;
    const g = a.createGain(); g.gain.value = gain;
    src.connect(f).connect(g).connect(a.destination);
    src.start();
  }
  function clack() {
    playNoise(0.05, 1800 + Math.random() * 900, 0.9);
    setTimeout(() => playNoise(0.03, 600, 0.5), 25);
  }
  function ding() {
    const a = audio(); if (!a) return;
    const t = a.currentTime;
    [[2093, 0.25], [4186, 0.06], [3136, 0.04]].forEach(([freq, vol]) => {
      const o = a.createOscillator(); o.type = "sine"; o.frequency.value = freq;
      const g = a.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      o.connect(g).connect(a.destination);
      o.start(t); o.stop(t + 1.25);
    });
  }

  function setSound(on, silent) {
    soundOn = on;
    try { localStorage.setItem("tc-sound", on ? "on" : "off"); } catch (e) {}
    soundBtn.setAttribute("aria-pressed", String(on));
    soundBtn.lastChild.textContent = on ? " Sound on" : " Sound off";
    if (on && !silent) clack();
  }

  /* ---------------- Events ---------------- */
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pressVisual(btn);
      const { action, op } = btn.dataset;
      run(action, action === "digit" ? btn.textContent.trim() : op);
      btn.blur();
    });
  });

  $("#lever").addEventListener("click", () => run("clear"));
  $("#knobL").addEventListener("click", (e) => {
    spinKnob(e.currentTarget); feedBlank(); playNoise(0.12, 900, 0.6);
  });
  $("#knobR").addEventListener("click", (e) => { spinKnob(e.currentTarget); setSound(!soundOn); });
  soundBtn.addEventListener("click", () => setSound(!soundOn));
  $("#tapeBtn").addEventListener("click", tearTape);

  function spinKnob(el) {
    el.classList.remove("spin"); void el.offsetWidth; el.classList.add("spin");
  }

  const keyMap = {
    Enter: ["equals"], "=": ["equals"], Escape: ["clear"], Delete: ["clear"], c: ["clear"], C: ["clear"],
    Backspace: ["back"], ".": ["dot"], ",": ["dot"], "%": ["percent"], n: ["sign"], N: ["sign"],
    "+": ["op", "+"], "-": ["op", "-"], "*": ["op", "*"], x: ["op", "*"], X: ["op", "*"], "/": ["op", "/"],
  };
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    let action, value, keyEl;
    if (/^[0-9]$/.test(e.key)) {
      action = "digit"; value = e.key;
      keyEl = keysEl.querySelector(`[data-k="${e.key}"]`);
    } else if (keyMap[e.key]) {
      [action, value] = keyMap[e.key];
      keyEl = action === "op"
        ? keysEl.querySelector(`[data-op="${value}"]`)
        : keysEl.querySelector(`[data-action="${action}"]`);
      if (action === "equals") pressVisual(document.querySelector(".spacebar"));
    } else if (e.key === "s" || e.key === "S") {
      return setSound(!soundOn);
    } else if (e.key === " ") {
      action = "equals"; keyEl = document.querySelector(".spacebar");
    } else return;
    e.preventDefault();
    pressVisual(keyEl);
    run(action, value);
  });

  /* ---------------- 3D tilt + cursor glow ---------------- */
  const glow = $(".cursor-glow");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  window.addEventListener("pointermove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      if (reduce || e.pointerType === "touch") return;
      const r = machine.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      machine.style.setProperty("--ry", `${(dx * 14).toFixed(2)}deg`);
      machine.style.setProperty("--rx", `${(-dy * 10).toFixed(2)}deg`);
    });
  });

  /* ---------------- Decorative dial ticks ---------------- */
  const ticks = document.querySelector(".s-dial .ticks");
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const r1 = i % 5 ? 70 : 62;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 100 + Math.cos(a) * r1); line.setAttribute("y1", 100 + Math.sin(a) * r1);
    line.setAttribute("x2", 100 + Math.cos(a) * 78); line.setAttribute("y2", 100 + Math.sin(a) * 78);
    ticks.appendChild(line);
  }

  /* ---------------- Boot ---------------- */
  setSound(soundOn, true);
  printLine("NO. 190", "");
  printLine("READY", "");
  render();
})();
