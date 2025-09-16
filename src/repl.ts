import  Readline  from "node:readline";
import { getCommands } from "./commandRegistory.js";
// ts
export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

const REPLinterface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function startREPL() {
    REPLinterface.prompt();

    REPLinterface.on("line",(line)=>{
        const cleaned = cleanInput(line);
        if(cleaned.length === 0){
            REPLinterface.prompt();
            return; 
        }
        const command = cleaned[0];
        const allCommands = getCommands();
        if(allCommands[command]){
            allCommands[command].callback(allCommands);
        } else {
            console.log(`Unknown command`);
        } 
        REPLinterface.prompt();
    });
}