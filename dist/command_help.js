export function helpCommand(state) {
    const usage = [];
    for (const cmd in state.allCommands) {
        usage.push(`${state.allCommands[cmd].name}: ${state.allCommands[cmd].description}`);
    }
    console.log(`Welcome to the Pokedex!
Usage:

${usage.join("\n")}`);
}
