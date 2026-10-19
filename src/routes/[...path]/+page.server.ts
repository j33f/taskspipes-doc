import { error } from "@sveltejs/kit";
import { PAGES, ordered, pageAt } from "#lib/docs.ts";

/** Every page, prerendered. */
export function entries() {
  return PAGES.map((p) => ({ path: p.path.replace(/^\//, "") }));
}

export function load({ params }: { params: { path: string } }) {
  const page = pageAt(`/${params.path}`.replace(/\/$/, "") || "/");
  if (!page) error(404, "Not found");
  const list = ordered();
  const i = list.indexOf(page);
  const link = (p: (typeof list)[number] | undefined) => (p ? { path: p.path, title: p.title } : null);
  return {
    page: { ...page, text: undefined },
    previous: link(list[i - 1]),
    next: link(list[i + 1]),
  };
}
