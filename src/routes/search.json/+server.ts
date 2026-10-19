import { json } from "@sveltejs/kit";
import { SECTIONS, ordered } from "#lib/docs.ts";

export const prerender = true;

/** The search index: each page's title, section, headings and text. */
export function GET() {
  return json(ordered().map((p) => ({
    path: p.path, title: p.title, section: p.section ? SECTIONS[p.section] : "",
    headings: p.headings.map((h) => ({ id: h.id, text: h.text })), text: p.text,
  })));
}
