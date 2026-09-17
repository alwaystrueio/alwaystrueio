"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The services section, drawn as the shape of a Cardano transaction:
 * inputs are consumed, a validator runs, outputs are produced. The four
 * outputs are the four things alwaystrue delivers.
 *
 * One data source drives two layouts — a wired SVG graph from `lg` up, and a
 * stacked list below it, where the connectors would be unreadable.
 */

const INPUTS = [
  { id: "contracts", label: "your contracts" },
  { id: "roadmap", label: "your roadmap" },
  { id: "team", label: "your team" },
] as const;

const OUTPUTS = [
  { id: "audits", label: "findings report", href: "#audits" },
  { id: "products", label: "shipped product", href: "#products" },
  { id: "engineers", label: "embedded engineers", href: "#engineers" },
  { id: "open-source", label: "upstream commits", href: "#open-source" },
] as const;

// Geometry for the desktop graph. Kept as constants so the boxes and the
// bezier connectors can never drift apart. PAD keeps the 1px box strokes off
// the viewBox edge, where they would be clipped in half.
const PAD = 4;
const VB = { w: 1040, h: 440 };
const AXIS = VB.h / 2;
const IN = { x: 0, w: 200, h: 64, centers: [92, 220, 348] };
const VAL = { x: 420, w: 200, h: 80 };
const OUT = { x: 830, w: 210, h: 60, centers: [61, 167, 273, 379] };

export function TransactionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Guard for older Safari and for test environments.
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Desktop: the wired graph */}
      <svg
        viewBox={`${-PAD} ${-PAD} ${VB.w + PAD * 2} ${VB.h + PAD * 2}`}
        className="hidden w-full lg:block"
        role="img"
        aria-label="A Cardano transaction: your contracts, roadmap and team are the inputs; alwaystrue is the validator; the outputs are a findings report, a shipped product, embedded engineers and upstream commits."
      >
        <g
          stroke="var(--line-bright)"
          strokeWidth={1.25}
          fill="none"
          style={{ opacity: live ? 1 : 0, transition: "opacity 0.3s" }}
        >
          {IN.centers.map((cy, i) => (
            <path
              key={`in-${i}`}
              d={`M ${IN.w},${cy} C ${IN.w + 100},${cy} ${IN.w + 130},${AXIS} ${VAL.x},${AXIS}`}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={live ? 0 : 1}
              style={{
                transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.1 + i * 0.09}s`,
              }}
            />
          ))}
          {OUT.centers.map((cy, i) => (
            <path
              key={`out-${i}`}
              d={`M ${VAL.x + VAL.w},${AXIS} C ${VAL.x + VAL.w + 100},${AXIS} ${OUT.x - 80},${cy} ${OUT.x},${cy}`}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={live ? 0 : 1}
              stroke="var(--teal)"
              strokeOpacity={0.55}
              style={{
                transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.55 + i * 0.09}s`,
              }}
            />
          ))}
        </g>

        {/* Inputs */}
        {INPUTS.map((input, i) => {
          const cy = IN.centers[i];
          return (
            <g
              key={input.id}
              style={{
                opacity: live ? 1 : 0,
                transform: live ? "none" : "translateX(-10px)",
                transition: "opacity 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <rect
                x={IN.x}
                y={cy - IN.h / 2}
                width={IN.w}
                height={IN.h}
                rx={3}
                fill="var(--ink-raised)"
                stroke="var(--line)"
              />
              <text
                x={IN.x + 20}
                y={cy + 5}
                fill="var(--muted)"
                className="font-mono"
                fontSize={14}
              >
                {input.label}
              </text>
            </g>
          );
        })}

        {/* The validator */}
        <g
          style={{
            opacity: live ? 1 : 0,
            transition: "opacity 0.7s",
            transitionDelay: "0.35s",
          }}
        >
          <rect
            x={VAL.x}
            y={AXIS - VAL.h / 2}
            width={VAL.w}
            height={VAL.h}
            rx={3}
            fill="var(--ink-raised)"
            stroke="var(--brand)"
            strokeWidth={1.5}
          />
          <text
            x={VAL.x + VAL.w / 2}
            y={AXIS + 6}
            fill="var(--brand)"
            textAnchor="middle"
            className="font-mono"
            fontSize={18}
            fontWeight={600}
          >
            alwaystrue
          </text>
        </g>

        {/* Outputs. Each one links to the practice that produces it. */}
        {OUTPUTS.map((output, i) => {
          const cy = OUT.centers[i];
          return (
            <a
              key={output.id}
              href={output.href}
              className="group"
              style={{
                opacity: live ? 1 : 0,
                transform: live ? "none" : "translateX(10px)",
                transition: "opacity 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.7 + i * 0.08}s`,
              }}
            >
              <rect
                x={OUT.x}
                y={cy - OUT.h / 2}
                width={OUT.w}
                height={OUT.h}
                rx={3}
                fill="var(--ink-raised)"
                stroke="var(--line-bright)"
                className="transition-colors group-hover:stroke-brand"
              />
              <text
                x={OUT.x + 20}
                y={cy + 5}
                fill="var(--bone)"
                className="font-mono"
                fontSize={14}
              >
                {output.label}
              </text>
            </a>
          );
        })}

      </svg>

      {/* Mobile: the same transaction, stacked */}
      <div className="lg:hidden">
        <ul className="space-y-2">
          {INPUTS.map((input) => (
            <li
              key={input.id}
              className="rounded-sm border border-line bg-ink-raised px-4 py-3 font-mono text-[13px] text-muted"
            >
              {input.label}
            </li>
          ))}
        </ul>

        <div className="ml-6 h-8 w-px bg-line-bright" aria-hidden />

        <div className="rounded-sm border border-brand bg-ink-raised px-4 py-5 text-center">
          <p className="font-mono text-base font-semibold text-brand">alwaystrue</p>
        </div>

        <div className="ml-6 h-8 w-px bg-teal opacity-60" aria-hidden />

        <ul className="space-y-2">
          {OUTPUTS.map((output) => (
            <li key={output.id}>
              <a
                href={output.href}
                className="block rounded-sm border border-line-bright bg-ink-raised px-4 py-3 font-mono text-[13px] text-bone transition-colors hover:border-brand"
              >
                {output.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
