"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    // view events
    const eventCache = caches.events;
    // get the name of the event to view
    const toView = await (0, input_1.prompt)("Please provide an event name, id or the world \"all\": ", (input) => input !== "" || eventCache.values().find((x) => x.name === input) != undefined || input.toLowerCase() === "all" || eventCache.get(input) !== undefined);
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
            console.log(`Event Name: ${event.name} | Event Start Date: ${event.dateStart} | Event End Date: ${event.dateEnd}`);
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
exports.default = default_1;
