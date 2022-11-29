import {reqCategoryList} from '@/api'

const actions = {
    async categoryList(context){
        const result = await reqCategoryList()
        if(result.status == 200 && result.data.code == 200){
            context.commit('CATEGORYLIST',result.data.data)
        }       
    }
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}

const state = {
    categoryList:[]
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}