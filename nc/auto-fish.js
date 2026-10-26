import { r as w, c as ut } from "./vue-vendor-DNVGoo30.js";
const pe = "pinball_sfx_on";
function ke() {
  try {
    return localStorage.getItem(pe) === "true";
  } catch {
    return !1;
  }
}
const L = w(ke());
function we(y) {
  try {
    localStorage.setItem(pe, y ? "true" : "false");
  } catch {}
}
let wt = null;
const me = Object.create(null);
let Rt = 0;
const Ie = 10;
let Gt = null,
  kt = !1;
function Ce() {
  if (wt) return wt;
  const y = window.AudioContext || window.webkitAudioContext;
  if (!y) return null;
  try {
    wt = new y();
  } catch {
    wt = null;
  }
  return wt;
}
function V(y, g, h = "triangle", f = 0.07, t) {
  const P = wt;
  if (P) {
    if (P.state !== "running") {
      Gt = T => ge(T, y, g, h, f, t);
      return;
    }
    ge(P, y, g, h, f, t);
  }
}
function ge(y, g, h, f, t, P) {
  if (Rt >= Ie) return;
  const T = y.currentTime,
    _ = y.createOscillator(),
    i = y.createGain();
  ((_.type = f),
    _.frequency.setValueAtTime(g, T),
    P && _.frequency.exponentialRampToValueAtTime(Math.max(40, P), T + h),
    i.gain.setValueAtTime(t, T),
    i.gain.exponentialRampToValueAtTime(8e-4, T + h),
    _.connect(i),
    i.connect(y.destination),
    (_.onended = () => {
      Rt = Math.max(0, Rt - 1);
    }),
    (Rt += 1),
    _.start(T),
    _.stop(T + h + 0.02));
}
function at(y, g) {
  const h = performance.now();
  return h - (me[y] || 0) < g ? !1 : ((me[y] = h), !0);
}
function _e() {
  function y(k) {
    if (!L.value) return null;
    const S = Ce();
    if (!S) return null;
    if (S.state === "running") return (k || g(S), S);
    if (S.state === "suspended" && !kt) {
      kt = !0;
      const G = S.resume();
      G && typeof G.then == "function"
        ? G.then(() => {
            ((kt = !1), k || g(S));
          }).catch(() => {
            kt = !1;
          })
        : (kt = !1);
    }
    return S;
  }
  function g(k) {
    const S = Gt;
    if (((Gt = null), typeof S == "function" && k && k.state === "running"))
      try {
        S(k);
      } catch {}
  }
  function h() {
    return L.value;
  }
  function f(k) {
    return (
      (L.value = !!k),
      we(L.value),
      L.value &&
        (y(),
        V(880, 0.07, "triangle", 0.05, 1320),
        V(1320, 0.09, "triangle", 0.04)),
      L.value
    );
  }
  function t(k, S) {
    if (!L.value || !at("place", 60)) return;
    const G = k === "white" ? 560 : 680;
    (V(G, 0.05, "triangle", S ? 0.1 : 0.075, G * 0.45),
      V(170, 0.09, "sine", 0.05));
  }
  function P() {
    L.value &&
      (V(523, 0.09, "triangle", 0.07),
      V(659, 0.1, "triangle", 0.065),
      V(784, 0.16, "triangle", 0.06, 880));
  }
  function T() {
    L.value &&
      (V(330, 0.11, "triangle", 0.06, 260), V(220, 0.16, "sine", 0.05, 180));
  }
  function _() {
    L.value && V(440, 0.14, "sine", 0.05, 400);
  }
  function i() {
    !L.value || !at("msg", 300) || V(1040, 0.05, "sine", 0.035);
  }
  function B() {
    ((Rt = 0), (Gt = null), (kt = !1));
  }
  function D() {
    !L.value ||
      !at("bet", 120) ||
      (V(620, 0.04, "triangle", 0.07, 880), V(1200, 0.05, "sine", 0.04));
  }
  function $() {
    !L.value ||
      !at("tick", 35) ||
      V(1500 + Math.random() * 300, 0.025, "square", 0.03);
  }
  function E() {
    L.value &&
      (V(700, 0.16, "sawtooth", 0.06, 140), V(90, 0.18, "sine", 0.04, 60));
  }
  function R() {
    !L.value ||
      !at("coin", 90) ||
      (V(2100, 0.06, "triangle", 0.05), V(2800, 0.09, "sine", 0.035));
  }
  function N() {
    !L.value || !at("flip", 120) || V(300, 0.09, "triangle", 0.06, 700);
  }
  function F(k) {
    if (!L.value || !at("thump", 250)) return;
    V(70, 0.1, "sine", k ? 0.09 : 0.055, 45);
  }
  function W() {
    !L.value ||
      !at("hit", 80) ||
      (V(240, 0.07, "square", 0.08, 90), V(500, 0.04, "triangle", 0.045, 200));
  }
  function X() {
    L.value &&
      (V(520, 0.28, "sawtooth", 0.07, 60), V(260, 0.22, "square", 0.04, 50));
  }
  function b() {
    !L.value ||
      !at("scratchTick", 45) ||
      V(220 + Math.random() * 500, 0.03, "sawtooth", 0.035, 120);
  }
  function p() {
    L.value &&
      (V(300, 0.06, "sine", 0.07, 160), V(220, 0.09, "sine", 0.06, 120));
  }
  function I() {
    L.value &&
      (V(180, 0.12, "sine", 0.05, 520), V(600, 0.14, "triangle", 0.055, 1100));
  }
  return {
    ensure: y,
    isOn: h,
    setEnabled: f,
    place: t,
    win: P,
    lose: T,
    draw: _,
    msg: i,
    dispose: B,
    bet: D,
    tick: $,
    whoosh: E,
    coin: R,
    flip: N,
    thump: F,
    hit: W,
    crash: X,
    scratchTick: b,
    bite: p,
    splash: I
  };
}
function Le(y = "normal") {
  const g = _e(),
    h = y === "premium";
  let f = null,
    t = null,
    P = null,
    T = !1;
  function _() {
    if (h) return !0;
    const e = new Date(),
      o = e.getHours(),
      n = e.getMinutes();
    return !(o < 7 || (o === 7 && n < 30));
  }
  const i = {
      W: 0,
      H: 0,
      u: 0,
      R: 0,
      cx: 0,
      cy: 0,
      sc: 0,
      t: 0,
      mx: -999,
      my: -999,
      zoom: 1
    },
    B = 0.5,
    D = 10,
    $ = [],
    E = 36,
    R = 10;
  function N() {
    $.length = 0;
    const e = i.W - E - R,
      o = i.H * 0.45;
    ($.push({
      id: "resetView",
      x: e,
      y: o,
      size: E,
      icon: "reset"
    }),
      $.push({
        id: "toggleFishing",
        x: e,
        y: o + E + R,
        size: E,
        icon: "fishing"
      }));
  }
  function F() {
    ((i.zoom = 1),
      (i.cx = i.W * 0.5),
      (i.cy = i.H * 0.48),
      (i.R = Math.min(i.W, i.H) * 0.35),
      (i.sc = 1.2 * Math.min(Math.max(i.u, 0.7), 1.15)),
      bt(),
      yt());
  }
  function W() {
    for (const e of $) {
      if (e.id === "toggleFishing" && !Nt) continue;
      const { x: o, y: n, size: a, icon: r } = e,
        l = a / 2,
        s = o + l,
        m = n + l;
      (t.save(),
        (t.globalAlpha = 0.7),
        (t.fillStyle = "#fff"),
        (t.shadowColor = "rgba(0,0,0,0.2)"),
        (t.shadowBlur = 6),
        (t.shadowOffsetY = 2),
        t.beginPath(),
        t.arc(s, m, l, 0, Math.PI * 2),
        t.fill(),
        t.restore(),
        t.save(),
        (t.globalAlpha = 0.3),
        (t.strokeStyle = "#667eea"),
        (t.lineWidth = 1.5),
        t.beginPath(),
        t.arc(s, m, l, 0, Math.PI * 2),
        t.stroke(),
        t.restore(),
        t.save(),
        (t.strokeStyle = "#667eea"),
        (t.fillStyle = "#667eea"),
        (t.lineWidth = 2),
        (t.lineCap = "round"));
      const c = a * 0.3;
      if (r === "reset")
        (t.beginPath(),
          t.arc(s, m, 2.5, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.moveTo(s - c, m),
          t.lineTo(s - c * 0.45, m),
          t.moveTo(s + c * 0.45, m),
          t.lineTo(s + c, m),
          t.moveTo(s, m - c),
          t.lineTo(s, m - c * 0.45),
          t.moveTo(s, m + c * 0.45),
          t.lineTo(s, m + c),
          t.stroke(),
          (t.globalAlpha = 0.4),
          t.setLineDash([3, 3]),
          t.beginPath(),
          t.arc(s, m, c * 0.85, 0, Math.PI * 2),
          t.stroke(),
          t.setLineDash([]));
      else if (r === "fishing")
        if (S.spotIndex !== -1) {
          ((t.fillStyle = "#e74c3c"), (t.strokeStyle = "#e74c3c"));
          const x = c * 0.55;
          (t.beginPath(), t.rect(s - x, m - x, x * 2, x * 2), t.fill());
        } else
          ((t.strokeStyle = "#667eea"),
            (t.lineWidth = 2.2),
            t.beginPath(),
            t.arc(
              s - c * 0.15,
              m - c * 0.1,
              c * 0.55,
              -Math.PI * 0.6,
              Math.PI * 0.6
            ),
            t.stroke(),
            t.beginPath(),
            t.moveTo(s + c * 0.28, m + c * 0.28),
            t.lineTo(s + c * 0.42, m + c * 0.1),
            t.stroke(),
            t.beginPath(),
            t.moveTo(s - c * 0.15, m - c * 0.65),
            t.lineTo(s - c * 0.15, m - c * 0.1),
            t.stroke(),
            t.beginPath(),
            t.arc(s - c * 0.15, m - c * 0.65, 2, 0, Math.PI * 2),
            t.fill());
      t.restore();
    }
  }
  const X = 50,
    b = [],
    p = [],
    I = [],
    k = [],
    S = {
      id: "user_a",
      name: "我",
      face: "happy",
      spotIndex: -1,
      color: "#667eea"
    },
    G = [];
  function K(e) {
    return (((Math.sin(e * 12345.6789) * 43758.5453) % 1) + 1) % 1;
  }
  const tt = [
      "happy",
      "focused",
      "sleepy",
      "excited",
      "surprised",
      "grin",
      "wink",
      "neutral"
    ],
    gt = ["idle", "scratch", "look_around", "stretch", "yawn"];
  function nt(e, o) {
    return {
      angle: (e / X) * Math.PI * 2 + (K(e) - 0.5) * 0.08,
      occupied: !!o,
      player: o,
      x: 0,
      y: 0,
      appearT: o ? i.t - 1 : -10,
      scale: o ? 1 : 0,
      bp: K(e + 100) * Math.PI * 2,
      face: o ? tt[Math.floor(K(e + 200) * tt.length)] : "neutral",
      nextFaceT: i.t + 5 + K(e + 300) * 10,
      action: "idle",
      actionT: 0,
      actionDur: 0,
      nextActionT: i.t + 3 + K(e + 400) * 8,
      castState: "idle",
      castT: 0,
      nextCastT: i.t + 8 + K(e + 500) * 12
    };
  }
  function yt() {
    b.length = 0;
    for (let e = 0; e < X; e++) {
      const o = Wt(e);
      b.push(nt(e, o));
    }
  }
  function Yt() {
    for (let e = 0; e < X; e++) {
      const o = Wt(e);
      if (b[e]) {
        const n = b[e].occupied;
        ((b[e].player = o),
          (b[e].occupied = !!o),
          !!o !== n &&
            (o
              ? ((b[e].appearT = i.t),
                (b[e].scale = 0),
                (b[e].face = tt[Math.floor(Math.random() * tt.length)]))
              : (b[e].scale *= 0.88)));
      } else b.push(nt(e, o));
    }
  }
  function Wt(e) {
    return S.spotIndex === e ? S : G.find(o => o.spotIndex === e) || null;
  }
  function bt() {
    p.length = 0;
    for (let e = 0; e < 15; e++) {
      const o = Math.random() * Math.PI * 2,
        n = 0.1 + Math.random() * 0.3;
      p.push({
        x: i.cx + Math.cos(o) * i.R * n * 1.2,
        y: i.cy + Math.sin(o) * i.R * n,
        vx: (Math.random() - 0.5) * 0.3 * i.u,
        vy: (Math.random() - 0.5) * 0.15 * i.u,
        sz: (5 + Math.random() * 4) * i.u,
        ph: Math.random() * Math.PI * 2
      });
    }
  }
  function pt() {
    if (!f) return;
    const e = Math.min(window.devicePixelRatio || 1, 2);
    ((f.style.width = ""), (f.style.height = ""));
    const o = f.parentElement;
    if (o) {
      const n = o.querySelector(".fishing-top-bar"),
        a = o.querySelector(".fishing-bottom-bar"),
        r = n ? n.offsetHeight : 0,
        l = a ? a.offsetHeight : 0;
      ((i.W = o.clientWidth), (i.H = o.clientHeight - r - l));
    } else
      ((i.W = f.clientWidth || window.innerWidth),
        (i.H = f.clientHeight || window.innerHeight));
    ((f.width = i.W * e),
      (f.height = i.H * e),
      (f.style.width = i.W + "px"),
      (f.style.height = i.H + "px"),
      t.setTransform(e, 0, 0, e, 0, 0),
      (i.u = Math.min(i.W, i.H) / 700),
      (i.R = Math.min(i.W, i.H) * 0.35 * i.zoom),
      (i.cx = i.W * 0.5),
      (i.cy = i.H * 0.48),
      (i.sc = 1.2 * Math.min(Math.max(i.u, 0.7), 1.15)),
      bt(),
      N());
  }
  function It(e) {
    return (
      i.R *
      (1 +
        0.14 * Math.sin(e * 3 + 0.5) +
        0.09 * Math.sin(e * 5 + 1.2) +
        0.07 * Math.cos(e * 7 + 2.1) +
        0.11 * Math.cos(e * 2 + 0.8) +
        0.05 * Math.sin(e * 9 + 3.7))
    );
  }
  function Mt(e) {
    const o = It(e);
    return [i.cx + Math.cos(e) * o * 1.25, i.cy + Math.sin(e) * o];
  }
  function jt(e, o) {
    const n = (e - i.cx) / 1.25,
      a = o - i.cy;
    return Math.sqrt(n * n + a * a) < It(Math.atan2(a, n)) * 0.88;
  }
  function ot(e, o) {
    o = o || 80;
    const n = [];
    for (let a = 0; a < o; a++) n.push(Mt((a / o) * Math.PI * 2));
    (e.beginPath(), e.moveTo((n[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2));
    for (let a = 0; a < o; a++) {
      const [r, l] = n[a],
        [s, m] = n[(a + 1) % o];
      e.quadraticCurveTo(r, l, (r + s) / 2, (l + m) / 2);
    }
    e.closePath();
  }
  function M(e, o, n, a, r, l) {
    ((l = Math.min(l, a / 2, r / 2)),
      e.beginPath(),
      e.moveTo(o + l, n),
      e.lineTo(o + a - l, n),
      e.arcTo(o + a, n, o + a, n + l, l),
      e.lineTo(o + a, n + r - l),
      e.arcTo(o + a, n + r, o + a - l, n + r, l),
      e.lineTo(o + l, n + r),
      e.arcTo(o, n + r, o, n + r - l, l),
      e.lineTo(o, n + l),
      e.arcTo(o, n, o + l, n, l),
      e.closePath());
  }
  function j(e) {
    return (
      (e = Math.max(0, Math.min(1, e))),
      1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2)
    );
  }
  function C() {
    const { W: e, H: o, cx: n, cy: a, u: r } = i,
      l = document.documentElement.dataset.theme === "dark",
      s = Math.sqrt(e * e + o * o),
      m = t.createRadialGradient(n, a, 0, n, a, s * 0.6);
    if (
      (h
        ? l
          ? (m.addColorStop(0, "#352d25"), m.addColorStop(1, "#28221a"))
          : (m.addColorStop(0, "#f8f3e8"), m.addColorStop(1, "#ece5d5"))
        : l
          ? (m.addColorStop(0, "#2a2d35"), m.addColorStop(1, "#1e2028"))
          : (m.addColorStop(0, "#f5f3f0"), m.addColorStop(1, "#e8e5e0")),
      (t.fillStyle = m),
      t.fillRect(0, 0, e, o),
      r > 0.45)
    ) {
      t.fillStyle = l ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.022)";
      const c = Math.max(30, 45 * r);
      for (let v = c; v < e; v += c)
        for (let x = c; x < o; x += c)
          (t.beginPath(), t.arc(v, x, 0.8, 0, Math.PI * 2), t.fill());
    }
  }
  function J() {
    const { cx: e, cy: o, R: n, u: a, t: r } = i,
      l = document.documentElement.dataset.theme === "dark";
    (t.save(),
      t.translate(4 * a, 5 * a),
      (t.globalAlpha = l ? 0.15 : 0.06),
      (t.fillStyle = "#000"),
      ot(t),
      t.fill(),
      t.restore(),
      (t.fillStyle = h
        ? l
          ? "#3d3520"
          : "#e8d5b0"
        : l
          ? "#2c3e50"
          : "#dce2e8"),
      ot(t),
      t.fill());
    const s = t.createRadialGradient(
      e - n * 0.15,
      o - n * 0.15,
      n * 0.08,
      e,
      o,
      n * 1.25
    );
    (h
      ? (s.addColorStop(
          0,
          l ? "rgba(200,180,100,0.1)" : "rgba(255,230,160,0.15)"
        ),
        s.addColorStop(0.6, "transparent"),
        s.addColorStop(1, l ? "rgba(0,0,0,0.1)" : "rgba(180,150,80,0.05)"))
      : l
        ? (s.addColorStop(0, "rgba(100,160,200,0.08)"),
          s.addColorStop(0.6, "transparent"),
          s.addColorStop(1, "rgba(0,0,0,0.1)"))
        : (s.addColorStop(0, "rgba(255,255,255,0.1)"),
          s.addColorStop(0.6, "transparent"),
          s.addColorStop(1, "rgba(0,0,0,0.03)")),
      (t.fillStyle = s),
      ot(t),
      t.fill(),
      t.save(),
      ot(t),
      t.clip(),
      (t.strokeStyle = h
        ? l
          ? "rgba(200,180,100,0.15)"
          : "rgba(200,170,100,0.2)"
        : l
          ? "rgba(100,140,180,0.12)"
          : "rgba(170,182,192,0.18)"),
      (t.lineWidth = Math.max(0.5, 0.8 * a)));
    const m = Math.max(10, 16 * a);
    for (let c = o - n * 1.4; c < o + n * 1.4; c += m) {
      const v = Math.sin(r * 0.7 + c * 0.03) * 6 * a;
      (t.beginPath(),
        t.moveTo(e - n * 2, c),
        t.quadraticCurveTo(
          e + v,
          c + Math.sin(r * 0.5 + c * 0.05) * 3 * a,
          e + n * 2,
          c + Math.cos(r * 0.3 + c * 0.02) * 2 * a
        ),
        t.stroke());
    }
    (t.restore(),
      (t.strokeStyle = h
        ? l
          ? "#8a7530"
          : "#c9a84c"
        : l
          ? "#1a252f"
          : "#5a5a5a"),
      (t.lineWidth = Math.max(1.5, 2.5 * a)),
      (t.lineJoin = "round"),
      ot(t),
      t.stroke());
  }
  function Q() {
    const { cx: e, cy: o, u: n, t: a } = i;
    [
      {
        a: 0.8,
        d: 0.35,
        s: 1
      },
      {
        a: 2.5,
        d: 0.42,
        s: 0.8
      },
      {
        a: 4.3,
        d: 0.28,
        s: 1.1
      },
      {
        a: 5.6,
        d: 0.38,
        s: 0.9
      },
      {
        a: 6.6,
        d: 0.38,
        s: 0.9
      },
      {
        a: 7.6,
        d: 0.38,
        s: 0.9
      }
    ].forEach((l, s) => {
      const m = It(l.a) * l.d,
        c = e + Math.cos(l.a) * m * 1.35,
        v = o + Math.sin(l.a) * m,
        x = Math.max(6, 14 * l.s * n);
      (t.save(),
        t.translate(c, v),
        t.rotate(l.a + Math.sin(a * 0.5 + s * 2) * 0.04),
        (t.fillStyle = "rgba(0,0,0,0.03)"),
        t.beginPath(),
        t.ellipse(1, 1, x, x * 0.6, 0, 0.3, Math.PI * 2 - 0.3),
        t.lineTo(0, 0),
        t.fill(),
        (t.fillStyle = "#c2ccc2"),
        (t.strokeStyle = "#aab4aa"),
        (t.lineWidth = Math.max(0.5, n)),
        t.beginPath(),
        t.ellipse(0, 0, x, x * 0.6, 0, 0.3, Math.PI * 2 - 0.3),
        t.lineTo(0, 0),
        t.fill(),
        t.stroke(),
        (t.strokeStyle = "#b0bab0"),
        (t.lineWidth = Math.max(0.4, 0.6 * n)),
        t.beginPath(),
        t.moveTo(0, 0),
        t.lineTo(x * 0.65, 0),
        t.stroke(),
        t.restore());
    });
  }
  function it() {
    const { u: e, t: o } = i;
    p.forEach(n => {
      ((n.x += n.vx),
        (n.y += n.vy),
        jt(n.x, n.y) ||
          ((n.vx *= -1),
          (n.vy *= -1),
          (n.x += n.vx * 3),
          (n.y += n.vy * 3),
          jt(n.x, n.y) ||
            ((n.x = i.cx + (n.x - i.cx) * 0.85),
            (n.y = i.cy + (n.y - i.cy) * 0.85))));
      const a = Math.atan2(n.vy, n.vx),
        r = Math.sin(o * 6 + n.ph) * 0.4;
      (t.save(),
        t.translate(n.x, n.y),
        t.rotate(a),
        (t.fillStyle = "#a0a0a0"),
        t.beginPath(),
        t.ellipse(0, 0, n.sz, n.sz * 0.38, 0, 0, Math.PI * 2),
        t.fill(),
        (t.fillStyle = "#b0b0b0"),
        t.beginPath(),
        t.moveTo(-n.sz * 0.6, 0),
        t.lineTo(-n.sz * 1.2, (-3 + r * 6) * e),
        t.lineTo(-n.sz * 1.2, (3 + r * 6) * e),
        t.closePath(),
        t.fill(),
        (t.fillStyle = "#666"),
        t.beginPath(),
        t.arc(n.sz * 0.3, -n.sz * 0.05, Math.max(0.8, 1.2 * e), 0, Math.PI * 2),
        t.fill(),
        t.restore());
    });
  }
  function et() {
    const { u: e } = i;
    for (let o = I.length - 1; o >= 0; o--) {
      const n = I[o];
      if (((n.r += 0.3 * e), (n.a -= 0.005), n.a <= 0)) {
        I.splice(o, 1);
        continue;
      }
      ((t.strokeStyle = `rgba(140,155,170,${Math.min(1, n.a)})`),
        (t.lineWidth = Math.max(0.4, 0.6 * e)),
        t.beginPath(),
        t.arc(n.x, n.y, n.r, 0, Math.PI * 2),
        t.stroke());
    }
  }
  function U(e, o, n, a) {
    if (a < 0.15) return;
    const r = o - 0.3 * a,
      l = 5.5 * a;
    switch (((t.lineCap = "round"), (t.lineJoin = "round"), n)) {
      case "happy":
        ((t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.4 * a)),
          t.beginPath(),
          t.arc(e - l, r, 2 * a, Math.PI + 0.3, -0.3),
          t.stroke(),
          t.beginPath(),
          t.arc(e + l, r, 2 * a, Math.PI + 0.3, -0.3),
          t.stroke(),
          t.beginPath(),
          t.arc(e, r + 1.5 * a, 3.5 * a, 0.15, Math.PI - 0.15),
          t.stroke());
        break;
      case "focused":
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - l, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.3 * a)),
          t.beginPath(),
          t.moveTo(e - l - 2.5 * a, r - 3.5 * a),
          t.lineTo(e - l + 1.5 * a, r - 2 * a),
          t.stroke(),
          t.beginPath(),
          t.moveTo(e + l + 2.5 * a, r - 3.5 * a),
          t.lineTo(e + l - 1.5 * a, r - 2 * a),
          t.stroke(),
          (t.lineWidth = Math.max(0.6, 1.2 * a)),
          t.beginPath(),
          t.moveTo(e - 2.5 * a, r + 3.5 * a),
          t.lineTo(e + 2.5 * a, r + 3.5 * a),
          t.stroke());
        break;
      case "sleepy":
        ((t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.6, 1.2 * a)),
          t.beginPath(),
          t.moveTo(e - l - 1.5 * a, r),
          t.lineTo(e - l + 1.5 * a, r),
          t.stroke(),
          t.beginPath(),
          t.moveTo(e + l - 1.5 * a, r),
          t.lineTo(e + l + 1.5 * a, r),
          t.stroke(),
          t.beginPath(),
          t.arc(e, r + 3.5 * a, 1.5 * a, 0.1, Math.PI - 0.1),
          t.stroke(),
          (t.fillStyle = "#bbb"),
          (t.textAlign = "left"),
          (t.textBaseline = "alphabetic"),
          (t.font = `bold ${Math.max(4, 7 * a)}px sans-serif`),
          t.fillText("z", e + 8 * a, r - 6 * a),
          (t.font = `bold ${Math.max(3, 5 * a)}px sans-serif`),
          t.fillText("z", e + 12 * a, r - 10 * a));
        break;
      case "excited":
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - l, r, 2.2 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l, r, 2.2 * a, 0, Math.PI * 2),
          t.fill(),
          (t.fillStyle = "#fff"),
          t.beginPath(),
          t.arc(e - l + 0.7 * a, r - 0.7 * a, 0.9 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l + 0.7 * a, r - 0.7 * a, 0.9 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.4 * a)),
          t.beginPath(),
          t.arc(e, r + 1 * a, 4 * a, 0.1, Math.PI - 0.1),
          t.stroke());
        break;
      case "surprised":
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - l, r, 2.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l, r, 2.5 * a, 0, Math.PI * 2),
          t.fill(),
          (t.fillStyle = "#fff"),
          t.beginPath(),
          t.arc(e - l + 0.7 * a, r - 0.7 * a, 1 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l + 0.7 * a, r - 0.7 * a, 1 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.6, 1.2 * a)),
          t.beginPath(),
          t.arc(e, r + 3.5 * a, 2 * a, 0, Math.PI * 2),
          t.stroke());
        break;
      case "grin":
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - l, r, 1.7 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l, r, 1.7 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.3 * a)),
          t.beginPath(),
          t.arc(e, r + 1 * a, 4 * a, 0.05, Math.PI - 0.05),
          t.stroke());
        break;
      case "wink":
        ((t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.3 * a)),
          t.beginPath(),
          t.arc(e - l, r, 1.8 * a, -0.3, Math.PI + 0.3),
          t.stroke(),
          (t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e + l, r, 1.7 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.6, 1.2 * a)),
          t.beginPath(),
          t.arc(e + 0.5 * a, r + 2 * a, 3 * a, 0.2, Math.PI - 0.4),
          t.stroke());
        break;
      default:
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - l, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + l, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.6, 1.2 * a)),
          t.beginPath(),
          t.moveTo(e - 2.5 * a, r + 3.5 * a),
          t.lineTo(e + 2.5 * a, r + 3.5 * a),
          t.stroke());
        break;
    }
  }
  function lt(e, o, n, a, r, l, s, m, c, v, x) {
    if (l < 0.02) return;
    const d = i.sc * l,
      A = i.t,
      H = v > 0 && x > 0 ? Math.min(1, (A - v) / x) : 0,
      q = c !== "idle" && H >= 0 && H < 1;
    (t.save(),
      (t.fillStyle = "rgba(0,0,0,0.04)"),
      t.beginPath(),
      t.ellipse(e, o + 24 * d, 8 * d, 3 * d, 0, 0, Math.PI * 2),
      t.fill());
    let Tt = 0,
      Pt = 0;
    (q &&
      c === "stretch" &&
      ((Tt = Math.sin(H * Math.PI) * 0.12),
      (Pt = -Math.sin(H * Math.PI) * 2 * d)),
      t.save(),
      t.translate(e, o + Pt),
      Tt !== 0 && t.rotate(Tt),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1.5, 2.5 * d)),
      (t.lineCap = "round"),
      t.beginPath(),
      t.moveTo(-3 * d, 12 * d),
      t.lineTo(-5 * d, 22 * d),
      t.stroke(),
      t.beginPath(),
      t.moveTo(3 * d, 12 * d),
      t.lineTo(5 * d, 22 * d),
      t.stroke(),
      (t.fillStyle = "#666"),
      t.beginPath(),
      t.ellipse(-5 * d, 23 * d, 3.5 * d, 2 * d, 0, 0, Math.PI * 2),
      t.fill(),
      t.beginPath(),
      t.ellipse(5 * d, 23 * d, 3.5 * d, 2 * d, 0, 0, Math.PI * 2),
      t.fill(),
      (t.fillStyle = s || "#eee"),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1, 1.5 * d)),
      M(t, -6 * d, -1 * d, 12 * d, 14 * d, 2.5 * d),
      t.fill(),
      t.stroke(),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1.5, 2 * d)),
      (t.lineCap = "round"),
      q
        ? Z(c, H, a, d)
        : (t.beginPath(),
          t.moveTo(-a * 4 * d, 3 * d),
          t.lineTo(-a * 8 * d, 1 * d),
          t.stroke(),
          t.beginPath(),
          t.moveTo(a * 4 * d, 4 * d),
          t.lineTo(a * 8 * d, 8 * d),
          t.stroke()));
    const O = Math.max(4, 8 * d);
    let z = -1 * d - O;
    q && c === "yawn" && (z -= Math.sin(H * Math.PI) * 1.5 * d);
    let Ft = 0;
    if (
      (q && c === "look_around" && (Ft = Math.sin(H * Math.PI * 2) * 0.15),
      t.save(),
      t.translate(0, z),
      Ft !== 0 && t.rotate(Ft),
      (t.fillStyle = "rgba(0,0,0,0.025)"),
      t.beginPath(),
      t.arc(0.8, 0.8, O, 0, Math.PI * 2),
      t.fill(),
      (t.fillStyle = "#fafafa"),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1, 1.5 * d)),
      t.beginPath(),
      t.arc(0, 0, O, 0, Math.PI * 2),
      t.fill(),
      t.stroke(),
      d > 0.2 &&
        ((t.strokeStyle = "#bbb"),
        (t.lineWidth = Math.max(0.5, 0.8 * d)),
        (t.lineCap = "round"),
        t.beginPath(),
        t.moveTo(-1.5 * d, -O + 1.5 * d),
        t.quadraticCurveTo(-2.5 * d, -O - 3 * d, 0.5 * d, -O - 1.5 * d),
        t.stroke(),
        t.beginPath(),
        t.moveTo(1.5 * d, -O + 1.5 * d),
        t.quadraticCurveTo(3 * d, -O - 2.5 * d, 1.5 * d, -O - 0.5 * d),
        t.stroke()),
      U(0, 0, n, d),
      t.restore(),
      d > 0.3)
    ) {
      const Ht = z - O - 8 * d,
        xt = Math.max(8, 10 * d);
      ((t.font = `bold ${xt}px "Noto Sans SC",sans-serif`),
        (t.textAlign = "center"),
        (t.textBaseline = "middle"));
      const mt = m && m === S.id ? "我" : rt(m),
        Vt = t.measureText(mt).width,
        ct = 4 * d;
      ((t.fillStyle = "rgba(0,0,0,0.6)"),
        M(t, -Vt / 2 - ct, Ht - xt / 2 - ct / 2, Vt + ct * 2, xt + ct, 4 * d),
        t.fill(),
        (t.fillStyle = "#fff"),
        t.fillText(mt, 0, Ht));
    }
    (t.restore(), t.restore());
  }
  function Z(e, o, n, a) {
    switch (e) {
      case "scratch": {
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.lineTo(-n * 8 * a, 1 * a),
          t.stroke());
        const r = Math.sin(o * Math.PI * 4) * 1.5 * a;
        (t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.quadraticCurveTo(n * 6 * a, -4 * a, n * 3 * a + r, -8 * a),
          t.stroke());
        break;
      }
      case "look_around": {
        const r = Math.sin(o * Math.PI * 2) * 0.5 * a;
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.lineTo(-n * 6 * a + r, -2 * a),
          t.stroke(),
          t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.lineTo(n * 6 * a + r, -2 * a),
          t.stroke());
        break;
      }
      case "stretch": {
        const r = Math.sin(o * Math.PI),
          l = -14 * a * r,
          s = 10 * a * r;
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.quadraticCurveTo(-s, l + 3 * a, -s * 0.8, l),
          t.stroke(),
          t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.quadraticCurveTo(s, l + 4 * a, s * 0.8, l),
          t.stroke());
        break;
      }
      case "yawn": {
        const r = -1 * a - Math.max(4, 8 * a) + 3 * a;
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.lineTo(-n * 8 * a, 1 * a),
          t.stroke());
        const l = Math.sin(o * Math.PI);
        (t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.quadraticCurveTo(
            n * 5 * a,
            r + 4 * a * (1 - l),
            n * 2 * a,
            r + 2 * a * (1 - l)
          ),
          t.stroke());
        break;
      }
      default:
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.lineTo(-n * 8 * a, 1 * a),
          t.stroke(),
          t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.lineTo(n * 8 * a, 8 * a),
          t.stroke());
    }
  }
  function rt(e) {
    const o = G.find(n => n.id === e);
    return o ? o.name : "钓友";
  }
  function ft(e, o, n, a, r, l, s, m) {
    const c = i.sc * s.scale;
    if (c < 0.05) return;
    const { u: v, t: x } = i,
      d = e - r * 8 * c,
      A = o + 3 * c;
    let H = 1,
      q = 0;
    if (s.castState === "reeling") {
      const ae = Math.min(1, (x - s.castT) / 1.5),
        At = 1 - Math.pow(1 - ae, 3);
      ((H = 1 - At * 0.7), (q = -At * 0.6));
    } else if (s.castState === "casting") {
      const ae = Math.min(1, (x - s.castT) / 1),
        At = 1 - Math.pow(1 - ae, 3);
      ((H = 0.3 + At * 0.7), (q = (1 - At) * 0.3));
    }
    const Tt = n - r * 90 * v * H,
      Pt = a - 6 * v,
      O = Tt,
      z = Pt + Math.sin(q) * 30 * v,
      Ft = (d + O) * 0.5,
      Ht = (A + z) * 0.5 - 12 * v;
    ((t.strokeStyle = "#666"),
      (t.lineWidth = Math.max(2, 3 * c)),
      (t.lineCap = "round"),
      t.beginPath(),
      t.moveTo(d, A),
      t.lineTo(d + (O - d) * 0.1, A + (z - A) * 0.1),
      t.stroke(),
      (t.strokeStyle = "#777"),
      (t.lineWidth = Math.max(1, 2 * c)),
      t.beginPath(),
      t.moveTo(d, A),
      t.quadraticCurveTo(Ft, Ht, O, z),
      t.stroke());
    const xt = 30 * v * H,
      st = Math.sin(x * 1.2 + m * 1.7) * 2 * v,
      mt = z + xt + Math.sin(x * 2 + m * 1.5) * 1.5 * v;
    ((t.strokeStyle = "#999"),
      (t.lineWidth = Math.max(0.5, 0.8 * c)),
      t.beginPath(),
      t.moveTo(O, z),
      t.quadraticCurveTo(O + st * 0.3, z + xt * 0.5, O + st, mt),
      t.stroke());
    const Vt = Math.max(1.5, 2 * c);
    ((t.strokeStyle = "#aaa"),
      (t.lineWidth = Math.max(0.3, 0.5 * c)),
      t.beginPath(),
      t.moveTo(O + st, mt),
      t.lineTo(O + st, mt + 6 * v),
      t.stroke());
    const ct = mt + 6 * v;
    ((t.fillStyle = "#ccc"),
      (t.strokeStyle = "#999"),
      (t.lineWidth = Math.max(0.4, 0.6 * c)),
      t.beginPath(),
      t.arc(O + st, ct, Vt, 0, Math.PI * 2),
      t.fill(),
      t.stroke(),
      (t.fillStyle = "rgba(255,255,255,0.45)"),
      t.beginPath(),
      t.arc(O + st - 0.3 * c, ct - 0.4 * c, Vt * 0.35, 0, Math.PI * 2),
      t.fill(),
      s.castState === "idle" &&
        Math.random() < 0.008 &&
        I.push({
          x: O + st,
          y: ct,
          r: 1 * v,
          a: 0.18
        }));
  }
  function vt(e, o, n) {
    const { mx: a, my: r, u: l, t: s } = i,
      m = Math.sqrt((a - e) ** 2 + (r - o) ** 2) < Math.max(22, 16 * l),
      c = m ? 0.9 : 0.5 + Math.sin(s * 2 + n * 0.7) * 0.15,
      v = Math.max(6, 8 * l),
      x = m ? v * 1.3 : v;
    ((t.fillStyle = `rgba(150,150,150,${c * 0.06})`),
      t.beginPath(),
      t.arc(e, o, x + 3 * l, 0, Math.PI * 2),
      t.fill(),
      (t.strokeStyle = `rgba(130,130,130,${c * 0.45})`),
      (t.lineWidth = Math.max(1, 1.5 * l)),
      t.setLineDash([Math.max(3, 4 * l), Math.max(2, 3 * l)]),
      t.beginPath(),
      t.arc(e, o, x, 0, Math.PI * 2),
      t.stroke(),
      t.setLineDash([]),
      (t.fillStyle = `rgba(140,140,140,${c * 0.5})`),
      t.beginPath(),
      t.arc(e, o, Math.max(2, 2.5 * l), 0, Math.PI * 2),
      t.fill(),
      m &&
        S.spotIndex === -1 &&
        ((t.strokeStyle = "rgba(102, 126, 234, 0.4)"),
        (t.lineWidth = 2),
        t.beginPath(),
        t.arc(e, o, x + 5 * l, 0, Math.PI * 2),
        t.stroke()));
  }
  function ht(e, o, n, a, r) {
    const l = i.sc * r,
      s = i.u;
    (t.save(),
      t.translate(e, o),
      (t.fillStyle = "#8B6914"),
      (t.strokeStyle = "#6B4F12"),
      (t.lineWidth = Math.max(1, 1.5 * s)),
      (t.lineCap = "round"));
    const m = 12 * l,
      c = 3 * l,
      v = 10 * l;
    (t.beginPath(), t.rect(-m / 2, v, m, c), t.fill(), t.stroke());
    const x = 10 * l;
    (t.beginPath(),
      t.rect(-m / 2, v - x, 2 * l, x),
      t.fill(),
      t.stroke(),
      t.beginPath(),
      t.moveTo(-m / 2 + 1 * l, v + c),
      t.lineTo(-m / 2 - 1 * l, v + c + 6 * l),
      t.moveTo(m / 2 - 1 * l, v + c),
      t.lineTo(m / 2 + 1 * l, v + c + 6 * l),
      t.stroke(),
      t.restore());
  }
  function qt(e, o) {
    const [n, a] = Mt(e.angle),
      r = n - i.cx,
      l = a - i.cy,
      s = Math.sqrt(r * r + l * l) || 1,
      m = r / s,
      c = l / s,
      v = Math.max(10, 18 * i.u),
      x = n + m * v,
      d = a + c * v;
    if (((e.x = x), (e.y = d), e.occupied)) {
      const A = i.t - e.appearT;
      e.scale = A < 0.5 ? j(A / 0.35) : 1;
    } else ((e.scale *= 0.88), e.scale < 0.01 && (e.scale = 0));
    if (e.occupied && e.scale > 0.02)
      try {
        const A = i.t;
        if (A > e.nextFaceT) {
          if (e.castState !== "idle") e.face = "focused";
          else {
            let z;
            do z = tt[Math.floor(Math.random() * tt.length)];
            while (z === e.face);
            e.face = z;
          }
          e.nextFaceT = A + 12 + Math.random() * 25;
        }
        if (
          e.castState === "idle" &&
          e.action === "idle" &&
          A > e.nextActionT
        ) {
          const z = gt[1 + Math.floor(Math.random() * (gt.length - 1))];
          ((e.action = z),
            (e.actionT = A),
            (e.actionDur = 3 + Math.random() * 3));
        }
        if (
          (e.action !== "idle" &&
            A - e.actionT > e.actionDur &&
            ((e.action = "idle"),
            (e.actionT = 0),
            (e.actionDur = 0),
            (e.nextActionT = A + 20 + Math.random() * 50)),
          e.castState === "idle" &&
            A > e.nextCastT &&
            ((e.castState = "reeling"), (e.castT = A), (e.face = "focused")),
          e.castState === "reeling" &&
            A - e.castT > 1.5 &&
            ((e.castState = "casting"), (e.castT = A), (e.face = "excited")),
          e.castState === "casting" && A - e.castT > 1)
        ) {
          ((e.castState = "idle"),
            (e.castT = 0),
            (e.nextCastT = A + 50 + Math.random() * 70),
            (e.face = "happy"),
            (e.nextFaceT = A + 5));
          for (let z = 0; z < 3; z++)
            I.push({
              x: n + (Math.random() - 0.5) * 8 * i.u,
              y: a + (Math.random() - 0.5) * 4 * i.u,
              r: 1 * i.u,
              a: 0.25
            });
        }
        const H = Math.sin(i.t * 1.5 + e.bp) * 1.2 * i.u,
          q = e.player,
          Pt = q && q.id === S.id ? q.color : "#999",
          O = h ? -8 * i.sc * e.scale : 0;
        (h && ht(x, d + H, m, c, e.scale),
          lt(
            x,
            d + H + O,
            e.face,
            m,
            c,
            e.scale,
            Pt,
            q ? q.id : null,
            e.action,
            e.actionT,
            e.actionDur
          ),
          ft(x, d + H, n, a, m, c, e, o));
      } catch {
        ((e.castState = "idle"),
          (e.action = "idle"),
          (e.actionT = 0),
          (e.castT = 0));
      }
    else e.occupied || vt(x, d, o);
  }
  function Xt() {
    const { W: e, u: o } = i;
    if (o < 0.3) return;
    const n = 5,
      a = Math.max(16, 20 * o),
      r = Math.max(10, 11 * o),
      l = e - 10 * o;
    for (; k.length > n; ) k.shift();
    for (const c of k) ((c.alpha = 1), (c.offsetY = 0));
    const s = k.slice(-n),
      m = s.length * a;
    ((t.font = `${r}px "Noto Sans SC",sans-serif`),
      (t.textBaseline = "middle"));
    for (let c = 0; c < s.length; c++) {
      const v = s[c],
        x = m - (s.length - c) * a + v.offsetY,
        d = v.alpha;
      ((t.textAlign = "right"),
        (t.lineJoin = "round"),
        (t.globalAlpha = d * 0.7),
        (t.strokeStyle = "rgba(0,0,0,0.8)"),
        (t.lineWidth = Math.max(3, 4 * o)),
        t.strokeText(v.text, l, x + a * 0.5),
        (t.lineWidth = Math.max(1.5, 2 * o)),
        t.strokeText(v.text, l, x + a * 0.5),
        (t.globalAlpha = d),
        (t.fillStyle = "#fff"),
        (t.font = `bold ${r}px "Noto Sans SC",sans-serif`),
        t.fillText(v.text, l, x + a * 0.5));
    }
    t.globalAlpha = 1;
  }
  function St() {
    const e = b.filter(n => n.occupied).length,
      o = S.spotIndex !== -1;
    return {
      occupied: e,
      total: X,
      text: `${e}/${X} 钓点容量`,
      hint: h ? "高级鱼塘 - 全天钓鱼·好鱼爆率x3" : "钓鱼时间段7:30~24:00",
      userName: S.name,
      isFishing: o,
      pondType: y
    };
  }
  function Ot() {
    if (S.spotIndex !== -1) {
      const e = b[S.spotIndex];
      return (
        e && ((e.occupied = !1), (e.player = null), (e.scale *= 0.88)),
        (S.spotIndex = -1),
        !1
      );
    } else {
      if (!_()) return "time_restricted";
      const e = b.findIndex(n => !n.occupied);
      if (e === -1) return null;
      const o = b[e];
      ((S.spotIndex = e),
        (o.occupied = !0),
        (o.player = S),
        (o.appearT = i.t),
        (o.scale = 0));
      for (let n = 0; n < 3; n++)
        I.push({
          x: o.x + (Math.random() - 0.5) * 10 * u,
          y: o.y + (Math.random() - 0.5) * 10 * u,
          r: 1 * u,
          a: 0.3
        });
      return (g.ensure(), g.whoosh(), g.splash(), !0);
    }
  }
  function Et(e, o) {
    if (!Nt) return;
    const { u: n } = i;
    let a = -1,
      r = 1 / 0;
    for (let s = 0; s < b.length; s++) {
      const m = Math.sqrt((e - b[s].x) ** 2 + (o - b[s].y) ** 2);
      m < r && ((r = m), (a = s));
    }
    const l = Math.max(22, 16 * n);
    if (a >= 0 && r < l) {
      const s = b[a];
      if (s.occupied)
        (s.player && s.player.id === S.id) ||
          (s.player && Qt && Qt(s.player.id, s.player.name));
      else {
        if (!_()) return;
        const m = a;
        if (S.spotIndex !== -1) {
          const c = b[S.spotIndex];
          ((c.occupied = !1), (c.player = null), (c.scale *= 0.88));
        }
        ((S.spotIndex = m),
          (s.occupied = !0),
          (s.player = S),
          (s.appearT = i.t),
          (s.scale = 0));
        for (let c = 0; c < 3; c++)
          I.push({
            x: s.x + (Math.random() - 0.5) * 10 * n,
            y: s.y + (Math.random() - 0.5) * 10 * n,
            r: 1 * n,
            a: 0.3
          });
        (Kt &&
          Kt(
            h
              ? "/moyu/fishing/premium/switch-spot"
              : "/moyu/fishing/switch-spot",
            {
              method: "POST",
              auth: !0,
              loading: !1,
              body: {
                spotIndex: m
              }
            }
          ).catch(v => {
            Jt && Jt("切换钓点失败：" + (v.message || "网络异常"));
          }),
          ee && ee());
      }
    }
  }
  function Lt() {
    t &&
      ((i.t += 0.016),
      t.clearRect(0, 0, i.W, i.H),
      C(),
      J(),
      t.save(),
      ot(t),
      t.clip(),
      it(),
      et(),
      t.restore(),
      Q(),
      b
        .map((e, o) => ({
          s: e,
          i: o
        }))
        .sort((e, o) => Mt(e.s.angle)[1] - Mt(o.s.angle)[1])
        .forEach(({ s: e, i: o }) => qt(e, o)),
      Xt(),
      W(),
      (P = requestAnimationFrame(Lt)));
  }
  const Y = new Map();
  let Ct = 0,
    $t = 0,
    zt = 0,
    Ut = 0,
    Zt = 0;
  const Me = 6;
  let oe = 0,
    ie = 0,
    le = 0,
    re = 0,
    dt = !1,
    _t = !1,
    se = 0,
    ce = 0;
  function ue(e) {
    (e.preventDefault(), e.stopPropagation());
    const o = f.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top;
    if (
      (Y.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      }),
      Y.size === 1)
    )
      for (const r of $) {
        const l = r.size / 2,
          s = r.x + l,
          m = r.y + l;
        if (Math.sqrt((n - s) ** 2 + (a - m) ** 2) <= l) {
          r.id === "resetView" ? F() : r.id === "toggleFishing" && te && te();
          return;
        }
      }
    if (Y.size === 2) {
      ((dt = !1), (_t = !0));
      const r = [...Y.values()];
      ((Ct = Math.hypot(r[1].x - r[0].x, r[1].y - r[0].y)),
        ($t = (r[0].x + r[1].x) / 2 - o.left),
        (zt = (r[0].y + r[1].y) / 2 - o.top),
        (Ut = ($t - i.cx) / i.R),
        (Zt = (zt - i.cy) / i.R));
    } else
      Y.size === 1 &&
        ((oe = n),
        (ie = a),
        (le = i.cx),
        (re = i.cy),
        (se = n),
        (ce = a),
        (dt = !1),
        (_t = !1));
  }
  function fe(e, o, n, a, r) {
    i.zoom = Math.max(B, Math.min(D, r));
    const l = Math.min(i.W, i.H) * 0.35 * i.zoom;
    ((i.cx = e - n * l),
      (i.cy = o - a * l),
      (i.R = l),
      (i.sc = 1.2 * Math.min(Math.max(i.u, 0.7), 1.15)),
      bt(),
      yt());
  }
  function he(e) {
    e.preventDefault();
    const o = f.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top,
      r = (n - i.cx) / i.R,
      l = (a - i.cy) / i.R,
      s = e.deltaY > 0 ? -0.1 : 0.1;
    fe(n, a, r, l, i.zoom + s);
  }
  function de(e) {
    if (Y.has(e.pointerId) && Y.size === 2) {
      Y.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      });
      const l = [...Y.values()],
        s = Math.hypot(l[1].x - l[0].x, l[1].y - l[0].y);
      if (Ct > 0) {
        const m = s / Ct,
          c = i.zoom * m;
        (fe($t, zt, Ut, Zt, c), (Ct = s));
        const v = Math.min(i.W, i.H) * 0.35 * i.zoom;
        ((Ut = ($t - i.cx) / v), (Zt = (zt - i.cy) / v));
      }
      return;
    }
    const o = f.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top;
    if (((i.mx = n), (i.my = a), Y.size === 1 && Y.has(e.pointerId))) {
      const l = n - oe,
        s = a - ie;
      if (
        (!dt &&
          Math.sqrt(l * l + s * s) > Me &&
          ((dt = !0), (_t = !0), (f.style.cursor = "grabbing")),
        dt)
      ) {
        ((i.cx = le + l), (i.cy = re + s), bt(), yt());
        return;
      }
    }
    let r = !1;
    for (const l of $) {
      if (l.id === "toggleFishing" && !Nt) continue;
      const s = l.size / 2,
        m = l.x + s,
        c = l.y + s;
      if (Math.sqrt((n - m) ** 2 + (a - c) ** 2) <= s) {
        r = !0;
        break;
      }
    }
    if (!r) {
      const l = Math.max(22, 16 * i.u);
      for (const s of b)
        if (Math.sqrt((n - s.x) ** 2 + (a - s.y) ** 2) < l) {
          r = !0;
          break;
        }
    }
    f.style.cursor = r ? "pointer" : "default";
  }
  function Dt(e) {
    (Y.size === 1 && Y.has(e.pointerId) && !_t && Et(se, ce),
      dt && (f.style.cursor = "default"),
      Y.delete(e.pointerId),
      (dt = !1),
      (_t = !1),
      Y.size < 2 && (Ct = 0));
  }
  let Kt = null,
    Jt = null,
    Qt = null,
    te = null,
    ee = null,
    Nt = !1;
  function ve(e, o = {}) {
    T ||
      ((Kt = o.apiRequest || null),
      (Jt = o.onMessage || null),
      (Qt = o.onOtherPlayerTap || null),
      (te = o.onFishingToggle || null),
      (ee = o.onSpotClick || null),
      (f = e),
      (t = f.getContext("2d")),
      yt(),
      pt(),
      f.addEventListener("pointerdown", ue),
      f.addEventListener("pointermove", de),
      f.addEventListener("pointerup", Dt),
      f.addEventListener("pointercancel", Dt),
      f.addEventListener("wheel", he, {
        passive: !1
      }),
      window.addEventListener("resize", pt),
      Lt(),
      (T = !0));
  }
  function Se() {
    T &&
      (P && (cancelAnimationFrame(P), (P = null)),
      f &&
        (f.removeEventListener("pointerdown", ue),
        f.removeEventListener("pointermove", de),
        f.removeEventListener("pointerup", Dt),
        f.removeEventListener("pointercancel", Dt),
        f.removeEventListener("wheel", he)),
      window.removeEventListener("resize", pt),
      (b.length = 0),
      (p.length = 0),
      (I.length = 0),
      (k.length = 0),
      (S.spotIndex = -1),
      (f = null),
      (t = null),
      (T = !1));
  }
  function Te(e, o) {
    ((G.length = 0),
      o !== void 0 && o >= 0 ? (S.spotIndex = o) : (S.spotIndex = -1));
    for (const n of e) {
      if (n.isCurrentUser) {
        ((S.id = n.id), (S.spotIndex = n.spotIndex), (S.name = n.name));
        continue;
      }
      G.push({
        id: n.id,
        name: n.name,
        face: n.face || "focused",
        spotIndex: n.spotIndex,
        color: n.color || "#999"
      });
    }
    T && Yt();
  }
  function Pe(e) {
    if (!e || e.length === 0) return;
    const o = i.t;
    for (const n of e)
      k.some(r => r.text === n.text && n.time && r.msgTime === n.time) ||
        k.push({
          text: n.text,
          born: o,
          msgTime: n.time || 0,
          alpha: 0,
          offsetY: 0
        });
    k.length > 30 && k.splice(0, k.length - 30);
  }
  function xe(e) {
    Nt = e;
  }
  return {
    init: ve,
    destroy: Se,
    getStatus: St,
    toggleFishing: Ot,
    updatePlayers: Te,
    updateMessages: Pe,
    setActive: xe,
    refreshSize: pt
  };
}
function Bt(y) {
  if (y == null) return "0";
  const g = Number(y);
  if (isNaN(g)) return "0";
  const h = Math.abs(g);
  let f;
  if (h >= 1e8) {
    const t = h / 1e8;
    f = t % 1 === 0 ? t + "亿" : t.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const t = h / 1e4;
    f = t % 1 === 0 ? t + "万" : t.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else f = h.toLocaleString("zh-CN");
  return g < 0 ? "-" + f : f;
}
function $e({ apiRequest: y, addMessage: g, money: h, userLevel: f }) {
  const t = w(!1),
    P = w(!1),
    T = w(null),
    _ = w(!1),
    i = w(""),
    B = w([]),
    D = w([]),
    $ = w({}),
    E = w({}),
    R = w(0),
    N = w({
      name: "新手渔夫",
      stars: 1
    }),
    F = w(!1),
    W = 0.004,
    X = 200,
    b = 39417,
    p = {
      rod: 120,
      float: 100,
      bait: 150,
      net: 130,
      bucket: 500
    },
    I = 16.5 * 3600;
  function k(M) {
    return Math.max(40, 60 - (M || 0));
  }
  function S(M) {
    return I / k(M);
  }
  function G(M, j, C) {
    const J = Math.floor((j || 0) * (1 + C * 0.1)),
      Q = p[M] || 100;
    return Math.floor((J * Q) / 100);
  }
  function K(M) {
    return 1 + M * W;
  }
  async function tt() {
    try {
      const M = await y("/moyu/fishing/config", {
        auth: !0
      });
      M
        ? ((B.value = M.gearTypes || []), (D.value = M.upgradeConfigs || []))
        : console.warn("[渔具] 配置接口返回空:", M);
    } catch (M) {
      (console.error("[渔具] 加载钓鱼配置失败:", M),
        g("加载钓鱼配置失败，请重试"));
    }
  }
  async function gt(M) {
    try {
      const j = M ? `/moyu/fishing/gear?userId=${M}` : "/moyu/fishing/gear",
        C = await y(j, {
          auth: !0
        });
      C
        ? (($.value = C.gearLevels || {}),
          (E.value = C.stats || {}),
          (R.value = C.totalScore || 0),
          (N.value = C.scoreLevel || "新手渔夫"))
        : console.warn("[渔具] 渔具接口返回空:", C);
    } catch (j) {
      console.error("[渔具] 加载渔具数据失败:", j);
    }
  }
  const nt = ut(() => {
    if (!T.value) return null;
    const M = T.value,
      j = $.value[M] || 0,
      C = B.value.find(ht => ht.code === M);
    if (!C) return null;
    const J = E.value[M] || C.baseValue || 0,
      it = j >= 20,
      et = j + 1,
      U = D.value.find(ht => ht.level === j),
      lt = it ? null : Math.floor((C.baseValue || 0) * (1 + et * 0.1)),
      Z = U ? Math.floor(U.baseCost * (C.costMultiplier || 1)) : null,
      rt = U ? U.successRate : null,
      ft = yt(M, j, C),
      vt = Yt(ft, Z, rt);
    return {
      type: M,
      level: j,
      config: C,
      currentStat: J,
      nextStat: lt,
      upgradeCost: Z,
      upgradeCostFormatted: Bt(Z),
      successRate: rt,
      isMaxLevel: it,
      canUpgrade: !it && Z !== null,
      ...ft,
      ...(vt || {})
    };
  });
  function yt(M, j, C) {
    const J = C.baseValue || 0,
      Q = G(M, J, j),
      et = G(M, J, j + 1) - Q,
      U = R.value || 0,
      lt = U + et,
      Z = K(U),
      rt = K(lt),
      ft = Z > 0 ? (rt / Z - 1) * 100 : 0,
      vt = $.value.bait || 0,
      ht = M === "bait" ? j + 1 : vt,
      qt = S(vt),
      Xt = S(ht),
      St = qt * Z,
      Ot = Xt * rt,
      Et = Ot - St,
      Lt = et === 0;
    return {
      priceBonusCurrentText: Z.toFixed(2) + "x",
      priceBonusNextText: rt.toFixed(2) + "x",
      priceGainPercent: ft,
      priceGainText: "+" + ft.toFixed(1) + "%",
      scoreDelta: et,
      noScoreGain: Lt,
      dailyNow: St,
      dailyNext: Ot,
      dailyGain: Et,
      dailyGainPercent: St > 0 ? (Et / St) * 100 : 0,
      isBait: M === "bait"
    };
  }
  function Yt(M, j, C) {
    if (!M || !j || M.dailyGain <= 0) return null;
    const J = C && C > 0 ? C : 1,
      Q = j / J,
      it = f && f.value ? f.value : 1,
      et = b * X * Math.sqrt(it),
      U = M.dailyGain * et;
    if (U <= 0) return null;
    const lt = Q / U;
    return {
      expectCost: Math.floor(Q),
      expectCostFormatted: Bt(Math.floor(Q)),
      paybackDays: lt,
      paybackText: Wt(lt)
    };
  }
  function Wt(M) {
    return !isFinite(M) || M <= 0
      ? ""
      : M < 1
        ? "当天回本"
        : M < 30
          ? "约 " + Math.round(M) + " 天回本"
          : M < 365
            ? "约 " + Math.round(M / 30) + " 个月回本"
            : "长期收益";
  }
  const bt = ut(() => (1 + (R.value || 0) * W).toFixed(2) + "x");
  async function pt({ userId: M, ownerName: j } = {}) {
    ((_.value = !!M),
      (i.value = j || ""),
      await tt(),
      await gt(M),
      (t.value = !0));
  }
  function It() {
    ((t.value = !1), (T.value = null), (P.value = !1));
  }
  function Mt(M) {
    ((T.value = M), (P.value = !0));
  }
  function jt() {
    ((P.value = !1), (T.value = null));
  }
  async function ot() {
    if (!nt.value || F.value) return;
    const { type: M, isMaxLevel: j } = nt.value;
    if (j) {
      g("⚠️ 已达到最大强化等级");
      return;
    }
    F.value = !0;
    try {
      const C = await y("/moyu/fishing/gear/upgrade", {
        method: "POST",
        body: {
          gearCode: M
        },
        auth: !0
      });
      C
        ? (C.cost && (h.value -= C.cost),
          C.success
            ? g(`🎉 ${nt.value.config.name}强化成功！+${C.newLevel}`)
            : g(`😢 ${nt.value.config.name}强化失败，消耗了${Bt(C.cost)}金币`),
          await gt())
        : g("强化失败");
    } catch (C) {
      (console.error("强化失败:", C), g(C.message || "强化失败，请重试"));
    } finally {
      F.value = !1;
    }
  }
  return {
    showGearModal: t,
    showDetailModal: P,
    selectedGear: T,
    viewOnly: _,
    gearOwnerName: i,
    gearLevels: $,
    isUpgrading: F,
    gearTypes: B,
    upgradeConfigs: D,
    gearStats: E,
    totalScore: R,
    scoreLevel: N,
    selectedGearInfo: nt,
    gearPriceBonusText: bt,
    openGearModal: pt,
    closeGearModal: It,
    selectGear: Mt,
    closeDetailModal: jt,
    upgradeGear: ot,
    loadConfig: tt,
    loadUserData: gt,
    formatGold: Bt
  };
}
function ne(y) {
  if (y == null) return "0";
  const g = Number(y);
  if (isNaN(g)) return "0";
  const h = Math.abs(g);
  let f;
  if (h >= 1e8) {
    const t = h / 1e8;
    f = t % 1 === 0 ? t + "亿" : t.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const t = h / 1e4;
    f = t % 1 === 0 ? t + "万" : t.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else f = h.toLocaleString("zh-CN");
  return g < 0 ? "-" + f : f;
}
const Fe = {
  垃圾: "#795548",
  普通: "#888",
  优秀: "#4caf50",
  稀有: "#2196f3",
  史诗: "#9c27b0",
  传说: "#ff9800"
};
function ze({ apiRequest: y, addMessage: g, money: h }) {
  const f = w(!1),
    t = w([]),
    P = w(10),
    T = ut(() => t.value.length >= P.value),
    _ = ut(() => t.value.reduce((F, W) => F + (W.catchValue || 0), 0));
  let v = !1;
  const refresh = I => {
      I && ((t.value = I.fishList || []), (P.value = I.capacity || 10));
    },
    autoFish = async I => {
      if (v || !I) return;
      const F = Array.isArray(I.fishList) ? I.fishList : [],
        A = Number(I.count ?? F.length),
        k = F[0];
      if (!k && A <= 10) return;
      v = !0;
      let X = !1;
      try {
        if (k && (k.fishRarity === "传说" || k.fishName === "星月内裤")) {
          console.log("[钓鱼] 开始收藏标记鱼获");
          try {
            const U = await y("/moyu/fishing/bucket/move-to-bag", {
              method: "POST",
              body: {
                bucketId: k.id
              },
              auth: !0,
              loading: !1
            });
            (console.log("[钓鱼] 储存结果:", U), (X = !!U));
          } catch (U) {
            console.log("[钓鱼] 储存请求失败:", U);
          }
        }
        if (A > 10) {
          console.log("[钓鱼] 鱼获数量超过 10，开始卖鱼");
          try {
            const U = await y("/moyu/fishing/bucket/sell-all", {
              method: "POST",
              auth: !0,
              loading: !1
            });
            (console.log("[钓鱼] 卖鱼结果:", U),
              U && U.soldValue && (h.value += U.soldValue),
              (X = !!U || X));
          } catch (U) {
            console.log("[钓鱼] 卖鱼请求失败:", U);
          }
        }
        if (X) {
          const U = await y("/moyu/fishing/bucket", {
            auth: !0,
            loading: !1
          });
          refresh(U);
        }
      } catch (U) {
        console.log("[钓鱼] 自动整理鱼获失败:", U);
      } finally {
        v = !1;
      }
    };
  async function i() {
    try {
      const F = await y("/moyu/fishing/bucket", {
        auth: !0
      });
      (refresh(F), await autoFish(F));
    } catch (F) {
      console.error("加载鱼护数据失败:", F);
    }
  }
  async function B(F) {
    try {
      const W = await y("/moyu/fishing/bucket/sell", {
        method: "POST",
        body: {
          bucketId: F
        },
        auth: !0
      });
      return W
        ? (W.soldValue && (h.value += W.soldValue),
          g(`💰 出售${W.fishName}，获得${ne(W.soldValue)}金币`),
          await i(),
          !0)
        : (g("出售失败"), !1);
    } catch (W) {
      return (console.error("出售失败:", W), g("出售失败，请重试"), !1);
    }
  }
  let D = !1;
  async function $() {
    if (!D) {
      if (t.value.length === 0) {
        g("🎒 鱼护是空的");
        return;
      }
      D = !0;
      try {
        const F = await y("/moyu/fishing/bucket/sell-all", {
          method: "POST",
          auth: !0
        });
        F
          ? (F.soldValue && (h.value += F.soldValue),
            g(`💰 出售所有鱼，获得${ne(F.soldValue)}金币`),
            await i())
          : g("出售失败");
      } catch (F) {
        (console.error("出售失败:", F), g("出售失败，请重试"));
      } finally {
        D = !1;
      }
    }
  }
  async function E(F) {
    try {
      const W = await y("/moyu/fishing/bucket/move-to-bag", {
        method: "POST",
        body: {
          bucketId: F
        },
        auth: !0
      });
      return W
        ? (g(`🎒 ${W.fishName}已放入背包`), await i(), !0)
        : (g("放入背包失败"), !1);
    } catch (W) {
      return (console.error("放入背包失败:", W), g("放入背包失败，请重试"), !1);
    }
  }
  async function R() {
    (await i(), (f.value = !0));
  }
  function N() {
    f.value = !1;
  }
  return {
    showBucketModal: f,
    bucketFish: t,
    bucketCapacity: P,
    isBucketFull: T,
    totalValue: _,
    openBucketModal: R,
    closeBucketModal: N,
    sellFish: B,
    sellAllFish: $,
    moveFishToBag: E,
    loadBucketData: i,
    formatGold: ne,
    RARITY_COLORS: Fe
  };
}
function Ve(y) {
  if (y == null) return "0";
  const g = Number(y);
  if (isNaN(g)) return "0";
  const h = Math.abs(g);
  let f;
  if (h >= 1e8) {
    const t = h / 1e8;
    f = t % 1 === 0 ? t + "亿" : t.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const t = h / 1e4;
    f = t % 1 === 0 ? t + "万" : t.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else f = h.toLocaleString("zh-CN");
  return g < 0 ? "-" + f : f;
}
function Ae(y) {
  if (!y) return "";
  const g = new Date(y),
    h = g.getHours().toString().padStart(2, "0"),
    f = g.getMinutes().toString().padStart(2, "0");
  return `${h}:${f}`;
}
function ye(y) {
  if (!y) return "";
  const g = new Date(y),
    h = (g.getMonth() + 1).toString().padStart(2, "0"),
    f = g.getDate().toString().padStart(2, "0");
  return `${h}-${f}`;
}
const Re = {
  垃圾: "#795548",
  普通: "#888",
  优秀: "#4caf50",
  稀有: "#2196f3",
  史诗: "#9c27b0",
  传说: "#ff9800"
};
function De({ apiRequest: y }) {
  const g = w(!1),
    h = w("today"),
    f = w(null),
    t = w(""),
    P = w([]),
    T = w([]),
    _ = w({
      totalCount: 0,
      totalValue: 0
    }),
    i = w({
      totalCount: 0,
      totalValue: 0
    }),
    B = ut(() => (h.value === "today" ? _.value : i.value)),
    D = ut(() => (h.value === "today" ? P.value : T.value)),
    $ = ut(() => {
      const p = {};
      return (
        T.value.forEach(I => {
          const k = I.catchTime ? I.catchTime.split("T")[0] : I.catchTime;
          k &&
            (p[k] ||
              (p[k] = {
                date: k,
                dateFormatted: ye(new Date(k).getTime()),
                records: [],
                totalValue: 0,
                count: 0
              }),
            p[k].records.push(I),
            (p[k].totalValue += I.catchValue || 0),
            p[k].count++);
        }),
        Object.values(p)
          .sort((I, k) => k.date.localeCompare(I.date))
          .slice(0, 30)
      );
    });
  async function E() {
    try {
      const p = f.value
          ? `/moyu/fishing/player-history?userId=${f.value}&type=today`
          : "/moyu/fishing/history?type=today",
        I = await y(p, {
          auth: !0
        });
      I &&
        ((P.value = I.records || []),
        (_.value = {
          totalCount: I.totalCount || 0,
          totalValue: I.totalValue || 0
        }));
    } catch (p) {
      console.error("加载今日钓鱼数据失败:", p);
    }
  }
  async function R() {
    try {
      const p = f.value
          ? `/moyu/fishing/player-history?userId=${f.value}&type=history`
          : "/moyu/fishing/history?type=history",
        I = await y(p, {
          auth: !0
        });
      I &&
        ((T.value = I.records || []),
        (i.value = {
          totalCount: I.totalCount || 0,
          totalValue: I.totalValue || 0
        }));
    } catch (p) {
      console.error("加载历史钓鱼数据失败:", p);
    }
  }
  async function N() {
    ((f.value = null),
      (t.value = ""),
      (h.value = "today"),
      await E(),
      await R(),
      (g.value = !0));
  }
  async function F(p, I) {
    ((f.value = p),
      (t.value = I || "未知"),
      (h.value = "today"),
      (P.value = []),
      (T.value = []),
      (_.value = {
        totalCount: 0,
        totalValue: 0
      }),
      (i.value = {
        totalCount: 0,
        totalValue: 0
      }),
      (g.value = !0),
      await E(),
      await R());
  }
  function W() {
    ((g.value = !1), (f.value = null), (t.value = ""));
  }
  async function X(p) {
    ((h.value = p),
      p === "today" && P.value.length === 0
        ? await E()
        : p === "history" && T.value.length === 0 && (await R()));
  }
  async function b() {
    h.value === "today" ? await E() : await R();
  }
  return {
    showHistoryModal: g,
    activeTab: h,
    todayRecords: P,
    historyRecords: T,
    todayStats: _,
    historyStats: i,
    currentStats: B,
    currentRecords: D,
    historyGroups: $,
    viewingPlayerId: f,
    viewingPlayerName: t,
    openHistoryModal: N,
    openPlayerHistoryModal: F,
    closeHistoryModal: W,
    switchTab: X,
    loadTodayData: E,
    loadHistoryData: R,
    refreshData: b,
    formatGold: Ve,
    formatTime: Ae,
    formatDate: ye,
    RARITY_COLORS: Re
  };
}
function We(y) {
  if (y == null) return "0";
  const g = Number(y);
  if (isNaN(g)) return "0";
  const h = Math.abs(g);
  let f;
  if (h >= 1e8) {
    const t = h / 1e8;
    f = t % 1 === 0 ? t + "亿" : t.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const t = h / 1e4;
    f = t % 1 === 0 ? t + "万" : t.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else f = h.toLocaleString("zh-CN");
  return g < 0 ? "-" + f : f;
}
function je(y) {
  if (!y) return "";
  const g = new Date(y),
    h = (g.getMonth() + 1).toString().padStart(2, "0"),
    f = g.getDate().toString().padStart(2, "0"),
    t = g.getHours().toString().padStart(2, "0"),
    P = g.getMinutes().toString().padStart(2, "0");
  return `${h}-${f} ${t}:${P}`;
}
function Ne({ apiRequest: y }) {
  const g = w(!1),
    h = w([]),
    f = w(0),
    t = w(!0),
    P = w(!1),
    T = w(0),
    _ = 15;
  async function i(E = !1) {
    if (!P.value) {
      P.value = !0;
      try {
        const R = E ? 0 : T.value,
          N = await y(`/moyu/fishing/fines?offset=${R}&limit=${_}`, {
            auth: !0
          });
        N &&
          (E
            ? (h.value = N.records || [])
            : (h.value = [...h.value, ...(N.records || [])]),
          (f.value = N.total || 0),
          (t.value = N.hasMore !== !1),
          (T.value = h.value.length));
      } catch (R) {
        console.error("加载罚款记录失败:", R);
      } finally {
        P.value = !1;
      }
    }
  }
  async function B() {
    ((T.value = 0),
      (h.value = []),
      (t.value = !0),
      (g.value = !0),
      await i(!0));
  }
  function D() {
    g.value = !1;
  }
  async function $() {
    t.value && !P.value && (await i(!1));
  }
  return {
    showFinesModal: g,
    finesRecords: h,
    finesTotal: f,
    hasMore: t,
    loading: P,
    openFinesModal: B,
    closeFinesModal: D,
    loadMore: $,
    formatGold: We,
    formatTime: je
  };
}
const be = [
    {
      id: 11,
      code: "junk_sock",
      name: "臭袜子",
      emoji: "🧦",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 12,
      code: "junk_suitcase",
      name: "破行李箱",
      emoji: "🧳",
      rarity: "垃圾",
      baseValue: 3
    },
    {
      id: 13,
      code: "junk_tire",
      name: "废旧轮胎",
      emoji: "🛞",
      rarity: "垃圾",
      baseValue: 2
    },
    {
      id: 14,
      code: "junk_branch",
      name: "枯树枝",
      emoji: "🪵",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 15,
      code: "junk_boot",
      name: "破靴子",
      emoji: "🥾",
      rarity: "垃圾",
      baseValue: 2
    },
    {
      id: 16,
      code: "junk_can",
      name: "生锈铁罐",
      emoji: "🥫",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 17,
      code: "junk_bag",
      name: "塑料袋",
      emoji: "🛍️",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 18,
      code: "junk_weed",
      name: "一团海草",
      emoji: "🌿",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 19,
      code: "junk_net",
      name: "破渔网",
      emoji: "🪢",
      rarity: "垃圾",
      baseValue: 2
    },
    {
      id: 20,
      code: "junk_tin",
      name: "烂拖鞋",
      emoji: "🩴",
      rarity: "垃圾",
      baseValue: 1
    },
    {
      id: 21,
      code: "fish_crucian",
      name: "鲫鱼",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 10
    },
    {
      id: 22,
      code: "fish_grass",
      name: "草鱼",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 12
    },
    {
      id: 23,
      code: "fish_silver",
      name: "白条鱼",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 8
    },
    {
      id: 24,
      code: "fish_carp",
      name: "鲤鱼",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 15
    },
    {
      id: 25,
      code: "fish_loach",
      name: "泥鳅",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 6
    },
    {
      id: 26,
      code: "fish_catfish",
      name: "小鲶鱼",
      emoji: "🐟",
      rarity: "普通",
      baseValue: 10
    },
    {
      id: 27,
      code: "fish_bass",
      name: "鲈鱼",
      emoji: "🐟",
      rarity: "优秀",
      baseValue: 30
    },
    {
      id: 28,
      code: "fish_salmon",
      name: "鲑鱼",
      emoji: "🐟",
      rarity: "优秀",
      baseValue: 40
    },
    {
      id: 29,
      code: "fish_crab",
      name: "螃蟹",
      emoji: "🦀",
      rarity: "优秀",
      baseValue: 35
    },
    {
      id: 30,
      code: "fish_shrimp",
      name: "河虾",
      emoji: "🦐",
      rarity: "优秀",
      baseValue: 25
    },
    {
      id: 31,
      code: "fish_eel",
      name: "黄鳝",
      emoji: "🐟",
      rarity: "优秀",
      baseValue: 45
    },
    {
      id: 32,
      code: "fish_goldfish",
      name: "金鱼",
      emoji: "🐟",
      rarity: "稀有",
      baseValue: 80
    },
    {
      id: 33,
      code: "fish_koi",
      name: "锦鲤",
      emoji: "🐟",
      rarity: "稀有",
      baseValue: 100
    },
    {
      id: 34,
      code: "fish_grouper",
      name: "石斑鱼",
      emoji: "🐟",
      rarity: "稀有",
      baseValue: 120
    },
    {
      id: 35,
      code: "fish_seahorse",
      name: "海马",
      emoji: "🐴",
      rarity: "稀有",
      baseValue: 90
    },
    {
      id: 36,
      code: "fish_puffer",
      name: "河豚",
      emoji: "🐡",
      rarity: "稀有",
      baseValue: 110
    },
    {
      id: 37,
      code: "fish_octopus",
      name: "章鱼",
      emoji: "🐙",
      rarity: "稀有",
      baseValue: 95
    },
    {
      id: 38,
      code: "fish_sturgeon",
      name: "中华鲟",
      emoji: "🐟",
      rarity: "史诗",
      baseValue: 300
    },
    {
      id: 39,
      code: "fish_shark",
      name: "小鲨鱼",
      emoji: "🦈",
      rarity: "史诗",
      baseValue: 350
    },
    {
      id: 40,
      code: "fish_dolphin",
      name: "海豚",
      emoji: "🐬",
      rarity: "史诗",
      baseValue: 400
    },
    {
      id: 41,
      code: "fish_tuna",
      name: "金枪鱼",
      emoji: "🐟",
      rarity: "史诗",
      baseValue: 280
    },
    {
      id: 42,
      code: "fish_whale",
      name: "小鲸鱼",
      emoji: "🐳",
      rarity: "史诗",
      baseValue: 500
    },
    {
      id: 48,
      code: "fish_nk",
      name: "星月内裤",
      emoji: "🩳",
      rarity: "史诗",
      baseValue: 500
    },
    {
      id: 43,
      code: "fish_dragon",
      name: "金龙鱼",
      emoji: "🐉",
      rarity: "传说",
      baseValue: 1e3
    },
    {
      id: 44,
      code: "fish_phoenix",
      name: "凤凰鱼",
      emoji: "🔥",
      rarity: "传说",
      baseValue: 1200
    },
    {
      id: 45,
      code: "fish_kun",
      name: "深海巨鲲",
      emoji: "🐋",
      rarity: "传说",
      baseValue: 1500
    },
    {
      id: 46,
      code: "fish_nine_koi",
      name: "九尾锦鲤",
      emoji: "🎏",
      rarity: "传说",
      baseValue: 2e3
    },
    {
      id: 47,
      code: "fish_ancient",
      name: "太古神龙",
      emoji: "🐲",
      rarity: "传说",
      baseValue: 5e3
    }
  ],
  Oe = {
    垃圾: "#795548",
    普通: "#9e9e9e",
    优秀: "#4caf50",
    稀有: "#2196f3",
    史诗: "#9c27b0",
    传说: "#ff9800"
  };
function He({ currentUser: y, apiRequest: g, addMessage: h }) {
  const f = w(!1),
    t = w({
      enabled: 0,
      keepFishIds: ""
    }),
    P = w({
      totalKept: 0,
      totalSold: 0,
      totalEarned: 0
    }),
    T = w(!1),
    _ = w([]),
    i = w(!1),
    B = ["垃圾", "普通", "优秀", "稀有", "史诗", "传说"],
    D = ut(() => {
      const b = {};
      for (const p of be)
        (b[p.rarity] || (b[p.rarity] = []), b[p.rarity].push(p));
      return B.filter(p => b[p]).map(p => ({
        rarity: p,
        fish: b[p]
      }));
    }),
    $ = async () => {
      ((f.value = !0), await R());
    },
    E = () => {
      f.value = !1;
    },
    R = async () => {
      i.value = !0;
      try {
        const b = await g("/moyu/auto-fish/config", {
          auth: !0
        });
        b &&
          ((t.value = {
            enabled: b.enabled || 0,
            keepFishIds: b.keepFishIds || ""
          }),
          (P.value = {
            totalKept: b.totalKept || 0,
            totalSold: b.totalSold || 0,
            totalEarned: b.totalEarned || 0
          }),
          (_.value = b.keepFishIds
            ? b.keepFishIds
                .split(",")
                .map(p => parseInt(p.trim()))
                .filter(p => !isNaN(p))
            : []));
      } catch {
      } finally {
        i.value = !1;
      }
    };
  return {
    showAutoFishModal: f,
    autoFishConfig: t,
    autoFishStats: P,
    autoFishSaving: T,
    autoFishLoading: i,
    keepFishIds: _,
    FISH_LIST: be,
    fishGroups: D,
    RARITY_COLORS: Oe,
    openAutoFishModal: $,
    closeAutoFishModal: E,
    loadAutoFishConfig: R,
    saveAutoFishConfig: async () => {
      var b;
      if (!((b = y.value) != null && b.isMember)) {
        typeof window < "u" && window.__openVipModal && window.__openVipModal();
        return;
      }
      T.value = !0;
      try {
        (await g("/moyu/auto-fish/config", {
          method: "POST",
          auth: !0,
          body: {
            keepFishIds: _.value.join(","),
            enabled: t.value.enabled
          }
        }),
          h("自动卖鱼配置已保存"));
      } catch (p) {
        h(p.message || "保存失败");
      } finally {
        T.value = !1;
      }
    },
    toggleAutoFish: async () => {
      var p;
      if (!((p = y.value) != null && p.isMember)) {
        typeof window < "u" && window.__openVipModal && window.__openVipModal();
        return;
      }
      const b = t.value.enabled !== 1;
      try {
        (await g(b ? "/moyu/auto-fish/start" : "/moyu/auto-fish/stop", {
          method: "POST",
          auth: !0
        }),
          (t.value.enabled = b ? 1 : 0),
          h(b ? "自动卖鱼已开启" : "自动卖鱼已关闭"));
      } catch (I) {
        h(I.message || "操作失败");
      }
    },
    toggleFish: b => {
      const p = _.value.indexOf(b);
      p === -1 ? _.value.push(b) : _.value.splice(p, 1);
    },
    isFishSelected: b => _.value.includes(b)
  };
}
export {
  $e as a,
  ze as b,
  _e as c,
  De as d,
  Ne as e,
  He as f,
  Le as g,
  we as p,
  L as s
};
