import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/aeo/GuideCard";
import { JsonLd } from "@/components/aeo/JsonLd";
import { PageHeader } from "@/components/ui";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { guides, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Guides: memory for Claude, ChatGPT and coding agents",
  description:
    "Practical guides to giving Claude Code memory across sessions, AI memory without a vector database, cutting Claude Code token use, and shared vs built-in memory.",
  path: "/learn",
});

export default function LearnPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "CogniCore guides",
            url: `${site.url}/learn`,
            hasPart: guides.map((g) => ({
              "@type": "TechArticle",
              headline: g.title,
              url: `${site.url}/learn/${g.slug}`,
            })),
          },
          breadcrumbLd([
            { name: "Home", path: "" },
            { name: "Guides", path: "/learn" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="Guides"
        title="Memory for AI apps and coding agents, explained"
        lead={
          <>
            How-tos and explainers, each with the commands to run and the measured figures behind it. Have a quick
            question instead?{" "}
            <Link href="/faq" className="text-brand underline underline-offset-[3px]">
              Read the FAQ
            </Link>
            .
          </>
        }
      />
      <div className="wrap grid gap-4 py-14 md:grid-cols-2">
        {guides.map((g, i) => (
          <GuideCard key={g.slug} guide={g} index={i} />
        ))}
      </div>
    </>
  );
}
