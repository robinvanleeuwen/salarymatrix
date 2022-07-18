import {  writable } from "svelte/store";
import type { FormDefinition } from "../helpers/layout";
import type { Writable} from "svelte/store";

export function createValueStore(components) {
  let initialStore = {};
  components.forEach((c) => {
    initialStore[c.attributes.name] = c.attributes.initialValue || "";
  });
  return writable(initialStore);
}

/**
 * All form fields that are not marked as needed in the FormLayout
 * are set to null. This cleans up the form, but keeps fields that
 * are essential for creating and updating existing records. For
 * example the "clientUid" field in the "Event" record. Fields are
 * marked needed in the backend SQL model which is propagated to the
 * generateForm() --> formComponents array.
 */
export const clearValueStore = (valueStore: Writable<any>, formDefinition: FormDefinition) => {
  if (!formDefinition || !valueStore) {
    !formDefinition ? console.warn("No formDefinition given!") : "";
    !valueStore ? console.warn("ValueStore is not given!") : "";
    console.error("Did not get needed parameters to clear the value store...");
    return;
  }

  let newState = {};
  formDefinition.components.forEach((c) => {
    if (!c.attributes.isNeeded) {
      newState[c.attributes.name] = null;
    }
  });
  valueStore.update((state) => {
    return { ...state, ...newState };
  });
};
