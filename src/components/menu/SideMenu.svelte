<script lang="ts">

  import user from "svelte-awesome/icons/user";
  import MenuItem from "./MenuItem.svelte";
  import { menuOpen } from "../../stores/generic";
  import {
    bars,
    flag,
    money,
    questionCircle,
    table,
    users,
    building,
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
      icon={building}
      href="#/company"
      on:click={toggleMenu}
      title="Companies"
    />
    <h4 class="font-bold text-black mt-3">Company Data</h4>
    <MenuItem
      size="sm"
      icon={users}
      href="#/employees"
      on:click={toggleMenu}
      title="Employees"
    />

    <MenuItem
      size="sm"
      icon={bars}
      href="#/schedules"
      on:click={toggleMenu}
      title="Schedules"
    />
    <MenuItem
      size="sm"
      icon={bars}
      href="#/tags"
      on:click={toggleMenu}
      title="Tags"
    />
    <h4 class="font-bold mt-3">Registration</h4>
    <MenuItem
      size="sm"
      icon={table}
      href="#/presence"
      on:click={toggleMenu}
      title="Manage Presence"
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

    <h4 class="font-bold mt-3">System Data</h4>

    <MenuItem
      size="sm"
      icon={flag}
      href="#/locales"
      on:click={toggleMenu}
      title="Locales"
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
