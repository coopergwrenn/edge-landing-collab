import type { ReactNode } from "react";

/**
 * Glass card layered over the Healdsburg hero map. Hero copy + the primary
 * CTA (or live-agent widget) live here. The CTA itself is rendered by the
 * parent so SSR-resolved userState can drive its shape.
 */
export function MapHeroOverlay({ cta }: { cta: ReactNode }) {
  return (
    <div
      className="absolute z-10 left-[clamp(20px,4vw,56px)] top-1/2 -translate-y-1/2 w-[min(640px,calc(100vw-40px))] flex flex-col items-start text-left border border-white/50 shadow-[0_24px_60px_rgba(15,26,18,0.14),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md"
      style={{
        padding: "clamp(36px,4vw,56px) clamp(36px,4vw,56px) clamp(36px,4vw,48px)",
        background: "rgba(228, 240, 210, 0.67)",
        borderRadius: 32,
        color: "var(--edge-ink)",
      }}
      data-screen-label="map-hero"
    >
      <div
        className="font-sans text-xs font-bold uppercase mb-3.5"
        style={{ letterSpacing: "0.22em", opacity: 0.7 }}
      >
        Edge Esmeralda
      </div>
      <div
        className="font-[family-name:var(--font-display)] text-[18px] font-medium mb-6"
        style={{ letterSpacing: "0.01em", opacity: 0.85 }}
      >
        May 30 — June 27, 2026 · Healdsburg, CA
      </div>

      <h1 className="section-title mb-7 text-[clamp(26px,2.6vw,36px)] leading-[1.12]">
        Meet your personal Edge Esmeralda agent
      </h1>

      <p
        className="font-sans text-[18px] leading-[1.55] font-normal mb-9 max-w-[520px]"
        style={{ color: "var(--edge-ink)" }}
      >
        Part of a village-wide network of agents working together to surface the
        right people for you to meet, in real time.
      </p>

      <div className="flex flex-wrap gap-3 items-center w-full">{cta}</div>

      <p className="font-sans text-sm mt-5 inline-flex items-center flex-wrap gap-2 leading-[1.4]">
        <span style={{ opacity: 0.7 }}>Not attending yet?</span>
        <a
          href="https://edgeesmeralda.simplefi.tech/auth"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4 decoration-1"
          style={{
            color: "var(--edge-ink)",
            textDecorationColor: "rgba(41,49,30,0.35)",
          }}
        >
          Apply to Edge Esmeralda
        </a>
      </p>
    </div>
  );
}
