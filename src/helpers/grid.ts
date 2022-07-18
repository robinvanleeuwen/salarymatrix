import { getJsonRpc } from "./api";
import { toastError } from "./toast-themes";
import { throwError } from "svelte-preprocess/dist/modules/errors";

export async function updateRowData(
  endpoint: string,
  method: string,
  attrs: {[key: string]: any},
  mode: string = "spread",
  showError: boolean = false
) {
  if (endpoint === undefined) {
    toastError("Undefined endpoint");
    return;
  }
  const result = await getJsonRpc(endpoint, method, attrs, mode, showError);
  if (result.code === "OK") {
    return result.data;
  }
  if (showError) {
    toastError("Could not get grid data: " + result.message);
  } else {
    throwError("Could not get grid data: " + result.message);
  }
}

