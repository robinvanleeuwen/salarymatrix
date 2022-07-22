<script>
  import { onMount } from "svelte";
  import { getJsonRpc } from "../../helpers/api";
  import DMButton from "../DMButton.svelte";

  export let value;
  export let onchange = "";
  export let cls = "";
  export let attributes;
  export let dependencies = [];
  export let sourceModel = "";
  export let disabled = false;
  export let showOptionsDialog = false;

  // There are no dependencies to the options for this
  // field. It can be retrieved immediately .

  onMount(async () => {
    if (dependencies.length === 0 && sourceModel !== "") {
      const result = await getJsonRpc(
        sourceModel,
        "get_select_options",
        {},
        "dict",
        false
      );
      if (result.code === "OK") {
        attributes.options = result.data;
      }
    }
  });

  if (attributes?.options !== undefined) {
    const selected = attributes?.options.find((el) => el[value] === value);
    if (selected !== undefined) {
      value = selected.value;
    }
  }
</script>

<div class={cls}>
  <div class="flex-column text-sm ml-0.5 mb-0.5 w-[100%]">{attributes.label}</div>
  <div class="w-[100%]">
  <select
    id={attributes.name}
    name={attributes.name}
    {disabled}
    class="
    form-select
    form-select-sm
    appearance-none
    block
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    w-[100%]
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    bind:value
    on:change={onchange}
  >
    {#if attributes.options !== undefined}
      {#each attributes.options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    {/if}
  </select>
  </div>
  {#if attributes.quick_grid ? attributes.quick_grid.length > 0 : false}
  <DMButton
    {disabled}
    cls="ml-2"
    id="dialog-{attributes.name}"
    color="bg-blue-300"
    type="button"
    onClick={() => {
      console.log("Click");
      showOptionsDialog = attributes.sourceModel;
      }}>Add</DMButton
  >
  {:else}
    <div />
  {/if}
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
