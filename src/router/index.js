import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from '@/router/routes'
import store from '@/store'

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

let router = new VueRouter({
  routes,

  // 滚动行为，跳转路由时，滚动条始终在最上方
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部 top:0 不生效，写成 y:0 生效了
    return { y: 0 }
  },

})

// 路由导航守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.registerandlogin.token
  let name = store.state.registerandlogin.userInfo.nickName
  // 如果用户登录了
  if (token) {
    // 不能再通过导航地址跳转到登录页或注册页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 如果能获取到用户信息
      if (name) {
        next()
      } else {
        // 如果获取不到用户信息
        try {
          // 重新派发请求，获取用户信息
          await store.dispatch('GetUserInfo')
          next()
        } catch (error) {
          // 派发请求失败，一般是token失效了，那么就要执行退出登录操作，清除token缓存
          await store.dispatch('Logout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录访问,交易相关(trade),支付相关(pay、paysuccess)、用户中心(center)相关页面跳转到登录页面
    let toPath = to.path
    // 提示:这里也通过路由元信息进行判断
    if(toPath.includes('/trade') || toPath.includes('/pay') || toPath.includes('/paysuccess') || toPath.includes('/center')){
      // sessionStorage.setItem('toPath',toPath)
      next('/login?redict='+toPath)
    }else{
      next()
    }
  }
})

export default router