// ts
export function cleanInput(input) {
    return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}
export async function startREPL(state) {
    const REPLinterface = state.rl_Interface;
    REPLinterface.prompt();
    REPLinterface.on("line", async (line) => {
        const cleaned = cleanInput(line);
        if (cleaned.length === 0) {
            REPLinterface.prompt();
            return;
        }
        const command = cleaned[0];
        try {
            if (state.allCommands[command]) {
                await state.allCommands[command].callback(state);
            }
            else {
                console.log(`Unknown command`);
            }
        }
        catch (err) {
            console.error("Error:", err instanceof Error ? err.message : err);
        }
        REPLinterface.prompt();
    });
}
