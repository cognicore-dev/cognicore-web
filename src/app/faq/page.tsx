import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/aeo/FaqList";
import { JsonLd } from "@/components/aeo/JsonLd";
import { Callout, PageHeader, delay } from "@/components/ui";
import { faqs } from "@/lib/faq";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";
import { links } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "CogniCore FAQ: apps, storage, privacy and license",
  description:
    "Answers to developer questions about CogniCore: supported apps, vector databases, where data is stored, deletion, self-hosting and the license.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(faqs),
          breadcrumbLd([
            { name: "Home", path: "" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="What CogniCore is, where your memory lives, and how to remove it. Each answer comes from the project's documentation and privacy policy."
      />
      <div className="wrap py-12">
        <div className="max-w-3xl">
          <div data-reveal style={delay(120)} className="divide-y divide-line border-y border-line">
            <FaqList items={faqs} />
          </div>
          <Callout className="mt-10">
            Still have a question?{" "}
            <a href={`mailto:${links.email}`} className="text-brand underline underline-offset-[3px]">
              Email us
            </a>
            ,{" "}
            <a
              href={links.issues}
              className="text-brand underline underline-offset-[3px]"
              target="_blank"
              rel="noreferrer"
            >
              open an issue
            </a>{" "}
            or read the{" "}
            <Link href="/learn" className="text-brand underline underline-offset-[3px]">
              guides
            </Link>
            .
          </Callout>
        </div>
      </div>
    </>
  );
}
