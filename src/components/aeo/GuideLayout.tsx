import type { ReactNode } from "react";
import { DocLayout, ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
import { breadcrumbLd, guideLd } from "@/lib/seo";
import { guides, type Guide } from "@/lib/site";
import { AnswerBox } from "./AnswerBox";
import { GuideCard } from "./GuideCard";
import { JsonLd } from "./JsonLd";

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function guideBySlug(slug: string): Guide {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

/**
 * Page frame for a guide: header, short answer, the doc layout with its "On this page" list, then related guides,
 * the setup call to action and the last-updated date. Emits TechArticle and BreadcrumbList JSON-LD.
 */
export function GuideLayout({
  guide,
  answer,
  toc,
  children,
}: {
  guide: Guide;
  answer: ReactNode;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  const related = guides.filter((g) => g.slug !== guide.slug);
  return (
    <>
      <JsonLd
        data={[
          guideLd(guide),
          breadcrumbLd([
            { name: "Home", path: "" },
            { name: "Guides", path: "/learn" },
            { name: guide.title, path: `/learn/${guide.slug}` },
          ]),
        ]}
      />
      <PageHeader eyebrow="Guide" title={guide.title} lead={guide.description} />
      <DocLayout toc={toc}>
        <AnswerBox>{answer}</AnswerBox>
        {children}
        <p className="mt-10 text-sm text-ink-3">
          Last updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>. Facts and figures come from
          the cognicore-env repository.
        </p>
      </DocLayout>

      <section className="border-t border-line bg-surface">
        <div className="wrap py-20">
          <SectionHeading eyebrow="Keep reading" title="Related guides" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} />
            ))}
          </div>
          <div data-reveal className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href="/connect" size="lg">
              Connect to Claude or ChatGPT
            </ButtonLink>
            <ButtonLink href="/developers" variant="secondary" size="lg">
              Install for developers
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
