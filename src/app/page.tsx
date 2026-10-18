import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MobileInstallBar } from "@/components/MobileInstallBar";
import { MobileSectionNav } from "@/components/MobileSectionNav";
import { Comparison } from "@/components/sections/Comparison";
import { Download } from "@/components/sections/Download";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Screenshots } from "@/components/sections/Screenshots";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { homeGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main id="main" className="app-deck max-lg:pr-7">
      <JsonLd data={homeGraph(pages.home)} />
      <MobileSectionNav />
      <MobileInstallBar />
      <Hero />
      <Features />
      <Screenshots />
      <Comparison />
      <Faq />
      <Download />
    </main>
  );
}
