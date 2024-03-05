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
const caches = {
    events: new cache_1.Cache("events"),
    individuals: new cache_1.Cache("individuals"),
    teams: new cache_1.Cache("teams")
};
const cmdMap = {
    1: "addevent",
    2: "view_event",
    3: "add_individual",
    4: "add_team",
    5: "view_individual",
    6: "view_team",
    7: "set_event_winner",
    8: "exit"
};
async function main() {
    const intro = "Welcome to the Tournament App!";
    console.log(intro);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let cmd = 0;
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
        await (0, input_1.prompt)("Enter a command number: ", (input) => {
            cmd = parseInt(input);
            return cmd > 0 && cmd < 9;
        });
        const cmdToRun = cmdMap[cmd];
        const pth = (0, path_1.join)(__dirname, "commands", cmdToRun + ".js");
        console.log(pth);
        // check it exists in ./commands/
        if ((0, fs_1.existsSync)(pth)) {
            const { default: command } = await Promise.resolve(`${pth}`).then(s => __importStar(require(s)));
            await command(caches);
        }
        else {
            console.log("Invalid command");
        }
    }
}
main();
