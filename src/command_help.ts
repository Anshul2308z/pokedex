import { State } from "./state.js";

export function helpCommand(state : State) {

const usage:string[] = [];
for(const cmd in state.allCommands){
    usage.push(`${state.allCommands[cmd].name}: ${state.allCommands[cmd].description}`);
}
    console.log(`Welcome to the Pokedex!
Usage:

${usage.join("\n")}`);

}