import {reqCartList,reqDelCartInfo} from '@/api'

const actions = {
    async getCartList({commit}){
        let request = await reqCartList();
        if(request.code == 200){
            commit("GETCARTLIST",request.data)
        }
    },
    async delCartInfo({commit},skuId){
        let request = await reqDelCartInfo(skuId)
        if(request.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('删除失败'))
        }
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

const state = {
    cartList:[]
}

export default {
    actions,
    mutations,
    getters,
    state
}