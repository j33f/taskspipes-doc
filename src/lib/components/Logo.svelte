<script lang="ts">
  let { size = 28 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
  <rect width="32" height="32" rx="8" fill="currentColor" />
  <rect x="7" y="8" width="5" height="16" rx="2" fill="var(--background)" />
  <rect x="14" y="8" width="5" height="11" rx="2" fill="var(--background)" opacity=".75" />
  <rect x="21" y="8" width="5" height="7" rx="2" fill="var(--background)" opacity=".5" />
</svg>
