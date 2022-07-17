import { getJsonRpc, getSelectOptions } from "./api";

/**
 * submit a form to the backend using JSONRPC request.
 * @param e form element
 * @returns {Promise<*>}
 */
export async function onSubmit(e, mode = "dict") {
  const endpoint = e.target.dataset.endpoint;
  const method = e.target.dataset.method;

  console.log(
    "onSubmit(): \n" +
      "endpoint = '" +
      endpoint +
      "'" +
      "method   = '" +
      method +
      "'"
  );

  const formData = new FormData(e.target);
  let params = {};
  for (var pair of formData.entries()) {
    params[pair[0]] = pair[1];
  }
  console.log(params);
  const result = await getJsonRpc(endpoint, method, params, "dict", true);
  return result.code;
}

export async function submitHandler(values) {
  const { endpoint, method, ...params } = values;

  if (method === "noSubmit") {
    return;
  }

  const result = await getJsonRpc(endpoint, method, params, "dict", true);
  return result.code;
}

/**
 * Clear all the values in the array based on the formComponents.
   keep specified elements.
 * @param formComponentObjects
 * @param keep array of strings depicting the elements that should be kept.
 * @returns {{}}
 */
export function FormFields() {
  (this.values = {}),
    (this.clearExcept = function (keep = []) {
      for (const key in this.values) {
        if (!keep.includes(key)) {
          this.values[key] = null;
        }
      }
    }),
    (this.clear = function () {
      for (const key in this.values) {
        this.values[key] = null;
      }
    }),
    (this.set = function (values) {
      this.values = values;
    }),
    (this.get = function (key) {
      return this.values[key];
    });
}

export const updateFormDefinitionOptions = async (
  endpoint,
  fieldName,
  attrs,
  formDefinition
) => {
  let options = await getSelectOptions(endpoint, attrs);

  formDefinition.components.forEach((item) => {
    if (item.attributes.name === fieldName) {
      item.attributes = { ...item.attributes, ...{ options: options } };
    }
  });
  return formDefinition;
};
