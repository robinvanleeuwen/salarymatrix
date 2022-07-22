<script lang="ts">
  import process from "svelte-environment-variables";
  import DMButton from "./DMButton.svelte";

  export let dialogOpen: boolean = undefined;
  export let headerClasses: string = "pl-3";
  export let diagnose = (): null => {
    console.log("---- DIAGNOSIS --- NOT --- IMPLEMENTED ---");
  };
</script>

<div class="text-2xl font-bold {headerClasses}">
  <div class="flex justify-content-between w-[100%] mr-2">
    <div class="float-start">
      {#if dialogOpen}
        <div class="float-end"><DMButton onClick={() => {dialogOpen = false;}}>Close</DMButton></div>
      {/if}
      <div class="float-end"><slot /></div>
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
