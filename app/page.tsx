import { redirect } from "next/navigation";

/**
 * Root of this standalone collab preview just bounces to /edge — there's
 * only one page in this project. Useful so localhost:3000 lands on the
 * actual landing without manually typing the path.
 */
export default function RootRedirect() {
  redirect("/edge");
}
