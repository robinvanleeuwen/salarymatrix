<script>
  import { createEventDispatcher } from "svelte";
  export let onClick;
  export let type;
  export let color = "bg-gray-100";
  export let cls = "";
  export let disabled = false;

  const dispatch = createEventDispatcher();
</script>

<button
  {type}
  on:click={onClick}
  {disabled}
  class="
  {color}
  border
  border-blue-900
  pb-1.5
  pt-1
  text-sm
  pl-[8px]
  pr-[8px]
  rounded-[8px]
  hover:font-bold
  hover:disabled:font-normal
  active:bg-gray-600
  disabled:bg-gray-300
  focus:font-bold
  {cls}
"
>
  <slot />
</button>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
