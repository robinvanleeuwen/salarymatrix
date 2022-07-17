<script lang="ts">
  import Logo from "./Logo.svelte";
  import Hamburger from "./Hamburger.svelte";
  import Menu from "./Menu.svelte";
  export let sidebar = false;
</script>

<header
  class="flex fixed w-full justify-between bg-slate-700 p-2 items-center text-slate-300 border-b-2"
>
  <nav class="flex">
    <Hamburger bind:open={sidebar} />
    <Logo />
  </nav>
  <Menu />
</header>

<style>
  @tailwind components;
  @tailwind utilities;
  @tailwind base;
</style>
