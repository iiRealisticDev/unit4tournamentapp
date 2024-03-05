import type { Cache } from "../helpers/cache";
import type { Individual, Team, Event } from "../types/Participants";
export default async function (caches: Cache<Individual | Team | Event>[]) {
  // run the save function on all caches.
  console.log("Saving, do not close the app!");
  for (const cache of caches) {
    cache.saveData();
  }
  process.exit();
}