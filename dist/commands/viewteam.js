"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("../helpers/input");
async function default_1(caches) {
    // team cache
    const teams = caches.teams;
    // get the name of the team to view
    const toView = await (0, input_1.prompt)("Enter the name/ID of the team to view", (input) => {
        return input.toLowerCase() == "all" || teams.values().some((team) => team.name === input) || teams.has(input);
    });
    // try to get the team from the cache
    const team = teams.get(toView);
    // if the team is not found, print a message
    if (!team && team !== "all") {
        console.log("Team not found");
    }
    // if the user wants to view all teams, print all the teams
    if (toView === "all") {
        if (teams.values().length === 0) {
            console.log("No teams found!");
            return;
        }
        console.log("All teams:");
        for (const team of teams.values()) {
            const readableString = `${team.name} - Points: ${team.points}`;
            console.log(readableString);
        }
        return;
    }
    // print the team's details
    const readableString = `
  Name: ${team?.name}
  Points: ${team?.points}
  Events Participating In: ${team?.eventsParticipatingIn.map((event) => event.name).join(", ")}
  `;
    console.log(readableString);
}
exports.default = default_1;
