import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/logo-mark.webp"
        alt=""
        width={32}
        height={32}
        decoding="async"
        fetchPriority="high"
        className="h-8 w-8 rounded-lg shadow-[0_0_24px_rgba(183,255,42,0.22)]"
      />
      <span className="text-[15px] font-semibold tracking-tight text-white">{siteConfig.fullName}</span>
    </span>
  );
}
