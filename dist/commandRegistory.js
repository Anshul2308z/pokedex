import { exitCommand } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./mapcommands.js";
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: exitCommand
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: helpCommand
        },
        map: {
            name: "map",
            description: "gives 20 locations/ next 20 if called recursively",
            callback: commandMapForward
        },
        mapb: {
            name: "mapb",
            description: "gets you prev 20 locations",
            callback: commandMapBack
        }
        // Add more commands here as needed
    };
}
