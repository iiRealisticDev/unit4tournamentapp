import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import { Event, Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Team | Event>>) {
  const cache = caches.individuals as Cache<Team>;
  // if there are 4 teams already, output that the maximum has been reached
  if (cache.keys().length === 4) {
    console.log("The maximum number of teams has been reached!");
    return;
  }

  const eventCache = caches.events as Cache<Event>;

  const name = await prompt("What is the name of the team?: ", (input) => input !== "" || cache.values().find((x: Team) => x.name === input) != undefined);
  const events = await prompt("What events is the team participating in? (comma separated IDs): ", (input) => {
    // ensure input is not null, exists in the event cache and there are 5 events listed
    return input !== "" && input.split(",").every((eventId) => eventCache.get(eventId) !== undefined) && input.split(",").length === 5;
  });
  const participants = await prompt("What are the names of the participants? (comma separated names): ", (input) => {
    // same validation as above, excluding checking event cache
    return input !== "" && input.split(",").length === 5;
  });
  const id = cache.keys().length + 1;

  const eventsArray = events.split(",").map(eventId => {
    const event = eventCache.get(eventId);
    if (event !== undefined) return event;
  }) as Event[];

  cache.set(id.toString(), {
    name,
    eventsParticipatingIn: eventsArray,
    participants: participants.split(","),
    points: 0
  });

  cache.saveData();

  console.log("Individual added successfully!");
}