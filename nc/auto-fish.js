import { c as it, r as x } from "./vue-vendor-DNVGoo30.js";
function Pe(M = "normal") {
  const m = M === "premium";
  let h = null,
    t = null,
    y = null,
    w = !1;
  function _() {
    if (m) return !0;
    const e = new Date(),
      o = e.getHours(),
      n = e.getMinutes();
    return !(o < 7 || (o === 7 && n < 30));
  }
  const l = {
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
    j = 0.5,
    B = 10,
    L = [],
    D = 36,
    $ = 10;
  function R() {
    L.length = 0;
    const e = l.W - D - $,
      o = l.H * 0.45;
    (L.push({
      id: "resetView",
      x: e,
      y: o,
      size: D,
      icon: "reset"
    }),
      L.push({
        id: "toggleFishing",
        x: e,
        y: o + D + $,
        size: D,
        icon: "fishing"
      }));
  }
  function H() {
    ((l.zoom = 1),
      (l.cx = l.W * 0.5),
      (l.cy = l.H * 0.48),
      (l.R = Math.min(l.W, l.H) * 0.35),
      (l.sc = 1.2 * Math.min(Math.max(l.u, 0.7), 1.15)),
      ft(),
      q());
  }
  function I() {
    for (const e of L) {
      if (e.id === "toggleFishing" && !Rt) continue;
      const { x: o, y: n, size: a, icon: r } = e,
        i = a / 2,
        s = o + i,
        d = n + i;
      (t.save(),
        (t.globalAlpha = 0.7),
        (t.fillStyle = "#fff"),
        (t.shadowColor = "rgba(0,0,0,0.2)"),
        (t.shadowBlur = 6),
        (t.shadowOffsetY = 2),
        t.beginPath(),
        t.arc(s, d, i, 0, Math.PI * 2),
        t.fill(),
        t.restore(),
        t.save(),
        (t.globalAlpha = 0.3),
        (t.strokeStyle = "#667eea"),
        (t.lineWidth = 1.5),
        t.beginPath(),
        t.arc(s, d, i, 0, Math.PI * 2),
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
          t.arc(s, d, 2.5, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.moveTo(s - c, d),
          t.lineTo(s - c * 0.45, d),
          t.moveTo(s + c * 0.45, d),
          t.lineTo(s + c, d),
          t.moveTo(s, d - c),
          t.lineTo(s, d - c * 0.45),
          t.moveTo(s, d + c * 0.45),
          t.lineTo(s, d + c),
          t.stroke(),
          (t.globalAlpha = 0.4),
          t.setLineDash([3, 3]),
          t.beginPath(),
          t.arc(s, d, c * 0.85, 0, Math.PI * 2),
          t.stroke(),
          t.setLineDash([]));
      else if (r === "fishing")
        if (S.spotIndex !== -1) {
          ((t.fillStyle = "#e74c3c"), (t.strokeStyle = "#e74c3c"));
          const v = c * 0.55;
          (t.beginPath(), t.rect(s - v, d - v, v * 2, v * 2), t.fill());
        } else
          ((t.strokeStyle = "#667eea"),
            (t.lineWidth = 2.2),
            t.beginPath(),
            t.arc(
              s - c * 0.15,
              d - c * 0.1,
              c * 0.55,
              -Math.PI * 0.6,
              Math.PI * 0.6
            ),
            t.stroke(),
            t.beginPath(),
            t.moveTo(s + c * 0.28, d + c * 0.28),
            t.lineTo(s + c * 0.42, d + c * 0.1),
            t.stroke(),
            t.beginPath(),
            t.moveTo(s - c * 0.15, d - c * 0.65),
            t.lineTo(s - c * 0.15, d - c * 0.1),
            t.stroke(),
            t.beginPath(),
            t.arc(s - c * 0.15, d - c * 0.65, 2, 0, Math.PI * 2),
            t.fill());
      t.restore();
    }
  }
  const F = 50,
    C = [],
    P = [],
    g = [],
    T = [],
    S = {
      id: "user_a",
      name: "我",
      face: "happy",
      spotIndex: -1,
      color: "#667eea"
    },
    lt = [];
  function Z(e) {
    return (((Math.sin(e * 12345.6789) * 43758.5453) % 1) + 1) % 1;
  }
  const J = [
      "happy",
      "focused",
      "sleepy",
      "excited",
      "surprised",
      "grin",
      "wink",
      "neutral"
    ],
    vt = ["idle", "scratch", "look_around", "stretch", "yawn"];
  function ht(e, o) {
    return {
      angle: (e / F) * Math.PI * 2 + (Z(e) - 0.5) * 0.08,
      occupied: !!o,
      player: o,
      x: 0,
      y: 0,
      appearT: o ? l.t - 1 : -10,
      scale: o ? 1 : 0,
      bp: Z(e + 100) * Math.PI * 2,
      face: o ? J[Math.floor(Z(e + 200) * J.length)] : "neutral",
      nextFaceT: l.t + 5 + Z(e + 300) * 10,
      action: "idle",
      actionT: 0,
      actionDur: 0,
      nextActionT: l.t + 3 + Z(e + 400) * 8,
      castState: "idle",
      castT: 0,
      nextCastT: l.t + 8 + Z(e + 500) * 12
    };
  }
  function q() {
    C.length = 0;
    for (let e = 0; e < F; e++) {
      const o = Ct(e);
      C.push(ht(e, o));
    }
  }
  function zt() {
    for (let e = 0; e < F; e++) {
      const o = Ct(e);
      if (C[e]) {
        const n = C[e].occupied;
        ((C[e].player = o),
          (C[e].occupied = !!o),
          !!o !== n &&
            (o
              ? ((C[e].appearT = l.t),
                (C[e].scale = 0),
                (C[e].face = J[Math.floor(Math.random() * J.length)]))
              : (C[e].scale *= 0.88)));
      } else C.push(ht(e, o));
    }
  }
  function Ct(e) {
    return S.spotIndex === e ? S : lt.find(o => o.spotIndex === e) || null;
  }
  function ft() {
    P.length = 0;
    for (let e = 0; e < 15; e++) {
      const o = Math.random() * Math.PI * 2,
        n = 0.1 + Math.random() * 0.3;
      P.push({
        x: l.cx + Math.cos(o) * l.R * n * 1.2,
        y: l.cy + Math.sin(o) * l.R * n,
        vx: (Math.random() - 0.5) * 0.3 * l.u,
        vy: (Math.random() - 0.5) * 0.15 * l.u,
        sz: (5 + Math.random() * 4) * l.u,
        ph: Math.random() * Math.PI * 2
      });
    }
  }
  function dt() {
    if (!h) return;
    const e = Math.min(window.devicePixelRatio || 1, 2);
    ((h.style.width = ""), (h.style.height = ""));
    const o = h.parentElement;
    if (o) {
      const n = o.querySelector(".fishing-top-bar"),
        a = o.querySelector(".fishing-bottom-bar"),
        r = n ? n.offsetHeight : 0,
        i = a ? a.offsetHeight : 0;
      ((l.W = o.clientWidth), (l.H = o.clientHeight - r - i));
    } else
      ((l.W = h.clientWidth || window.innerWidth),
        (l.H = h.clientHeight || window.innerHeight));
    ((h.width = l.W * e),
      (h.height = l.H * e),
      (h.style.width = l.W + "px"),
      (h.style.height = l.H + "px"),
      t.setTransform(e, 0, 0, e, 0, 0),
      (l.u = Math.min(l.W, l.H) / 700),
      (l.R = Math.min(l.W, l.H) * 0.35 * l.zoom),
      (l.cx = l.W * 0.5),
      (l.cy = l.H * 0.48),
      (l.sc = 1.2 * Math.min(Math.max(l.u, 0.7), 1.15)),
      ft(),
      R());
  }
  function St(e) {
    return (
      l.R *
      (1 +
        0.14 * Math.sin(e * 3 + 0.5) +
        0.09 * Math.sin(e * 5 + 1.2) +
        0.07 * Math.cos(e * 7 + 2.1) +
        0.11 * Math.cos(e * 2 + 0.8) +
        0.05 * Math.sin(e * 9 + 3.7))
    );
  }
  function mt(e) {
    const o = St(e);
    return [l.cx + Math.cos(e) * o * 1.25, l.cy + Math.sin(e) * o];
  }
  function _t(e, o) {
    const n = (e - l.cx) / 1.25,
      a = o - l.cy;
    return Math.sqrt(n * n + a * a) < St(Math.atan2(a, n)) * 0.88;
  }
  function Q(e, o) {
    o = o || 80;
    const n = [];
    for (let a = 0; a < o; a++) n.push(mt((a / o) * Math.PI * 2));
    (e.beginPath(), e.moveTo((n[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2));
    for (let a = 0; a < o; a++) {
      const [r, i] = n[a],
        [s, d] = n[(a + 1) % o];
      e.quadraticCurveTo(r, i, (r + s) / 2, (i + d) / 2);
    }
    e.closePath();
  }
  function Ft(e, o, n, a, r, i) {
    ((i = Math.min(i, a / 2, r / 2)),
      e.beginPath(),
      e.moveTo(o + i, n),
      e.lineTo(o + a - i, n),
      e.arcTo(o + a, n, o + a, n + i, i),
      e.lineTo(o + a, n + r - i),
      e.arcTo(o + a, n + r, o + a - i, n + r, i),
      e.lineTo(o + i, n + r),
      e.arcTo(o, n + r, o, n + r - i, i),
      e.lineTo(o, n + i),
      e.arcTo(o, n, o + i, n, i),
      e.closePath());
  }
  function b(e) {
    return (
      (e = Math.max(0, Math.min(1, e))),
      1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2)
    );
  }
  function A() {
    const { W: e, H: o, cx: n, cy: a, u: r } = l,
      i = document.documentElement.dataset.theme === "dark",
      s = Math.sqrt(e * e + o * o),
      d = t.createRadialGradient(n, a, 0, n, a, s * 0.6);
    if (
      (m
        ? i
          ? (d.addColorStop(0, "#352d25"), d.addColorStop(1, "#28221a"))
          : (d.addColorStop(0, "#f8f3e8"), d.addColorStop(1, "#ece5d5"))
        : i
          ? (d.addColorStop(0, "#2a2d35"), d.addColorStop(1, "#1e2028"))
          : (d.addColorStop(0, "#f5f3f0"), d.addColorStop(1, "#e8e5e0")),
      (t.fillStyle = d),
      t.fillRect(0, 0, e, o),
      r > 0.45)
    ) {
      t.fillStyle = i ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.022)";
      const c = Math.max(30, 45 * r);
      for (let p = c; p < e; p += c)
        for (let v = c; v < o; v += c)
          (t.beginPath(), t.arc(p, v, 0.8, 0, Math.PI * 2), t.fill());
    }
  }
  function k() {
    const { cx: e, cy: o, R: n, u: a, t: r } = l,
      i = document.documentElement.dataset.theme === "dark";
    (t.save(),
      t.translate(4 * a, 5 * a),
      (t.globalAlpha = i ? 0.15 : 0.06),
      (t.fillStyle = "#000"),
      Q(t),
      t.fill(),
      t.restore(),
      (t.fillStyle = m
        ? i
          ? "#3d3520"
          : "#e8d5b0"
        : i
          ? "#2c3e50"
          : "#dce2e8"),
      Q(t),
      t.fill());
    const s = t.createRadialGradient(
      e - n * 0.15,
      o - n * 0.15,
      n * 0.08,
      e,
      o,
      n * 1.25
    );
    (m
      ? (s.addColorStop(
          0,
          i ? "rgba(200,180,100,0.1)" : "rgba(255,230,160,0.15)"
        ),
        s.addColorStop(0.6, "transparent"),
        s.addColorStop(1, i ? "rgba(0,0,0,0.1)" : "rgba(180,150,80,0.05)"))
      : i
        ? (s.addColorStop(0, "rgba(100,160,200,0.08)"),
          s.addColorStop(0.6, "transparent"),
          s.addColorStop(1, "rgba(0,0,0,0.1)"))
        : (s.addColorStop(0, "rgba(255,255,255,0.1)"),
          s.addColorStop(0.6, "transparent"),
          s.addColorStop(1, "rgba(0,0,0,0.03)")),
      (t.fillStyle = s),
      Q(t),
      t.fill(),
      t.save(),
      Q(t),
      t.clip(),
      (t.strokeStyle = m
        ? i
          ? "rgba(200,180,100,0.15)"
          : "rgba(200,170,100,0.2)"
        : i
          ? "rgba(100,140,180,0.12)"
          : "rgba(170,182,192,0.18)"),
      (t.lineWidth = Math.max(0.5, 0.8 * a)));
    const d = Math.max(10, 16 * a);
    for (let c = o - n * 1.4; c < o + n * 1.4; c += d) {
      const p = Math.sin(r * 0.7 + c * 0.03) * 6 * a;
      (t.beginPath(),
        t.moveTo(e - n * 2, c),
        t.quadraticCurveTo(
          e + p,
          c + Math.sin(r * 0.5 + c * 0.05) * 3 * a,
          e + n * 2,
          c + Math.cos(r * 0.3 + c * 0.02) * 2 * a
        ),
        t.stroke());
    }
    (t.restore(),
      (t.strokeStyle = m
        ? i
          ? "#8a7530"
          : "#c9a84c"
        : i
          ? "#1a252f"
          : "#5a5a5a"),
      (t.lineWidth = Math.max(1.5, 2.5 * a)),
      (t.lineJoin = "round"),
      Q(t),
      t.stroke());
  }
  function X() {
    const { cx: e, cy: o, u: n, t: a } = l;
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
    ].forEach((i, s) => {
      const d = St(i.a) * i.d,
        c = e + Math.cos(i.a) * d * 1.35,
        p = o + Math.sin(i.a) * d,
        v = Math.max(6, 14 * i.s * n);
      (t.save(),
        t.translate(c, p),
        t.rotate(i.a + Math.sin(a * 0.5 + s * 2) * 0.04),
        (t.fillStyle = "rgba(0,0,0,0.03)"),
        t.beginPath(),
        t.ellipse(1, 1, v, v * 0.6, 0, 0.3, Math.PI * 2 - 0.3),
        t.lineTo(0, 0),
        t.fill(),
        (t.fillStyle = "#c2ccc2"),
        (t.strokeStyle = "#aab4aa"),
        (t.lineWidth = Math.max(0.5, n)),
        t.beginPath(),
        t.ellipse(0, 0, v, v * 0.6, 0, 0.3, Math.PI * 2 - 0.3),
        t.lineTo(0, 0),
        t.fill(),
        t.stroke(),
        (t.strokeStyle = "#b0bab0"),
        (t.lineWidth = Math.max(0.4, 0.6 * n)),
        t.beginPath(),
        t.moveTo(0, 0),
        t.lineTo(v * 0.65, 0),
        t.stroke(),
        t.restore());
    });
  }
  function U() {
    const { u: e, t: o } = l;
    P.forEach(n => {
      ((n.x += n.vx),
        (n.y += n.vy),
        _t(n.x, n.y) ||
          ((n.vx *= -1),
          (n.vy *= -1),
          (n.x += n.vx * 3),
          (n.y += n.vy * 3),
          _t(n.x, n.y) ||
            ((n.x = l.cx + (n.x - l.cx) * 0.85),
            (n.y = l.cy + (n.y - l.cy) * 0.85))));
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
  function tt() {
    const { u: e } = l;
    for (let o = g.length - 1; o >= 0; o--) {
      const n = g[o];
      if (((n.r += 0.3 * e), (n.a -= 0.005), n.a <= 0)) {
        g.splice(o, 1);
        continue;
      }
      ((t.strokeStyle = `rgba(140,155,170,${Math.min(1, n.a)})`),
        (t.lineWidth = Math.max(0.4, 0.6 * e)),
        t.beginPath(),
        t.arc(n.x, n.y, n.r, 0, Math.PI * 2),
        t.stroke());
    }
  }
  function K(e, o, n, a) {
    if (a < 0.15) return;
    const r = o - 0.3 * a,
      i = 5.5 * a;
    switch (((t.lineCap = "round"), (t.lineJoin = "round"), n)) {
      case "happy":
        ((t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.4 * a)),
          t.beginPath(),
          t.arc(e - i, r, 2 * a, Math.PI + 0.3, -0.3),
          t.stroke(),
          t.beginPath(),
          t.arc(e + i, r, 2 * a, Math.PI + 0.3, -0.3),
          t.stroke(),
          t.beginPath(),
          t.arc(e, r + 1.5 * a, 3.5 * a, 0.15, Math.PI - 0.15),
          t.stroke());
        break;
      case "focused":
        ((t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e - i, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          (t.strokeStyle = "#444"),
          (t.lineWidth = Math.max(0.8, 1.3 * a)),
          t.beginPath(),
          t.moveTo(e - i - 2.5 * a, r - 3.5 * a),
          t.lineTo(e - i + 1.5 * a, r - 2 * a),
          t.stroke(),
          t.beginPath(),
          t.moveTo(e + i + 2.5 * a, r - 3.5 * a),
          t.lineTo(e + i - 1.5 * a, r - 2 * a),
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
          t.moveTo(e - i - 1.5 * a, r),
          t.lineTo(e - i + 1.5 * a, r),
          t.stroke(),
          t.beginPath(),
          t.moveTo(e + i - 1.5 * a, r),
          t.lineTo(e + i + 1.5 * a, r),
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
          t.arc(e - i, r, 2.2 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i, r, 2.2 * a, 0, Math.PI * 2),
          t.fill(),
          (t.fillStyle = "#fff"),
          t.beginPath(),
          t.arc(e - i + 0.7 * a, r - 0.7 * a, 0.9 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i + 0.7 * a, r - 0.7 * a, 0.9 * a, 0, Math.PI * 2),
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
          t.arc(e - i, r, 2.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i, r, 2.5 * a, 0, Math.PI * 2),
          t.fill(),
          (t.fillStyle = "#fff"),
          t.beginPath(),
          t.arc(e - i + 0.7 * a, r - 0.7 * a, 1 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i + 0.7 * a, r - 0.7 * a, 1 * a, 0, Math.PI * 2),
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
          t.arc(e - i, r, 1.7 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i, r, 1.7 * a, 0, Math.PI * 2),
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
          t.arc(e - i, r, 1.8 * a, -0.3, Math.PI + 0.3),
          t.stroke(),
          (t.fillStyle = "#444"),
          t.beginPath(),
          t.arc(e + i, r, 1.7 * a, 0, Math.PI * 2),
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
          t.arc(e - i, r, 1.5 * a, 0, Math.PI * 2),
          t.fill(),
          t.beginPath(),
          t.arc(e + i, r, 1.5 * a, 0, Math.PI * 2),
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
  function G(e, o, n, a, r, i, s, d, c, p, v) {
    if (i < 0.02) return;
    const f = l.sc * i,
      V = l.t,
      E = p > 0 && v > 0 ? Math.min(1, (V - p) / v) : 0,
      O = c !== "idle" && E >= 0 && E < 1;
    (t.save(),
      (t.fillStyle = "rgba(0,0,0,0.04)"),
      t.beginPath(),
      t.ellipse(e, o + 24 * f, 8 * f, 3 * f, 0, 0, Math.PI * 2),
      t.fill());
    let bt = 0,
      pt = 0;
    (O &&
      c === "stretch" &&
      ((bt = Math.sin(E * Math.PI) * 0.12),
      (pt = -Math.sin(E * Math.PI) * 2 * f)),
      t.save(),
      t.translate(e, o + pt),
      bt !== 0 && t.rotate(bt),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1.5, 2.5 * f)),
      (t.lineCap = "round"),
      t.beginPath(),
      t.moveTo(-3 * f, 12 * f),
      t.lineTo(-5 * f, 22 * f),
      t.stroke(),
      t.beginPath(),
      t.moveTo(3 * f, 12 * f),
      t.lineTo(5 * f, 22 * f),
      t.stroke(),
      (t.fillStyle = "#666"),
      t.beginPath(),
      t.ellipse(-5 * f, 23 * f, 3.5 * f, 2 * f, 0, 0, Math.PI * 2),
      t.fill(),
      t.beginPath(),
      t.ellipse(5 * f, 23 * f, 3.5 * f, 2 * f, 0, 0, Math.PI * 2),
      t.fill(),
      (t.fillStyle = s || "#eee"),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1, 1.5 * f)),
      Ft(t, -6 * f, -1 * f, 12 * f, 14 * f, 2.5 * f),
      t.fill(),
      t.stroke(),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1.5, 2 * f)),
      (t.lineCap = "round"),
      O
        ? et(c, E, a, f)
        : (t.beginPath(),
          t.moveTo(-a * 4 * f, 3 * f),
          t.lineTo(-a * 8 * f, 1 * f),
          t.stroke(),
          t.beginPath(),
          t.moveTo(a * 4 * f, 4 * f),
          t.lineTo(a * 8 * f, 8 * f),
          t.stroke()));
    const W = Math.max(4, 8 * f);
    let z = -1 * f - W;
    O && c === "yawn" && (z -= Math.sin(E * Math.PI) * 1.5 * f);
    let kt = 0;
    if (
      (O && c === "look_around" && (kt = Math.sin(E * Math.PI * 2) * 0.15),
      t.save(),
      t.translate(0, z),
      kt !== 0 && t.rotate(kt),
      (t.fillStyle = "rgba(0,0,0,0.025)"),
      t.beginPath(),
      t.arc(0.8, 0.8, W, 0, Math.PI * 2),
      t.fill(),
      (t.fillStyle = "#fafafa"),
      (t.strokeStyle = "#555"),
      (t.lineWidth = Math.max(1, 1.5 * f)),
      t.beginPath(),
      t.arc(0, 0, W, 0, Math.PI * 2),
      t.fill(),
      t.stroke(),
      f > 0.2 &&
        ((t.strokeStyle = "#bbb"),
        (t.lineWidth = Math.max(0.5, 0.8 * f)),
        (t.lineCap = "round"),
        t.beginPath(),
        t.moveTo(-1.5 * f, -W + 1.5 * f),
        t.quadraticCurveTo(-2.5 * f, -W - 3 * f, 0.5 * f, -W - 1.5 * f),
        t.stroke(),
        t.beginPath(),
        t.moveTo(1.5 * f, -W + 1.5 * f),
        t.quadraticCurveTo(3 * f, -W - 2.5 * f, 1.5 * f, -W - 0.5 * f),
        t.stroke()),
      K(0, 0, n, f),
      t.restore(),
      f > 0.3)
    ) {
      const Lt = z - W - 8 * f,
        Mt = Math.max(8, 10 * f);
      ((t.font = `bold ${Mt}px "Noto Sans SC",sans-serif`),
        (t.textAlign = "center"),
        (t.textBaseline = "middle"));
      const ut = d && d === S.id ? "我" : Y(d),
        wt = t.measureText(ut).width,
        ot = 4 * f;
      ((t.fillStyle = "rgba(0,0,0,0.6)"),
        Ft(t, -wt / 2 - ot, Lt - Mt / 2 - ot / 2, wt + ot * 2, Mt + ot, 4 * f),
        t.fill(),
        (t.fillStyle = "#fff"),
        t.fillText(ut, 0, Lt));
    }
    (t.restore(), t.restore());
  }
  function et(e, o, n, a) {
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
          i = -14 * a * r,
          s = 10 * a * r;
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.quadraticCurveTo(-s, i + 3 * a, -s * 0.8, i),
          t.stroke(),
          t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.quadraticCurveTo(s, i + 4 * a, s * 0.8, i),
          t.stroke());
        break;
      }
      case "yawn": {
        const r = -1 * a - Math.max(4, 8 * a) + 3 * a;
        (t.beginPath(),
          t.moveTo(-n * 4 * a, 3 * a),
          t.lineTo(-n * 8 * a, 1 * a),
          t.stroke());
        const i = Math.sin(o * Math.PI);
        (t.beginPath(),
          t.moveTo(n * 4 * a, 4 * a),
          t.quadraticCurveTo(
            n * 5 * a,
            r + 4 * a * (1 - i),
            n * 2 * a,
            r + 2 * a * (1 - i)
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
  function Y(e) {
    const o = lt.find(n => n.id === e);
    return o ? o.name : "钓友";
  }
  function at(e, o, n, a, r, i, s, d) {
    const c = l.sc * s.scale;
    if (c < 0.05) return;
    const { u: p, t: v } = l,
      f = e - r * 8 * c,
      V = o + 3 * c;
    let E = 1,
      O = 0;
    if (s.castState === "reeling") {
      const Xt = Math.min(1, (v - s.castT) / 1.5),
        It = 1 - Math.pow(1 - Xt, 3);
      ((E = 1 - It * 0.7), (O = -It * 0.6));
    } else if (s.castState === "casting") {
      const Xt = Math.min(1, (v - s.castT) / 1),
        It = 1 - Math.pow(1 - Xt, 3);
      ((E = 0.3 + It * 0.7), (O = (1 - It) * 0.3));
    }
    const bt = n - r * 90 * p * E,
      pt = a - 6 * p,
      W = bt,
      z = pt + Math.sin(O) * 30 * p,
      kt = (f + W) * 0.5,
      Lt = (V + z) * 0.5 - 12 * p;
    ((t.strokeStyle = "#666"),
      (t.lineWidth = Math.max(2, 3 * c)),
      (t.lineCap = "round"),
      t.beginPath(),
      t.moveTo(f, V),
      t.lineTo(f + (W - f) * 0.1, V + (z - V) * 0.1),
      t.stroke(),
      (t.strokeStyle = "#777"),
      (t.lineWidth = Math.max(1, 2 * c)),
      t.beginPath(),
      t.moveTo(f, V),
      t.quadraticCurveTo(kt, Lt, W, z),
      t.stroke());
    const Mt = 30 * p * E,
      nt = Math.sin(v * 1.2 + d * 1.7) * 2 * p,
      ut = z + Mt + Math.sin(v * 2 + d * 1.5) * 1.5 * p;
    ((t.strokeStyle = "#999"),
      (t.lineWidth = Math.max(0.5, 0.8 * c)),
      t.beginPath(),
      t.moveTo(W, z),
      t.quadraticCurveTo(W + nt * 0.3, z + Mt * 0.5, W + nt, ut),
      t.stroke());
    const wt = Math.max(1.5, 2 * c);
    ((t.strokeStyle = "#aaa"),
      (t.lineWidth = Math.max(0.3, 0.5 * c)),
      t.beginPath(),
      t.moveTo(W + nt, ut),
      t.lineTo(W + nt, ut + 6 * p),
      t.stroke());
    const ot = ut + 6 * p;
    ((t.fillStyle = "#ccc"),
      (t.strokeStyle = "#999"),
      (t.lineWidth = Math.max(0.4, 0.6 * c)),
      t.beginPath(),
      t.arc(W + nt, ot, wt, 0, Math.PI * 2),
      t.fill(),
      t.stroke(),
      (t.fillStyle = "rgba(255,255,255,0.45)"),
      t.beginPath(),
      t.arc(W + nt - 0.3 * c, ot - 0.4 * c, wt * 0.35, 0, Math.PI * 2),
      t.fill(),
      s.castState === "idle" &&
        Math.random() < 0.008 &&
        g.push({
          x: W + nt,
          y: ot,
          r: 1 * p,
          a: 0.18
        }));
  }
  function rt(e, o, n) {
    const { mx: a, my: r, u: i, t: s } = l,
      d = Math.sqrt((a - e) ** 2 + (r - o) ** 2) < Math.max(22, 16 * i),
      c = d ? 0.9 : 0.5 + Math.sin(s * 2 + n * 0.7) * 0.15,
      p = Math.max(6, 8 * i),
      v = d ? p * 1.3 : p;
    ((t.fillStyle = `rgba(150,150,150,${c * 0.06})`),
      t.beginPath(),
      t.arc(e, o, v + 3 * i, 0, Math.PI * 2),
      t.fill(),
      (t.strokeStyle = `rgba(130,130,130,${c * 0.45})`),
      (t.lineWidth = Math.max(1, 1.5 * i)),
      t.setLineDash([Math.max(3, 4 * i), Math.max(2, 3 * i)]),
      t.beginPath(),
      t.arc(e, o, v, 0, Math.PI * 2),
      t.stroke(),
      t.setLineDash([]),
      (t.fillStyle = `rgba(140,140,140,${c * 0.5})`),
      t.beginPath(),
      t.arc(e, o, Math.max(2, 2.5 * i), 0, Math.PI * 2),
      t.fill(),
      d &&
        S.spotIndex === -1 &&
        ((t.strokeStyle = "rgba(102, 126, 234, 0.4)"),
        (t.lineWidth = 2),
        t.beginPath(),
        t.arc(e, o, v + 5 * i, 0, Math.PI * 2),
        t.stroke()));
  }
  function yt(e, o, n, a, r) {
    const i = l.sc * r,
      s = l.u;
    (t.save(),
      t.translate(e, o),
      (t.fillStyle = "#8B6914"),
      (t.strokeStyle = "#6B4F12"),
      (t.lineWidth = Math.max(1, 1.5 * s)),
      (t.lineCap = "round"));
    const d = 12 * i,
      c = 3 * i,
      p = 10 * i;
    (t.beginPath(), t.rect(-d / 2, p, d, c), t.fill(), t.stroke());
    const v = 10 * i;
    (t.beginPath(),
      t.rect(-d / 2, p - v, 2 * i, v),
      t.fill(),
      t.stroke(),
      t.beginPath(),
      t.moveTo(-d / 2 + 1 * i, p + c),
      t.lineTo(-d / 2 - 1 * i, p + c + 6 * i),
      t.moveTo(d / 2 - 1 * i, p + c),
      t.lineTo(d / 2 + 1 * i, p + c + 6 * i),
      t.stroke(),
      t.restore());
  }
  function st(e, o) {
    const [n, a] = mt(e.angle),
      r = n - l.cx,
      i = a - l.cy,
      s = Math.sqrt(r * r + i * i) || 1,
      d = r / s,
      c = i / s,
      p = Math.max(10, 18 * l.u),
      v = n + d * p,
      f = a + c * p;
    if (((e.x = v), (e.y = f), e.occupied)) {
      const V = l.t - e.appearT;
      e.scale = V < 0.5 ? b(V / 0.35) : 1;
    } else ((e.scale *= 0.88), e.scale < 0.01 && (e.scale = 0));
    if (e.occupied && e.scale > 0.02)
      try {
        const V = l.t;
        if (V > e.nextFaceT) {
          if (e.castState !== "idle") e.face = "focused";
          else {
            let z;
            do z = J[Math.floor(Math.random() * J.length)];
            while (z === e.face);
            e.face = z;
          }
          e.nextFaceT = V + 12 + Math.random() * 25;
        }
        if (
          e.castState === "idle" &&
          e.action === "idle" &&
          V > e.nextActionT
        ) {
          const z = vt[1 + Math.floor(Math.random() * (vt.length - 1))];
          ((e.action = z),
            (e.actionT = V),
            (e.actionDur = 3 + Math.random() * 3));
        }
        if (
          (e.action !== "idle" &&
            V - e.actionT > e.actionDur &&
            ((e.action = "idle"),
            (e.actionT = 0),
            (e.actionDur = 0),
            (e.nextActionT = V + 20 + Math.random() * 50)),
          e.castState === "idle" &&
            V > e.nextCastT &&
            ((e.castState = "reeling"), (e.castT = V), (e.face = "focused")),
          e.castState === "reeling" &&
            V - e.castT > 1.5 &&
            ((e.castState = "casting"), (e.castT = V), (e.face = "excited")),
          e.castState === "casting" && V - e.castT > 1)
        ) {
          ((e.castState = "idle"),
            (e.castT = 0),
            (e.nextCastT = V + 50 + Math.random() * 70),
            (e.face = "happy"),
            (e.nextFaceT = V + 5));
          for (let z = 0; z < 3; z++)
            g.push({
              x: n + (Math.random() - 0.5) * 8 * l.u,
              y: a + (Math.random() - 0.5) * 4 * l.u,
              r: 1 * l.u,
              a: 0.25
            });
        }
        const E = Math.sin(l.t * 1.5 + e.bp) * 1.2 * l.u,
          O = e.player,
          pt = O && O.id === S.id ? O.color : "#999",
          W = m ? -8 * l.sc * e.scale : 0;
        (m && yt(v, f + E, d, c, e.scale),
          G(
            v,
            f + E + W,
            e.face,
            d,
            c,
            e.scale,
            pt,
            O ? O.id : null,
            e.action,
            e.actionT,
            e.actionDur
          ),
          at(v, f + E, n, a, d, c, e, o));
      } catch {
        ((e.castState = "idle"),
          (e.action = "idle"),
          (e.actionT = 0),
          (e.castT = 0));
      }
    else e.occupied || rt(v, f, o);
  }
  function Dt() {
    const { W: e, u: o } = l;
    if (o < 0.3) return;
    const n = 5,
      a = Math.max(16, 20 * o),
      r = Math.max(10, 11 * o),
      i = e - 10 * o;
    for (; T.length > n; ) T.shift();
    for (const c of T) ((c.alpha = 1), (c.offsetY = 0));
    const s = T.slice(-n),
      d = s.length * a;
    ((t.font = `${r}px "Noto Sans SC",sans-serif`),
      (t.textBaseline = "middle"));
    for (let c = 0; c < s.length; c++) {
      const p = s[c],
        v = d - (s.length - c) * a + p.offsetY,
        f = p.alpha;
      ((t.textAlign = "right"),
        (t.lineJoin = "round"),
        (t.globalAlpha = f * 0.7),
        (t.strokeStyle = "rgba(0,0,0,0.8)"),
        (t.lineWidth = Math.max(3, 4 * o)),
        t.strokeText(p.text, i, v + a * 0.5),
        (t.lineWidth = Math.max(1.5, 2 * o)),
        t.strokeText(p.text, i, v + a * 0.5),
        (t.globalAlpha = f),
        (t.fillStyle = "#fff"),
        (t.font = `bold ${r}px "Noto Sans SC",sans-serif`),
        t.fillText(p.text, i, v + a * 0.5));
    }
    t.globalAlpha = 1;
  }
  function Nt() {
    const e = C.filter(n => n.occupied).length,
      o = S.spotIndex !== -1;
    return {
      occupied: e,
      total: F,
      text: `${e}/${F} 钓点容量`,
      hint: m ? "高级鱼塘 - 全天钓鱼·好鱼爆率x3" : "钓鱼时间段7:30~24:00",
      userName: S.name,
      isFishing: o,
      pondType: M
    };
  }
  function gt() {
    if (S.spotIndex !== -1) {
      const e = C[S.spotIndex];
      return (
        e && ((e.occupied = !1), (e.player = null), (e.scale *= 0.88)),
        (S.spotIndex = -1),
        !1
      );
    } else {
      if (!_()) return "time_restricted";
      const e = C.findIndex(n => !n.occupied);
      if (e === -1) return null;
      const o = C[e];
      ((S.spotIndex = e),
        (o.occupied = !0),
        (o.player = S),
        (o.appearT = l.t),
        (o.scale = 0));
      for (let n = 0; n < 3; n++)
        g.push({
          x: o.x + (Math.random() - 0.5) * 10 * u,
          y: o.y + (Math.random() - 0.5) * 10 * u,
          r: 1 * u,
          a: 0.3
        });
      return !0;
    }
  }
  function Vt(e, o) {
    if (!Rt) return;
    const { u: n } = l;
    let a = -1,
      r = 1 / 0;
    for (let s = 0; s < C.length; s++) {
      const d = Math.sqrt((e - C[s].x) ** 2 + (o - C[s].y) ** 2);
      d < r && ((r = d), (a = s));
    }
    const i = Math.max(22, 16 * n);
    if (a >= 0 && r < i) {
      const s = C[a];
      if (s.occupied)
        (s.player && s.player.id === S.id) ||
          (s.player && Gt && Gt(s.player.id, s.player.name));
      else {
        if (!_()) return;
        const d = a;
        if (S.spotIndex !== -1) {
          const c = C[S.spotIndex];
          ((c.occupied = !1), (c.player = null), (c.scale *= 0.88));
        }
        ((S.spotIndex = d),
          (s.occupied = !0),
          (s.player = S),
          (s.appearT = l.t),
          (s.scale = 0));
        for (let c = 0; c < 3; c++)
          g.push({
            x: s.x + (Math.random() - 0.5) * 10 * n,
            y: s.y + (Math.random() - 0.5) * 10 * n,
            r: 1 * n,
            a: 0.3
          });
        (Ot &&
          Ot(
            m
              ? "/moyu/fishing/premium/switch-spot"
              : "/moyu/fishing/switch-spot",
            {
              method: "POST",
              auth: !0,
              loading: !1,
              body: {
                spotIndex: d
              }
            }
          ).catch(p => {
            Bt && Bt("切换钓点失败：" + (p.message || "网络异常"));
          }),
          qt && qt());
      }
    }
  }
  function Pt() {
    t &&
      ((l.t += 0.016),
      t.clearRect(0, 0, l.W, l.H),
      A(),
      k(),
      t.save(),
      Q(t),
      t.clip(),
      U(),
      tt(),
      t.restore(),
      X(),
      C.map((e, o) => ({
        s: e,
        i: o
      }))
        .sort((e, o) => mt(e.s.angle)[1] - mt(o.s.angle)[1])
        .forEach(({ s: e, i: o }) => st(e, o)),
      Dt(),
      I(),
      (y = requestAnimationFrame(Pt)));
  }
  const N = new Map();
  let Tt = 0,
    At = 0,
    Wt = 0,
    Et = 0,
    Ht = 0;
  const se = 6;
  let Zt = 0,
    Jt = 0,
    Kt = 0,
    Qt = 0,
    ct = !1,
    xt = !1,
    te = 0,
    ee = 0;
  function ae(e) {
    (e.preventDefault(), e.stopPropagation());
    const o = h.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top;
    if (
      (N.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      }),
      N.size === 1)
    )
      for (const r of L) {
        const i = r.size / 2,
          s = r.x + i,
          d = r.y + i;
        if (Math.sqrt((n - s) ** 2 + (a - d) ** 2) <= i) {
          r.id === "resetView" ? H() : r.id === "toggleFishing" && Yt && Yt();
          return;
        }
      }
    if (N.size === 2) {
      ((ct = !1), (xt = !0));
      const r = [...N.values()];
      ((Tt = Math.hypot(r[1].x - r[0].x, r[1].y - r[0].y)),
        (At = (r[0].x + r[1].x) / 2 - o.left),
        (Wt = (r[0].y + r[1].y) / 2 - o.top),
        (Et = (At - l.cx) / l.R),
        (Ht = (Wt - l.cy) / l.R));
    } else
      N.size === 1 &&
        ((Zt = n),
        (Jt = a),
        (Kt = l.cx),
        (Qt = l.cy),
        (te = n),
        (ee = a),
        (ct = !1),
        (xt = !1));
  }
  function ne(e, o, n, a, r) {
    l.zoom = Math.max(j, Math.min(B, r));
    const i = Math.min(l.W, l.H) * 0.35 * l.zoom;
    ((l.cx = e - n * i),
      (l.cy = o - a * i),
      (l.R = i),
      (l.sc = 1.2 * Math.min(Math.max(l.u, 0.7), 1.15)),
      ft(),
      q());
  }
  function oe(e) {
    e.preventDefault();
    const o = h.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top,
      r = (n - l.cx) / l.R,
      i = (a - l.cy) / l.R,
      s = e.deltaY > 0 ? -0.1 : 0.1;
    ne(n, a, r, i, l.zoom + s);
  }
  function ie(e) {
    if (N.has(e.pointerId) && N.size === 2) {
      N.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      });
      const i = [...N.values()],
        s = Math.hypot(i[1].x - i[0].x, i[1].y - i[0].y);
      if (Tt > 0) {
        const d = s / Tt,
          c = l.zoom * d;
        (ne(At, Wt, Et, Ht, c), (Tt = s));
        const p = Math.min(l.W, l.H) * 0.35 * l.zoom;
        ((Et = (At - l.cx) / p), (Ht = (Wt - l.cy) / p));
      }
      return;
    }
    const o = h.getBoundingClientRect(),
      n = e.clientX - o.left,
      a = e.clientY - o.top;
    if (((l.mx = n), (l.my = a), N.size === 1 && N.has(e.pointerId))) {
      const i = n - Zt,
        s = a - Jt;
      if (
        (!ct &&
          Math.sqrt(i * i + s * s) > se &&
          ((ct = !0), (xt = !0), (h.style.cursor = "grabbing")),
        ct)
      ) {
        ((l.cx = Kt + i), (l.cy = Qt + s), ft(), q());
        return;
      }
    }
    let r = !1;
    for (const i of L) {
      if (i.id === "toggleFishing" && !Rt) continue;
      const s = i.size / 2,
        d = i.x + s,
        c = i.y + s;
      if (Math.sqrt((n - d) ** 2 + (a - c) ** 2) <= s) {
        r = !0;
        break;
      }
    }
    if (!r) {
      const i = Math.max(22, 16 * l.u);
      for (const s of C)
        if (Math.sqrt((n - s.x) ** 2 + (a - s.y) ** 2) < i) {
          r = !0;
          break;
        }
    }
    h.style.cursor = r ? "pointer" : "default";
  }
  function jt(e) {
    (N.size === 1 && N.has(e.pointerId) && !xt && Vt(te, ee),
      ct && (h.style.cursor = "default"),
      N.delete(e.pointerId),
      (ct = !1),
      (xt = !1),
      N.size < 2 && (Tt = 0));
  }
  let Ot = null,
    Bt = null,
    Gt = null,
    Yt = null,
    qt = null,
    Rt = !1;
  function ce(e, o = {}) {
    w ||
      ((Ot = o.apiRequest || null),
      (Bt = o.onMessage || null),
      (Gt = o.onOtherPlayerTap || null),
      (Yt = o.onFishingToggle || null),
      (qt = o.onSpotClick || null),
      (h = e),
      (t = h.getContext("2d")),
      q(),
      dt(),
      h.addEventListener("pointerdown", ae),
      h.addEventListener("pointermove", ie),
      h.addEventListener("pointerup", jt),
      h.addEventListener("pointercancel", jt),
      h.addEventListener("wheel", oe, {
        passive: !1
      }),
      window.addEventListener("resize", dt),
      Pt(),
      (w = !0));
  }
  function ue() {
    w &&
      (y && (cancelAnimationFrame(y), (y = null)),
      h &&
        (h.removeEventListener("pointerdown", ae),
        h.removeEventListener("pointermove", ie),
        h.removeEventListener("pointerup", jt),
        h.removeEventListener("pointercancel", jt),
        h.removeEventListener("wheel", oe)),
      window.removeEventListener("resize", dt),
      (C.length = 0),
      (P.length = 0),
      (g.length = 0),
      (T.length = 0),
      (S.spotIndex = -1),
      (h = null),
      (t = null),
      (w = !1));
  }
  function he(e, o) {
    ((lt.length = 0),
      o !== void 0 && o >= 0 ? (S.spotIndex = o) : (S.spotIndex = -1));
    for (const n of e) {
      if (n.isCurrentUser) {
        ((S.id = n.id), (S.spotIndex = n.spotIndex), (S.name = n.name));
        continue;
      }
      lt.push({
        id: n.id,
        name: n.name,
        face: n.face || "focused",
        spotIndex: n.spotIndex,
        color: n.color || "#999"
      });
    }
    w && zt();
  }
  function fe(e) {
    if (!e || e.length === 0) return;
    const o = l.t;
    for (const n of e)
      T.some(r => r.text === n.text && n.time && r.msgTime === n.time) ||
        T.push({
          text: n.text,
          born: o,
          msgTime: n.time || 0,
          alpha: 0,
          offsetY: 0
        });
    T.length > 30 && T.splice(0, T.length - 30);
  }
  function de(e) {
    Rt = e;
  }
  return {
    init: ce,
    destroy: ue,
    getStatus: Nt,
    toggleFishing: gt,
    updatePlayers: he,
    updateMessages: fe,
    setActive: de,
    refreshSize: dt
  };
}
function $t(M) {
  if (M == null) return "0";
  const m = Number(M);
  if (isNaN(m)) return "0";
  const h = Math.abs(m);
  let t;
  if (h >= 1e8) {
    const y = h / 1e8;
    t = y % 1 === 0 ? y + "亿" : y.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const y = h / 1e4;
    t = y % 1 === 0 ? y + "万" : y.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else t = h.toLocaleString("zh-CN");
  return m < 0 ? "-" + t : t;
}
function Te({ apiRequest: M, addMessage: m, money: h, userLevel: t }) {
  const y = x(!1),
    w = x(!1),
    _ = x(null),
    l = x(!1),
    j = x(""),
    B = x([]),
    L = x([]),
    D = x({}),
    $ = x({}),
    R = x(0),
    H = x({
      name: "新手渔夫",
      stars: 1
    }),
    I = x(!1),
    F = 0.004,
    C = 200,
    P = 39417,
    g = {
      rod: 120,
      float: 100,
      bait: 150,
      net: 130,
      bucket: 500
    },
    T = 16.5 * 3600;
  function S(b) {
    return Math.max(40, 60 - (b || 0));
  }
  function lt(b) {
    return T / S(b);
  }
  function Z(b, A, k) {
    const X = Math.floor((A || 0) * (1 + k * 0.1)),
      U = g[b] || 100;
    return Math.floor((X * U) / 100);
  }
  function J(b) {
    return 1 + b * F;
  }
  async function vt() {
    try {
      const b = await M("/moyu/fishing/config", {
        auth: !0
      });
      b
        ? ((B.value = b.gearTypes || []), (L.value = b.upgradeConfigs || []))
        : console.warn("[渔具] 配置接口返回空:", b);
    } catch (b) {
      (console.error("[渔具] 加载钓鱼配置失败:", b),
        m("加载钓鱼配置失败，请重试"));
    }
  }
  async function ht(b) {
    try {
      const A = b ? `/moyu/fishing/gear?userId=${b}` : "/moyu/fishing/gear",
        k = await M(A, {
          auth: !0
        });
      k
        ? ((D.value = k.gearLevels || {}),
          ($.value = k.stats || {}),
          (R.value = k.totalScore || 0),
          (H.value = k.scoreLevel || "新手渔夫"))
        : console.warn("[渔具] 渔具接口返回空:", k);
    } catch (A) {
      console.error("[渔具] 加载渔具数据失败:", A);
    }
  }
  const q = it(() => {
    if (!_.value) return null;
    const b = _.value,
      A = D.value[b] || 0,
      k = B.value.find(st => st.code === b);
    if (!k) return null;
    const X = $.value[b] || k.baseValue || 0,
      tt = A >= 20,
      K = A + 1,
      G = L.value.find(st => st.level === A),
      et = tt ? null : Math.floor((k.baseValue || 0) * (1 + K * 0.1)),
      Y = G ? Math.floor(G.baseCost * (k.costMultiplier || 1)) : null,
      at = G ? G.successRate : null,
      rt = zt(b, A, k),
      yt = Ct(rt, Y, at);
    return {
      type: b,
      level: A,
      config: k,
      currentStat: X,
      nextStat: et,
      upgradeCost: Y,
      upgradeCostFormatted: $t(Y),
      successRate: at,
      isMaxLevel: tt,
      canUpgrade: !tt && Y !== null,
      ...rt,
      ...(yt || {})
    };
  });
  function zt(b, A, k) {
    const X = k.baseValue || 0,
      U = Z(b, X, A),
      K = Z(b, X, A + 1) - U,
      G = R.value || 0,
      et = G + K,
      Y = J(G),
      at = J(et),
      rt = Y > 0 ? (at / Y - 1) * 100 : 0,
      yt = D.value.bait || 0,
      st = b === "bait" ? A + 1 : yt,
      Dt = lt(yt),
      Nt = lt(st),
      gt = Dt * Y,
      Vt = Nt * at,
      Pt = Vt - gt,
      N = K === 0;
    return {
      priceBonusCurrentText: Y.toFixed(2) + "x",
      priceBonusNextText: at.toFixed(2) + "x",
      priceGainPercent: rt,
      priceGainText: "+" + rt.toFixed(1) + "%",
      scoreDelta: K,
      noScoreGain: N,
      dailyNow: gt,
      dailyNext: Vt,
      dailyGain: Pt,
      dailyGainPercent: gt > 0 ? (Pt / gt) * 100 : 0,
      isBait: b === "bait"
    };
  }
  function Ct(b, A, k) {
    if (!b || !A || b.dailyGain <= 0) return null;
    const X = k && k > 0 ? k : 1,
      U = A / X,
      tt = t && t.value ? t.value : 1,
      K = P * C * Math.sqrt(tt),
      G = b.dailyGain * K;
    if (G <= 0) return null;
    const et = U / G;
    return {
      expectCost: Math.floor(U),
      expectCostFormatted: $t(Math.floor(U)),
      paybackDays: et,
      paybackText: ft(et)
    };
  }
  function ft(b) {
    return !isFinite(b) || b <= 0
      ? ""
      : b < 1
        ? "当天回本"
        : b < 30
          ? "约 " + Math.round(b) + " 天回本"
          : b < 365
            ? "约 " + Math.round(b / 30) + " 个月回本"
            : "长期收益";
  }
  const dt = it(() => (1 + (R.value || 0) * F).toFixed(2) + "x");
  async function St({ userId: b, ownerName: A } = {}) {
    ((l.value = !!b),
      (j.value = A || ""),
      await vt(),
      await ht(b),
      (y.value = !0));
  }
  function mt() {
    ((y.value = !1), (_.value = null), (w.value = !1));
  }
  function _t(b) {
    ((_.value = b), (w.value = !0));
  }
  function Q() {
    ((w.value = !1), (_.value = null));
  }
  async function Ft() {
    if (!q.value || I.value) return;
    const { type: b, isMaxLevel: A } = q.value;
    if (A) {
      m("⚠️ 已达到最大强化等级");
      return;
    }
    I.value = !0;
    try {
      const k = await M("/moyu/fishing/gear/upgrade", {
        method: "POST",
        body: {
          gearCode: b
        },
        auth: !0
      });
      k
        ? (k.cost && (h.value -= k.cost),
          k.success
            ? m(`🎉 ${q.value.config.name}强化成功！+${k.newLevel}`)
            : m(`😢 ${q.value.config.name}强化失败，消耗了${$t(k.cost)}金币`),
          await ht())
        : m("强化失败");
    } catch (k) {
      (console.error("强化失败:", k), m(k.message || "强化失败，请重试"));
    } finally {
      I.value = !1;
    }
  }
  return {
    showGearModal: y,
    showDetailModal: w,
    selectedGear: _,
    viewOnly: l,
    gearOwnerName: j,
    gearLevels: D,
    isUpgrading: I,
    gearTypes: B,
    upgradeConfigs: L,
    gearStats: $,
    totalScore: R,
    scoreLevel: H,
    selectedGearInfo: q,
    gearPriceBonusText: dt,
    openGearModal: St,
    closeGearModal: mt,
    selectGear: _t,
    closeDetailModal: Q,
    upgradeGear: Ft,
    loadConfig: vt,
    loadUserData: ht,
    formatGold: $t
  };
}
function Ut(M) {
  if (M == null) return "0";
  const m = Number(M);
  if (isNaN(m)) return "0";
  const h = Math.abs(m);
  let t;
  if (h >= 1e8) {
    const y = h / 1e8;
    t = y % 1 === 0 ? y + "亿" : y.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const y = h / 1e4;
    t = y % 1 === 0 ? y + "万" : y.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else t = h.toLocaleString("zh-CN");
  return m < 0 ? "-" + t : t;
}
const me = {
  垃圾: "#795548",
  普通: "#888",
  优秀: "#4caf50",
  稀有: "#2196f3",
  史诗: "#9c27b0",
  传说: "#ff9800"
};
function xe({ apiRequest: M, addMessage: m, money: h }) {
  const t = x(!1),
    y = x([]),
    w = x(10),
    _ = it(() => y.value.length >= w.value),
    l = it(() => y.value.reduce((I, F) => I + (F.catchValue || 0), 0));
  let v = !1;
  const f = I => {
      I && ((y.value = I.fishList || []), (w.value = I.capacity || 10));
    },
    C = async I => {
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
            const U = await M("/moyu/fishing/bucket/move-to-bag", {
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
            const U = await M("/moyu/fishing/bucket/sell-all", {
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
          const U = await M("/moyu/fishing/bucket", {
            auth: !0,
            loading: !1
          });
          f(U);
        }
      } catch (U) {
        console.log("[钓鱼] 自动整理鱼获失败:", U);
      } finally {
        v = !1;
      }
    };
  async function j() {
    try {
      const I = await M("/moyu/fishing/bucket", {
        auth: !0
      });
      (f(I), await C(I));
    } catch (I) {
      console.error("加载鱼护数据失败:", I);
    }
  }
  async function B(I) {
    try {
      const F = await M("/moyu/fishing/bucket/sell", {
        method: "POST",
        body: {
          bucketId: I
        },
        auth: !0
      });
      return F
        ? (F.soldValue && (h.value += F.soldValue),
          m(`💰 出售${F.fishName}，获得${Ut(F.soldValue)}金币`),
          await j(),
          !0)
        : (m("出售失败"), !1);
    } catch (F) {
      return (console.error("出售失败:", F), m("出售失败，请重试"), !1);
    }
  }
  let L = !1;
  async function D() {
    if (!L) {
      if (y.value.length === 0) {
        m("🎒 鱼护是空的");
        return;
      }
      L = !0;
      try {
        const I = await M("/moyu/fishing/bucket/sell-all", {
          method: "POST",
          auth: !0
        });
        I
          ? (I.soldValue && (h.value += I.soldValue),
            m(`💰 出售所有鱼，获得${Ut(I.soldValue)}金币`),
            await j())
          : m("出售失败");
      } catch (I) {
        (console.error("出售失败:", I), m("出售失败，请重试"));
      } finally {
        L = !1;
      }
    }
  }
  async function $(I) {
    try {
      const F = await M("/moyu/fishing/bucket/move-to-bag", {
        method: "POST",
        body: {
          bucketId: I
        },
        auth: !0
      });
      return F
        ? (m(`🎒 ${F.fishName}已放入背包`), await j(), !0)
        : (m("放入背包失败"), !1);
    } catch (F) {
      return (console.error("放入背包失败:", F), m("放入背包失败，请重试"), !1);
    }
  }
  async function R() {
    (await j(), (t.value = !0));
  }
  function H() {
    t.value = !1;
  }
  return {
    showBucketModal: t,
    bucketFish: y,
    bucketCapacity: w,
    isBucketFull: _,
    totalValue: l,
    openBucketModal: R,
    closeBucketModal: H,
    sellFish: B,
    sellAllFish: D,
    moveFishToBag: $,
    loadBucketData: j,
    formatGold: Ut,
    RARITY_COLORS: me
  };
}
function ye(M) {
  if (M == null) return "0";
  const m = Number(M);
  if (isNaN(m)) return "0";
  const h = Math.abs(m);
  let t;
  if (h >= 1e8) {
    const y = h / 1e8;
    t = y % 1 === 0 ? y + "亿" : y.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const y = h / 1e4;
    t = y % 1 === 0 ? y + "万" : y.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else t = h.toLocaleString("zh-CN");
  return m < 0 ? "-" + t : t;
}
function ge(M) {
  if (!M) return "";
  const m = new Date(M),
    h = m.getHours().toString().padStart(2, "0"),
    t = m.getMinutes().toString().padStart(2, "0");
  return `${h}:${t}`;
}
function le(M) {
  if (!M) return "";
  const m = new Date(M),
    h = (m.getMonth() + 1).toString().padStart(2, "0"),
    t = m.getDate().toString().padStart(2, "0");
  return `${h}-${t}`;
}
const be = {
  垃圾: "#795548",
  普通: "#888",
  优秀: "#4caf50",
  稀有: "#2196f3",
  史诗: "#9c27b0",
  传说: "#ff9800"
};
function ke({ apiRequest: M }) {
  const m = x(!1),
    h = x("today"),
    t = x(null),
    y = x(""),
    w = x([]),
    _ = x([]),
    l = x({
      totalCount: 0,
      totalValue: 0
    }),
    j = x({
      totalCount: 0,
      totalValue: 0
    }),
    B = it(() => (h.value === "today" ? l.value : j.value)),
    L = it(() => (h.value === "today" ? w.value : _.value)),
    D = it(() => {
      const g = {};
      return (
        _.value.forEach(T => {
          const S = T.catchTime ? T.catchTime.split("T")[0] : T.catchTime;
          S &&
            (g[S] ||
              (g[S] = {
                date: S,
                dateFormatted: le(new Date(S).getTime()),
                records: [],
                totalValue: 0,
                count: 0
              }),
            g[S].records.push(T),
            (g[S].totalValue += T.catchValue || 0),
            g[S].count++);
        }),
        Object.values(g)
          .sort((T, S) => S.date.localeCompare(T.date))
          .slice(0, 30)
      );
    });
  async function $() {
    try {
      const g = t.value
          ? `/moyu/fishing/player-history?userId=${t.value}&type=today`
          : "/moyu/fishing/history?type=today",
        T = await M(g, {
          auth: !0
        });
      T &&
        ((w.value = T.records || []),
        (l.value = {
          totalCount: T.totalCount || 0,
          totalValue: T.totalValue || 0
        }));
    } catch (g) {
      console.error("加载今日钓鱼数据失败:", g);
    }
  }
  async function R() {
    try {
      const g = t.value
          ? `/moyu/fishing/player-history?userId=${t.value}&type=history`
          : "/moyu/fishing/history?type=history",
        T = await M(g, {
          auth: !0
        });
      T &&
        ((_.value = T.records || []),
        (j.value = {
          totalCount: T.totalCount || 0,
          totalValue: T.totalValue || 0
        }));
    } catch (g) {
      console.error("加载历史钓鱼数据失败:", g);
    }
  }
  async function H() {
    ((t.value = null),
      (y.value = ""),
      (h.value = "today"),
      await $(),
      await R(),
      (m.value = !0));
  }
  async function I(g, T) {
    ((t.value = g),
      (y.value = T || "未知"),
      (h.value = "today"),
      (w.value = []),
      (_.value = []),
      (l.value = {
        totalCount: 0,
        totalValue: 0
      }),
      (j.value = {
        totalCount: 0,
        totalValue: 0
      }),
      (m.value = !0),
      await $(),
      await R());
  }
  function F() {
    ((m.value = !1), (t.value = null), (y.value = ""));
  }
  async function C(g) {
    ((h.value = g),
      g === "today" && w.value.length === 0
        ? await $()
        : g === "history" && _.value.length === 0 && (await R()));
  }
  async function P() {
    h.value === "today" ? await $() : await R();
  }
  return {
    showHistoryModal: m,
    activeTab: h,
    todayRecords: w,
    historyRecords: _,
    todayStats: l,
    historyStats: j,
    currentStats: B,
    currentRecords: L,
    historyGroups: D,
    viewingPlayerId: t,
    viewingPlayerName: y,
    openHistoryModal: H,
    openPlayerHistoryModal: I,
    closeHistoryModal: F,
    switchTab: C,
    loadTodayData: $,
    loadHistoryData: R,
    refreshData: P,
    formatGold: ye,
    formatTime: ge,
    formatDate: le,
    RARITY_COLORS: be
  };
}
function pe(M) {
  if (M == null) return "0";
  const m = Number(M);
  if (isNaN(m)) return "0";
  const h = Math.abs(m);
  let t;
  if (h >= 1e8) {
    const y = h / 1e8;
    t = y % 1 === 0 ? y + "亿" : y.toFixed(2).replace(/\.?0+$/, "") + "亿";
  } else if (h >= 1e4) {
    const y = h / 1e4;
    t = y % 1 === 0 ? y + "万" : y.toFixed(1).replace(/\.?0+$/, "") + "万";
  } else t = h.toLocaleString("zh-CN");
  return m < 0 ? "-" + t : t;
}
function Me(M) {
  if (!M) return "";
  const m = new Date(M),
    h = (m.getMonth() + 1).toString().padStart(2, "0"),
    t = m.getDate().toString().padStart(2, "0"),
    y = m.getHours().toString().padStart(2, "0"),
    w = m.getMinutes().toString().padStart(2, "0");
  return `${h}-${t} ${y}:${w}`;
}
function we({ apiRequest: M }) {
  const m = x(!1),
    h = x([]),
    t = x(0),
    y = x(!0),
    w = x(!1),
    _ = x(0),
    l = 15;
  async function j($ = !1) {
    if (!w.value) {
      w.value = !0;
      try {
        const R = $ ? 0 : _.value,
          H = await M(`/moyu/fishing/fines?offset=${R}&limit=${l}`, {
            auth: !0
          });
        H &&
          ($
            ? (h.value = H.records || [])
            : (h.value = [...h.value, ...(H.records || [])]),
          (t.value = H.total || 0),
          (y.value = H.hasMore !== !1),
          (_.value = h.value.length));
      } catch (R) {
        console.error("加载罚款记录失败:", R);
      } finally {
        w.value = !1;
      }
    }
  }
  async function B() {
    ((_.value = 0),
      (h.value = []),
      (y.value = !0),
      (m.value = !0),
      await j(!0));
  }
  function L() {
    m.value = !1;
  }
  async function D() {
    y.value && !w.value && (await j(!1));
  }
  return {
    showFinesModal: m,
    finesRecords: h,
    finesTotal: t,
    hasMore: y,
    loading: w,
    openFinesModal: B,
    closeFinesModal: L,
    loadMore: D,
    formatGold: pe,
    formatTime: Me
  };
}
const re = [
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
  ve = {
    垃圾: "#795548",
    普通: "#9e9e9e",
    优秀: "#4caf50",
    稀有: "#2196f3",
    史诗: "#9c27b0",
    传说: "#ff9800"
  };
function Ie({ currentUser: M, apiRequest: m, addMessage: h }) {
  const t = x(!1),
    y = x({
      enabled: 0,
      keepFishIds: ""
    }),
    w = x({
      totalKept: 0,
      totalSold: 0,
      totalEarned: 0
    }),
    _ = x(!1),
    l = x([]),
    j = x(!1),
    B = ["垃圾", "普通", "优秀", "稀有", "史诗", "传说"],
    L = it(() => {
      const P = {};
      for (const g of re)
        (P[g.rarity] || (P[g.rarity] = []), P[g.rarity].push(g));
      return B.filter(g => P[g]).map(g => ({
        rarity: g,
        fish: P[g]
      }));
    }),
    H = "moyu-auto-fish-last-daily-start",
    I = 10 * 60 * 1e3;
  let F = null,
    C = !1;
  const P = T =>
      `${T.getFullYear()}-${String(T.getMonth() + 1).padStart(2, "0")}-${String(T.getDate()).padStart(2, "0")}`,
    g = () => {
      try {
        return localStorage.getItem(H) || "";
      } catch {
        return "";
      }
    },
    T = k => {
      try {
        localStorage.setItem(H, k);
      } catch {}
    },
    S = (k, X) => {
      (F && clearTimeout(F),
        (F = setTimeout(() => {
          ((F = null), k());
        }, Math.max(0, X || 0))));
    },
    Z = () => {
      const k = new Date(),
        X = P(k),
        U = new Date(k);
      U.setHours(7, 0, 0, 0);
      if (k >= U && g() !== X) {
        S(() => q(X), 0);
        return;
      }
      k >= U && U.setDate(U.getDate() + 1);
      S(() => q(P(U)), U.getTime() - k.getTime());
    },
    q = async k => {
      if (C || g() === k) {
        Z();
        return;
      }
      if (P(new Date()) !== k) {
        Z();
        return;
      }
      C = !0;
      try {
        (console.log(`[钓鱼] ${k} 07:00 自动开始钓鱼`),
          await m("/moyu/fishing/start", {
            method: "POST",
            auth: !0,
            loading: !1
          }),
          T(k),
          console.log("[钓鱼] 定时开始成功"));
      } catch (X) {
        console.log("[钓鱼] 定时开始失败，10 分钟后重试:", X);
      } finally {
        C = !1;
      }
      if (g() === k) Z();
      else S(() => q(k), I);
    },
    D = async () => {
      ((t.value = !0), await R());
    },
    $ = () => {
      t.value = !1;
    },
    R = async () => {
      j.value = !0;
      try {
        const P = await m("/moyu/auto-fish/config", {
          auth: !0
        });
        P &&
          ((y.value = {
            enabled: P.enabled || 0,
            keepFishIds: P.keepFishIds || ""
          }),
          (w.value = {
            totalKept: P.totalKept || 0,
            totalSold: P.totalSold || 0,
            totalEarned: P.totalEarned || 0
          }),
          (l.value = P.keepFishIds
            ? P.keepFishIds
                .split(",")
                .map(g => parseInt(g.trim()))
                .filter(g => !isNaN(g))
            : []));
      } catch {
      } finally {
        j.value = !1;
      }
    };
  Z();
  return {
    showAutoFishModal: t,
    autoFishConfig: y,
    autoFishStats: w,
    autoFishSaving: _,
    autoFishLoading: j,
    keepFishIds: l,
    FISH_LIST: re,
    fishGroups: L,
    RARITY_COLORS: ve,
    openAutoFishModal: D,
    closeAutoFishModal: $,
    loadAutoFishConfig: R,
    saveAutoFishConfig: async () => {
      var P;
      if (!((P = M.value) != null && P.isMember)) {
        typeof window < "u" && window.__openVipModal && window.__openVipModal();
        return;
      }
      _.value = !0;
      try {
        (await m("/moyu/auto-fish/config", {
          method: "POST",
          auth: !0,
          body: {
            keepFishIds: l.value.join(","),
            enabled: y.value.enabled
          }
        }),
          h("自动卖鱼配置已保存"));
      } catch (g) {
        h(g.message || "保存失败");
      } finally {
        _.value = !1;
      }
    },
    toggleAutoFish: async () => {
      var g;
      if (!((g = M.value) != null && g.isMember)) {
        typeof window < "u" && window.__openVipModal && window.__openVipModal();
        return;
      }
      const P = y.value.enabled !== 1;
      try {
        (await m(P ? "/moyu/auto-fish/start" : "/moyu/auto-fish/stop", {
          method: "POST",
          auth: !0
        }),
          (y.value.enabled = P ? 1 : 0),
          h(P ? "自动卖鱼已开启" : "自动卖鱼已关闭"));
      } catch (T) {
        h(T.message || "操作失败");
      }
    },
    toggleFish: P => {
      const g = l.value.indexOf(P);
      g === -1 ? l.value.push(P) : l.value.splice(g, 1);
    },
    isFishSelected: P => l.value.includes(P)
  };
}
export { xe as a, ke as b, Te as c, we as d, Ie as e, Pe as f };
