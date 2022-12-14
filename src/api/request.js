import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
  nprogress.start()

  // 将uuid_token添加到请求头中去
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  
  // 将token添加到请求头中
  if(store.state.registerandlogin.token){
    config.headers.token = store.state.registerandlogin.token
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
  nprogress.done()
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export default requests