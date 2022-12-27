import {reqGoodDetail} from '@/api/index'

const actions = {
    async getGoodDetail({commit},goodId){
        let request = await reqGoodDetail(goodId)
        console.log(request);
        if(request.data.code == 200){
            commit("GETGOODDETAIL",request.data.data)
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
        return state.goodDetail.skuInfo
    },
    // spuSaleAttrList(state){
    //     return state.goodDetail.spuSaleAttrList
    // }
}

export default {
    actions,
    mutations,
    state,
    getters,
}