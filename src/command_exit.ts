import { State } from "./state.js";

export async function exitCommand(state: State) {
    console.log(`Closing the Pokedex... Goodbye!`);
    state.rl_Interface.close(); 
    process.exit(0);
};

