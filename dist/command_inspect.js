function consoleHandler(pokemon) {
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`  -hp: ${pokemon.stats.hp}`);
    console.log(`  -attack: ${pokemon.stats.attack}`);
    console.log(`  -defence: ${pokemon.stats.defence}`);
    console.log(`  -special-attack: ${pokemon.stats["special-attack"]}`);
    console.log(`  -special-defence: ${pokemon.stats["special-defence"]}`);
    console.log(`  -speed: ${pokemon.stats.speed}`);
    for (const t of pokemon.types) {
        console.log(`  - ${t}`);
    }
}
export async function commandInspect(state, ...args) {
    if (args.length < 1) {
        throw new Error("Provide a pokemon name to inspect!");
    }
    const pokemon = args[0];
    const pokemonMetadata = state.pokedex[pokemon];
    if (!pokemonMetadata) {
        console.error("you have not caught that pokemon");
        return;
    }
    ;
    consoleHandler(pokemonMetadata);
}
