export default {
  fetchPokemon({commit}, apiUrl) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: apiUrl,
        method: 'get'
      })
      .then(resp => {
        if(resp.status === 200) {
          console.table(resp)
          commit('SET_POKEMON_DATA', resp.data.results)
          commit('SET_NEXT_URL', resp.data.next)
          resolve(resp)
        } 
        else {
          reject(resp.results)
        }
      })
      .catch(err => {
          reject(err)
      })
    })
  },
  getDetail({commit}, apiUrl){
    return new Promise((resolve, reject) => {
      this.$axios({
        url: apiUrl,
        method: 'get'
      })
      .then(resp => {
        if(resp.status === 200) {
          commit('SET_POKEMON_DETAIL', resp.data)
          resolve(resp)
        }
        else {
          reject(resp.status)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  getDetailSpecies({commit}, apiUrl){
    console.log(apiUrl)
    return new Promise((resolve, reject) => {
      this.$axios({
        url: apiUrl,
        method: 'get'
      })
      .then(resp => {
        if(resp.status === 200) {
          commit('SET_POKEMON_SPECIES', resp.data)
          resolve(resp)
        }
        else {
          reject(resp)
        }
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
