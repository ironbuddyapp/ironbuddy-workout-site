import { MobileInstallBar } from "@/components/MobileInstallBar";

/** The install bar stays at the bottom of a phone while reading; the badge state comes from MobileInstallBar. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobileInstallBar />
    </>
  );
}
