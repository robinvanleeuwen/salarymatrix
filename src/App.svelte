<script>
  import SideMenu from "./components/menu/SideMenu.svelte";
  import Navbar from "./components/menu/Navbar.svelte";
  import Router from "svelte-spa-router";
  import { menuOpen } from "./stores/generic";
  import { routes } from "./routes";
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>
<div>
  <div class="flex z-100">
    <div class="fixed"><Navbar bind:sidebar={$menuOpen} /></div>
  </div>
  <div class="mt-[46px] relative h-full bg-slate-100 z-90">
    <SideMenu class="h-full" bind:$menuOpen />
    <div class="page" class:menuOpen={$menuOpen}>
      <Router {routes} />
    </div>
  </div>
</div>

<style>
  .page {
    position: relative;
    height: 1000px;
    left: 0px;
    top: 10px;
    transition: left 0.5s ease-in-out;
  }

  .menuOpen {
    left: 200px;
  }

  @tailwind base;
  @tailwind utilities;
  @tailwind components;
</style>
