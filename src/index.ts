import { existsSync } from "fs";
import {
  prompt
} from "./helpers/input";
import { join } from "path";
import { Cache } from "./helpers/cache";
import { Event, Individual, Team } from "./types/Participants";

const caches = {
  events: new Cache<Event>("event"),
  individuals: new Cache<Individual>("individual"),
  teams: new Cache<Team>("team")
};

const cmdMap: Record<number, string> = {
  1: "addevent",
  2: "viewevent",
  3: "addindividual",
  4: "addteam",
  5: "viewindividual",
  6: "viewteam",
  7: "seteventwinner",
  8: "exit"
};

async function main() {
  setInterval(() => {
    try {
      // perform autosaves
      const toSave = Object.values(caches);
      for (const value of toSave) {
        value.saveData();
      }
    } catch (e) {
      console.error("Error saving data", e);
    }
  }, 60_000);

  const intro = "Welcome to the Tournament App!";
  console.log(intro);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let cmd: number = 0;

    const optText = `
  1. Create a new event
  2. View events
  3. Add individual participant
  4. Add team participant
  5. View individual participant
  6. View team participant
  7. Set event winner
  8. Exit
  `;

    console.log(`Please select a command to run:\n\n${optText}`);

    await prompt("Enter a command number: ", (input: string) => {
      cmd = parseInt(input);
      return cmd > 0 && cmd < 9;
    });

    const cmdToRun = cmdMap[cmd];

    const pth = join(__dirname, "commands", cmdToRun + ".js");

    console.log(pth);

    // check it exists in ./commands/
    if (existsSync(pth)) {
      const {
        default: command
      } = await import(pth);
      await command(caches);
    } else {
      console.log("Invalid command");
    }
  }
}

main();