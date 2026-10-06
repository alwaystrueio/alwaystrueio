import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The card that unfurls when a page is shared on X, LinkedIn, Slack and the
 * like. Every page renders through this one layout: the site's navy ground,
 * the logo, a mono eyebrow, a serif title, and a row of facts. Images are
 * rendered at build time, so the fonts are read from disk rather than fetched.
 */

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

// Mirrors the tokens in app/globals.css; the renderer cannot read CSS variables.
const INK = "#111d25";
const LINE = "#253742";
const BONE = "#e9e7e0";
const MUTED = "#949da1";
const BRAND = "#9af47b";
const TEAL = "#64b6ac";

type ShareImage = {
  eyebrow: string;
  title: string;
  /** One sentence under the title. */
  subtitle?: string;
  /** Short mono facts along the bottom edge. */
  facts: readonly string[];
};

const asset = (...path: string[]) => readFile(join(process.cwd(), ...path));

export async function renderShareImage({
  eyebrow,
  title,
  subtitle,
  facts,
}: ShareImage) {
  const [serif, mono, logo] = await Promise.all([
    asset("assets", "fonts", "InstrumentSerif-Regular.ttf"),
    asset("assets", "fonts", "MartianMono-Medium.ttf"),
    asset("public", "logo-solid-con-texto-verde.svg"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px 60px",
          backgroundColor: INK,
          // The hero's CRT scanlines, faint enough to survive recompression.
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(233,231,224,0.025) 0px, rgba(233,231,224,0.025) 1px, transparent 1px, transparent 4px)",
          fontFamily: "Martian Mono",
          borderLeft: `12px solid ${BRAND}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by the image generator, not the browser */}
          <img src={logoSrc} width={268} height={58} alt="" />
          <span style={{ fontSize: 18, letterSpacing: "0.18em", color: MUTED }}>
            ALWAYSTRUE.IO
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: TEAL,
              marginBottom: 28,
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontSize: subtitle ? 96 : 84,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: BONE,
              maxWidth: 980,
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              style={{
                fontFamily: "Instrument Serif",
                fontSize: 38,
                lineHeight: 1.2,
                color: MUTED,
                marginTop: 24,
                maxWidth: 960,
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 40,
            rowGap: 12,
            paddingTop: 24,
            borderTop: `1px solid ${LINE}`,
            fontSize: 17,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Martian Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
