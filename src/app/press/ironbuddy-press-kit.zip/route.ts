import fs from "node:fs";
import path from "node:path";
import { pages } from "@/lib/pages";
import { pressFiles, pressReadme } from "@/lib/press";
import { createZip } from "@/lib/zip";

export const dynamic = "force-static";

/**
 * The "download everything" file on /press/. It is built with the site from the files in public/press and the
 * same text as the page, so it can never fall out of date.
 */
export function GET() {
  const folder = "ironbuddy-press-kit";
  const zip = createZip(
    [
      { name: `${folder}/README.txt`, data: new TextEncoder().encode(pressReadme()) },
      ...pressFiles.map((file) => ({
        name: `${folder}/${file.zipPath}`,
        data: fs.readFileSync(path.join(process.cwd(), "public", file.src)),
      })),
    ],
    pages.press.modified,
  );

  return new Response(zip, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${folder}.zip"`,
    },
  });
}
