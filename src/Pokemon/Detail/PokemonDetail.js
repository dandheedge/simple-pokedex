import { mapActions, mapGetters, mapState } from 'vuex'
import HorizontalBar  from './HorizontalBarChart.js'

const apiUrl = "https://pokeapi.co/api/v2/pokemon/"
const apiSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/"
let statArray = []
let arrayPokemon = []

export default {
  head() {
    return {
      title: 'Pokemon Detail'
    }
  },
  components: {
    HorizontalBar
  },
  asyncData({params}) {
    return {
      loading: true,
      pokemonName: params.name,
      pokemonImage: '',
      pokemonColor:'',
      visible: false,
      confirmLoading: false,
      pokemonCatch:{
        name: '',
        success: false,
      },
      chartdata: {
        labels: ['Speed','Special Defense','Special Attack','Attack','Defense','HP'],
        datasets: [
          {
            label: "Pokemon Status",
            backgroundColor: ["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)"],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            ticks:{
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getPokemonDetail: 'getDetail',
      getPokemonSpecies: 'getDetailSpecies'
    }),
    callback (key) {
      
    },
    catchPokemon() {
      let randomRate = Math.floor((Math.random() * 255) + 1)
      let captureRate =  this.pokemonDetail.species.capture_rate
      console.log(captureRate)
      console.log(randomRate)
      if(captureRate >= randomRate) {
        this.pokemonCatch.success = true
      }
      this.loading = !this.loading
      setTimeout(() => {
        this.loading = !this.loading
        this.visible = true
      }, 1000)
    },
    handleOk(e) {
      const myPokemonList = {}
      myPokemonList.name = this.pokemonCatch.name
      myPokemonList.type = this.pokemonDetail.information.name
      console.log(myPokemonList)
      // // Push the new data (whether it be an object or anything else) onto the array
      arrayPokemon.push(myPokemonList);
      console.log(arrayPokemon)
      localStorage.setItem('myPokemonList', JSON.stringify(arrayPokemon))
      this.ModalText = 'Please go to your list to see the Pokemon.';
      this.confirmLoading = true
      console.table(JSON.parse(localStorage.getItem('myPokemonList')))
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
    },
    saveToLocalStorage() {

    }
  },
  computed: {
    ...mapGetters({
      pokemonDetail: 'detail'
    }),
    modalTitle() {
      return (this.pokemonCatch.success ? "Congratulations, you got a new Pokemon" : "Awww, you failed to catch this Pokemon :(")
    }
  },
  mounted() {
    this.getPokemonDetail(apiUrl + this.pokemonName)
    .then((resp) => {
      this.getPokemonSpecies(apiSpeciesUrl + resp.data.id)
      this.pokemonImage = this.pokemonDetail.information.sprites.front_default 
      this.pokemonDetail.information.stats.forEach(function(stat) {
          statArray.push(stat.base_stat)
      })
    })
    .then(()=> {
      setTimeout(() =>{
        this.loading = !this.loading
        this.chartdata.datasets[0].data = statArray
        this.pokemonColor = this.pokemonDetail.species.color.name
      }, 500)
    })
    console.log(arrayPokemon)
    // if(arrayPokemon == null) {
    //   arrayPokemon.push(JSON.parse(localStorage.getItem('myPokemonList')))
    //   console.log('masuk')
    //   console.log(arrayPokemon)
    //   localStorage.setItem('myPokemonList', JSON.stringify(arrayPokemon))
    // }
  }
}

