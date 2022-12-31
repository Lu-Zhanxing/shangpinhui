import { reqGetCode,reqRegistUser} from "@/api";

const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let request = await reqGetCode(phone)
        if(request.code == 200){
            commit("GETCODE",request.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    // 用户注册
    async registUser({commit},postData){
        let request = await reqRegistUser(postData)
        if(request.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(request.message))
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