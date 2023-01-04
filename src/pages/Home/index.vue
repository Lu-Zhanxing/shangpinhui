<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :floorItem="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

import {mapState} from 'vuex'

export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      this.$store.dispatch('floorList')

    },
    computed: {
      ...mapState({floorList:(state) => state.home.floorList})
    }
}
</script>

<style>

</style>