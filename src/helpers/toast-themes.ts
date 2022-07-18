import { toast } from "@zerodevx/svelte-toast";

export const toastSuccess = (msg: string) =>
  toast.push(msg, {
    theme: {
      "--toastBackground": "green",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 1500,
  });

export const toastError = (msg: string) => {
  toast.push(msg, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 3000,
  });
};

export const toastWarning = (msg: string) => {
  toast.push(msg, {
    theme: {
      "--toastBackground": "orange",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 3000,
  });
};
