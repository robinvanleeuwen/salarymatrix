<script lang="ts">
  import Header from "../components/Header.svelte";
  import { onMount } from "svelte";
  import { getSelectOptions } from "../helpers/api";
  import Content from "../components/Content.svelte";
  import { updateRowData } from "../helpers/grid";
  import { selectedCompanyUid } from "../stores/generic";
  import DMForm from "../components/DMForm.svelte";
  import { writable } from "svelte/store";
  import Grid from "../components/Grid.svelte";
  import { clearValueStore, createValueStore } from "../stores/helpers";
  import CUDBar from "../components/CUDBar.svelte";
  import { FormDefinition, generateFormDefinition } from "../helpers/layout";
  import { GridApi } from "ag-grid-community";

  import type { SelectOption, GenericObject } from "../helpers/layout";
  import type { Writable } from "svelte/store";
  import DMSelect from "../components/fields/DMSelect.svelte";

  const endpoint: string = "event";
  const titleSingle: string = "Event";
  const titlePlural: string = "Events";

  let method: string = "create";
  let formDefinition: FormDefinition;
  let companies: Array<SelectOption> = [];
  let rowData: Array<GenericObject> = [];
  let valueStore: Writable<GenericObject> = writable({ _meta: {} });

  let canCreate: boolean = false;
  let canUpdateOrDelete: boolean;
  let gridApi: GridApi = null;

  const refreshRowData = async (): Promise<Array<GenericObject>> => {
    return await updateRowData(
      endpoint,
      "get_all",
      { company_uid:  $valueStore["companyUid"]  },
      "dict",
      false
    );
  };

  const handleGridSelect = (rows) => {
    clearValueStore(valueStore, formDefinition);

    if (gridApi.getSelectedNodes().length === 1) {
      $valueStore = {
        ...$valueStore,
        ...rows.detail[0],
      };
    } else if (gridApi.getSelectedNodes().length === 0) {
      $valueStore = { ...$valueStore };
    }
    canCreate = gridApi?.getSelectedNodes().length === 0;
  };

  const selectedCompanyChanged = async (e) => {
    clearValueStore(valueStore, formDefinition);

    $valueStore["companyUid"] = e.target.value;

    // If there are any option-arrays for select-boxes
    // that should be synced with the new company, this
    // is the place to do that.

    rowData = await refreshRowData();
  };

  onMount(async () => {
    companies = await getSelectOptions("company");
    formDefinition = await generateFormDefinition(endpoint);
    valueStore = createValueStore(formDefinition.components);
    rowData = await refreshRowData();
    $valueStore["company_uid"] = $selectedCompanyUid;
  });

  $: {
    if (gridApi?.getSelectedNodes().length === 0) {
      canCreate = true;
    }
  }
  $: canUpdateOrDelete = !canCreate;
  $: $valueStore["companyUid"] = $selectedCompanyUid;
</script>

<Content>
  <Header>{titlePlural}</Header>
  <div class="grid grid-cols-2 pt-4 mr-4">
    <div>
      <div class="flex ml-3 mb-2 w-[100%]">
        <DMSelect
          onchange={(e) => selectedCompanyChanged(e)}
          attributes={{ label: "Company", options: companies }}
          bind:value={$selectedCompanyUid}
        />
      </div>
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
    <div class="mt-[53px]">
      {#if formDefinition}
        <DMForm
          containerClasses="border border-gray-400 p-2 ml-4 shadow-xl"
          headerClasses="ml-1 mb-2"
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
