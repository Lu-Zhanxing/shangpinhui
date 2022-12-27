import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//注意：这里引入的直接到文件夹Home，而不是具体的文件Home/index.vue
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { isShowFooter: true }
    },
    {
      path: '/search/:keyword?',
      name: 'search',
      component: Search,
      meta: { isShowFooter: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { isShowFooter: false }
    },
    {
      path: '/register',
      component: Register,
      meta: { isShowFooter: false }
    },
    {
      path: '/detail/:goodId',
      name: 'detail',
      component: Detail,
      meta: { isShowFooter: true }
    },
    //路由重定向，默认访问home页面
    {
      path: '*',
      redirect: '/home'
    }
  ],

  // 滚动行为，跳转路由时，滚动条始终在最上方
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部 top:0 不生效，写成 y:0 生效了
    return { y: 0 }
  },

})