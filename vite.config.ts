import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

/** Static site: every page is prerendered to HTML. */
export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({ pages: "build", assets: "build", fallback: "404.html" }),
      prerender: {
        entries: ["*"],
        // Images are added later: a missing one does not stop the build.
        handleHttpError: ({ path, message }) => {
          if (path.startsWith("/screenshots/")) return;
          throw new Error(message);
        },
      },
    }),
  ],
});
