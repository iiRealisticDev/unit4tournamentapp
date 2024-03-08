import type { Cache } from "../helpers/cache";
import { prompt, isDate } from "../helpers/input";
import { Event } from "../types/Participants";

export default async function (caches: Record<string, Cache<Event>>) {
  const cache = caches.events;
  const eventName = await prompt("What is the name of the event?: ", (input) => input !== "" || cache.values().find((x: Event) => x.name === input) != undefined);
  const eventCat = await prompt("What is the category of the event? (Sport/Academic)", (input) => input.toLowerCase() === "sport" || input.toLowerCase() == "academic") as "sport" | "academic";
  const eventType = await prompt("What is the type of the event? (Individual/Team)", (input) => input.toLowerCase() === "individual" || input.toLowerCase() == "team") as "individual" | "team";
  const pts = await prompt("What are the points per position for this event (3,2,1 = 3 points for 1st, etc...)?", (input) => input.split(",").every((x) => !isNaN(parseInt(x)) && parseInt(x) > 0) && input.split(",").length > 0);
  const dateStart = await prompt("What is the start date of the event?", isDate);
  const dateEnd = await prompt("What is the end date of the event?", isDate);

  const eventId = cache.keys().length + 1;
  // add to event cache
  cache.set(eventId.toString(), {
    name: eventName,
    points: pts.split(",").map((x) => parseInt(x)),
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
    eventCat: eventCat,
    eventType: eventType,
    winner: undefined
  });

  cache.saveData();

  console.log(`Event added successfully with event ID ${eventId}!`);
}