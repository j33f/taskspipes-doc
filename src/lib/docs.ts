/**
 * The documentation: Markdown pages in src/content/<section>/<NN-slug>.md (and index.md for the home page),
 * read at build time. Each page starts with a front matter giving its title (and optionally a description):
 *
 *   ---
 *   title: Pipes
 *   description: Kanban boards with a purpose.
 *   ---
 */
import { Marked, type Tokens } from "marked";

export const REPO = "https://github.com/j33f/TasksPipes";
export const DOC_REPO = "https://github.com/j33f/taskspipes-doc";
export const SITE = "https://taskspipes.com";
export const DOC_URL = "https://doc.taskspipes.com";

/** Sections of the sidebar, in order, by folder name. */
export const SECTIONS: Record<string, string> = {
  guide: "Guide",
  integrations: "Integrations",
  "self-hosting": "Self-hosting",
};

export const UI = {
  docs: "Docs", search: "Search the docs…", noResult: "No page found", onThisPage: "On this page", previous: "Previous",
  next: "Next", edit: "Edit this page on GitHub", site: "TasksPipes.com", github: "GitHub", menu: "Menu",
  notFound: "Page not found", notFoundText: "This page does not exist, or has moved.", home: "Back to the documentation",
};

export interface Heading {
  id: string;
  text: string;
  depth: number;
}

export interface Page {
  /** "/guide/pipes". */
  path: string;
  section: string | null;
  slug: string;
  title: string;
  description: string;
  html: string;
  headings: Heading[];
  /** Plain text, for the search. */
  text: string;
  /** Source file, for "Edit this page". */
  file: string;
  order: number;
}

const files = import.meta.glob<string>("/src/content/**/*.md", { query: "?raw", import: "default", eager: true });

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function frontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: raw.slice(m[0].length) };
}

/** Markdown to HTML: headings get ids, external links open as usual. */
function render(body: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const taken = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(text);
        const n = taken.get(id) ?? 0;
        taken.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) headings.push({ id, text: inner.replace(/<[^>]+>/g, ""), depth });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = (this as unknown as { parser: { parseInline: (t: Tokens.Generic[]) => string } }).parser.parseInline(tokens);
        const ext = /^https?:/.test(href) ? ' rel="noopener"' : "";
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${ext}>${inner}</a>`;
      },
    },
  });
  const html = marked.parse(body, { async: false }) as string;
  return { html, headings };
}

function load(): Page[] {
  const pages: Page[] = [];
  for (const [file, raw] of Object.entries(files)) {
    const m = file.match(/^\/src\/content\/(?:([a-z-]+)\/)?(?:(\d+)-)?([a-z0-9-]+)\.md$/);
    if (!m) continue;
    const [, section = null, order = "0", name] = m as unknown as [string, string | null, string, string];
    const { meta, body } = frontMatter(raw);
    const { html, headings } = render(body);
    const slug = name === "index" && !section ? "" : name;
    const base = section ? `/${section}/${slug}` : "/";
    pages.push({
      section, slug, order: Number(order), file: file.replace(/^\//, ""),
      path: base,
      title: meta.title ?? name, description: meta.description ?? "",
      html, headings,
      text: body.replace(/```[\s\S]*?```/g, " ").replace(/[#*`>|_[\]()-]/g, " ").replace(/\s+/g, " ").trim(),
    });
  }
  return pages;
}

export const PAGES = load();

/** The pages in reading order: the home page, then each section's pages. */
export function ordered(): Page[] {
  const home = PAGES.filter((p) => !p.section);
  const rest = Object.keys(SECTIONS).flatMap((s) => PAGES.filter((p) => p.section === s).sort((a, b) => a.order - b.order));
  return [...home, ...rest];
}

export const pageAt = (path: string) => PAGES.find((p) => p.path === path) ?? null;
