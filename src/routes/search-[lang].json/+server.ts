import { json } from "@sveltejs/kit";
import { SECTIONS, ordered, type Lang } from "#lib/docs.ts";

export const prerender = true;

export function entries() {
  return [{ lang: "en" }, { lang: "fr" }];
}

/** The search index of a language: each page's title, section, headings and text. */
export function GET({ params }: { params: { lang: string } }) {
  const lang = (params.lang === "fr" ? "fr" : "en") as Lang;
  return json(ordered(lang).map((p) => ({
    path: p.path, title: p.title, section: p.section ? SECTIONS[p.section][lang] : "",
    headings: p.headings.map((h) => ({ id: h.id, text: h.text })), text: p.text,
  })));
}
