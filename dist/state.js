import Readline from "node:readline";
import { getCommands } from "./commandRegistory.js";
export const REPLinterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});
export function initState() {
    return {
        rl_Interface: REPLinterface,
        allCommands: getCommands()
    };
}
