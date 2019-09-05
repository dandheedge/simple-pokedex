import { mapActions, mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Pokemon - Home'
    }
  },
  data() {
    return {
      settingGrid: { gutter: 16, xs: 1, sm: 2, md: 3, xxl: 4 },
      loading: true,
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
      imageUrl: 'https://img.pokemondb.net/artwork/'
    }
  },
  methods: {
    ...mapActions({
      fetchData: 'fetchPokemon'
    }),
    generateImage(name) {
      return this.imageUrl + name + ".jpg"
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log(entry)
          if(entry.intersectionRatio > 0 && this.nextUrl) {
            this.next()
          }
        })
      })
      observer.observe(this.$refs.infinityscrolltrigger)
    },
    next(){
      this.apiUrl = this.nextUrl
      this.fetchData(this.apiUrl).then(() => {
      })
    }
  },
  computed: {
    ...mapGetters({
      pokemonData: 'pokemons',
      nextUrl: 'nextUrl'
    })
  },
  mounted() {
    this.fetchData(this.apiUrl).then(() => {
      this.loading = !this.loading
    })
    this.scrollTrigger()
  }
}