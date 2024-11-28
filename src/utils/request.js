import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 拦截统一错误
    Message.error(error.response.data.msg)
    // 401
    if (error.response.status === 401) {
      router.push('/login')
      store.commit('user/clearUserInfo')
    }
    return Promise.reject(error)
  }
)

export default service
