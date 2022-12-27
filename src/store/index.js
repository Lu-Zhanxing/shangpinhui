import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import search from './Search'
import detail from './Detail'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})