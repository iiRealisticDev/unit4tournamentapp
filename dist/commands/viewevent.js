"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    // view events
    const eventCache = caches.events;
    const toView = await (0, input_1.prompt)("Please provide an event name, id or the world \"all\": ", (input) => input !== "" || eventCache.values().find((x) => x.name === input) != undefined || input.toLowerCase() === "all" || eventCache.get(input) !== undefined);
    const eventId = toView === "all" ? parseInt(toView) !== undefined ? toView : undefined : eventCache.getKeyFromName(toView);
    if (eventId === undefined) {
        console.log("Invalid event name or ID!");
        return;
    }
    console.log(eventId);
}
exports.default = default_1;
