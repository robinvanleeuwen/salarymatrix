<script>
  import * as yup from "yup";

  import Header from "./Header.svelte";
  import { getJsonRpc } from "../helpers/api";
  import { clearValueStore } from "../stores/helpers";
  import { throwError } from "svelte-preprocess/dist/modules/errors";

  export let containerClasses = "";
  export let headerClasses = "";

  /**
   * These handlers are the actions performed when pressing one of the CUDBar buttons.
   * The CUDBar buttons are all 'submit' buttons: these handlers will be executed
   * before calling the on:submit={INSERTHANDLER}.
   *
   * The corresponding buttons on the CUDBar will only be shown if a handler is given.
   * If you want the button to show without a handler, give a no-op handler: () => {}
   */

  /* The refreshRowData function is needed to update the Grid */
  /* The rowData is bound to update the grid when submitted */
  export let refreshRowData;
  export let rowData;

  /* title used in Header and CUDBar buttons */
  export let headerTitle;

  /* isDisabled is the flag that is used to disable CUD buttons */
  export let canCreate = false;
  export let canUpdateOrDelete = false;

  /**
   * The object-array of components that will make up the form. These are provided
   * by the API through the "form_layout" method in the corresponding endpoint.
   */
  export let formDefinition = undefined;

  /** This is the valueStore that hold's all values that should be put on the form
   *  It is passed down as prop so values can be filled upstream (from the grid for exampel)
   */
  export let valueStore;

  export let showOptionsDialog = false;

  /******************************************************************************/

  let clearFormAfterSubmit = false;

  let validationObject = null;
  let schema = {};
  let errors = {};

  const extractErrors = (err) => {
    return err.inner?.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  };

  /**
   *  Construct the validation schema for the form.
   */
  $: if (formDefinition?.components.length > 0) {
    formDefinition.components.forEach((i) => {
      let validationMethod = null;
      if (i.attributes.type === "text" || i.attributes.type === "select") {
        validationMethod = yup.string().typeError("must be text");
      } else if (i.attributes.type === "hidden") {
        validationMethod = yup.string().typeError("");
      } else if (i.attributes.type === "email") {
        validationMethod = yup
          .string()
          .typeError("must be an email address")
          .email();
      } else if (i.attributes.type === "number") {
        validationMethod = yup.number().typeError("must be a number");
      } else if (i.attributes.type === "datetime") {
        validationMethod = yup.date().typeError("must be a valid date/time");
      }
      try {
        if (i.attributes.required) {
          validationMethod = validationMethod.required("is required");
        }
      } catch (err) {
        console.error(err.toString());
        console.error("ERROR!!!: Field type not detected. Skipping validation");
        console.error(i);
      }
      schema[i.attributes.name] = validationMethod;
    });
    validationObject = yup.object().shape(schema);
  } else if (formDefinition === undefined) {
    throwError("formDefinition is undefined!")
  } else {
    console.warn("formDefinition.components.length === 0");
  }

  /**
   * Validate the form and submit it to the correct endpoint/method.
   * @param event
   * @returns null
   */

  const onSubmit = async (event) => {
    const method = $valueStore["_meta"]["method"];
    const endpoint = formDefinition.endpoint;
    const formData = new FormData(event.target);

    let params = {};
    for (const [key, value] of formData.entries()) {
      params[key] = value;
    }

    errors = {};

    if (method === "delete") {
      /* No validation when deleting */
      const result = await getJsonRpc(endpoint, method, params, "dict", true);
      if (result["code"] === "OK") {
      }
      rowData = await refreshRowData();
    } else {
      validationObject
        .validate(params, { abortEarly: false })
        .then(async () => {
          const result = await getJsonRpc(
            endpoint,
            method,
            params,
            "dict",
            true
          );
        })
        .catch((err) => {
          errors = extractErrors(err);
        })
        .finally(async () => {
          rowData = await refreshRowData();
        });
    }
    if (clearFormAfterSubmit) {
      clearValueStore(valueStore, formDefinition);
      canCreate = true;
      canUpdateOrDelete = false;
    }
  };
</script>

<div class={containerClasses}>
  <Header {headerClasses}>{headerTitle}</Header>
  <form
    novalidate
    autocomplete="off"
    on:submit|preventDefault={(e) => onSubmit(e)}
  >
    {#each formDefinition.components as e}
      <svelte:component
        this={e.componentType}
        cls="pr-3"
        disabled={!canUpdateOrDelete && !canCreate}
        attributes={e.attributes}
        bind:value={$valueStore[e.attributes.name]}
        bind:showOptionsDialog
      />
      {#if errors[e.attributes.name]}
        <div class="text-sm text-red-500 ml-1 mb-1">
          {e.attributes.label}
          {errors[e.attributes.name]}
        </div>{/if}
    {/each}
    <slot />
  </form>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
