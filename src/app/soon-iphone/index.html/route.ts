import { soonIphonePage } from "@/lib/smart-links";

export const dynamic = "force-static";

/** Where the smart store links send iPhone and iPad visitors: see src/lib/smart-links.ts. */
export function GET() {
  return soonIphonePage();
}
