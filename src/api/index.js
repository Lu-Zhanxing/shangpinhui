import requests from './request'
import mockRequests from './mockAjax'

export const reqCategoryList = (() => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
})

export const reqBannerList = () => mockRequests.get('/banners')

export const reqFloorList = () => mockRequests.get('/floors')

// search请求列表
export const reqSearchList = ((params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
})

// 商品详情请求列表
export const reqGoodDetail = ((skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get'
    })
})

// 添加/更新购物车商品数量(skuNum是变化的值)
export const reqAddToCart = (({skuId,skuNum}) =>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
})
// 购物车列表
export const reqCartList = () => requests({url:"/cart/cartList",method:'get'})
// 删除购物车商品
export const reqDelCartInfo = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 切换商品选中状态
export const reqCheckCartInfo = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 注册获取验证码请求
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 注册用户请求
export const reqRegistUser = (data) => requests({url:"/user/passport/register",method:'post',data:data})