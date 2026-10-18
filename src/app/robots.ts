import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Crawlers behind AI search and assistants. The `*` rule already allows them; naming them keeps the
 * intent on the record, so a future edit does not block AI visibility by accident. Remove a name here
 * (or add `disallow: "/"`) if you ever want to opt a specific crawler out.
 */
const aiCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    // The old `Host:` directive was dropped: only Yandex ever read it, and it has been deprecated for years.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
