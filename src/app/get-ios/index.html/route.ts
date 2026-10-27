import { iosLinkPage } from "@/lib/ios-links";

export const dynamic = "force-static";

/** iPhone store link: see src/lib/ios-links.ts. */
export function GET() {
  return iosLinkPage("get-ios");
}
