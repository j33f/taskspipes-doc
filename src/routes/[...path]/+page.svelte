<script lang="ts">
  import { DOC_REPO, DOC_URL, UI as ui } from "#lib/docs.ts";

  let { data } = $props();
  const p = $derived(data.page);
  const title = $derived(p.path === "/" ? `TasksPipes ${ui.docs}` : `${p.title} · TasksPipes ${ui.docs}`);
  const url = $derived(`${DOC_URL}${p.path}`);
</script>

<svelte:head>
  <title>{title}</title>
  {#if p.description}<meta name="description" content={p.description} />{/if}
  <link rel="canonical" href={url} />
  <meta property="og:title" content={title} />
  {#if p.description}<meta property="og:description" content={p.description} />{/if}
  <meta property="og:type" content={p.path === "/" ? "website" : "article"} />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content="TasksPipes {ui.docs}" />
  <meta property="og:image" content="https://taskspipes.com/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="TasksPipes: task pipes for teams that live in Outline… or not. Self-hosted, works with Outline." />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page">
  <article class="prose">
    <div class="topline">
      <span class="crumb">{p.section ? data.nav.sections.find((s) => s.id === p.section)?.title : ui.docs}</span>
    </div>
    <h1>{p.title}</h1>
    {#if p.description}<p class="lead">{p.description}</p>{/if}
    {@html p.html}

    <nav class="pager">
      {#if data.previous}<a class="prev" href={data.previous.path}><small>← {ui.previous}</small>{data.previous.title}</a>{:else}<span></span>{/if}
      {#if data.next}<a class="next" href={data.next.path}><small>{ui.next} →</small>{data.next.title}</a>{/if}
    </nav>
    <p class="edit"><a href={`${DOC_REPO}/edit/main/${p.file}`}>{ui.edit}</a></p>
  </article>

  {#if p.headings.length > 1}
    <aside class="toc" aria-label={ui.onThisPage}>
      <div class="toc-title">{ui.onThisPage}</div>
      {#each p.headings as h (h.id)}<a href={`#${h.id}`} class:sub={h.depth === 3}>{h.text}</a>{/each}
    </aside>
  {/if}
</div>

<style>
  .page { display: grid; grid-template-columns: minmax(0, 760px) 220px; gap: 48px; justify-content: center; padding: 48px 40px 80px; }
  .topline { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 14px; }
  .crumb { color: var(--text-tertiary); font-weight: 500; }
  .lead { font-size: 19px; color: var(--text-secondary); margin-top: 4px; }
  .pager { display: flex; justify-content: space-between; gap: 16px; margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--divider); }
  .pager a { display: flex; flex-direction: column; gap: 2px; padding: 12px 16px; border: 1px solid var(--divider); border-radius: var(--radius); color: var(--text); font-weight: 500; text-decoration: none; min-width: 0; max-width: 48%; }
  .pager a:hover { border-color: var(--accent); }
  .pager small { color: var(--text-tertiary); font-weight: 400; }
  .pager .next { margin-left: auto; text-align: right; }
  .edit { margin-top: 24px; font-size: 14px; }
  .edit a { color: var(--text-tertiary); }
  .toc { position: sticky; top: 48px; align-self: start; max-height: calc(100vh - 96px); overflow-y: auto; font-size: 14px; display: flex; flex-direction: column; gap: 6px; }
  .toc-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-tertiary); margin-bottom: 4px; }
  .toc a { color: var(--text-secondary); text-decoration: none; line-height: 1.4; }
  .toc a:hover { color: var(--accent); }
  .toc a.sub { padding-left: 12px; }
  @media (max-width: 1200px) { .page { grid-template-columns: minmax(0, 760px); } .toc { display: none; } }
  @media (max-width: 900px) { .page { padding: 28px 20px 64px; } }
</style>
