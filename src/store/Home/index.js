import {reqCategoryList,reqBannerList} from '@/api'

const actions = {
    async categoryList(context){
        const result = await reqCategoryList()
        if(result.status == 200 && result.data.code == 200){
            context.commit('CATEGORYLIST',result.data.data)
        }       
    },

    async bannerList({commit}){
        const result = await reqBannerList()
        if(result.status == 200 && result.data.code == 200){
            commit('BANNERLIAT',result.data.data)
        }  
    }
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIAT(state,bannerList){
        state.bannerList = bannerList
    }
}

const state = {
    categoryList:[],
    bannerList:[]
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}