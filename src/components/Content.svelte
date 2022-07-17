<script lang="ts">
  import { menuOpen } from "../stores/generic";

  export let bgColor = "bg-slate-100";
</script>

<div class="{bgColor}"   class:menuOpen={$menuOpen}
>
  <slot />
</div>

<style>

  .menuOpen {
    width: calc(100% - 210px);
  }

  @tailwind base;
  @tailwind components;
  @tailwind screens;
  @tailwind utilities;
</style>
