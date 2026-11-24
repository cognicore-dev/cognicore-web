import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideLayout, guideBySlug } from "@/components/aeo/GuideLayout";
import { Callout, DocSection, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { bench, install, links } from "@/lib/site";

const guide = guideBySlug("memory-without-vector-database");

export const metadata: Metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/learn/${guide.slug}`,
  type: "article",
});

const toc = [
  { id: "need", label: "Do you need one?" },
  { id: "how", label: "How search works" },
  { id: "results", label: "LongMemEval results" },
  { id: "limits", label: "Where it falls short" },
  { id: "semantic", label: "Adding semantic search" },
  { id: "storage", label: "Where data lives" },
];

const c = (s: string) => <code>{s}</code>;

export default function NoVectorDbGuide() {
  return (
    <GuideLayout
      guide={guide}
      toc={toc}
      answer={
        <>
          Agent memory doesn&apos;t need a vector database: CogniCore stores memory in SQLite and finds it with
          full-text search ranked by BM25, with no embedding server or API key. Semantic search is optional, through the{" "}
          <code>[memory]</code> extra, for queries worded differently from what was saved.
        </>
      }
    >
      <DocSection id="need" title="Do you need a vector database for AI memory?">
        <p>
          Not necessarily. Much of what a coding session has to carry over is exact: ticket IDs, versions, file paths,
          error codes, names and the reasons behind decisions. Keyword search matches those directly, because the query
          and the memory share the same words.
        </p>
        <p>
          CogniCore&apos;s Python library needs no vector database, no embedding server and no external service. Its
          only required dependencies are numpy, jsonschema and requests:
        </p>
        <CodeBlock code={install.library} />
      </DocSection>

      <DocSection id="how" title="How does CogniCore search memory without embeddings?">
        <ul>
          <li>
            <strong>The Claude Code and Codex plugin</strong> keeps memory in SQLite in {c("~/.cognicore/mcp")} and
            searches it with SQLite&apos;s FTS5 full-text index. Tokens are quoted, so hyphens, paths and keywords
            match.
          </li>
          <li>
            <strong>The hosted server</strong> ranks results with BM25 over your own entries; no embedding service is
            involved. Specific terms rank higher than common words, so queries like &ldquo;auth bug fix&rdquo; work.
          </li>
          <li>
            <strong>Lessons</strong> ({c("cognicore lesson")}) use SQLite FTS5 with BM25 too. A lesson&apos;s{" "}
            {c("--when")} words (&ldquo;installing packages&rdquo;) let it match tasks worded differently (&ldquo;add
            axios&rdquo;).
          </li>
        </ul>
        <p>
          For questions whose answer is spread across several past sessions, the library&apos;s multi-hop adapter goes
          further than taking the top matches. It extracts the key entities from the query, retrieves anchor chunks,
          follows session and time links to reach chunks the first hop missed, and picks the set of chunks that together
          cover the most entities.
        </p>
      </DocSection>

      <DocSection id="results" title="How well does lexical retrieval do on LongMemEval?">
        <p>
          LongMemEval asks questions whose answers require combining evidence from several separate past sessions. The
          repository reports strict recall@5 at three context-window sizes, against a zero-shot baseline:
        </p>
        <Table
          head={["Context window", "Baseline (zero-shot)", "CogniCore multi-hop", "Δ"]}
          rows={bench.longMemEval.map((r) => [r.window, r.baseline, r.multiHop, r.delta])}
        />
        <p>
          The gain is largest at small windows, where token efficiency matters. At 20 chunks brute force catches up and
          both score 95.0%. Run it yourself from the repository root:
        </p>
        <CodeBlock
          code={`python benchmarks/data/longmemeval/download_datasets.py
python benchmarks/longmemeval/runner.py`}
        />
        <p>
          Details:{" "}
          <a href={links.docs.longMemEval} target="_blank" rel="noreferrer">
            docs/benchmarks.md
          </a>{" "}
          and{" "}
          <a href={links.docs.benchmarks} target="_blank" rel="noreferrer">
            benchmarks/
          </a>
          .
        </p>
      </DocSection>

      <DocSection id="limits" title="Where does keyword search fall short?">
        <Callout title="Known limitation">
          Lexical retrieval (TF-IDF/BM25) misses when a session&apos;s vocabulary differs from the query&apos;s. If you
          saved &ldquo;the login cookie expires&rdquo; and later ask about &ldquo;session timeouts&rdquo;, there may be
          no shared word to match.
        </Callout>
        <p>
          Two things narrow the gap without embeddings: the brief at session start doesn&apos;t depend on a query at
          all, and lessons carry {c("--when")} words describing the situation in general terms.
        </p>
      </DocSection>

      <DocSection id="semantic" title="When should I add semantic search?">
        <p>
          When your queries and your memories routinely use different words. Semantic search is behind an optional
          extra, which installs sentence-transformers:
        </p>
        <CodeBlock code={`pip install "cognicore-env[memory]"   # semantic memory (sentence-transformers)`} />
      </DocSection>

      <DocSection id="storage" title="Where is the memory stored?">
        <ul>
          <li>
            Plugin: {c("~/.cognicore/mcp")} on your computer (set {c("COGNICORE_DATA_DIR")} to move it).
          </li>
          <li>Lessons: {c("~/.cognicore/mcp/lessons.db")}, also local.</li>
          <li>
            Hosted server: a separate SQLite database for each signed-in account. The server is open source, so you can
            run it yourself (
            <a href={links.docs.remote} target="_blank" rel="noreferrer">
              docs/remote-mcp-server.md
            </a>
            ).
          </li>
        </ul>
      </DocSection>
    </GuideLayout>
  );
}
