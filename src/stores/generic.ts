import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

/* selectOptionParameters tells where to get the <option> values of <select> input's */
interface ISelectOptionParameter {
  sourceModel: string; // Is also the name of the endpoint.
  targetField: string; // The name of the <select> field in the form
  attrs: { [key: string]: any }; // The attrs dict needed for the endpoint's 'get_select_options' method.
}

export const menuOpen: Writable<boolean> = writable(true);
export const emailStore: Writable<string> = writable("banaan");
export const selectedClientUid: Writable<string> = writable("");
export const currentEndpoint: Writable<string> = writable("");

export const recordStore = {};
export const optionParameterStore: {
  [key: string]: Array<ISelectOptionParameter>;
} = {};
