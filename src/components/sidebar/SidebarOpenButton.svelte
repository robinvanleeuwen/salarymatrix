<script>
  import DMButton from "../DMButton.svelte";
  export let disabled = false;
  export let title = "Record";
  export let cls = "";
  export let show;
  export let mode;
</script>

<DMButton
  color="bg-green-300"
  cls="mt-2 ml-3 {cls}"
  type="button"
  {disabled}
  onClick={() => {
    show = true;
  }}
>
  {mode}
  {title}
</DMButton>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
