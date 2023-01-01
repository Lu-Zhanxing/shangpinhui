//注意：这里引入的直接到文件夹Home，而不是具体的文件Home/index.vue
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
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
    //路由重定向，默认访问home页面
    {
        path: '*',
        redirect: '/home'
    }
]