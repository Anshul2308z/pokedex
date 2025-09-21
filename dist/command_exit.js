export async function exitCommand(state) {
    console.log(`Closing the Pokedex... Goodbye!`);
    state.rl_Interface.close();
    process.exit(0);
}
;
