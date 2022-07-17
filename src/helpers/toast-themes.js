import { toast } from "@zerodevx/svelte-toast";

export const toastSuccess = (m) =>
  toast.push(m, {
    theme: {
      "--toastBackground": "green",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 1500,
  });

export const toastError = (m) => {
  toast.push(m, {
    theme: {
      "--toastBackground": "red",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 3000,
  });
};

export const toastWarning = (m) => {
  toast.push(m, {
    theme: {
      "--toastBackground": "orange",
      "--toastColor": "white",
      "--toastBarColor": "olive",
      "--toastBorderRadius": "5px",
    },
    duration: 3000,
  });
};
