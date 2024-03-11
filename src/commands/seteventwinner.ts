import type { Cache } from "../helpers/cache";
import { prompt } from "../helpers/input";
import type { Event, Individual, Team } from "../types/Participants";

export default async function (caches: Record<string, Cache<Event | Individual | Team>>) {
  // get all caches
  const eventCache = caches.events as Cache<Event>;
  const individualCache = caches.individuals as Cache<Individual>;
  const teamCache = caches.teams as Cache<Team>;

  // get the name of the event to set a winner for
  const eventName = await prompt("Enter the name/ID of the event to set a winner for: ", (input) => {
    return eventCache.has(input) || eventCache.values().some((event) => event.name === input);
  });

  // try to get the event from the cache
  const event = eventCache.get(eventName) || eventCache.values().find((event) => event.name === eventName);


  // if the event is not found, print a message
  if (!event) {
    console.log("Event not found");
    return;
  }

  // request placements as comma separated list
  const placements = await prompt("Enter the winners for the event as a comma separated list, in ascending order (i.e., 1st, 2nd, 3rd, etc): ", (input) => {
    const split = input.split(",");
    return split.length === event.points.length;
  });

  // get placements as array of numbers
  const splitPlacements = placements.split(",").map((placement) => parseInt(placement));
  const points = Array.from(event.points.values());
  const pointMap = new Map<number, number>();

  // create a map of placements to points
  for (let i = 0; i < points.length; i++) {
    pointMap.set(points[i], splitPlacements[i]);
  }

  // get winners from cache
  if (event.eventType == "individual") {
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
    eventCache.set(eventCache.getKeyFromName(event.name) as string, event);
    // update individual cache

  } else if (event.eventType == "team") {
    const winners = placements.split(",").map((placement) => {
      return teamCache.get(placement.toString());
    });

    // deal out points
    winners.forEach((winner, i) => {
      if (winner) {
        const winnerObj = winner as Team;
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