"use client";

import { useEffect, useRef, type ReactNode } from "react";
// Plain clsx, not cn(): tailwind-merge reads the custom text-display-* sizes
// as colours and drops them when a text-bone follows.
import clsx from "clsx";
import styles from "./crt-hero.module.css";

/**
 * A CRT backdrop for a hero: a scanline canvas behind the content, and a
 * brief corruption burst on a timer for any <GlitchText> inside it.
 *
 *   <CrtHero>
 *     <div className="...your layout...">
 *       <GlitchText as="h1" className="...">Headline</GlitchText>
 *       <nav>...untouched...</nav>
 *     </div>
 *   </CrtHero>
 *
 * Tunable constants
 * -----------------
 *   CLEAN_MS         How long each element stays clean and readable (ms).
 *   CORRUPT_MS       How long each corruption burst lasts (ms).
 *   SWEEP_SPEED      How fast the bright band moves down the canvas (CSS px/s).
 *   SCANLINE_ALPHA   Opacity of the static 1px scanlines.
 *   SCRAMBLE_CHANCE  Chance that a character is swapped at the height of a burst.
 *
 * Also adjustable: PHASE_MAX_MS, RAMP_MS, REROLL_MS, FLICKER_MS, SLICE_MAX_PX,
 * CHROMA_OPACITY, and the canvas geometry and colours below them.
 *
 * Contrast: the brightest background a character can sit on is a scanline,
 * the middle of the band and a grid line stacked together. The dimmest hero
 * text is --muted (#8b9599). At a band alpha of 0.05 that worst case is
 * 4.54:1, and away from a grid line it is 5.3:1. Raising BAND_ALPHA or
 * SCANLINE_ALPHA pushes the muted copy below 4.5:1.
 *
 * How it works: each GlitchText keeps its real content in normal flow, drawn
 * in a transparent colour. That content sets the element's size and is what
 * screen readers read. Six aria-hidden copies sit on top of it: the base, three
 * clipped slices and two tinted chromatic copies. One rAF loop draws the canvas
 * and, during a burst, changes those copies' text and styles. No DOM nodes are
 * created after mount.
 */

export const CLEAN_MS = 3000;
export const CORRUPT_MS = 550;
export const SWEEP_SPEED = 85;
export const SCANLINE_ALPHA = 0.055;
export const SCRAMBLE_CHANCE = 0.55;

const PHASE_MAX_MS = 500; // random per-element offset, so they don't glitch in unison
const RAMP_MS = 120; // fade in / out at each end of a burst
const REROLL_MS = 60; // new scrambled characters and slice bands
const FLICKER_MS = 50; // new base-layer opacity
const FLICKER_MIN = 0.85;
const SLICE_MAX_PX = 5;
const CHROMA_OPACITY = 0.55;

const SCANLINE_RGB = "29,158,117";
const SCANLINE_STEP = 3;
const BAND_RGB = "93,202,165";
const BAND_ALPHA = 0.05;
const BAND_HEIGHT = 120;
const BAND_GAP = 80; // offscreen distance at each end, so passes have a pause
const GRID_RGB = "93,202,165";
const GRID_ALPHA = 0.08;
const GRID_STEP = 40;

const GLYPHS = "0123456789ABCDEF#%&/\\<>*+=";
// Only letters and digits are swapped, so spaces and punctuation stay put.
const SCRAMBLABLE = /[\p{L}\p{N}]/u;

const LAYERS = ["base", "slice", "slice", "slice", "green", "red"] as const;

type Track = {
  root: HTMLElement;
  real: Text[];
  /** Text nodes of each layer, index-aligned with `real`. */
  layers: Text[][];
  base: HTMLElement;
  slices: HTMLElement[];
  chroma: HTMLElement[];
  /** The real strings, with measured line breaks once the element is locked. */
  lines: string[];
  phase: number;
  corrupt: boolean;
  roll: number;
  flick: number;
  flickBucket: number;
  offsets: number[];
};

const textNodes = (el: Node): Text[] => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const out: Text[] = [];
  while (walker.nextNode()) out.push(walker.currentNode as Text);
  return out;
};

