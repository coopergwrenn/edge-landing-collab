import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "optional",
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
    <html lang="en">
      <head>
        {/* Reveal the document only after fonts are ready — prevents the
            display-swap flash that throws off layout review. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.addEventListener('DOMContentLoaded',function(){if(document.fonts){document.fonts.ready.then(function(){document.documentElement.classList.add('fonts-ready');});}else{document.documentElement.classList.add('fonts-ready');}});})();`,
          }}
        />
      </head>
      <body className={`${inter.className} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
