import { State } from "./state.js";

export async function commandPokedex(state: State){
    for(const name of Object.keys(state.pokedex)){
        console.log(`  - ${name}`)
    }
};