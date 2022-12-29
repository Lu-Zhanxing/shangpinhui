import {reqCartList} from '@/api'

const actions = {
    async getCartList({commit}){
        let request = await reqCartList();
        console.log(request);
    }
}

const mutations = {

}

const getters = {

}

const state = {

}

export default {
    actions,
    mutations,
    getters,
    state
}