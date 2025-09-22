import { Cache } from "./pokecache.js";
const cache = new Cache(1000);
function isLocationArea(x) {
    return x && Array.isArray(x.pokemon_encounters);
}
export async function commandExplore(state, ...locations) {
    if (locations.length < 1) {
        throw new Error("please provide a valid location.");
    }
    ;
    let location = locations[0];
    function consoleHelper(locationInfo) {
        console.log(`Exploring ${location}...`);
        console.log(`Found Pokemon:`);
        for (const enc of locationInfo.pokemon_encounters) {
            console.log(" - " + enc.pokemon.name);
        }
    }
    const url = `https://pokeapi.co/api/v2/location-area/${location}/`;
    const cached = cache.get(url);
    if (cached && isLocationArea(cached)) {
        consoleHelper(cached);
        return;
    }
    try {
        const resp = await fetch(url);
        if (!resp.ok)
            throw new Error(`HTTP ${resp.status}`);
        const locationInfo = await resp.json();
        consoleHelper(locationInfo);
        cache.add(url, locationInfo);
    }
    catch (err) {
        throw new Error("Something unexpected happened ");
    }
}
