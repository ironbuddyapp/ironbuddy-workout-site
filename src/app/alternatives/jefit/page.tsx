import type { Metadata } from "next";
import { AlternativePage } from "@/components/AlternativePage";
import { alternatives } from "@/lib/alternatives";
import { pageMetadata } from "@/lib/seo";

const alt = alternatives.jefit;

export const metadata: Metadata = pageMetadata(alt.page);

export default function JefitAlternativePage() {
  return <AlternativePage alt={alt} />;
}
