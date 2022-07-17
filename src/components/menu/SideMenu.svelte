<script lang="ts">

  import user from "svelte-awesome/icons/user";
  import MenuItem from "./MenuItem.svelte";
  import { menuOpen } from "../../stores/generic";
  import {
    bars,
    bell,
    flag,
    money,
    questionCircle,
    table,
    users,
  } from "svelte-awesome/icons";

  const toggleMenu = () => {
    $menuOpen = !$menuOpen;
    console.log(`menuOpen = ${$menuOpen}`);
  };
</script>

<svelte:head>
  <link
    href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
    rel="stylesheet"
  />
</svelte:head>

<aside
  class="absolute w-[200px] h-full bg-slate-300 border-r-1 shadow-xl opacity-100"
  class:menuOpen={$menuOpen}
>
  <nav class="ml-2 text-lg text-left text-[20px]">
    <h4 class="font-bold mt-3">Master Data</h4>
    <MenuItem
      size="md"
      icon={user}
      href="#/admins"
      on:click={toggleMenu}
      title="Admins"
    />
    <MenuItem
      size="sm"
      icon={bell}
      href="#/auctions"
      on:click={toggleMenu}
      title="Auctions"
    />
    <MenuItem
      size="sm"
      icon={table}
      href="#/categories"
      on:click={toggleMenu}
      title="Catergories"
    />
    <MenuItem
      size="sm"
      icon={users}
      href="#/clients"
      on:click={toggleMenu}
      title="Clients"
    />
    <MenuItem
      size="sm"
      icon={flag}
      href="#/locales"
      on:click={toggleMenu}
      title="Locales"
    />

    <h4 class="font-bold text-black mt-3">Lots</h4>
    <MenuItem
      size="sm"
      icon={bars}
      href="#/lots"
      on:click={toggleMenu}
      title="Manage Lots"
    />
    <h4 class="font-bold mt-3">Taxations</h4>
    <MenuItem
      size="sm"
      icon={money}
      href="#/taxations"
      on:click={toggleMenu}
      title="Manage Taxations"
    />
    <h4 class="font-bold mt-3">Misc</h4>
    <MenuItem
      size="sm"
      icon={questionCircle}
      href="#/faqs"
      on:click={toggleMenu}
      title="FAQs"
    />
    <MenuItem
      size="sm"
      icon={questionCircle}
      href="#/playground"
      on:click={toggleMenu}
      title="Playground"
    />
  </nav>
</aside>

<style>
  @tailwind components;
  @tailwind utilities;
  @tailwind base;
  @tailwind screens;
  aside {
    left: -100%;
    transition: left 0.5s ease-in-out;
  }
  a {
    display: block;
    margin-left: 10px;
  }
  a:hover {
    font-style: italic;
  }
  .menuOpen {
    left: 0;
  }
</style>
