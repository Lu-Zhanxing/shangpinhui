import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as API from '@/api'
// 注册全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/pagination'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
