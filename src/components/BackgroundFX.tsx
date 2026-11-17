"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide animated backdrop, drawn on one canvas behind all content:
 *  - a drifting "neural network" of nodes and links; links reach toward the pointer
 *  - floating numbers and ML notation (weights, accuracy, loss, λ, Σ …) that rise and fade
 *  - small live graphs that draw themselves, then fade away:
 *      straight:  line chart, bar chart, scatter + regression line
 *      curved:    smooth spline chart, falling loss curve, bell curves,
 *                 S-shaped sigmoid, ROC curve, sine wave, circular gauge
 *  - soft colour orbs and a faint grid (pure CSS, behind the canvas)
 *
 * Colours come from the CSS variables (--text, --gold, --emerald, --royal, --plum)
 * and are re-read whenever the theme changes, so light and dark both look right.
 *
 * Performance: ~30 fps cap, devicePixelRatio ≤ 1.5, batched network strokes,
 * fewer glyphs on small screens, paused when the tab is hidden, and one static
 * frame when the visitor prefers reduced motion.
 */

type RGB = [number, number, number];
const GRAPH_KINDS = ["line", "bars", "scatter", "spline", "loss", "bell", "sigmoid", "roc", "wave", "gauge"] as const;
/** Only smooth, curved graphs appear in the background. */
const CURVED_KINDS = ["spline", "loss", "bell", "sigmoid", "roc", "wave"] as const;
type GraphKind = (typeof GRAPH_KINDS)[number];
type GlyphKind = "num" | GraphKind;
type Glyph = {
  kind: GlyphKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  age: number;
  life: number;
  hue: number; // index into the accent palette
  text?: string;
  size?: number;
  data?: number[];
  pts?: [number, number][];
  phase?: number;
  /** 1 = full strength, eases toward ~0.12 while behind text */
  dim: number;
  /** measured width of a number label */
  tw?: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v: number, a = 0.04, b = 0.96) => Math.min(b, Math.max(a, v));

