import { existsSync } from "fs";
import { prompt } from "./helpers/input";
import { join } from "path";
import { Cache } from "./helpers/cache";
import { Event, Individual, Team } from "./types/Participants";

// set up the caches for the app
const caches = {
  events: new Cache<Event>("event"),
  individuals: new Cache<Individual>("individual"),
  teams: new Cache<Team>("team")
};

// this is a map of command numbers to their associated file in the `/commands` directory.
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

// this is our main function
async function main() {
  // this will run a function every 60_000 milliseconds (1 minute)
  setInterval(() => {
    try {
      // perform autosaves
      const toSave = Object.values(caches);
      for (const value of toSave) { // value being the cache
        value.saveData(); // save the data
      }
    } catch (e) {
      console.error("Error saving data", e);
    }
  }, 60_000);

  const intro = "Welcome to the Tournament App!";
  console.log(intro);

  // the next line disables my eslint from saying that should not be a constant loop condition. this is silenced because of the nature of the app using a command line interface, and the fact that the app is designed to run indefinitely.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let cmd: number = 0; // this is the command ID

    const optText = `
  1. Create a new event
  2. View events
  3. Add individual participant
  4. Add team participant
  5. View individual participant
  6. View team participant
  7. Set event winner
  8. Exit
  `; // this is the text that will be displayed to the user

    console.log(`Please select a command to run:\n\n${optText}`);

    // ask the user to provide a command identifier
    await prompt("Enter a command number: ", (input: string) => {
      cmd = parseInt(input); // parse the input to an integer (if possible)
      return cmd > 0 && cmd < 9; // return true if the input is a number between 1 and 8
    });

    const cmdToRun = cmdMap[cmd]; // get the command to run from the map

    const pth = join(__dirname, "commands", cmdToRun + ".js"); // get the path to the command file - this ends in .js because the output code is in JavaScript

    // check it exists in ./commands/
    if (existsSync(pth)) {
      const { default: command } = await import(pth); // import the file
      await command(caches); // run its command
    } else {
      console.log("Invalid command");
    }
  }
}

main();