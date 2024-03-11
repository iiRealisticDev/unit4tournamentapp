"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    const cache = caches.individuals;
    // if there are 20 individals, output that the maximum has been reached
    if (cache.keys().length === 20) {
        console.log("The maximum number of individuals has been reached!");
        return;
    }
    // get the event cache
    const eventCache = caches.events;
    // get the name of the individual
    const name = await (0, input_1.prompt)("What is the name of the individual?: ", (input) => input !== "" || cache.values().find((x) => x.name === input) != undefined);
    // get the events the individual is participating in
    const events = await (0, input_1.prompt)("What events is the individual participating in? (comma separated IDs, either 1 event or 5): ", (input) => {
        const events = input.split(",").map(eventId => eventCache.get(eventId));
        // ensure event type is individual
        const notNull = input !== "";
        const isIndividual = events.every((event) => event?.eventType === "individual");
        const isOfLength = input.split(",").length === 5 || input.split(",").length === 1;
        return notNull && isIndividual && isOfLength;
    });
    // get the id for the individual
    const id = cache.keys().length + 1;
    // get the events the individual is participating in
    const eventsArray = events.split(",").map(eventId => {
        const event = eventCache.get(eventId);
        if (event !== undefined)
            return event;
    });
    cache.set(id.toString(), {
        name,
        eventsParticipatingIn: eventsArray,
        points: 0
    });
    cache.saveData();
    console.log("Individual added successfully!");
}
exports.default = default_1;
