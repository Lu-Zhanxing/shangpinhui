import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

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
    },

    async floorList({commit}){
        const result = await reqFloorList()
        if(result.status == 200 && result.data.code == 200){
            commit('FLOORLIST',result.data.data)
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