<script lang="ts">
  import Header from "../components/Header.svelte";
  import Content from "../components/Content.svelte";
  import Grid from "../components/Grid.svelte";
  import Sidebar from "../components/sidebar/Sidebar.svelte";
  import DMForm from "../components/DMForm.svelte";
  import process from "svelte-environment-variables";
  import SidebarOpenButton from "../components/sidebar/SidebarOpenButton.svelte";
  import { FormDefinition, generateFormDefinition } from "../helpers/layout";
  import { updateRowData } from "../helpers/grid";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { clearValueStore, createValueStore } from "../stores/helpers";
  import { GridApi } from "ag-grid-community";
  import { updateFormDefinitionOptions } from "../helpers/form";

  import type { Writable } from "svelte/store";
  import type { GenericObject } from "../helpers/layout";
  import CUDBar from "../components/CUDBar.svelte";
  import { io } from "socket.io-client";
  import { socketUrl } from "../helpers/api";

  const endpoint: string = "tag";
  const titleSingle: string = "Tag";
  const titlePlural: string = "Tags";

  let openButtonMode: string = "Add";

  let formDefinition: FormDefinition;
  let rowData: Array<GenericObject> = [];
  let valueStore: Writable<GenericObject> = writable({ _meta: {} });
  let sidebarShow: boolean = false;

  let gridApi: GridApi = null;

  let canCreate: boolean = true;
  let canUpdateOrDelete = true;

  const refreshRowData = async () => {
    return await updateRowData(endpoint, "get_all", {}, "dict", false);
  };


  const socket = new io(socketUrl+"tag");

  socket.on("tag_active_status", (message: any) => {
    $: rowData = rowData.map((item) => {
      if(item.code === message.code) {
        item.isActive = message.isActive.toString();
      }
      return item;
    })
  });
  
  const handleGridSelect = (rows) => {

    if (rows.detail.length === 1) {
      console.log("ONE selected")
      canUpdateOrDelete = true;
      canCreate = false;
      openButtonMode = "Edit";
      $valueStore = {
        ...$valueStore,
        ...rows.detail[0],
      };
    } else if (rows.detail.length === 0) {
      clearValueStore(valueStore, formDefinition);
      canUpdateOrDelete = false;
      canCreate = true;
      openButtonMode = "Add";
      $valueStore = { ...$valueStore };
    }
  };

  async function getOptions() {
    formDefinition = await updateFormDefinitionOptions(
      "employee",
      "employeeUid",
      {},
      formDefinition
    );
    formDefinition = await updateFormDefinitionOptions(
      "tag_status",
      "status",
      {},
      formDefinition
    );
  }

  onMount(async () => {
    formDefinition = await generateFormDefinition(endpoint);
    valueStore = createValueStore(formDefinition.components);
    rowData = await refreshRowData();

    await getOptions();
  });
</script>

<Content>
  <Header headerClasses="ml-3.5">{titlePlural}</Header>
  <div class="grid grid-cols-[65%_35%] pt-4 justify-content-start mr-4">
    <div class="ml-3 mb-2 shadow">
      <Grid
        {endpoint}
        bind:api={gridApi}
        bind:rowData
        on:select={handleGridSelect}
        style="height: 750px"
      />
    </div>
    <div>
      {#if formDefinition }
        <DMForm
          containerClasses="border border-[#babfc7] p-2 pb-3 ml-2 shadow-xl"
          headerClasses="ml-1 mb-2"
          headerTitle={titleSingle}
          buttonTitle={titleSingle.toLowerCase()}
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
  <SidebarOpenButton mode={openButtonMode} bind:show={sidebarShow} />
  <Sidebar bind:show={sidebarShow}>
    <div class="mb-3 ml-2">

    </div>
  </Sidebar>
</Content>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
