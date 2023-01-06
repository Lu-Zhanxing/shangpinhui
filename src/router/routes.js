//注意：这里引入的直接到文件夹Home，而不是具体的文件Home/index.vue
// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home')  //路由懒加载
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [
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
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { isShowFooter: true }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: { isShowFooter: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: { isShowFooter: true },
        beforeEnter:(to,from,next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: { isShowFooter: true },
        beforeEnter:(to,from,next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: { isShowFooter: true },
        beforeEnter:(to,from,next) => {
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        children:[
            {
                path:'myorder',
                component: MyOrder
            },
            {
                path:'grouporder',
                component: GroupOrder
            }
        ],
        redirect:'/center/myorder',
        meta: { isShowFooter: true }
    },
    //路由重定向，默认访问home页面
    {
        path: '*',
        redirect: '/home'
    }
]