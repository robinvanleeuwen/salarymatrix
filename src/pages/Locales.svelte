<script lang="ts">
  import Header from "../components/Header.svelte";
  import { onMount } from "svelte";
  import Content from "../components/Content.svelte";
  import { updateRowData } from "../helpers/grid";
  import DMForm from "../components/DMForm.svelte";
  import { writable } from "svelte/store";
  import Grid from "../components/Grid.svelte";
  import { clearValueStore, createValueStore } from "../stores/helpers";
  import CUDBar from "../components/CUDBar.svelte";
  import { FormDefinition, generateFormDefinition } from "../helpers/layout";
  import { GridApi } from "ag-grid-community";

  import type { GenericObject } from "../helpers/layout";
  import type { Writable } from "svelte/store";
  const endpoint: string = "locale";
  const titleSingle: string = "Locale";
  const titlePlural: string = "Locales";

  let method: string = "create";
  let formDefinition: FormDefinition;
  let rowData: Array<GenericObject> = [];
  let valueStore: Writable<GenericObject> = writable({ _meta: {} });

  let canCreate: boolean = true;
  let canUpdateOrDelete: boolean = false;
  let gridApi: GridApi = null;

  const refreshRowData = async (): Promise<Array<GenericObject>> => {
    return await updateRowData(
      endpoint,
      "get_all",
      { },
      "dict",
      true
    );
  };

  const handleGridSelect = (rows) => {
    clearValueStore(valueStore, formDefinition);

    if (gridApi.getSelectedNodes().length === 1) {
      canCreate = false;
      canUpdateOrDelete = true;
      $valueStore = {
        ...$valueStore,
        ...rows.detail[0],
      };
    } else if (gridApi.getSelectedNodes().length === 0) {
      canCreate = true;
      canUpdateOrDelete = false;
      $valueStore = { ...$valueStore };
    }
  };

  onMount(async () => {
    formDefinition = await generateFormDefinition(endpoint);
    valueStore = createValueStore(formDefinition.components);
    rowData = await refreshRowData();
  });

</script>

<Content>
  <Header>{titlePlural}</Header>
  <div class="grid grid-cols-2 pt-4 mr-4">
    <div>

      <div />
      <div class="ml-3 shadow">
        <Grid
          {endpoint}
          bind:rowData
          bind:api={gridApi}
          on:select={handleGridSelect}
          style="height: 750px"
        />
      </div>
    </div>
    <div class="">
      {#if formDefinition}
        <DMForm
          containerClasses="border-[1px] border-slate-400 p-2 ml-4 shadow-xl"
          headerClasses="ml-1 mb-2 bg-gray-100"
          headerTitle={titleSingle}
          {formDefinition}
          {refreshRowData}
          bind:canCreate
          bind:canUpdateOrDelete
          bind:rowData
          bind:valueStore
        >
          <CUDBar
            cls="mr-2 mt-2 mb-2"
            createHandler={() => {
              $valueStore["_meta"] = { method: "create" };
            }}
            updateHandler={() => {
              $valueStore["_meta"] = { method: "update" };
            }}
            deleteHandler={() => {
              $valueStore["_meta"] = { method: "delete" };
            }}
            buttonTitle={titleSingle.toLowerCase()}
            type="submit"
            bind:canCreate
            bind:canUpdateOrDelete
          />
        </DMForm>
      {/if}
    </div>
  </div>
</Content>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
