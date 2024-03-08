import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import type { Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Team>>) {
  // individual cache
  const individuals = caches.individuals;

  const toView = await prompt("Enter the name/ID of the team to view", (input) => {
    return input == "all" || individuals.values().some((individual) => individual.name === input) || individuals.has(input);
  });

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