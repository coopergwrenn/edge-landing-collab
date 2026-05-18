/**
 * STANDALONE STUB.
 *
 * In production this function does a server-side session lookup + Supabase
 * query to pick which CTA shape the visitor sees. In this collab project we
 * have no auth or database — instead we let you preview each CTA state via
 * a URL parameter so you can iterate on copy and layout for all three:
 *
 *   /edge                     → logged_out  (claim CTA + notify-me form)
 *   /edge?state=in_progress   → in_progress (single "Complete setup" pill)
 *   /edge?state=live          → live        (bot username + Open in Telegram)
 *
 * The three shapes mirror the production state machine. The kinds and
 * field names are identical to the live type — if you rename a field here,
 * Cooper will need to rename it in the real codebase too, so try to keep
 * the shape stable.
 */
export type EdgeUserState =
  | { kind: "logged_out" }
  | {
      kind: "in_progress";
      resumePath: "/connect" | "/plan" | "/deploying" | "/dashboard";
    }
  | { kind: "live"; botUsername: string };

export async function getEdgeUserState(
  stateOverride?: string
): Promise<EdgeUserState> {
  if (stateOverride === "live") {
    return { kind: "live", botUsername: "edge_demo_bot" };
  }
  if (stateOverride === "in_progress") {
    return { kind: "in_progress", resumePath: "/connect" };
  }
  return { kind: "logged_out" };
}
