import { getJsonRpc } from "./api";
import { toastError } from "./toast-themes";

export async function updateRowData(
  endpoint,
  method,
  attrs,
  mode = "spread",
  showError = "false"
) {
  if (endpoint === undefined) {
    toastError("Undefined endpoint");
    return;
  }
  const result = await getJsonRpc(endpoint, method, attrs, mode, showError);
  if (result.code === "OK") {
    return result.data;
  } else {
    toastError("Could not get grid data: " + result.message);
  }
}
