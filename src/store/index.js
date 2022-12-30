import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopcart from './ShopCart'
import registerandlogin from './RegisterAndLogin'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        registerandlogin
    }
})