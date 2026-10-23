import { smartLinkPage } from "@/lib/smart-links";

export const dynamic = "force-static";

/** Smart store link: see src/lib/smart-links.ts. */
export function GET() {
  return smartLinkPage("get-fb");
}
