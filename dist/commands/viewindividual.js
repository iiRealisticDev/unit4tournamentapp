"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    // individual cache
    const individuals = caches.individuals;
    const toView = await (0, input_1.prompt)("Enter the name/ID of the individual to view", (input) => {
        return input == "all" || individuals.values().some((individual) => individual.name === input) || individuals.has(input);
    });
    if (toView === "all") {
        console.log("All individuals:");
        for (const individual of individuals.values()) {
            const readableString = `${individual.name} - Points: ${individual.points}`;
            console.log(readableString);
        }
        return;
    }
    const individual = individuals.get(toView);
    if (!individual && individual !== "all") {
        console.log("Individual not found");
    }
    const readableString = `
  Name: ${individual?.name}
  Points: ${individual?.points}
  Events Participating In: ${individual?.eventsParticipatingIn.map((event) => event.name).join(", ")}
  `;
    console.log(readableString);
}
exports.default = default_1;
