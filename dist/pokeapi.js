import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    static interval = 1000;
    static cache = new Cache(this.interval);
    constructor() { }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = PokeAPI.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const locations = await resp.json();
            PokeAPI.cache.add(url, locations);
            return locations;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e.message}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = PokeAPI.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }
            const location = await resp.json();
            PokeAPI.cache.add(url, location);
            return location;
        }
        catch (e) {
            throw new Error(`Error fetching location '${locationName}': ${e.message}`);
        }
    }
}
