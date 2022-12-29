import {reqGoodDetail} from '@/api/index'
import {reqAddToCart} from '@/api/index'

const actions = {
    // 获取商品详情
    async getGoodDetail({commit},goodId){
        let request = await reqGoodDetail(goodId)
        if(request.code == 200){
            commit("GETGOODDETAIL",request.data)
        }
    },
    // 获取根据请求返回的数据，判断是否要跳转到购物车页面
    async getReqAddToCart(state,{skuId,skuNum}){
        let request = await reqAddToCart({skuId,skuNum})
        if(request.code == 200){
            return Promise.resolve('OK')
        }else{
            return Promise.reject(new Error("请求失败"))
        }
    }
}

const mutations = {
    GETGOODDETAIL(state,goodDetail){
        state.goodDetail = goodDetail
    }
}

const state = {
    goodDetail:{}
}

const getters = {
    categoryView(state){
        return state.goodDetail.categoryView || {}
    },
    skuInfo(state){
        return state.goodDetail.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodDetail.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters,
}