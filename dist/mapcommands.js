export async function commandMapForward(state) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationURL);
    state.prevLocationURL = locations.previous;
    state.nextLocationURL = locations.next;
    for (const location of locations.results) {
        console.log(location.name);
    }
}
export async function commandMapBack(state) {
    if (!state.prevLocationURL) {
        throw new Error("You are on the first page!");
    }
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationURL);
    state.prevLocationURL = locations.previous;
    state.nextLocationURL = locations.next;
    for (const location of locations.results) {
        console.log(location.name);
    }
}
