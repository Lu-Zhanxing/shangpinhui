import { reqGetCode,reqRegistUser,reqUserLogin,reqUserInfo} from "@/api";
import {setToken,getToken} from '@/utils/token'
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
            // 持久化存储
            setToken(request.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(request.message))
        }
    },
    // 获取用户信息
    async GetUserInfo({commit}){
        let request = await reqUserInfo()
        if(request.code == 200){
            commit('GETUSERINFO',request.data)
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
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    }
}

const getters = {}

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

export default {
    actions,
    mutations,
    getters,
    state
}