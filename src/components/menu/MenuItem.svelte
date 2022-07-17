<script lang="ts">
  import { Icon } from "svelte-awesome";
  import { createEventDispatcher } from "svelte";

  export let href;
  export let icon;
  export let title;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click", "menuItemSelected");
  }
</script>

<div class="flex p-1">
  <div class="text-center" style="width: 25px">
    <Icon data={icon} class="mt-1" />
  </div>
  <a class="justify-end ml-2 mt-2 text-sm" {href}>{title}</a>
</div>

<style>
</style>
