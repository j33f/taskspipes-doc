import { LANGS, SECTIONS, ordered, type Lang } from "#lib/docs.ts";

/** The sidebar of each language: its home page, then its sections and their pages (titles only). */
export function load() {
  const nav = Object.fromEntries(
    LANGS.map((lang: Lang) => {
      const pages = ordered(lang);
      return [lang, {
        home: pages.find((p) => !p.section)?.path ?? "/",
        sections: Object.entries(SECTIONS)
          .map(([id, title]) => ({ id, title: title[lang], pages: pages.filter((p) => p.section === id).map((p) => ({ path: p.path, title: p.title })) }))
          .filter((s) => s.pages.length),
      }];
    })
  ) as Record<Lang, { home: string; sections: { id: string; title: string; pages: { path: string; title: string }[] }[] }>;
  return { nav };
}
