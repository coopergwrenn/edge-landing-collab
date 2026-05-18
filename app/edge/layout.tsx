import { LenisProvider } from "@/components/lenis-provider";

/**
 * /edge — pure Edge brand chrome.
 *
 * The live app pulls this out of its (marketing) route group so we escape
 * the InstaClaw header/footer chrome — Edge wants pre-signup pure Edge
 * brand, with "Powered by InstaClaw" relegated to the footer.
 *
 * LenisProvider gives the page the same inertial scroll feel as the rest
 * of the marketing site.
 *
 * CSS variables for the Edge palette (single source of truth — live in this
 * file so Edge-specific styling never leaks into a parent shell):
 *   --edge-bg          warm off-white page background
 *   --edge-ink         near-black warm body color
 *   --edge-ink-soft    muted variant for secondary copy
 *   --edge-olive       dark olive — primary brand accent (button + heading hits)
 *   --edge-olive-hover deeper olive for button hover
 *   --edge-sage        light sage — hover/secondary surface
 *   --edge-line        hairline border color
 */
export default function EdgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <div
        data-theme="edge"
        style={
          {
            "--edge-bg": "#FAFAF7",
            "--edge-ink": "#0E0F0B",
            "--edge-ink-soft": "#5A5C53",
            "--edge-olive": "#29311E",
            "--edge-olive-hover": "#1B210F",
            "--edge-sage": "#E4F0D2",
            "--edge-line": "rgba(14, 15, 11, 0.10)",
            "--edge-line-soft": "rgba(14, 15, 11, 0.06)",
            background: "var(--edge-bg)",
            color: "var(--edge-ink)",
            minHeight: "100vh",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </LenisProvider>
  );
}
