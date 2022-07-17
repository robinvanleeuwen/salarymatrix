<script>
  import "bootstrap/js/dist/collapse";
  import "bootstrap/dist/css/bootstrap.css";
  import { emailStore, selectedClientUid } from "./stores/generic";
  import { link } from "svelte-spa-router";
  import jQuery from "jquery";
  import { toastError } from "./helpers/toast-themes";
  import { getJsonRpc } from "./helpers/api";

  jQuery(document).ready(function () {
    jQuery("#sidebarCollapse").on("click", function () {
      console.log("Clicked");
      jQuery("#sidebar").toggleClass("active");
      console.log(this);
      jQuery(this).toggleClass("active");
    });
  });

  let selectedClientName = "- select a client -";

  const getClientNameByUid = async (clientUid) => {
    const result = await getJsonRpc(
      "client",
      "get_by_uid",
      { client_uid: clientUid },
      "dict",
      false
    );
    if (result.code === "OK") {
      return result.data.name;
    } else {
      toastError("Could not get client name.");
      return "...";
    }
  };

  $: if ($selectedClientUid !== "") {
    selectedClientName = getClientNameByUid($selectedClientUid);
    console.log(selectedClientName);
  }
</script>

<div>
  <nav id="sidebar" class="shadow-2xl">
    <div class="sidebar-header">
      <h3>DataMatrix</h3>
      {#if $emailStore.length > 24}
        <div class="text-center" style="font-size: small">
          {$emailStore}
        </div>
      {:else}
        <div class="text-center" style="font-size: medium">
          {$emailStore}
        </div>
      {/if}
      <div class="mt-2 email-font-size">
        {#await selectedClientName}
          ...
        {:then name}
          {name}
        {/await}
      </div>
    </div>
    <ul class="components list-unstyled">
      <li><a href="/playground" use:link>Playground</a></li>
      <li>
        <a
          id="sidebarCollapse"
          href="#smd"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle">Master Data</a
        >
        <ul class="  list-unstyled" id="smd">
          <li><a use:link href="/admins">Admins</a></li>
          <li><a use:link href="/clients">Clients</a></li>
          <li><a use:link href="/users">Users</a></li>
        </ul>
      </li>
      <li>
        <a
          id="sidebarCollapse1"
          href="#smd"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle">Client Data</a
        >
        <ul class="  list-unstyled" id="scd">
          <li><a use:link href="/tiers">Tiers</a></li>
          <li><a use:link href="/genres">Genres</a></li>
          <li><a use:link href="/locations">Locations</a></li>
          <li><a use:link href="/events">Events</a></li>
        </ul>
      </li>

      <li>
        <a
          id="sidebarCollapse2"
          href="#smd"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle">Event Data</a
        >
        <ul class="  list-unstyled" id="scd2">
          <li><a use:link href="/products">Products</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</div>

<style>
  /* ---------------------------------------------------
      SIDEBAR STYLE
  ----------------------------------------------------- */
  a,
  a:hover,
  a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }

  .email-font-size {
    font-size: medium;
  }

  .list-unstyled {
    list-style: none;
  }

  #sidebar {
    width: 250px;
    font-family: "Roboto", sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 990;
    background: #37465b;
    color: #fafafa;
    transition: all 0.3s;
  }

  #sidebar.active {
    margin-left: -250px;
    background-color: #677282;
  }

  #sidebar .sidebar-header {
    text-align: center;
    padding: 20px;
    box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.2);
    background: #232e3b;
  }

  #sidebar ul.components {
    padding: 10px 0;
    border-bottom: 1px solid #47748b;
  }

  #sidebar ul p {
    color: #fff;
    padding: 1px;
  }

  #sidebar ul li a {
    padding: 5px;
    font-size: 1.1em;
    display: block;
  }

  #sidebar ul li a:hover {
    color: #7386d5;
    background: #fff;
  }

  #sidebar ul li.active > a,
  a[aria-expanded="true"] {
    color: #fff;
    background: #37465b;
  }

  a[data-toggle="collapse"] {
    position: relative;
  }

  .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #37465b;
  }

  ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .active {
    width: calc(100% - 250px);
  }

  /* ---------------------------------------------------
      MEDIAQUERIES
  ----------------------------------------------------- */

  @media (max-width: 768px) {
    #sidebar {
      margin-left: -250px;
    }
    #sidebar.active {
      margin-left: 0;
    }
    #content {
      width: 100%;
    }
    .active {
      width: calc(100% - 250px);
    }
    #sidebarCollapse {
      display: none;
    }
  }
</style>
