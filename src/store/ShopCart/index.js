import {reqCartList,reqDelCartInfo,reqCheckCartInfo} from '@/api'

const actions = {
    // 购物车列表
    async getCartList({commit}){
        let request = await reqCartList();
        if(request.code == 200){
            commit("GETCARTLIST",request.data)
        }
    },
    // 根据id删除商品
    async delCartInfo({commit},skuId){
        let request = await reqDelCartInfo(skuId)
        if(request.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 根据id修改商品复选框选中状态
    async CheckCartInfo({commit},{skuId,isChecked}){
        let request = await reqCheckCartInfo(skuId,isChecked)
        console.log(request);
        if(request.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
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