<script lang="ts">
  import { page } from "$app/state";
  import { UI } from "#lib/docs.ts";
  const lang = $derived(page.url.pathname.startsWith("/fr") ? "fr" : "en");
</script>

<div class="prose" style="max-width:760px;margin:0 auto;padding:64px 40px">
  <h1>{UI[lang].notFound}</h1>
  <p>{UI[lang].notFoundText}</p>
  <p><a href={lang === "fr" ? "/fr" : "/"}>{UI[lang].home} →</a></p>
</div>
