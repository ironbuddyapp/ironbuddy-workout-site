import { cn } from "@/lib/cn";
import { screenshots } from "@/lib/content";
import type { ScreenshotId } from "@/lib/content";

export function PhoneMockup({
  children,
  className,
  float = false,
}: {
  children: React.ReactNode;
  className?: string;
  float?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-[240px] sm:w-[270px] lg:w-[292px]", className)}>
      <div
        className={cn(
          "relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] border border-white/12 bg-black p-[7px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.85)]",
          float && "animate-float",
        )}
      >
        <div className="relative h-full overflow-hidden rounded-[1.95rem] bg-surface">
          {children}
        </div>
      </div>
    </div>
  );
}

/** A real app screenshot. Alt text, intrinsic size and format come from `screenshots` in content.ts. */
export function AppScreen({
  id,
  alt,
  priority = false,
}: {
  id: ScreenshotId;
  /** Override the default alt text when a page describes the screen differently. */
  alt?: string;
  priority?: boolean;
}) {
  const shot = screenshots.find((item) => item.id === id);
  if (!shot) throw new Error(`Unknown screenshot: ${id}`);

  return (
    <img
      src={`/screenshots/${shot.file}`}
      alt={alt ?? shot.alt}
      width={shot.width}
      height={shot.height}
      sizes="(min-width: 1024px) 292px, 240px"
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      loading={priority ? "eager" : "lazy"}
      className="h-full w-full object-cover object-top"
    />
  );
}
