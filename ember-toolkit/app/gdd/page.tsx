import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const GDD_PATH = path.join(process.cwd(), "..", "Ashfall-Game-Design-Document.md");

export default async function GDDPage() {
  let content: string;
  try {
    content = await readFile(GDD_PATH, "utf-8");
  } catch {
    return (
      <div className="mx-auto max-w-[1320px] px-4 py-16">
        <div className="ember-panel rounded-2xl border border-[color:var(--border-subtle)] p-8 text-center">
          <h1 className="ember-display text-2xl text-[color:var(--text-0)]">
            Game Design Document
          </h1>
          <p className="mt-4 text-sm text-[color:var(--text-1)]">
            Could not load <code className="rounded bg-[color:var(--bg-2)] px-1.5 py-0.5">Ashfall-Game-Design-Document.md</code>. Ensure the file exists at the project root (parent of ember-toolkit).
          </p>
        </div>
      </div>
    );
  }

  // Strip the leading # title so we don't duplicate the page header
  const contentToRender = content.replace(/^#\s+.*\n\n?/, "");

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 sm:py-16">
      <header className="mb-12 border-b border-[color:var(--border-subtle)] pb-8">
        <div className="text-xs tracking-[0.32em] text-[color:var(--text-2)]">
          UNLISTED — INTERNAL
        </div>
        <h1 className="ember-display mt-2 text-3xl text-[color:var(--text-0)] sm:text-4xl">
          Ember — Game Design Document
        </h1>
        <p className="mt-2 text-sm text-[color:var(--text-1)]">
          Comprehensive draft. This page renders the full GDD from the repo; it is not linked from the main nav.
        </p>
      </header>

      <article
        className="
          gdd-prose
          prose prose-invert max-w-none
          prose-headings:ember-display prose-headings:font-semibold prose-headings:tracking-tight
          prose-h1:text-2xl prose-h1:text-[color:var(--text-0)] prose-h1:mt-12 prose-h1:mb-6 prose-h1:pb-2 prose-h1:border-b prose-h1:border-[color:var(--border-subtle)]
          prose-h2:text-xl prose-h2:text-[color:var(--text-0)] prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:text-[color:var(--text-0)] prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-[color:var(--text-1)] prose-p:leading-relaxed prose-p:my-3
          prose-ul:my-4 prose-ul:pl-6 prose-ol:my-4 prose-ol:pl-6 prose-li:my-1.5 prose-li:text-[color:var(--text-1)]
          prose-strong:text-[color:var(--text-0)] prose-strong:font-semibold
          prose-code:rounded prose-code:bg-[color:var(--bg-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentToRender}</ReactMarkdown>
      </article>
    </div>
  );
}
