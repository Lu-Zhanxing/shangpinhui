import {reqUserAddress,reqTradeGoodList} from '@/api'

const actions = {
    // 获取用户地址
    async getUserAddress({commit}){
        let result = await reqUserAddress()
        console.log("用户地址",result);
        if(result.code == 200){
            commit("GETUSERADDRESS",result.data)
        }
    },
    // 获取商品清单
    async getTradeGoodList({commit}){
        let result = await reqTradeGoodList()
        console.log("商品清单",result);
        if(result.code == 200){
            commit("GETTRADEGOODLIST",result.data)
        }
    },
    
}

const mutations = {
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress
    },
    GETTRADEGOODLIST(state,tradeGoodList){
        state.tradeGoodList = tradeGoodList
    }

}

const getters = {
    userAddress(state){
        return state.userAddress
    },
    tradeGoodList(state){
        return state.tradeGoodList
    }
}

const state = {
    userAddress: [],
    tradeGoodList: []
}

export default {
    actions,
    mutations,
    getters,
    state
}