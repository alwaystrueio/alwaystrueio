import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          raised: "var(--ink-raised)",
        },
        line: {
          DEFAULT: "var(--line)",
          bright: "var(--line-bright)",
        },
        bone: "var(--bone)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        teal: "var(--teal)",
        // Finding severities and statuses, matching the colours used in the
        // published PDF reports so a reader moving between the two sees the
        // same code.
        severity: {
          critical: "#eb6f92",
          major: "#ea9a97",
          minor: "#f6c177",
          enhancement: "#a19aea",
          info: "#e0def4",
        },
        status: {
          resolved: "#73d480",
          acknowledged: "#f1a03a",
          identified: "#ed706b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display scale, tuned for Instrument Serif's high contrast: tight
        // leading and negative tracking so the big sizes hold together.
        "display-sm": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["4rem", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["5.75rem", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        measure: "62ch",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
