<script>
  /**
   * params:
   *  subject          : The content of the buttons: "Add <subject>, Update <subject>, etc"
   *  createHandler    : function that is called on:click for Create
   *  updateHandler    : function that is called on:click for Update
   *  deleteHandler    : function that is called on:click for Delete
   *  diagnoseHandler  : function that is called on:click for Delete
   *  cls              : extra classes that should be added to the DMButton component
   *  disabledCheckVar : The variable (array) that should be checked for button to be disabled or not.
   */
  import DMButton from "./DMButton.svelte";
  export let buttonTitle = "Record";
  export let createHandler = undefined;
  export let updateHandler = undefined;
  export let deleteHandler = undefined;
  export let diagnoseHandler = undefined;
  export let canCreate = true;
  export let canUpdateOrDelete = true;
  export let cls = "";
  export let type;
</script>

<div class="flex ml-1">
  <div class="w-100">
    {#if createHandler !== undefined}
      <DMButton
        {cls}
        color="bg-green-300"
        {type}
        onClick={createHandler}
        disabled={!canCreate}
      >
        Add {buttonTitle}
      </DMButton>
    {/if}
    {#if updateHandler !== undefined}
      <DMButton
        {cls}
        {type}
        color="bg-blue-300"
        onClick={updateHandler}
        disabled={!canUpdateOrDelete}
      >
        Update {buttonTitle}
      </DMButton>
    {/if}
    {#if deleteHandler !== undefined}
      <DMButton
        {cls}
        {type}
        color="bg-red-300"
        onClick={deleteHandler}
        disabled={!canUpdateOrDelete}
      >
        Delete {buttonTitle}
      </DMButton>
    {/if}
    {#if diagnoseHandler !== undefined}
      {#if process.env.SVELTE_APP_ENVIRONMENT === "development"}
        <div class="float-end">
          <DMButton
            {cls}
            type="button"
            color="bg-blue-300"
            onClick={diagnoseHandler}
          >
            Diagnose
          </DMButton>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
