import Home from "./pages/Home.svelte";
import Admins from "./pages/Admins.svelte";
import Company from "./pages/Company.svelte";
import Locales from "./pages/Locales.svelte";
import Schedules from "./pages/Schedules.svelte";
import Employees from "./pages/Employees.svelte";
import Tags from "./pages/Tags.svelte";

export const routes = {
  "/": Home,
  "/admins": Admins,
  "/company": Company,
  "/locales": Locales,
  "/schedules": Schedules,
  "/employees": Employees,
  "/tags": Tags,
};
