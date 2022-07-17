<script>
  import Content from "../components/Content.svelte";
  import Header from "../components/Header.svelte";
  import process from "svelte-environment-variables";
  import { getJsonRpc } from "../helpers/api";
  import { toastError } from "../helpers/toast-themes";

  const getVersion = async () => {
    const result = await getJsonRpc(
      "system",
      "api_version",
      {},
      "spread",
      false
    );
    if (result.code === "OK") {
      return {
        apiVersion: result.data.api_version,
        buildDate: result.data.build_date,
      };
    } else {
      toastError("Could not het version information");
    }
  };

  // $: apiVersion = getVersion();

  const apiVersion = {
    apiVersion: "1.1",
    buildDate: "2022-01-01 23:59",
  }
</script>

<Content>
  <Header>Welcome to DataMatrix {process.env.SVELTE_APP_DM_VERSION}</Header>
  <div class="email-font-size ml-4 flex">
    API {#await apiVersion then info}
      <div class="font-bold ml-1 mr-1">{info.apiVersion}</div>
      (built on: {info.buildDate})
    {/await}
  </div>
</Content>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .container {
    margin-top: 100px;
  }
</style>
