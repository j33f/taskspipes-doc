import { SECTIONS, ordered } from "#lib/docs.ts";

/** The sidebar: the home page, then the sections and their pages (titles only). */
export function load() {
  const pages = ordered();
  const nav = {
    home: pages.find((p) => !p.section)?.path ?? "/",
    sections: Object.entries(SECTIONS)
      .map(([id, title]) => ({ id, title, pages: pages.filter((p) => p.section === id).map((p) => ({ path: p.path, title: p.title })) }))
      .filter((s) => s.pages.length),
  };
  return { nav };
}
