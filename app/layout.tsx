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

const DESCRIPTION =
  "alwaystrue provides independent security audits, product engineering, and embedded engineering teams to organizations building on Cardano.";

export const metadata: Metadata = {
  title: "alwaystrue — Security and engineering for the Cardano ecosystem",
  description: DESCRIPTION,
  openGraph: {
    title: "alwaystrue",
    description: DESCRIPTION,
    url: "https://alwaystrue.io",
    siteName: "alwaystrue",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "alwaystrue",
    description: DESCRIPTION,
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
