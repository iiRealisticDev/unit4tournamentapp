import readline from "readline/promises";
// create a readline interface - this allows me to interact with terminal input in TypeScript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// a prompt function. this allows me to prompt the user with a question. It also takes a validator argument which is a function that checks if the input is valid based off given criteria.
export async function prompt(question: string, validator: (input: string) => boolean): Promise<string> {
  const response = await rl.question(question); // ask the question
  if (validator(response)) { // if the response is valid, return it
    return response;
  } else { // if the response is invalid, log an error and prompt the user again
    console.log("Invalid input");
    return prompt(question, validator);
  }
}

export function isDate(input: string) {
  try {
    new Date(input);
    return true;
  } catch {
    return false;
  }
}