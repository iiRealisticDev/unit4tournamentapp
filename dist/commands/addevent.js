"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(cache) {
    const actualCache = cache.events;
    const eventName = await (0, input_1.prompt)("What is the name of the event?: ", (input) => input !== "" || actualCache.values().find((x) => x.name === input) != undefined);
    const eventCat = await (0, input_1.prompt)("What is the category of the event? (Sport/Academic)", (input) => input.toLowerCase() === "sport" || input.toLowerCase() == "academic");
    const eventType = await (0, input_1.prompt)("What is the type of the event? (Individual/Team)", (input) => input.toLowerCase() === "individual" || input.toLowerCase() == "team");
    const dateStart = await (0, input_1.prompt)("What is the start date of the event?", input_1.isDate);
    const dateEnd = await (0, input_1.prompt)("What is the end date of the event?", input_1.isDate);
    const eventId = actualCache.keys().length + 1;
    // add to event cache
    actualCache.set(eventId.toString(), {
        name: eventName,
        points: [],
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        eventCat: eventCat,
        eventType: eventType,
        winner: undefined
    });
    console.log(`Event added successfully with event ID ${eventId}!`);
}
exports.default = default_1;
