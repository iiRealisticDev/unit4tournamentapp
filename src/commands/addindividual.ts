import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import { Event, Individual } from "../types/Participants";

export default async function (caches: Record<string, Cache<Individual | Event>>) {
  const cache = caches.individuals as Cache<Individual>;
  // if there are 20 individals, output that the maximum has been reached
  if (cache.keys().length === 20) {
    console.log("The maximum number of individuals has been reached!");
    return;
  }

  // get the event cache
  const eventCache = caches.events as Cache<Event>;

  // get the name of the individual
  const name = await prompt("What is the name of the individual?: ", (input) => input !== "" || cache.values().find((x: Individual) => x.name === input) != undefined);
  // get the events the individual is participating in
  const events = await prompt("What events is the individual participating in? (comma separated IDs, either 1 event or 5): ", (input) => input !== "");
  // get the id for the individual
  const id = cache.keys().length + 1;

  // get the events the individual is participating in
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