import  Readline  from "node:readline";
import { getCommands } from "./command_Registory.js";
import { PokeAPI } from "./pokeapi.js";
import { map } from "./users_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type Pokemon = {
    name: string, 
    base_experience: number,
    height: number,
    weight: number,
    stats: {
        hp: number,
        attack: number,
        defence: number,
        "special-attack": number,
        "special-defence": number,
        speed: number 
    },
    types: string[]
}


export const REPLinterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export type State = {
    rl_Interface : typeof REPLinterface,
    allCommands: Record<string, CLICommand>,
    pokeAPI: PokeAPI, 
    nextLocationURL: string, 
    prevLocationURL: string,
    pokedex: Record<string, Pokemon> 
}

export function initState(): State {
    return {
        rl_Interface: REPLinterface,
        allCommands: getCommands(),
        pokeAPI: new PokeAPI(),
        nextLocationURL: "",
        prevLocationURL:"",
        pokedex: map
    }
}
