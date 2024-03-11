import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import type { Event } from "../types/Participants";

export default async function (caches: Record<string, Cache<Event>>) {
  // view events
  const eventCache = caches.events;

  // get the name of the event to view
  const toView = await prompt("Please provide an event name, id or the world \"all\": ", (input) => input !== "" || eventCache.values().find((x: Event) => x.name === input) != undefined || input.toLowerCase() === "all" || eventCache.get(input) !== undefined);

  // try to get the event from the cache
  const eventId = toView === "all" ? parseInt(toView) !== undefined ? toView : undefined : eventCache.getKeyFromName(toView);

  // if the event is not found, print a message
  if (eventId === undefined) {
    console.log("Invalid event name or ID!");
    return;
  }

  // if the user wants to view all events, print all the events
  if (toView === "all") {
    if (eventCache.values().length === 0) {
      console.log("No events found!");
      return;
    }
    console.log("All events:");
    for (const event of eventCache.values()) {
      console.log(event);
    }
    return;
  }

  // print the event's details
  const event = eventCache.get(eventId);

  // if the event is not found, print a message
  if (event === undefined) {
    console.log("Event not found!");
    return;
  }

  // print the event's details
  const eventInfo = `
  Event Name: ${event.name}
  Event Start Date: ${event.dateStart}
  Event End Date: ${event.dateEnd}
  Event Winner: ${event.winner ?? "No winner yet!"}
  Event Category: ${event.eventCat}
  Event Points: ${event.points.join(", ")}
  Event Type: ${event.eventType}
  `;

  console.log(eventInfo);
}