import { commandCatch } from "./command_catch.js";
import { exitCommand } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { helpCommand } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapBack, commandMapForward } from "./command_maps.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string,CLICommand>{
    return {
        exit:{
            name: "exit",
            description: "Exits the Pokedex",
            callback: exitCommand
        },
        help:{
            name: "help",
            description: "Displays a help message",
            callback: helpCommand
        },
        map:{
            name: "map",
            description: "gives 20 locations/ next 20 if called recursively",
            callback: commandMapForward
        },
        mapb:{
            name: "mapb",
            description: "gets you prev 20 locations",
            callback: commandMapBack
        },
        explore:{ 
            name: "explore",
            description: "explore an area by providing that area's name as an argument!",
            callback : commandExplore
        },
        catch:{
            name: "catch",
            description: "throw your pokeballs and attempt a catch on an specified pokemon",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "gives info about a pokemon already caught",
            callback: commandInspect
        },
        pokedex:{
            name: "pokedex",
            description: "gives names of all the pokemon you have",
            callback: commandPokedex 
        }
        // Add more commands here as needed
    }
}