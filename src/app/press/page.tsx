import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, SubHeading, TextLink } from "@/components/content";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { KeyFacts } from "@/components/KeyFacts";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { formatDate } from "@/lib/format";
import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";
import {
  brandColors,
  brandNotes,
  formatBytes,
  pressDescriptions,
  pressFacts,
  pressFeatures,
  pressFiles,
  pressIcon,
  pressScreenshots,
  pressUsage,
  pressZipPath,
  releaseDate,
  wordCount,
} from "@/lib/press";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.press);

const downloadLinkClass =
  "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Rough size of the ZIP: the files plus a few KB for the README and the archive headers. */
const zipBytes = pressFiles.reduce((total, file) => total + file.bytes, 0) + 8 * 1024;

export default function PressPage() {
  const crumbs = trail(pages.home, pages.press);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.press, { trail: crumbs, about: "app" })} />
      <PageHero
        trail={crumbs}
        eyebrow="Press kit"
        title="IronBuddy press kit"
        updated={pages.press.modified}
        lead={`Everything you need to write about IronBuddy, the offline workout tracker for Android: a fact sheet, ready-to-use descriptions, the app icon and screenshots. ${pressUsage}`}
      >
        <div className="flex flex-col items-start gap-3">
          <a
            href={pressZipPath}
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-background transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon name="download" className="h-4 w-4" />
            Download the press kit
          </a>
          <p className="text-xs text-muted">
            ZIP, {formatBytes(zipBytes)} · App icon, {pressScreenshots.length} screenshots and this
            page as text
          </p>
        </div>
      </PageHero>

      <PageBody>
        <KeyFacts
          id="fact-sheet"
          title="Fact sheet"
          items={pressFacts.map((fact) => ({
            term: fact.term,
            detail: fact.href ? (
              <TextLink href={fact.href} className="break-all">
                {fact.detail.replace("https://", "")}
              </TextLink>
            ) : (
              fact.detail
            ),
          }))}
        />

        <ContentSection id="descriptions" title="Descriptions you can use">
          <p>
            Use these as they are or shorten them. Click a description to select all of it.
          </p>
          {pressDescriptions.map((item) => (
            <div key={item.id}>
              <SubHeading>
                {item.title}{" "}
                <span className="text-sm font-normal text-muted">({wordCount(item.text)} words)</span>
              </SubHeading>
              <p className="mt-3 select-all rounded-2xl border border-white/8 bg-surface p-5 text-white/85 sm:p-6">
                {item.text}
              </p>
            </div>
          ))}
        </ContentSection>

        <ContentSection id="key-features" title="Key features">
          <BulletList>
            {pressFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </BulletList>
          <p>
            The <TextLink href={pages.features.path}>feature tour</TextLink> explains each one with
            screenshots.
          </p>
        </ContentSection>

        <ContentSection id="screenshots" title="Screenshots">
          <p>
            PNG files of the Android app, taken on {formatDate(releaseDate)}. They are also in the
            ZIP file.
          </p>
          <ul className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
            {pressScreenshots.map((shot) => (
              <li key={shot.id} className="rounded-2xl border border-white/8 bg-surface p-3">
                <img
                  src={shot.preview.src}
                  alt={shot.alt}
                  width={shot.preview.width}
                  height={shot.preview.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[19/40] w-full rounded-xl bg-background object-cover object-top"
                />
                <p className="mt-3 text-sm font-medium text-white">{shot.label}</p>
                <a href={shot.src} download className={`${downloadLinkClass} mt-1`}>
                  <Icon name="download" className="h-3.5 w-3.5" />
                  PNG
                  <span className="sr-only">: {shot.label} screenshot</span>
                </a>
                <p className="mt-0.5 text-xs text-muted">
                  {shot.width} × {shot.height} · {formatBytes(shot.bytes)}
                </p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection id="video" title="Video">
          <p>
            The Google Play promo video (1:56, 4K, no voice-over) is on YouTube:{" "}
            <TextLink href={siteConfig.promoVideo.url}>watch the two-minute tour</TextLink>. For
            the original 3840×2160 file, or a longer feature-by-feature tour,{" "}
            <TextLink href={pages.contact.path}>get in touch</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="app-icon" title="App icon">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
            <img
              src={pressIcon.preview.src}
              alt="IronBuddy app icon: a lime and white IB mark with the IronBuddy name on a dark rounded square"
              width={pressIcon.preview.width}
              height={pressIcon.preview.height}
              loading="lazy"
              decoding="async"
              className="h-32 w-32 shrink-0 rounded-3xl"
            />
            <div>
              <p className="text-sm text-white/85">
                The icon IronBuddy uses on Google Play and on the phone&apos;s home screen.
              </p>
              <a href={pressIcon.src} download className={`${downloadLinkClass} mt-3`}>
                <Icon name="download" className="h-3.5 w-3.5" />
                Download PNG
                <span className="sr-only">: IronBuddy app icon</span>
              </a>
              <p className="mt-0.5 text-xs text-muted">
                {pressIcon.width} × {pressIcon.height} · {formatBytes(pressIcon.bytes)}
              </p>
            </div>
          </div>
        </ContentSection>

        <ContentSection id="brand" title="Brand guidelines">
          <BulletList>
            {brandNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </BulletList>
          <ul className="flex flex-wrap gap-3 pt-2">
            {brandColors.map((color) => (
              <li
                key={color.hex}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-surface py-2 pl-2 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="h-10 w-10 rounded-xl border border-white/15"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">
                  <span className="block font-medium text-white">{color.name}</span>
                  <span className="select-all font-mono text-xs text-muted">{color.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection id="press-contact" title="Press contact">
          <p>
            For interviews, review questions or anything this page does not cover, use the{" "}
            <TextLink href={pages.contact.path}>contact page</TextLink>.
          </p>
        </ContentSection>

        <RelatedLinks items={[pages.about, pages.features, pages.faq, pages.contact]} />
      </PageBody>
    </main>
  );
}
