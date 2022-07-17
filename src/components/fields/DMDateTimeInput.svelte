<script>
  import SveltyPicker from "svelty-picker";
  export let value = "2000-12-31 12:59";
  export let disabled = false;
  export let attributes;
  let labelElement;

  function dateIsInPast(d) {
    if (d === null) return false;
    return new Date(d) < new Date();
  }

  $: console.log(dateIsInPast(value));
</script>

<div class="mr-2 ml-1">
  <span class="text-sm ml-0.5$ "
    >{attributes.label}
    {dateIsInPast(value) ? "(given date is in the past)" : ""}</span
  >
  <SveltyPicker
    class="bg-blue-200"
    inputClasses="form-control"
    format="yyyy-mm-dd hh:ii"
    placeholder="yyyy-mm-dd HH:MM"
    min="2020-01-01 00:00"
    {disabled}
    name={attributes.name}
    bind:value
  />
</div>

<style>
  @tailwind base;
  @tailwind utilities;
  @tailwind components;
</style>
