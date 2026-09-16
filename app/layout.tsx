import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Martian_Mono } from "next/font/google";
import "./globals.css";

// Display: high-contrast editorial serif. An audit firm has more in common with
// a law practice than with a devtool startup, and the serif says so.
const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// Utility: wide mono for eyebrows, labels and on-chain data.
const mono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "alwaystrue — Cardano smart contract audits, products and engineers",
  description:
    "alwaystrue audits Cardano smart contracts, builds the products that use them, and embeds engineers in the teams that ship them.",
  openGraph: {
    title: "alwaystrue",
    description:
      "Cardano smart contract audits, products and engineers. On-chain, there is no hotfix.",
    url: "https://alwaystrue.io",
    siteName: "alwaystrue",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "alwaystrue",
    description: "Cardano smart contract audits, products and engineers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
