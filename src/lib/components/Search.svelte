<script lang="ts">
  import { goto } from "$app/navigation";

  /** Searches the pages: titles first, then headings, then text. The index loads on first use. */
  let { placeholder, empty }: { placeholder: string; empty: string } = $props();

  interface Entry {
    path: string;
    title: string;
    section: string;
    headings: { id: string; text: string }[];
    text: string;
  }
  interface Hit {
    href: string;
    title: string;
    context: string;
    score: number;
  }

  let index = $state<Entry[] | null>(null);
  let q = $state("");
  let active = $state(0);
  let focused = $state(false);

  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  async function ensureIndex() {
    if (index) return;
    const res = await fetch("/search.json");
    index = await res.json();
  }

  const hits = $derived.by((): Hit[] => {
    const words = norm(q).split(/\s+/).filter((w) => w.length > 1);
    if (!words.length || !index) return [];
    const out: Hit[] = [];
    for (const e of index) {
      const title = norm(e.title);
      const text = norm(e.text);
      if (!words.every((w) => title.includes(w) || text.includes(w) || e.headings.some((h) => norm(h.text).includes(w)))) continue;
      const heading = e.headings.find((h) => words.some((w) => norm(h.text).includes(w)));
      const score = words.reduce((n, w) => n + (title.includes(w) ? 10 : 0) + (heading ? 3 : 0) + (text.includes(w) ? 1 : 0), 0);
      // A line of text around the first word found.
      const at = text.indexOf(words[0]);
      const context = at >= 0 ? `${at > 40 ? "…" : ""}${e.text.slice(Math.max(0, at - 40), at + 90)}…` : e.section;
      out.push({ href: heading ? `${e.path}#${heading.id}` : e.path, title: heading ? `${e.title} › ${heading.text}` : e.title, context, score });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 8);
  });

  function onkeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (hits.length) active = (active + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length;
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      go(hits[active].href);
    } else if (e.key === "Escape") {
      q = "";
    }
  }

  function go(href: string) {
    q = "";
    focused = false;
    goto(href);
  }

  // Ctrl/⌘ + K focuses the search.
  let input = $state<HTMLInputElement>();
  function onglobal(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      input?.focus();
    }
  }
</script>

<svelte:window onkeydown={onglobal} />

<div class="search">
  <input bind:this={input} type="search" bind:value={q} {placeholder} aria-label={placeholder} autocomplete="off"
    onfocus={() => { focused = true; ensureIndex(); }} onblur={() => setTimeout(() => (focused = false), 150)}
    oninput={() => (active = 0)} {onkeydown} />
  <kbd>⌘K</kbd>
  {#if focused && q.trim().length > 1}
    <ul class="results" role="listbox">
      {#each hits as h, i (h.href)}
        <li role="option" aria-selected={i === active}>
          <a href={h.href} class:active={i === active} onmousedown={(e) => { e.preventDefault(); go(h.href); }}>
            <strong>{h.title}</strong><span>{h.context}</span>
          </a>
        </li>
      {:else}
        <li class="none">{empty}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .search { position: relative; margin: 0 4px; }
  input {
    width: 100%; font: inherit; font-size: 14px; padding: 7px 44px 7px 10px; border-radius: 8px; border: 1px solid var(--divider);
    background: var(--background); color: var(--text); outline: none;
  }
  input:focus { border-color: var(--accent); }
  kbd { position: absolute; right: 8px; top: 7px; font-size: 11px; color: var(--text-tertiary); border: 1px solid var(--divider); border-radius: 4px; padding: 0 4px; font-family: inherit; }
  .results {
    position: absolute; top: calc(100% + 6px); left: 0; width: min(420px, 90vw); z-index: 30; list-style: none; margin: 0; padding: 6px;
    background: var(--background); border: 1px solid var(--divider); border-radius: 10px; box-shadow: 0 12px 32px rgb(0 0 0 / 15%);
  }
  .results a { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 6px; color: var(--text); text-decoration: none; }
  .results a.active, .results a:hover { background: var(--hover); }
  .results strong { font-weight: 500; font-size: 14px; }
  .results span { font-size: 12.5px; color: var(--text-tertiary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .none { padding: 10px; color: var(--text-tertiary); font-size: 14px; }
</style>
