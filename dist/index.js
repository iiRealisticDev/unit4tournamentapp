"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input_1 = require("./helpers/input");
const path_1 = require("path");
const cache_1 = require("./helpers/cache");
// set up the caches for the app
const caches = {
    events: new cache_1.Cache("event"),
    individuals: new cache_1.Cache("individual"),
    teams: new cache_1.Cache("team")
};
// this is a map of command numbers to their associated file in the `/commands` directory.
const cmdMap = {
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
        }
        catch (e) {
            console.error("Error saving data", e);
        }
    }, 60000);
    const intro = "Welcome to the Tournament App!";
    console.log(intro);
    // the next line disables my eslint from saying that should not be a constant loop condition. this is silenced because of the nature of the app using a command line interface, and the fact that the app is designed to run indefinitely.
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let cmd = 0; // this is the command ID
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
        await (0, input_1.prompt)("Enter a command number: ", (input) => {
            cmd = parseInt(input); // parse the input to an integer (if possible)
            return cmd > 0 && cmd < 9; // return true if the input is a number between 1 and 8
        });
        const cmdToRun = cmdMap[cmd]; // get the command to run from the map
        const pth = (0, path_1.join)(__dirname, "commands", cmdToRun + ".js"); // get the path to the command file - this ends in .js because the output code is in JavaScript
        console.log(pth);
        // check it exists in ./commands/
        if ((0, fs_1.existsSync)(pth)) {
            const { default: command } = await Promise.resolve(`${pth}`).then(s => __importStar(require(s))); // import the file
            await command(caches); // run its command
        }
        else {
            console.log("Invalid command");
        }
    }
}
main();
