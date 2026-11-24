import type { Metadata } from "next";
import { license, links, site, type Guide } from "@/lib/site";

/** The static social card in src/app (regenerate with scripts/og-image.mjs). */
const ogImage = {
  url: `${site.url}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: "CogniCore - Stop re-explaining yourself to AI. Shared memory for Claude, ChatGPT, Claude Code and Codex.",
};

/**
 * Metadata for one page: a unique title and description, a canonical URL, and Open Graph and Twitter cards.
 * A page's own openGraph replaces the inherited one, so the card image is set here for every page.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  /** Use the title as is, without the " · CogniCore" suffix. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type, siteName: site.name, url, title: fullTitle, description, locale: "en_US", images: [ogImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}

/* ---------- JSON-LD builders. Facts only: no ratings, reviews or user counts. ---------- */

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: links.email,
  sameAs: [links.githubOrg, links.github, links.linkedin, links.pypi],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": orgId },
};

export const softwareLd = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "SoftwareSourceCode"],
  "@id": `${site.url}/#software`,
  name: site.name,
  description: site.description,
  url: site.url,
  applicationCategory: "DeveloperApplication",
  operatingSystem: site.operatingSystems,
  softwareVersion: site.version,
  datePublished: site.releaseDate,
  license: license.url,
  codeRepository: links.github,
  programmingLanguage: "Python",
  downloadUrl: links.pypi,
  installUrl: links.pypi,
  releaseNotes: links.changelog,
  isAccessibleForFree: true,
  // The package is free to install under Apache 2.0.
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@id": orgId },
  publisher: { "@id": orgId },
};

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function guideLd(guide: Guide) {
  const url = `${site.url}/learn/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    datePublished: guide.updated,
    dateModified: guide.updated,
    inLanguage: "en",
    image: `${site.url}/opengraph-image.png`,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    about: { "@id": `${site.url}/#software` },
  };
}
