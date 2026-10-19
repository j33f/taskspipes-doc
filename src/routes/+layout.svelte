<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import Logo from "#lib/components/Logo.svelte";
  import Search from "#lib/components/Search.svelte";
  import { REPO, SITE, UI as ui } from "#lib/docs.ts";

  let { data, children } = $props();
  const nav = $derived(data.nav);
  const current = $derived(page.url.pathname.replace(/\/$/, "") || "/");
  let open = $state(false);
  $effect(() => {
    void current;
    open = false;
  });
</script>

<div class="shell">
  <aside class:open>
    <div class="side-top">
      <a class="brand" href={nav.home}><Logo size={24} /><span>TasksPipes</span><em>{ui.docs}</em></a>
    </div>
    <Search placeholder={ui.search} empty={ui.noResult} />
    <nav aria-label={ui.docs}>
      {#each nav.sections as section (section.id)}
        <div class="group">
          <div class="group-title">{section.title}</div>
          {#each section.pages as p (p.path)}
            <a href={p.path} class:active={p.path === current} aria-current={p.path === current ? "page" : undefined}>{p.title}</a>
          {/each}
        </div>
      {/each}
    </nav>
    <div class="side-bottom">
      <a href={SITE}>{ui.site} ↗</a>
      <a href={REPO}>{ui.github} ↗</a>
    </div>
  </aside>

  <div class="main">
    <header class="mobile">
      <a class="brand" href={nav.home}><Logo size={22} /><span>TasksPipes</span><em>{ui.docs}</em></a>
      <button aria-expanded={open} aria-label={ui.menu} onclick={() => (open = !open)}>☰</button>
    </header>
    {@render children()}
  </div>
</div>

<style>
  .shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
  aside {
    position: sticky; top: 0; height: 100vh; overflow-y: auto; background: var(--sidebar); border-right: 1px solid var(--divider);
    display: flex; flex-direction: column; padding: 16px 12px;
  }
  .side-top { padding: 4px 8px 12px; }
  .brand { display: flex; align-items: center; gap: 8px; color: var(--text); font-weight: 600; font-size: 16px; text-decoration: none; }
  .brand em { font-style: normal; font-weight: 500; color: var(--text-tertiary); }
  nav { flex: 1; margin-top: 8px; }
  .group { margin-bottom: 16px; }
  .group-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-tertiary); padding: 6px 10px; }
  nav a { display: block; padding: 5px 10px; border-radius: 6px; color: var(--text-secondary); font-size: 15px; text-decoration: none; }
  nav a:hover { background: var(--hover); color: var(--text); }
  nav a.active { background: var(--hover); color: var(--text); font-weight: 500; }
  .side-bottom { display: flex; flex-direction: column; gap: 4px; padding: 12px 10px 0; border-top: 1px solid var(--divider); font-size: 14px; }
  .side-bottom a { color: var(--text-secondary); }
  .main { min-width: 0; }
  .mobile { display: none; }
  @media (max-width: 900px) {
    .shell { grid-template-columns: 1fr; }
    aside { display: none; position: fixed; inset: 56px 0 0 0; height: auto; z-index: 20; }
    aside.open { display: flex; }
    .mobile { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 16px; border-bottom: 1px solid var(--divider); position: sticky; top: 0; background: var(--background); z-index: 21; }
    .mobile button { background: none; border: 0; font-size: 22px; color: var(--text); cursor: pointer; }
  }
</style>
