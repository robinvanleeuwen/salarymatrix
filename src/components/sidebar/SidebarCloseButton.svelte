<script>
  import DMButton from "../DMButton.svelte";
  import { clearValueStore } from "../../stores/helpers";
  export let sidebarShow;
  export let valueStore;
  export let formDefinition;
  export let gridApi;
</script>

<div class="mb-3 ml-4">
  <DMButton
    color="bg-red-400"
    cls=""
    type="button"
    onClick={() => {
      clearValueStore(valueStore, formDefinition);
      gridApi?.deselectAll();
      sidebarShow = false;
    }}>Close</DMButton
  >
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
