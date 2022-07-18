<script lang="ts">
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-alpine.css";
  import { Grid } from "ag-grid-community";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { getJsonRpc } from "../helpers/api";
  import { menuOpen } from "../stores/generic";

  export let endpoint;
  export let quickAdd = false;
  export let extraOptions = {};
  export let rowData;
  export let cls = "";
  export let style = "height: 750px";
  export let api;

  const dispatch = createEventDispatcher();

  const onSelectionChanged = () => {
    const selectedRows = api.getSelectedRows();
    dispatch("select", selectedRows);
  };

  const updateData = (data) => {
    if (grid && api) {
      console.log("GridReady");
      api.setRowData(data);
      api.setColumnDefs(gridLayout);
    }
  };

  /********************  Set Grid Options, create and destroy the grid, onMount *******************/
  const gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      sortable: true,
    },
    pagination: true,
    paginationPageSize: 15,
    rowSelection: "single",
    ...extraOptions,
  };

  let gridContainer;
  let gridLayout;
  let grid;
  let opt;

  onMount(async () => {
    const result = await getJsonRpc(
      endpoint,
      "grid_layout",
      {
        quick_add: quickAdd,
      },
      "dict"
    );
    gridLayout = result.data;
    grid = new Grid(gridContainer, {
      ...gridOptions,
      columnDefs: gridLayout,
      rowData,
      onGridReady,
      onSelectionChanged,
    });
  });

  const onGridReady = () => {
    api = grid.gridOptions.api;
  };

  onDestroy(() => {
    if (grid) {
      grid.destroy();
    }
  });

  $: updateData(rowData);
</script>

<div
  id="datagrid"
  class="{cls} ag-theme-alpine"
  {style}
  bind:this={gridContainer}
>
  <slot />
</div>

<style>
  #datagrid {
    --ag-header-foreground-color: blue;
  }
  :global(.ag-header-cell) {
    font-size: 14px;
    color: #000000;
  }
</style>
