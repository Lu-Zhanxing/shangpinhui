import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import detail from '@/store/Detail'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
  nprogress.start()

  // 将uuid_token添加到请求头中去
  if (detail.state.uuid_token) {
    config.headers.userTempId = detail.state.uuid_token
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