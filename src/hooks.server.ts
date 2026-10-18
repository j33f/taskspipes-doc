import type { Handle } from "@sveltejs/kit/hooks";

/** The page's language in <html lang>: French under /fr, English elsewhere. */
export const handle: Handle = ({ event, resolve }) =>
  resolve(event, { transformPageChunk: ({ html }) => html.replace("%lang%", event.url.pathname.startsWith("/fr") ? "fr" : "en") });
