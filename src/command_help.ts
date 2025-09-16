import { CLICommand, getCommands } from "./commandRegistory.js";

export function helpCommand(commands: Record<string, CLICommand>){

const usage:string[] = [];
for(const cmd in commands){
    usage.push(`${commands[cmd].name}: ${commands[cmd].description}`);
}
    console.log(`Welcome to the Pokedex!
Usage:

${usage.join("\n")}`);

}