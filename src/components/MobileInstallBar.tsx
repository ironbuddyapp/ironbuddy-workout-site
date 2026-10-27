import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { cn } from "@/lib/cn";
import { showAppStoreBadge } from "@/lib/iphone";

export function MobileInstallBar() {
  return (
    <div
      data-mobile-install-bar
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] lg:hidden"
    >
      <div
        className={cn(
          "pointer-events-auto flex justify-center border-t border-white/8 bg-background/90 px-4 pt-3 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          showAppStoreBadge && "items-center gap-3",
        )}
      >
        <GooglePlayButton compact={showAppStoreBadge} />
        <AppStoreBadge compact />
      </div>
    </div>
  );
}
