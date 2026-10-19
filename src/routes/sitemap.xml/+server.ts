import { DOC_URL, ordered } from "#lib/docs.ts";

export const prerender = true;

/** Every page of the documentation, for search engines. */
export function GET() {
  const urls = ordered().map((p) => `  <url><loc>${DOC_URL}${p.path}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml" },
  });
}
