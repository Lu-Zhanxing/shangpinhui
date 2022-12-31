import { reqGetCode,reqRegistUser,reqUserLogin} from "@/api";

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
    },
    // 用户登录
    async UserLogin({commit},postData){
        let request = await reqUserLogin(postData)
        if(request.code == 200){
            commit('USERLOGIN',request.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(request.message))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    }
}

const getters = {}

const state = {
    code: '',
    token: ''
}

export default {
    actions,
    mutations,
    getters,
    state
}