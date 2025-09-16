export function helpCommand(commands) {
    const usage = [];
    for (const cmd in commands) {
        usage.push(`${commands[cmd].name}: ${commands[cmd].description}`);
    }
    console.log(`Welcome to the Pokedex!
Usage:

${usage.join("\n")}`);
}
