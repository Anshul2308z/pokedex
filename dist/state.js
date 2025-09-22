import Readline from "node:readline";
import { getCommands } from "./command_Registory.js";
import { PokeAPI } from "./pokeapi.js";
import { map } from "./users_pokedex.js";
export const REPLinterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});
export function initState() {
    return {
        rl_Interface: REPLinterface,
        allCommands: getCommands(),
        pokeAPI: new PokeAPI(),
        nextLocationURL: "",
        prevLocationURL: "",
        pokedex: map
    };
}
