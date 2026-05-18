"use client";

import { useState } from "react";
import type { EdgeUserState } from "./edge-user-state";

interface EdgeCityClientProps {
  /**
   * Server-resolved user state. Three variants drive three CTA shapes:
   *
   *   logged_out  — claim CTA + email-notify fallback.
   *   in_progress — single "Complete setup →" pill (in prod it routes the
   *                 user back to where they dropped off in onboarding).
   *   live        — celebratory card with the bot username and a deep-link
   *                 to Telegram.
   *
   * SSR resolves this so there's no flash of the wrong CTA on hydration —
   * the visitor sees the right state on first paint. In this standalone
   * preview, state is driven by ?state=… URL param (see edge-user-state.ts).
   */
  state: EdgeUserState;
}

export function EdgeCityClient({ state }: EdgeCityClientProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState("");

  // ── State C: live agent ── deep-link straight into Telegram.
  if (state.kind === "live") {
    const tmeUrl = `https://t.me/${state.botUsername}`;
    return (
      <div className="w-full">
        <div
          className="rounded-2xl p-6 sm:p-7"
          style={{
            background: "var(--edge-sage)",
            border: "1px solid var(--edge-olive)",
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.18em] inline-flex items-center gap-2 mb-3"
            style={{ color: "var(--edge-olive)" }}
          >
            <span
              aria-hidden
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "var(--edge-olive)",
                animation: "edge-live-pulse 2.4s ease-in-out infinite",
              }}
            />
            Your agent is live
          </p>
          <p
            className="font-bold tracking-[-0.01em] text-[26px] sm:text-[32px] mb-4 break-all"
            style={{ color: "var(--edge-ink)", fontVariantLigatures: "none" }}
          >
            @{state.botUsername}
          </p>
          <a
            href={tmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 py-4 rounded-full text-[13px] uppercase tracking-[0.14em] font-medium transition-colors hover:bg-[var(--edge-olive-hover)] inline-flex items-center justify-center gap-2"
            style={{
              background: "var(--edge-olive)",
              color: "#FFFFFF",
              letterSpacing: "0.12em",
            }}
          >
            Open in Telegram <span aria-hidden>→</span>
          </a>
        </div>
        <style jsx>{`
          @keyframes edge-live-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }
        `}</style>
      </div>
    );
  }

  // ── State B: in-progress ── single pill back into the onboarding flow.
  if (state.kind === "in_progress") {
    return (
      <div className="w-full">
        <button
          onClick={() => {
            // In prod this navigates the user to state.resumePath (the next
            // step in the onboarding state machine). In this preview we just
            // log it so you can verify the click is wired.
            console.log("[preview] would navigate to", state.resumePath);
          }}
          className="w-full px-6 py-4 rounded-full text-[13px] uppercase tracking-[0.14em] font-medium transition-colors hover:bg-[var(--edge-olive-hover)] inline-flex items-center justify-center gap-2"
          style={{
            background: "var(--edge-olive)",
            color: "#FFFFFF",
            letterSpacing: "0.12em",
          }}
        >
          Complete setup <span aria-hidden>→</span>
        </button>
        <p
          className="text-[11px] uppercase tracking-[0.14em] mt-4"
          style={{ color: "var(--edge-ink-soft)" }}
        >
          You started — pick up where you left off
        </p>
      </div>
    );
  }

  // ── State A: logged out ── original claim CTA + notify-me fallback.

  async function handleClaim() {
    setClaiming(true);
    setError("");
    // Preview behavior: simulate the network round-trip without hitting any
    // real backend. In production this POSTs to /api/partner/tag and then
    // navigates to the signup flow.
    await new Promise((r) => setTimeout(r, 800));
    console.log("[preview] claim flow — would POST /api/partner/tag and route to /signup");
    setClaiming(false);
  }

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    // Preview behavior: fake the API call so the success state renders.
    await new Promise((r) => setTimeout(r, 600));
    console.log("[preview] notify — would POST /api/notify with", { email: email.trim(), source: "edge_city" });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div
        className="max-w-md px-5 py-4 rounded-full text-[13px] uppercase tracking-[0.14em] inline-flex items-center gap-2"
        style={{ background: "var(--edge-sage)", color: "var(--edge-olive)" }}
      >
        <span aria-hidden>✓</span>
        You&apos;re on the list — we&apos;ll email when claim opens
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleClaim}
        disabled={claiming}
        className="w-full px-6 py-4 rounded-full text-[13px] uppercase tracking-[0.14em] font-medium transition-colors hover:bg-[var(--edge-olive-hover)] disabled:opacity-60 inline-flex items-center justify-center gap-2"
        style={{ background: "var(--edge-olive)", color: "#FFFFFF", letterSpacing: "0.12em" }}
      >
        {claiming ? "Claiming…" : <>Claim your agent <span aria-hidden>→</span></>}
      </button>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: "var(--edge-line)" }} />
        <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--edge-ink-soft)" }}>
          or
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--edge-line)" }} />
      </div>

      <form onSubmit={handleNotify} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={loading}
          aria-label="email"
          className="flex-1 px-5 py-3.5 rounded-full text-[14px] outline-none transition-colors focus:border-[var(--edge-olive)]"
          style={{
            background: "#FFFFFF",
            border: "1px solid var(--edge-line)",
            color: "var(--edge-ink)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3.5 rounded-full text-[13px] uppercase tracking-[0.12em] font-medium transition-colors hover:bg-[var(--edge-olive-hover)] disabled:opacity-60"
          style={{ background: "var(--edge-olive)", color: "#FFFFFF" }}
        >
          {loading ? "…" : "Notify me"}
        </button>
      </form>

      {error && (
        <p className="text-[12px] mt-3" style={{ color: "#B83D01" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
