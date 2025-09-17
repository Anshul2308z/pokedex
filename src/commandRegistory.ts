import { exitCommand } from "./command_exit.js";
import { helpCommand } from "./command_help.js";
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
        }
        // Add more commands here as needed
    }
}