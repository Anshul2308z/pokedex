import { CLICommand } from "./commandRegistory.js";


export function exitCommand(c: Record<string, CLICommand>) {
    console.log(`Closing the Pokedex... Goodbye!`);
    process.exit(0);
};

