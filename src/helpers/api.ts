import { v4 as uuidv4 } from "uuid";
import { emailStore } from "../stores/generic";
import { toast } from "@zerodevx/svelte-toast";
import { toastError, toastSuccess } from "./toast-themes";
import process from "svelte-environment-variables";
import { array, bool, string } from "yup";
import { throwError } from "svelte-preprocess/dist/modules/errors";

/**
 * Do a JSON RPC request to the backend.
 * @param endpoint The endpoint without prefix, eg "admin"
 * @param method   The JSONRPC method to use, eg "grid_layout"
 * @param attrs    Optional attributes to send as request parameters.
 * @param mode     In which way to send the attr as request parameters
 *                 "spread" will spread them over the existing params
 *                 "dict" will add the complete attrs object to params
 * @param showError Boolean, should a toast.error be shown or is it maybe
 *                  handled upstream...
 * @returns {Promise<boolean|*>}  JSONRPC response
 */

/******** INTERFACES *********/

interface GenericObject {
  [key: string]: any;
}

interface APIResult {
  code: string;
  message?: string;
  data?: Array<any>;
  metadata?: { [key: string]: any };
}

interface APIAttrs {
  [key: string]: string;
}

interface AuthenticationParameters {
  email: string;
  api_key: string;
}

interface JSONRPCBody {
  jsonrpc: string;
  method: string;
  params: AuthenticationParameters;
  id: string;
}

let apiUrl: string = "";
switch (process.env.SVELTE_APP_ENVIRONMENT) {
  case "production": {
    apiUrl = process.env.SVELTE_APP_API_URL_PRODUCTION;
    break;
  }
  case "development": {
    apiUrl = process.env.SVELTE_APP_API_URL_DEVELOPMENT;
    break;
  }
  default: {
    apiUrl = "https://NO-VALID-ENVIRONMENT.LOCAL";
  }
}

export async function getJsonRpc(
  endpoint: string,
  method: string,
  attrs: APIAttrs,
  mode: string = "spread",
  showError: boolean = false
): Promise<APIResult> {
  let email: string;

  emailStore.subscribe((value) => {
    email = value;
  });

  let params: AuthenticationParameters = {
    email: email,
    api_key: "key",
  };

  switch (mode) {
    case "spread":
      params = { ...params, ...attrs };
      break;
    case "dict":
      params["attrs"] = attrs;
      break;
    default:
      throwError("'mode' must be 'spread' or 'dict'");
  }

  console.debug(">>>> " + endpoint + ":" + method + " request");

  const url: string = apiUrl + endpoint;

  const body: JSONRPCBody = {
    jsonrpc: "2.0",
    method: method,
    params: params,
    id: uuidv4(),
  };

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const result: Response = await fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(body),
  });

  if (result.status !== 200) {
    toast.push("API Request failed: " + result.statusText, { duration: 3000 });
    return { code: "ERROR", message: "status = " + result.status.toString() };
  }

  const content: GenericObject = await result.json();

  console.debug("<<<< " + endpoint + ":" + method + " response:");
  console.debug(content.result);

  if (content.result.code !== "OK" && showError) {
    toastError(content.result.code + ": " + content.result.message);
  }
  if (content.result.code === "OK" && showError) {
    toastSuccess(content.result.message);
  }

  return content.result;
}

export const getSelectOptions = async (
  endpoint: string,
  attrs: APIAttrs = {},
  mode: string = "dict",
  showError: boolean = false
): Promise<Array<any>> => {
  const result = await getJsonRpc(
    endpoint,
    "get_select_options",
    attrs,
    mode,
    showError
  );
  if (result.code === "OK") {
    return result.data;
  } else {
    toastError("Could not fetch clients.");
    return [];
  }
};
