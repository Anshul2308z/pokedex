import  Readline  from "node:readline";
import { getCommands } from "./commandRegistory.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};


export const REPLinterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export type State = {
    rl_Interface : typeof REPLinterface,
    allCommands: Record<string, CLICommand>   
}

export function initState(): State {
    return {
        rl_Interface: REPLinterface,
        allCommands: getCommands()
    }
}
