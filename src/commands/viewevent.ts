import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import type { Event } from "../types/Participants";

export default async function (caches: Record<string, Cache<Event>>) {
  // view events
  const eventCache = caches.events;

  const toView = await prompt("Please provide an event name, id or the world \"all\": ", (input) => input !== "" || eventCache.values().find((x: Event) => x.name === input) != undefined || input.toLowerCase() === "all" || eventCache.get(input) !== undefined);

  const eventId = toView === "all" ? parseInt(toView) !== undefined ? toView : undefined : eventCache.getKeyFromName(toView);

  if (eventId === undefined) {
    console.log("Invalid event name or ID!");
    return;
  }

  console.log(eventId);
}