import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import { Event, Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Team | Event>>) {
  const cache = caches.teams as Cache<Team>;
  // if there are 4 teams already, output that the maximum has been reached
  if (cache.keys().length === 4) {
    console.log("The maximum number of teams has been reached!");
    return;
  }

  const eventCache = caches.events as Cache<Event>;

  // get the name of the team
  const name = await prompt("What is the name of the team?: ", (input) => input !== "" || cache.values().find((x: Team) => x.name === input) != undefined);
  // get the events the team is participating in
  const events = await prompt("What events is the team participating in? (comma separated IDs, either 1 event or 5): ", (input) => {
    // ensure input is not null, exists in the event cache and there are 5 events listed
    const eventsArr = input.split(",").map(eventId => eventCache.get(eventId));
    // ensure event type is team
    const notNull = input !== "";
    const isIndividual = eventsArr.every((event) => event?.eventType === "team");
    const isOfLength = input.split(",").length === 5 || input.split(",").length === 1;
    return notNull && isIndividual && isOfLength;
  });
  // get the participants of the team
  const participants = await prompt("What are the names of the participants? (comma separated names): ", (input) => {
    // same validation as above, excluding checking event cache
    return input !== "" && input.split(",").length === 5;
  });
  // get the id for the team
  const id = cache.keys().length + 1;

  // get the events the team is participating in
  const eventsArray = events.split(",").map(eventId => {
    const event = eventCache.get(eventId);
    if (event !== undefined) return event;
  }) as Event[];

  // add the team to the cache
  cache.set(id.toString(), {
    name,
    eventsParticipatingIn: eventsArray,
    participants: participants.split(","),
    points: 0
  });

  cache.saveData();

  console.log("Team added successfully!");
}