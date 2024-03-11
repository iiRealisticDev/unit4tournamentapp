import type { Cache } from "../helpers/cache";
import type { Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Team>>) {
  // run the save function on all caches.
  console.log("Saving, do not close the app!");
  for (const cache of Object.values(caches)) {
    cache.saveData(); // save the data
  }
  process.exit();
}