<script>
  import { onMount } from "svelte";

  // export let type = "text";
  // export let name;
  // export let label;
  export let cls = "";
  export let attributes;
  export let value = null;
  export let useHtmlLabel = true;
  export let disabled = false;

  const onChange = () => {};

  let inputElement;

  onMount(() => {
    inputElement.type = attributes.type;
  });
</script>

<div>
  <div>
    {#if useHtmlLabel}
      {#if attributes.type !== "hidden"}
        <span class="ml-1 text-sm">{attributes.label}</span>
      {/if}
    {/if}
  </div>
  <div class={cls}>
    <input
      placeholder={attributes.label}
      class="input-class"
      id={attributes.name}
      name={attributes.name}
      {disabled}
      on:change={onChange}
      bind:value
      bind:this={inputElement}
    />
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .input-class {
    width: 100%;
    padding: 5px;
    margin-left: 3px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  .input-class[type="text"]:focus {
    background-color: lightblue;
  }
</style>
