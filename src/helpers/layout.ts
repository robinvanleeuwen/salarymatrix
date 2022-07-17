import DMInput from "../components/fields/DMInput.svelte";
import DMSelect from "../components/fields/DMSelect.svelte";
import DMDateTimeInput from "../components/fields/DMDateTimeInput.svelte";
import DMCheckbox from "../components/fields/DMCheckbox.svelte";
import { throwError } from "svelte-preprocess/dist/modules/errors";
import DMText from "../components/fields/DMText.svelte";
import { toastError } from "./toast-themes.js";
import type { SvelteComponent } from "svelte";
import { getJsonRpc } from "./api";

interface IComponentAttributes {
  type: string;
  label: string;
  name: string;
  required: boolean;
  isNeeded: boolean;
  readOnly: boolean;
  dependencies: Array<string>;
  options?: Array<SelectOption>;
  sourceModel: string;
  quickGrid: Array<string>;
  cls: string;
  value: string | null;
}

export type GenericObject = { [key: string]: any };

export interface SelectOption {
  value: string;
  label: string;
}

interface IFormComponent {
  componentType: SvelteComponent;
  attributes: IComponentAttributes;
}

export class FormDefinition {
  endpoint: string;
  components: Array<IFormComponent>;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.components = [];
  }
}

export async function generateFormDefinition(
  endpoint
): Promise<FormDefinition> {
  const result = await getJsonRpc(endpoint, "form_layout", {});
  let layout;
  let metadata;

  if (result.code === "OK") {
    layout = result.data;
    metadata = result.metadata;
  } else {
    toastError("Could not get form layout: " + result.message);
  }

  let definition = new FormDefinition(metadata["endpoint"]);

  for (const item of layout) {
    let componentType = undefined;
    let attrs: IComponentAttributes = {
      type: item.type,
      label: item.label,
      name: item.name,
      required: item.required,
      readOnly: item.readOnly,
      isNeeded: metadata["needed_fields"].includes(item.name),
      dependencies: item.dependencies ? item.dependencies : [],
      sourceModel: item.sourceModel ? item.sourceModel : "",
      quickGrid: item.quick_grid,
      cls: "",
      value: "",
    };

    switch (item.control) {
      case "input":
        componentType = DMInput;
        break;
      case "select":
        componentType = DMSelect;
        break;
      case "datetime":
        componentType = DMDateTimeInput;
        attrs["value"] = null;
        break;
      case "checkbox":
        componentType = DMCheckbox;
        attrs["cls"] = "pl-1 mb-1.5 w-11/12";
        break;
      case "text":
        componentType = DMText;
        break;
      default:
        throwError(
          "Got Unknown control_type (" + item.control + ") from form_layout()"
        );
    }

    let component: IFormComponent = {
      attributes: { ...attrs },
      componentType: componentType,
    };
    definition.components.push(component);
  }

  return definition;
}