export function CrtHero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    const tracks = Array.from(
      section.querySelectorAll<HTMLElement>("[data-crt-glitch]"),
    ).flatMap((root): Track[] => {
      const realEl = root.querySelector(`.${styles.real}`);
      if (!realEl) return [];
      const real = textNodes(realEl);
      const layerEls = Array.from(
        root.querySelectorAll<HTMLElement>("[data-crt-layer]"),
      );
      const layers = layerEls.map(textNodes);
      if (!real.length || layers.some((l) => l.length !== real.length)) {
        return [];
      }
      const byKind = (kind: string) =>
        layerEls.filter((el) => el.dataset.crtLayer === kind);
      return [
        {
          root,
          real,
          layers,
          base: byKind("base")[0],
          slices: byKind("slice"),
          chroma: [...byKind("green"), ...byKind("red")],
          lines: real.map((node) => node.data),
          phase: Math.random() * PHASE_MAX_MS,
          corrupt: false,
          roll: -1,
          flick: 1,
          flickBucket: -1,
          offsets: [0, 0, 0],
        },
      ];
    });

    const setText = (track: Track, values: string[]) => {
      for (const nodes of track.layers) {
        nodes.forEach((node, i) => {
          if (node.data !== values[i]) node.data = values[i];
        });
      }
    };

    const setClean = (track: Track) => {
      setText(track, track.lines);
      track.base.style.opacity = "";
      for (const el of [...track.slices, ...track.chroma]) {
        el.style.opacity = "";
        el.style.transform = "";
      }
      for (const el of track.slices) el.style.clipPath = "";
      track.corrupt = false;
      track.roll = -1;
      track.flickBucket = -1;
    };

    // Measure where the real text wraps and write those breaks into the
    // layers. With `white-space: pre` on the layers, a scrambled line keeps
    // its words on the same lines as the real text, whatever the glyph widths.
    const range = document.createRange();
    const lockLines = (track: Track) => {
      const outs = track.real.map(() => "");
      let lineTop: number | null = null;
      track.real.forEach((node, n) => {
        const text = node.data;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (!/\s/.test(ch)) {
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rect = range.getClientRects()[0];
            if (rect) {
              if (lineTop === null) lineTop = rect.top;
              else if (rect.top > lineTop + rect.height / 2) {
                // Drop the space the line broke on, even if it ended an
                // earlier text node.
                for (let m = n; m >= 0; m--) {
                  outs[m] = outs[m].trimEnd();
                  if (outs[m]) break;
                }
                outs[n] += "\n";
                lineTop = rect.top;
              }
            }
          }
          outs[n] += ch;
        }
      });
      track.lines = outs;
      track.root.classList.add(styles.locked);
      if (!track.corrupt) setText(track, outs);
    };
    const lockAll = () => tracks.forEach(lockLines);

    const scramble = (value: string, chance: number) => {
      let out = "";
      for (const ch of value) {
        out +=
          SCRAMBLABLE.test(ch) && Math.random() < chance
            ? GLYPHS[(Math.random() * GLYPHS.length) | 0]
            : ch;
      }
      return out;
    };

    const stepText = (track: Track, elapsed: number) => {
      const local = elapsed - track.phase;
      const t = local < 0 ? -1 : (local % (CLEAN_MS + CORRUPT_MS)) - CLEAN_MS;
      if (t < 0) {
        if (track.corrupt) setClean(track);
        return;
      }
      track.corrupt = true;

      // 0 → 1 over the first RAMP_MS, 1 → 0 over the last RAMP_MS.
      const k = Math.max(
        0,
        Math.min(1, t / RAMP_MS, (CORRUPT_MS - t) / RAMP_MS),
      );

      const roll = Math.floor(local / REROLL_MS);
      if (roll !== track.roll) {
        track.roll = roll;
        // Peaks at SCRAMBLE_CHANCE in the middle of the burst.
        const chance =
          SCRAMBLE_CHANCE *
          k *
          (0.7 + 0.3 * Math.sin((Math.PI * t) / CORRUPT_MS));
        setText(
          track,
          track.lines.map((line) => scramble(line, chance)),
        );
        track.slices.forEach((el, i) => {
          // One band in each third of the element, so the three rarely overlap.
          const height = 8 + Math.random() * 18;
          const top = i * 33.3 + Math.random() * (33.3 - height * 0.5);
          el.style.clipPath = `inset(${top.toFixed(1)}% 0 ${Math.max(0, 100 - top - height).toFixed(1)}% 0)`;
          track.offsets[i] = (Math.random() * 2 - 1) * SLICE_MAX_PX;
        });
      }

      const flickBucket = Math.floor(local / FLICKER_MS);
      if (flickBucket !== track.flickBucket) {
        track.flickBucket = flickBucket;
        track.flick = FLICKER_MIN + Math.random() * (1 - FLICKER_MIN);
      }

      track.base.style.opacity = String(1 - (1 - track.flick) * k);
      track.slices.forEach((el, i) => {
        el.style.opacity = String(k);
        el.style.transform = `translateX(${(track.offsets[i] * k).toFixed(2)}px)`;
      });
      track.chroma.forEach((el, i) => {
        el.style.opacity = String(CHROMA_OPACITY * k);
        el.style.transform = `translateX(${i === 0 ? -2 : 2}px)`;
      });
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bg = "#0a0e14";
    const draw = (elapsed: number, sweep: boolean) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = `rgba(${SCANLINE_RGB},${SCANLINE_ALPHA})`;
      ctx.beginPath();
      for (let y = 0; y < height; y += SCANLINE_STEP) ctx.rect(0, y, width, 1);
      ctx.fill();

      if (sweep) {
        const travel = height + BAND_HEIGHT + 2 * BAND_GAP;
        const top =
          -BAND_HEIGHT - BAND_GAP + (((elapsed / 1000) * SWEEP_SPEED) % travel);
        const band = ctx.createLinearGradient(0, top, 0, top + BAND_HEIGHT);
        band.addColorStop(0, `rgba(${BAND_RGB},0)`);
        band.addColorStop(0.5, `rgba(${BAND_RGB},${BAND_ALPHA})`);
        band.addColorStop(1, `rgba(${BAND_RGB},0)`);
        ctx.fillStyle = band;
        ctx.fillRect(0, top, width, BAND_HEIGHT);
      }

      ctx.fillStyle = `rgba(${GRID_RGB},${GRID_ALPHA})`;
      ctx.beginPath();
      for (let x = 0; x < width; x += GRID_STEP) ctx.rect(x, 0, 1, height);
      ctx.fill();
    };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    let inView = false;
    let pageVisible = document.visibilityState !== "hidden";
    let raf = 0;
    let last = 0;
    // Time the section has actually been on screen. It stops while the loop
    // is paused, so a burst never starts off screen or with the tab hidden.
    let elapsed = 0;

    const frame = (now: number) => {
      elapsed += last ? Math.min(now - last, 100) : 0;
      last = now;
      draw(elapsed, true);
      for (const track of tracks) stepText(track, elapsed);
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const run = !reduced && inView && pageVisible;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = section.clientWidth;
      height = section.clientHeight;
      bg = getComputedStyle(section).backgroundColor || bg;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Resizing clears the canvas. Repaint now instead of waiting for the next
      // frame; with reduced motion there is no next frame.
      draw(elapsed, !reduced);
      lockAll();
    };

    const onMotionChange = () => {
      reduced = motion.matches;
      if (reduced) tracks.forEach(setClean);
      sync();
      draw(elapsed, !reduced);
    };

    const onVisibility = () => {
      pageVisible = document.visibilityState !== "hidden";
      sync();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(section);

    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotionChange);
    // Web fonts change glyph widths and so the line breaks.
    document.fonts?.ready.then(lockAll);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotionChange);
      tracks.forEach((track) => {
        track.lines = track.real.map((node) => node.data);
        setClean(track);
        track.root.classList.remove(styles.locked);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={clsx(styles.hero, className)}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </section>
  );
}

/**
 * Text that corrupts in bursts when it sits inside a <CrtHero>. Children may
 * include inline formatting such as a coloured <span>, but no links or other
 * interactive elements: the children are rendered seven times, and the six
 * decorative copies must stay out of the tab order.
 */
export function GlitchText({
  as: Tag = "p",
  className,
  children,
}: {
  as?: "p" | "h1" | "h2" | "span";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={clsx(styles.glitch, className)} data-crt-glitch="">
      <span className={styles.real}>{children}</span>
      {LAYERS.map((kind, i) => (
        <span
          key={i}
          aria-hidden="true"
          data-crt-layer={kind}
          className={clsx(styles.layer, kind !== "base" && styles[kind])}
        >
          {children}
        </span>
      ))}
    </Tag>
  );
}
