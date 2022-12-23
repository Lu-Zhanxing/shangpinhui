import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 注册全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
