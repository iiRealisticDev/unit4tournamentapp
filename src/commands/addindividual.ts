import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import { Event, Individual } from "../types/Participants";

export default async function (caches: Record<string, Cache<Individual | Event>>) {
  const cache = caches.individuals as Cache<Individual>;
  const eventCache = caches.events as Cache<Event>;

  const name = await prompt("What is the name of the individual?: ", (input) => input !== "" || cache.values().find((x: Individual) => x.name === input) != undefined);
  const events = await prompt("What events is the individual participating in? (comma separated IDs): ", (input) => input !== "");
  const id = cache.keys().length + 1;

  const eventsArray = events.split(",").map(eventId => {
    const event = eventCache.get(eventId);
    if (event !== undefined) return event;
  }) as Event[];

  cache.set(id.toString(), {
    name,
    eventsParticipatingIn: eventsArray,
    points: 0
  });

  cache.saveData();

  console.log("Individual added successfully!");
}