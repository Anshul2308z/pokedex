export async function commandPokedex(state) {
    for (const name of Object.keys(state.pokedex)) {
        console.log(`  - ${name}`);
    }
}
;
