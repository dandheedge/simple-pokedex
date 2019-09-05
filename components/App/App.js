import TopBar from '@/components/TopBar'
export default {
  name: 'Pokedex',
  data(){
    return {
      collapsed: true,
      current: ['home'],
    }
  },
  methods: {
    setCurrent(menu) {
      this.current = [menu]
    }
  }
}