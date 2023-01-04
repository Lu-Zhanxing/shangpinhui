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
// 用户登录请求
export const reqUserLogin = (data) => requests({url:"/user/passport/login",method:'post',data:data})
// 获取用户登录信息(根据请求头token)
export const reqUserInfo = () => requests({url:"/user/passport/auth/getUserInfo",method:'get'})
// 退出登录
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 结算交易页面--获取用户地址信息(这里需要用13700000000；111111登录才有数据)
export const reqUserAddress = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 结算交易页面--获取商品清单信息
export const reqTradeGoodList = () => requests({url:'/order/auth/trade',method:'get'})
// 从这之后的数据不再存储在vuex仓库中了，先在main.js中统一引入，然后直接调用方法
// 结算交易页面--提交订单信息
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

// 订单支付页面--根据订单号获取订单支付信息
export const reqPayment = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 订单支付页面--查询支付订单状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})