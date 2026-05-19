import type { Metadata, Viewport } from "next";
import {
  EB_Garamond,
  Space_Grotesk,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

// Edge palette typography — mirrors edgeclaw-site exactly:
//   EB Garamond  — display / section titles (italic-capable)
//   Space Grotesk — body / UI
//   Instrument Serif — wordmarks (InstaClaw, SimpleFi)
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Edge Esmeralda — Agent Village (collab preview)",
  description:
    "Standalone collab preview of the /edge landing page. Live site lives elsewhere; this repo is for copy and layout iteration only.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.addEventListener('DOMContentLoaded',function(){if(document.fonts){document.fonts.ready.then(function(){document.documentElement.classList.add('fonts-ready');});}else{document.documentElement.classList.add('fonts-ready');}});})();`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ebGaramond.variable} ${instrumentSerif.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