function parseColor(value: string, fallback: RGB): RGB {
  const v = value.trim();
  const hex = v.match(/^#?([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = v.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return fallback;
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a)).toFixed(3)})`;

function makeNumber(): string {
  const gens = [
    // numbers
    () => rand(0, 1).toFixed(3),
    () => `${rand(82, 99.6).toFixed(1)}%`,
    () => pick(["128", "256", "512", "1,024", "2,048", "4,096"]),
    () => `loss ${rand(0.02, 0.6).toFixed(3)}`,
    () => `acc ${rand(0.81, 0.99).toFixed(2)}`,
    () => `λ=${pick(["0.01", "0.001", "1e-4", "3e-5"])}`,
    () => `[${rand(-1, 1).toFixed(2)}, ${rand(-1, 1).toFixed(2)}]`,
    // maths symbols
    () => pick(["Σ", "∫", "∂", "∇", "√", "π", "∞", "θ", "μ", "σ", "λ", "≈", "≠", "±", "Δ", "ŷ"]),
    () => pick(["Σ", "∫", "∂", "∇", "π", "∞", "θ", "σ"]),
    // short equations
    () =>
      pick([
        "∫ f(x) dx",
        "∂L/∂w",
        "y = wx + b",
        "√2 ≈ 1.414",
        "π ≈ 3.1416",
        "Σx / n",
        "P(A|B)",
        "σ(z) = 1/(1+e^-z)",
        "∇θ J(θ)",
        "e^x",
        "f(x) = x²",
        "softmax(z)",
        "x̄ ± σ",
        "lim n→∞",
        "dy/dx",
        "‖v‖",
      ]),
  ];
  return pick(gens)();
}

function makeSeries(n: number) {
  const out: number[] = [];
  let v = rand(0.3, 0.7);
  for (let i = 0; i < n; i++) {
    v = clamp(v + rand(-0.2, 0.22), 0.08, 0.92);
    out.push(v);
  }
  return out;
}

/** Smooth value along a series (Catmull-Rom), u in [0, 1]. */
function splineAt(data: number[], u: number) {
  const n = data.length - 1;
  const x = u * n;
  const i = Math.min(n - 1, Math.floor(x));
  const t = x - i;
  const p0 = data[Math.max(0, i - 1)];
  const p1 = data[i];
  const p2 = data[i + 1];
  const p3 = data[Math.min(n, i + 2)];
  const t2 = t * t;
  const t3 = t2 * t;
  return clamp(
    0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3),
    0.03,
    0.97
  );
}

export function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // theme-dependent colours (re-read when the theme changes)
    let INK: RGB = [22, 23, 27];
    let palette: RGB[] = [];
    let isDark = false;
    let monoFamily = "ui-monospace, monospace";
    const readColors = () => {
      const css = getComputedStyle(root);
      INK = parseColor(css.getPropertyValue("--text"), [22, 23, 27]);
      palette = [
        parseColor(css.getPropertyValue("--gold"), [143, 107, 37]),
        parseColor(css.getPropertyValue("--emerald"), [15, 118, 110]),
        parseColor(css.getPropertyValue("--royal"), [59, 79, 216]),
        parseColor(css.getPropertyValue("--plum"), [147, 51, 234]),
      ];
      isDark = INK[0] + INK[1] + INK[2] > 382; // light text ⇒ dark background
      monoFamily = css.getPropertyValue("--font-jetbrains").trim() || monoFamily;
    };
    readColors();
    // on dark backgrounds the same opacity reads weaker, so lift it a little
    const boost = () => (isDark ? 1.2 : 1);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let pts: P[] = [];
    let glyphs: Glyph[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = 0; // seconds of animation time
    const FRAME_MS = 1000 / 30;
    const DT = 1 / 30;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;
    const LINK2 = LINK * LINK;
    const MOUSE = 190;
    const BUCKETS = 4;
    const HEADER = 72; // px kept clear for the sticky navigation
    /** Overall strength of the animation (1 = full). Lower = subtler. */
    const INTENSITY = 0.65;

    // ---- keep the main text readable ----
    // Bounding boxes of on-screen text. Graphs and numbers that drift behind them fade out.
    const TEXT_SELECTOR =
      "main h1, main h2, main h3, main h4, main p, main summary, main li, main blockquote, main label, main dt, main dd, main figcaption, main td, main th, main a, main button, footer p, footer a";
    type Box = { l: number; t: number; r: number; b: number };
    let textBoxes: Box[] = [];
    let textDirty = true;
    let lastCollect = 0;
    const range = document.createRange();
    const collectText = () => {
      const out: Box[] = [];
      const vh = window.innerHeight;
      for (const el of document.querySelectorAll(TEXT_SELECTOR)) {
        const outer = el.getBoundingClientRect();
        if (outer.bottom < 0 || outer.top > vh || outer.width === 0) continue;
        // tight box around the actual text, not the full-width row
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        out.push({ l: r.left - 18, t: r.top - 12, r: r.right + 18, b: r.bottom + 12 });
      }
      textBoxes = out;
      textDirty = false;
      lastCollect = performance.now();
    };
    const glyphBox = (g: Glyph): Box =>
      g.kind === "num"
        ? { l: g.x, t: g.y - (g.size ?? 12), r: g.x + (g.tw ?? 60), b: g.y + 4 }
        : { l: g.x, t: g.y - 14, r: g.x + g.w, b: g.y + g.h };
    const behindText = (g: Glyph) => {
      const a = glyphBox(g);
      for (const b of textBoxes) if (a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t) return true;
      return false;
    };

    const spawnGlyph = (kind: GlyphKind): Glyph => {
      const small = w < 700;
      const g: Glyph = {
        kind,
        x: rand(0, w),
        y: rand(HEADER, h),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.45, -0.15),
        w: 0,
        h: 0,
        age: 0,
        life: rand(9, 16),
        hue: Math.floor(Math.random() * 4),
        dim: 1,
      };
      if (kind === "num") {
        g.text = makeNumber();
        g.size = rand(11, small ? 13 : 16);
        ctx.font = `500 ${g.size.toFixed(1)}px ${monoFamily}`;
        g.tw = ctx.measureText(g.text).width;
        return g;
      }
      g.w = kind === "gauge" ? rand(small ? 54 : 70, small ? 70 : 96) : rand(small ? 80 : 110, small ? 112 : 170);
      g.h = kind === "gauge" ? g.w * 0.62 : g.w * rand(0.5, 0.62);
      g.life = rand(13, 22);
      g.x = rand(0, Math.max(1, w - g.w));
      g.y = rand(HEADER + 30, Math.max(HEADER + 31, h - g.h - 20));
      g.vx = rand(-0.1, 0.1);
      g.vy = rand(-0.05, 0.05);
      g.phase = rand(0, Math.PI * 2);
      if (kind === "line" || kind === "spline") g.data = makeSeries(kind === "line" ? 12 : 8);
      if (kind === "bars") g.data = Array.from({ length: 7 }, () => rand(0.2, 0.9));
      if (kind === "scatter") {
        const slope = rand(0.35, 0.8);
        g.pts = Array.from({ length: 18 }, () => {
          const x = rand(0.05, 0.95);
          return [x, clamp(0.1 + slope * x + rand(-0.14, 0.14))];
        });
        g.data = [slope];
      }
      if (kind === "bell") g.data = [rand(0.32, 0.45), rand(0.1, 0.14), rand(0.55, 0.68), rand(0.08, 0.12)]; // μ1 σ1 μ2 σ2
      if (kind === "sigmoid") g.data = [rand(9, 14)];
      if (kind === "roc") g.data = [rand(3, 6)];
      if (kind === "gauge") g.data = [rand(0.62, 0.97)];
      return g;
    };

    const spawnGraph = () => spawnGlyph(pick(CURVED_KINDS));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(24, Math.min(60, Math.floor((w * h) / 22000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.8,
        hue: Math.random() < 0.55 ? -1 : Math.floor(Math.random() * 4), // -1 = ink
      }));

      const area = w * h;
      const numCount = Math.max(10, Math.min(18, Math.round(area / 70000)));
      const graphCount = w < 700 ? 2 : Math.max(4, Math.min(6, Math.round(area / 220000)));
      glyphs = [
        ...Array.from({ length: numCount }, () => {
          const g = spawnGlyph("num");
          g.age = rand(0, g.life);
          return g;
        }),
        ...Array.from({ length: graphCount }, (_, i) => {
          // first pass: one of each curved kind, so every visit shows variety
          const curved: GraphKind[] = [...CURVED_KINDS];
          const g = spawnGlyph(i < curved.length ? curved[i] : pick(CURVED_KINDS));
          g.age = rand(0, g.life * 0.7);
          return g;
        }),
      ];
      if (reduce) {
        collectText();
        for (const g of glyphs) {
          g.age = g.life * 0.5;
          g.dim = behindText(g) ? 0.12 : 1;
        }
        draw();
      }
    };

    /** 0 → 1 → 0 over a glyph's life, faded out near the navigation */
    const envelope = (g: Glyph) => {
      const p = g.age / g.life;
      const life = p < 0.12 ? p / 0.12 : p > 0.8 ? Math.max(0, (1 - p) / 0.2) : 1;
      const top = Math.min(1, Math.max(0, (g.y - HEADER) / 70));
      return life * top;
    };

    const drawAxes = (g: Glyph, a: number) => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(INK, 0.24 * a);
      ctx.beginPath();
      ctx.moveTo(g.x, g.y);
      ctx.lineTo(g.x, g.y + g.h);
      ctx.lineTo(g.x + g.w, g.y + g.h);
      ctx.stroke();
      ctx.strokeStyle = rgba(INK, 0.08 * a);
      ctx.beginPath();
      for (let i = 1; i <= 2; i++) {
        const y = g.y + (g.h * i) / 3;
        ctx.moveTo(g.x, y);
        ctx.lineTo(g.x + g.w, y);
      }
      ctx.stroke();
    };

    const label = (g: Glyph, text: string, a: number) => {
      ctx.font = `500 10px ${monoFamily}`;
      ctx.fillStyle = rgba(palette[g.hue], 0.6 * a);
      ctx.fillText(text, g.x + 4, g.y - 5);
    };

    /** Draws a curve y = f(u) from u = 0 to u = prog, with an optional soft area fill and a glowing head. */
    const curve = (
      g: Glyph,
      f: (u: number) => number,
      a: number,
      prog: number,
      opts: { fill?: boolean; head?: boolean; dash?: boolean; color?: RGB; width?: number } = {}
    ) => {
      const color = opts.color ?? palette[g.hue];
      const X = (u: number) => g.x + u * g.w;
      const Y = (v: number) => g.y + g.h - v * g.h;
      const steps = 48;
      const end = Math.max(0.001, prog);
      const path = new Path2D();
      for (let i = 0; i <= steps; i++) {
        const u = (i / steps) * end;
        if (i === 0) path.moveTo(X(u), Y(f(u)));
        else path.lineTo(X(u), Y(f(u)));
      }
      if (opts.fill) {
        const area = new Path2D(path);
        area.lineTo(X(end), Y(0));
        area.lineTo(X(0), Y(0));
        area.closePath();
        const grad = ctx.createLinearGradient(0, g.y, 0, g.y + g.h);
        grad.addColorStop(0, rgba(color, 0.22 * a));
        grad.addColorStop(1, rgba(color, 0));
        ctx.fillStyle = grad;
        ctx.fill(area);
      }
      ctx.lineWidth = opts.width ?? 1.8;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (opts.dash) ctx.setLineDash([4, 4]);
      ctx.strokeStyle = rgba(color, (opts.dash ? 0.5 : 0.85) * a);
      ctx.stroke(path);
      if (opts.dash) ctx.setLineDash([]);
      if (opts.head && prog < 1.001) {
        const hx = X(end);
        const hy = Y(f(end));
        ctx.fillStyle = rgba(color, 0.25 * a);
        ctx.beginPath();
        ctx.arc(hx, hy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(color, a);
        ctx.beginPath();
        ctx.arc(hx, hy, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawGlyph = (g: Glyph) => {
      const a = envelope(g) * boost() * INTENSITY * g.dim;
      if (a <= 0) return;
      const color = palette[g.hue];

      if (g.kind === "num") {
        ctx.font = `500 ${g.size!.toFixed(1)}px ${monoFamily}`;
        ctx.fillStyle = rgba(color, 0.5 * a);
        ctx.fillText(g.text!, g.x, g.y);
        return;
      }

      const prog = Math.min(1, g.age / (g.life * 0.38)); // drawn during the first ~40% of life
      const ph = g.phase!;

      if (g.kind === "gauge") {
        const cx = g.x + g.w / 2;
        const cy = g.y + g.h;
        const r = g.w / 2 - 4;
        const value = g.data![0] * prog;
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = rgba(INK, 0.1 * a);
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = rgba(color, 0.85 * a);
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * value);
        ctx.stroke();
        ctx.font = `600 ${Math.round(g.w / 5.5)}px ${monoFamily}`;
        ctx.fillStyle = rgba(color, 0.85 * a);
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round(value * 100)}%`, cx, cy - 4);
        ctx.textAlign = "start";
        return;
      }

      drawAxes(g, a);
      const X = (u: number) => g.x + u * g.w;
      const Y = (v: number) => g.y + g.h - v * g.h;

      switch (g.kind) {
        case "line": {
          const d = g.data!;
          const n = d.length - 1;
          const f = (u: number) => {
            const x = u * n;
            const i = Math.min(n - 1, Math.floor(x));
            return d[i] + (d[i + 1] - d[i]) * (x - i);
          };
          curve(g, f, a, prog, { fill: true, head: true });
          label(g, "accuracy", a);
          break;
        }
        case "spline": {
          curve(g, (u) => splineAt(g.data!, u), a, prog, { fill: true, head: true });
          label(g, "users", a);
          break;
        }
        case "loss": {
          curve(g, (u) => clamp(0.08 + 0.85 * Math.exp(-3.4 * u) + 0.03 * Math.sin(u * 14 + ph)), a, prog, { fill: true, head: true });
          // validation loss: a second, dashed curve
          curve(g, (u) => clamp(0.14 + 0.8 * Math.exp(-2.6 * u) + 0.04 * Math.sin(u * 11 + ph + 1)), a, prog, {
            dash: true,
            color: palette[(g.hue + 2) % 4],
            width: 1.4,
          });
          label(g, "loss ↓", a);
          break;
        }
        case "bell": {
          const [m1, s1, m2, s2] = g.data!;
          const gauss = (u: number, m: number, s: number) => Math.exp(-((u - m) ** 2) / (2 * s * s));
          curve(g, (u) => 0.04 + 0.86 * gauss(u, m1, s1), a, prog, { fill: true });
          curve(g, (u) => 0.04 + 0.7 * gauss(u, m2, s2), a, prog, { fill: true, color: palette[(g.hue + 1) % 4] });
          // mean markers
          if (prog >= 1) {
            ctx.setLineDash([2, 4]);
            ctx.strokeStyle = rgba(INK, 0.25 * a);
            ctx.beginPath();
            ctx.moveTo(X(m1), Y(0));
            ctx.lineTo(X(m1), Y(0.9));
            ctx.moveTo(X(m2), Y(0));
            ctx.lineTo(X(m2), Y(0.74));
            ctx.stroke();
            ctx.setLineDash([]);
          }
          label(g, "distribution", a);
          break;
        }
        case "sigmoid": {
          const k = g.data![0];
          curve(g, (u) => 0.06 + 0.88 / (1 + Math.exp(-k * (u - 0.5))), a, prog, { head: true });
          label(g, "σ(x)", a);
          break;
        }
        case "roc": {
          const k = g.data![0];
          // random-guess diagonal
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = rgba(INK, 0.22 * a);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(X(0), Y(0));
          ctx.lineTo(X(1), Y(1));
          ctx.stroke();
          ctx.setLineDash([]);
          curve(g, (u) => 1 - Math.pow(1 - u, k), a, prog, { fill: true, head: true });
          label(g, "ROC", a);
          break;
        }
        case "wave": {
          curve(g, (u) => 0.5 + 0.34 * Math.sin(u * Math.PI * 3 + t * 1.6 + ph) * (0.55 + 0.45 * Math.sin(u * Math.PI)), a, prog, {});
          curve(g, (u) => 0.5 + 0.22 * Math.sin(u * Math.PI * 4 - t * 1.2 + ph), a, prog, { dash: true, color: palette[(g.hue + 3) % 4], width: 1.3 });
          label(g, "signal", a);
          break;
        }
        case "bars": {
          const n = g.data!.length;
          const gap = g.w * 0.06;
          const bw = (g.w - gap * (n + 1)) / n;
          for (let i = 0; i < n; i++) {
            const v = clamp(g.data![i] + 0.12 * Math.sin(t * 1.3 + i * 0.9 + ph), 0.08, 0.95);
            const bh = v * g.h * prog;
            const bx = g.x + gap + i * (bw + gap);
            const grad = ctx.createLinearGradient(0, g.y + g.h - bh, 0, g.y + g.h);
            grad.addColorStop(0, rgba(color, 0.6 * a));
            grad.addColorStop(1, rgba(color, 0.15 * a));
            ctx.fillStyle = grad;
            ctx.fillRect(bx, g.y + g.h - bh, bw, bh);
          }
          label(g, "tokens / day", a);
          break;
        }
        case "scatter": {
          const shown = Math.ceil(prog * g.pts!.length);
          ctx.fillStyle = rgba(color, 0.7 * a);
          for (let i = 0; i < shown; i++) {
            const [u, v] = g.pts![i];
            ctx.beginPath();
            ctx.arc(X(u), Y(v), 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
          if (prog >= 1) {
            const slope = g.data![0];
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = rgba(color, 0.7 * a);
            ctx.beginPath();
            ctx.moveTo(X(0.02), Y(0.1 + slope * 0.02));
            ctx.lineTo(X(0.98), Y(Math.min(0.98, 0.1 + slope * 0.98)));
            ctx.stroke();
            ctx.setLineDash([]);
          }
          label(g, "regression", a);
          break;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const b = boost() * INTENSITY;

      // graphs and numbers sit behind the network
      for (const g of glyphs) drawGlyph(g);

      // network links, batched by strength
      const buckets: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const mousePath = new Path2D();
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const strength = 1 - Math.sqrt(d2) / LINK;
            const k = Math.min(BUCKETS - 1, Math.floor(strength * BUCKETS));
            buckets[k].moveTo(p.x, p.y);
            buckets[k].lineTo(q.x, q.y);
          }
        }
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        if (mdx * mdx + mdy * mdy < MOUSE * MOUSE) {
          mousePath.moveTo(p.x, p.y);
          mousePath.lineTo(mouse.x, mouse.y);
        }
      }
      ctx.lineWidth = 1;
      for (let k = 0; k < BUCKETS; k++) {
        ctx.strokeStyle = rgba(INK, ((k + 1) / BUCKETS) * 0.2 * b);
        ctx.stroke(buckets[k]);
      }
      ctx.strokeStyle = rgba(palette[0], 0.5 * b);
      ctx.stroke(mousePath);

      // nodes, one fill per colour
      const dots = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      for (const p of pts) {
        const idx = p.hue + 1;
        const r = p.hue >= 0 ? p.r + 0.5 : p.r;
        dots[idx].moveTo(p.x + r, p.y);
        dots[idx].arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = rgba(INK, 0.4 * b);
      ctx.fill(dots[0]);
      for (let k = 0; k < 4; k++) {
        ctx.fillStyle = rgba(palette[k], 0.85 * INTENSITY);
        ctx.fill(dots[k + 1]);
      }
    };

    const step = () => {
      t += DT;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }
      if (textDirty || performance.now() - lastCollect > 1000) collectText();
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        g.age += DT;
        g.x += g.vx;
        g.y += g.vy;
        const target = behindText(g) ? 0.12 : 1;
        g.dim += (target - g.dim) * 0.12;
        if (g.age >= g.life) glyphs[i] = g.kind === "num" ? spawnGlyph("num") : spawnGraph();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      step();
      draw();
    };

    const onScroll = () => {
      if (performance.now() - lastCollect > 120) textDirty = true;
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    // follow theme switches (the toggle) and device light/dark changes
    const onTheme = () => {
      // wait one frame so the new CSS variables are in effect
      requestAnimationFrame(() => {
        readColors();
        if (reduce) draw();
      });
    };
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    schemeQuery.addEventListener("change", onTheme);

    resize();
    if (!reduce) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      themeObserver.disconnect();
      schemeQuery.removeEventListener("change", onTheme);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="orb orb-gold" />
      <div className="orb orb-emerald" />
      <div className="orb orb-plum" />
      <div className="orb orb-signal" />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
