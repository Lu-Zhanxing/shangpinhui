import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

const actions = {
    async categoryList(context){
        const result = await reqCategoryList()
        if(result.code == 200){
            context.commit('CATEGORYLIST',result.data)
        }       
    },

    async bannerList({commit}){
        const result = await reqBannerList()
        if(result.code == 200){
            commit('BANNERLIAT',result.data)
        }  
    },

    async floorList({commit}){
        const result = await reqFloorList()
        if(result.code == 200){
            commit('FLOORLIST',result.data)
        }  
    }
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIAT(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    },
}

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}