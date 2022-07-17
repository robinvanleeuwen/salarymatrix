<script>
  import { fly } from "svelte/transition";
  export let overlayZIndex = "z-20";
  export let sidebarZIndex = "z-30";
  export let show = false;
</script>

{#if show}
  <div
    class="overlay {overlayZIndex}"
    transition:fly={{ delay: 0, duration: 100, opacity: 0.3 }}
  >
    <span />
  </div>
  <nav
    class={sidebarZIndex}
    transition:fly={{ delay: 0, duration: 100, opacity: 0.3 }}
  >
    <slot />
  </nav>
{/if}

<style>
  nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    padding: 1rem 1rem 0.6rem;
    border-left: 1px solid black;
    background: #e0e7ff; /* bg-indigo-100 */
    overflow-y: auto;
    width: 45vw;
    opacity: 1;
    transition: opacity 0.3s;
    z-index: 30;
  }
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100vw;
    background: #232e3b;
    opacity: 0.8;
    z-index: 20;
  }
</style>
