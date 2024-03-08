"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEventList = exports.isDate = exports.prompt = void 0;
const promises_1 = __importDefault(require("readline/promises"));
// create a readline interface - this allows me to interact with terminal input in TypeScript
const rl = promises_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
// a prompt function. this allows me to prompt the user with a question. It also takes a validator argument which is a function that checks if the input is valid based off given criteria.
async function prompt(question, validator) {
    const response = await rl.question(question); // ask the question
    if (validator(response)) { // if the response is valid, return it
        return response;
    }
    else { // if the response is invalid, log an error and prompt the user again
        console.log("Invalid input");
        return prompt(question, validator);
    }
}
exports.prompt = prompt;
function isDate(input) {
    try {
        new Date(input);
        return true;
    }
    catch {
        return false;
    }
}
exports.isDate = isDate;
function isEventList(input) {
    return input.split(",").every((x) => !isNaN(parseInt(x)) && parseInt(x) > 0) && input.split(",").length == 1 || input.split(",").length == 5;
}
exports.isEventList = isEventList;
