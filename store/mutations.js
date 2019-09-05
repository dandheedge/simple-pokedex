export default {
  SET_POKEMON_DATA(state, value) {
    value.forEach((pokemon) =>{
        state.pokemons.push(pokemon)
    })
  },
  SET_NEXT_URL(state, value) {
    state.nextUrl = value
  },
  SET_POKEMON_DETAIL(state, value) {
    state.detail.information = value
  },
  SET_POKEMON_SPECIES(state, value) {
    state.detail.species = value
  }
}