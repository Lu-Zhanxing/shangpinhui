import {reqSearchList} from '@/api'

const actions = {
    async searchList(context,params){
        let result = await reqSearchList(params)
        if(result.status == 200 && result.data.code == 200){
            context.commit('SEARCHLIST',result.data.data)
        }
    }
}

const mutations = {
    SEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const state = {
    searchList: {}
}

const getters = {
    attrsList(state){
        return state.searchList.attrsList || []
    },
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
}

export default {
    actions,
    mutations,
    state,
    getters,
}