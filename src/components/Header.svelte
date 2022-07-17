<script lang="ts">
  import process from "svelte-environment-variables";
  import DMButton from "./DMButton.svelte";

  export let dialogOpen = undefined;
  export let headerClasses = "pl-3";
  export let diagnose = () => {
    console.log("---- DIAGNOSIS --- NOT --- IMPLEMENTED ---");
  };
</script>

<div class="text-2xl font-bold {headerClasses}">
  <div class="flex justify-content-between w-[100%] mr-2">
    <div class="float-start">
      <div class="float-end"><slot /></div>
    </div>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
