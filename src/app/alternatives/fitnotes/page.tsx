import type { Metadata } from "next";
import { AlternativePage } from "@/components/AlternativePage";
import { alternatives } from "@/lib/alternatives";
import { pageMetadata } from "@/lib/seo";

const alt = alternatives.fitnotes;

export const metadata: Metadata = pageMetadata(alt.page);

export default function FitnotesAlternativePage() {
  return <AlternativePage alt={alt} />;
}
