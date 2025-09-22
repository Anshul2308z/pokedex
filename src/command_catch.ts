// Type names are fine to import, but note: the raw API shape isn't your Pokemon type.
import { Pokemon, State } from "./state.js";

function catchChance(baseExp: number): number {
  // Tune these numbers to taste
  const min = 0.2; // never lower than 20%
  const max = 0.8; // never higher than 80%
  // scale baseExp into [0,1] roughly
  const scale = Math.min(baseExp / 200, 1); // clamp
  return max - (max - min) * scale; // higher exp -> lower chance
}

export async function commandCatch(state: State, ...pokemons: string[]) {
  if (pokemons.length < 1) {
    throw new Error("Enter a valid pokemon name!");
  }

  const nameArg = pokemons[0].toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nameArg}`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  // Raw PokeAPI response (NOT your internal Pokemon type)
  const data: any = await resp.json();

  const name = data.name;
  const baseExp = data.base_experience;

  console.log(`Throwing a Pokeball at ${name}...`);

  const caught = Math.random() < catchChance(baseExp);
  console.log(caught ? `${name} was caught!` : `${name} escaped!`);

  if (caught && !state.pokedex[name]) {
    // Map raw PokeAPI arrays into your flattened internal shape.

    // Build name -> base_stat map from the stats array
    const statsByName: Record<string, number> = Object.fromEntries(
      data.stats.map((s: any) => [s.stat.name, s.base_stat])
    );

    // Save normalized data that matches what inspect prints
    state.pokedex[name] = {
      name: data.name,
      base_experience: baseExp,
      height: data.height,
      weight: data.weight,
      stats: {
        hp: statsByName["hp"],
        attack: statsByName["attack"],
        defence: statsByName["defense"], // use American spelling
        "special-attack": statsByName["special-attack"],
        "special-defence": statsByName["special-defense"],
        speed: statsByName["speed"],
      },
      types: data.types.map((t: any) => t.type.name),
    };

    // Optional: uncomment to verify what you saved
    // console.log("POKEDEX ENTRY:", JSON.stringify(state.pokedex[name], null, 2));
  }
}