import { State } from "./state.js";
// ts
export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}


export function startREPL(state: State) {
    const REPLinterface = state.rl_Interface;
    REPLinterface.prompt();

    REPLinterface.on("line",(line)=>{
        const cleaned = cleanInput(line);
        if(cleaned.length === 0){
            REPLinterface.prompt();
            return; 
        }
        const command = cleaned[0];
        if(state.allCommands[command]){
            state.allCommands[command].callback(state);
        } else {
            console.log(`Unknown command`);
        } 
        REPLinterface.prompt();
    });
}