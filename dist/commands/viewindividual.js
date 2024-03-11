"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    // individual cache
    const individuals = caches.individuals;
    // get the name of the individual to view
    const toView = await (0, input_1.prompt)("Enter the name/ID of the individual to view", (input) => {
        return input.toLowerCase() == "all" || individuals.values().some((individual) => individual.name === input) || individuals.has(input);
    });
    // try to get the individual from the cache
    if (toView === "all") {
        if (individuals.values().length === 0) {
            console.log("No individuals found!");
            return;
        }
        console.log("All individuals:");
        for (const individual of individuals.values()) {
            const readableString = `${individual.name} - Points: ${individual.points}`;
            console.log(readableString);
        }
        return;
    }
    // print the individual's details
    const individual = individuals.get(toView);
    // if the individual is not found, print a message
    if (!individual && individual !== "all") {
        console.log("Individual not found");
    }
    // print the individual's details
    const readableString = `
  Name: ${individual?.name}
  Points: ${individual?.points}
  Events Participating In: ${individual?.eventsParticipatingIn.map((event) => event.name).join(", ")}
  `;
    console.log(readableString);
}
exports.default = default_1;
