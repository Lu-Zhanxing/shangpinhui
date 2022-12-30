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
        if(request.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除所有选中的商品
    delAllCheckedCartInfo({dispatch,getters}){
        let cartInfoList = getters.cartList.cartInfoList || []
        let PromiseAll = []
        cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('delCartInfo',item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //全选按钮的操作
    updateCheckedAll({dispatch,getters},isChecked){
        let cartInfoList = getters.cartList.cartInfoList || []
        let PromiseAll = []
        cartInfoList.forEach(item => {
            let promise = item.isChecked!=isChecked ? dispatch('CheckCartInfo',{skuId:item.skuId,isChecked}) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
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