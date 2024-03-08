import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import type { Event, Individual, Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Event | Individual | Team>>) {
  const eventCache = caches.events as Cache<Event>;
  const individualCache = caches.individuals as Cache<Individual>;
  const teamCache = caches.teams as Cache<Team>;

  console.log(eventCache, individualCache, teamCache);

  const eventName = await prompt("Enter the name/ID of the event to set a winner for", (input) => {
    return eventCache.has(input) || eventCache.values().some((event) => event.name === input);
  });

  const event = eventCache.get(eventName) || eventCache.values().find((event) => event.name === eventName);

  if (!event) {
    console.log("Event not found");
    return;
  }

  // request placements as comma separated list
  const placements = await prompt("Enter the winners for the event as a comma separated list, in ascending order (i.e., 1st, 2nd, 3rd, etc): ", (input) => {
    console.log("validating");
    const split = input.split(",");
    console.log(split.length, event.points.length, split.length === event.points.length);
    return split.length === event.points.length;
  });

  console.log("applying stuff");

  const splitPlacements = placements.split(",").map((placement) => parseInt(placement));
  console.log(splitPlacements);
  const points = Array.from(event.points.values());
  console.log(points);
  const pointMap = new Map<number, number>();

  for (let i = 0; i < points.length; i++) {
    pointMap.set(points[i], splitPlacements[i]);
  }

  console.log(pointMap);

  // get winners from cache
  if (event.eventType == "individual") {
    console.log("indi");
    const winners = placements.split(",").map((placement) => {
      return individualCache.get(placement);
    });

    // deal out points
    winners.forEach((winner, i) => {
      if (winner) {
        const winnerObj = winner as Individual;
        winnerObj.points += points[i];
        // update cache
        individualCache.set(individualCache.getKeyFromName(winner.name) as string, winnerObj);
      }
    });
    
    // set event winner
    event.winner = winners[0]?.name;
    // update cache
    eventCache.set(event.name, event);
    // update individual cache

  } else if (event.eventType == "team") {
    console.log("team");
    const winners = placements.split(",").map((placement) => {
      console.log(placement);
      console.log(teamCache.get(placement.toString()));
      console.log(Array.from(teamCache.values()));
      return teamCache.get(placement.toString());
    });

    // deal out points
    winners.forEach((winner, i) => {
      if (winner) {
        const winnerObj = winner as Team;
        console.log(winner, points[i]);
        winnerObj.points += points[i];
        // update cache
        teamCache.set(teamCache.getKeyFromName(winner.name) as string, winnerObj);
      }
    });

    // set event winner
    event.winner = winners[0]?.name;
  } else {
    console.log("Invalid event type");
    return;
  }
}