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

<div class="flex-column ml-1 mr-2">
  <div class="text-sm ml-0.5 ">
    {attributes.label}
    {dateIsInPast(value) ? "(given date is in the past)" : ""}
  </div>
  <div class="mb-2">
  <SveltyPicker
    class="bg-blue-200 w-[100%]"
    inputClasses="form-control mb-2 p-1 pl-1.5 w-[100%]"
    format="yyyy-mm-dd hh:ii"
    placeholder="yyyy-mm-dd HH:MM"
    min="2020-01-01 00:00"
    {disabled}
    name={attributes.name}
    bind:value
  />
  </div>
</div>

<style>
  @tailwind base;
  @tailwind utilities;
  @tailwind components;
</style>
