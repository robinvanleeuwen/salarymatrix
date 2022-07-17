<script lang="ts">
  export let attributes;
  export let value;
</script>

<div class="text-sm">
  <span class="ml-1">{attributes.label}</span>
  <input class="input-class" type="text" disabled {value} />
</div>

<style>
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
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
