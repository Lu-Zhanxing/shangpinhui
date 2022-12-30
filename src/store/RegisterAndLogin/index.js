import { reqGetCode } from "@/api";

const actions = {
    async getCode({commit},phone){
        let request = await reqGetCode(phone)
        if(request.code == 200){
            commit("GETCODE",request.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    }
}

const getters = {}

const state = {
    code: ''
}

export default {
    actions,
    mutations,
    getters,
    state
}