import {reqCartList} from '@/api'

const actions = {
    async getCartList({commit}){
        let request = await reqCartList();
        if(request.code == 200){
            commit("GETCARTLIST",request.data)
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