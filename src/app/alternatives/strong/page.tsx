import type { Metadata } from "next";
import { AlternativePage } from "@/components/AlternativePage";
import { alternatives } from "@/lib/alternatives";
import { pageMetadata } from "@/lib/seo";

const alt = alternatives.strong;

export const metadata: Metadata = pageMetadata(alt.page);

export default function StrongAlternativePage() {
  return <AlternativePage alt={alt} />;
}
