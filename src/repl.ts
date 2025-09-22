import { State } from "./state.js";
// ts
export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}


export async function startREPL(state: State) {
    const REPLinterface = state.rl_Interface;
    REPLinterface.prompt();

    REPLinterface.on("line",async (line)=>{
        const cleaned = cleanInput(line);
        if(cleaned.length === 0){
            REPLinterface.prompt();
            return; 
        }
        const [name, ...args] = cleaned;
        const cmd = state.allCommands[name];
        try{
            if(cmd){
                await cmd.callback(state, ...args);
            } 
            else {
                console.log(`Unknown command`);
            }
         }catch(err){
            console.error("Error:", err instanceof Error ? err.message : err);
        }
        REPLinterface.prompt();
    });
}