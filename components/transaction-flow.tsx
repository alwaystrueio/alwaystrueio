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
  { id: "contracts", label: "Smart contracts" },
  { id: "roadmap", label: "Product roadmap" },
  { id: "team", label: "Existing team" },
] as const;

const OUTPUTS = [
  { id: "audits", label: "Security audit", href: "#audits" },
  { id: "products", label: "Delivered product", href: "#products" },
  { id: "engineers", label: "Embedded engineers", href: "#engineers" },
  { id: "open-source", label: "Upstream contributions", href: "#open-source" },
] as const;

// Geometry for the desktop graph. Kept as constants so the boxes and the
// bezier connectors can never drift apart. PAD keeps the 1px box strokes off
// the viewBox edge, where they would be clipped in half.
const PAD = 4;
const VB = { w: 1040, h: 440 };
const AXIS = VB.h / 2;
const IN = { x: 0, w: 200, h: 64, centers: [92, 220, 348] };
const VAL = { x: 420, w: 200, h: 80 };
const OUT = { x: 800, w: 240, h: 60, centers: [61, 167, 273, 379] };

// Portrait geometry for small screens. Converging curves need horizontal room
// that a phone does not have, so the connectors run as a trunk down the left
// gutter with a tap into each box — the same topology, drawn as a bus.
const M_W = 340;
const M_TRUNK = 16;
const M_BOX_X = 44;
const M_ROW = 48;
const M_GAP = 12;
const M_STEP = M_ROW + M_GAP;
const M_VAL_H = 64;
const M_LEAD = 46;

const mInCenter = (i: number) => i * M_STEP + M_ROW / 2;
const M_IN_BOTTOM = INPUTS.length * M_STEP - M_GAP;
const M_VAL_TOP = M_IN_BOTTOM + M_LEAD;
const M_VAL_BOTTOM = M_VAL_TOP + M_VAL_H;
const M_OUT_TOP = M_VAL_BOTTOM + M_LEAD;
const mOutCenter = (i: number) => M_OUT_TOP + i * M_STEP + M_ROW / 2;
const M_H = M_OUT_TOP + OUTPUTS.length * M_STEP - M_GAP;

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
      >
        <title>
          Arranged as a Cardano transaction: smart contracts, a product roadmap
          and an existing team are the inputs; alwaystrue is the validator; the
          outputs are a security audit, a delivered product, embedded engineers
          and upstream contributions.
        </title>
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

      {/* Small screens: the same transaction, drawn in portrait */}
      <svg
        viewBox={`${-PAD} ${-PAD} ${M_W + PAD * 2} ${M_H + PAD * 2}`}
        className="w-full max-w-[420px] lg:hidden"
      >
        <title>
          Arranged as a Cardano transaction: smart contracts, a product roadmap
          and an existing team pass through alwaystrue, producing a security
          audit, a delivered product, embedded engineers and upstream
          contributions.
        </title>

        <g strokeWidth={1.25} fill="none">
          {/* Trunk and taps above the validator */}
          <path
            d={`M ${M_TRUNK},${mInCenter(0)} V ${M_VAL_TOP}`}
            stroke="var(--line-bright)"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={live ? 0 : 1}
            style={{
              transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.1s",
            }}
          />
          {INPUTS.map((input, i) => (
            <path
              key={`m-in-${input.id}`}
              d={`M ${M_TRUNK},${mInCenter(i)} H ${M_BOX_X}`}
              stroke="var(--line-bright)"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={live ? 0 : 1}
              style={{
                transition: "stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.25 + i * 0.07}s`,
              }}
            />
          ))}

          {/* Trunk and taps below it */}
          <path
            d={`M ${M_TRUNK},${M_VAL_BOTTOM} V ${mOutCenter(OUTPUTS.length - 1)}`}
            stroke="var(--teal)"
            strokeOpacity={0.55}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={live ? 0 : 1}
            style={{
              transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "0.55s",
            }}
          />
          {OUTPUTS.map((output, i) => (
            <path
              key={`m-out-${output.id}`}
              d={`M ${M_TRUNK},${mOutCenter(i)} H ${M_BOX_X}`}
              stroke="var(--teal)"
              strokeOpacity={0.55}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={live ? 0 : 1}
              style={{
                transition: "stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${0.7 + i * 0.07}s`,
              }}
            />
          ))}
        </g>

        {INPUTS.map((input, i) => {
          const cy = mInCenter(i);
          return (
            <g
              key={`m-box-${input.id}`}
              style={{
                opacity: live ? 1 : 0,
                transition: "opacity 0.6s",
                transitionDelay: `${0.25 + i * 0.07}s`,
              }}
            >
              <rect
                x={M_BOX_X}
                y={cy - M_ROW / 2}
                width={M_W - M_BOX_X}
                height={M_ROW}
                rx={3}
                fill="var(--ink-raised)"
                stroke="var(--line)"
              />
              <text
                x={M_BOX_X + 16}
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

        {/* The validator spans the full width: everything passes through it. */}
        <g
          style={{
            opacity: live ? 1 : 0,
            transition: "opacity 0.7s",
            transitionDelay: "0.45s",
          }}
        >
          <rect
            x={0}
            y={M_VAL_TOP}
            width={M_W}
            height={M_VAL_H}
            rx={3}
            fill="var(--ink-raised)"
            stroke="var(--brand)"
            strokeWidth={1.5}
          />
          <text
            x={M_W / 2}
            y={M_VAL_TOP + M_VAL_H / 2 + 6}
            fill="var(--brand)"
            textAnchor="middle"
            className="font-mono"
            fontSize={18}
            fontWeight={600}
          >
            alwaystrue
          </text>
        </g>

        {OUTPUTS.map((output, i) => {
          const cy = mOutCenter(i);
          return (
            <a
              key={`m-box-${output.id}`}
              href={output.href}
              className="group"
              style={{
                opacity: live ? 1 : 0,
                transition: "opacity 0.6s",
                transitionDelay: `${0.7 + i * 0.07}s`,
              }}
            >
              <rect
                x={M_BOX_X}
                y={cy - M_ROW / 2}
                width={M_W - M_BOX_X}
                height={M_ROW}
                rx={3}
                fill="var(--ink-raised)"
                stroke="var(--line-bright)"
                className="transition-colors group-hover:stroke-brand"
              />
              <text
                x={M_BOX_X + 16}
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
    </div>
  );
}
