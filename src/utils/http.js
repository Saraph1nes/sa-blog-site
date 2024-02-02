import axios from 'axios'
import message from "@/components/Message";

const service = axios.create({
  // baseURL: 'https://api.sablogs.cn/api',
  baseURL: import.meta.env.DEV ? 'http://localhost:9090/api' : 'https://api.sablogs.cn/api',
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const AccessToken = localStorage.getItem('AccessToken')
      localStorage.getItem('ExpiresIn')
      localStorage.getItem('TokenType')
      if (AccessToken) {
        config.headers['Authorization'] = AccessToken
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.Code === 40000) {
      message.error({content: res.Msg || '接口错误', duration: 1000})
      return res
    }
    if (res.Code === 42200) {
      message.error({content: res.Msg || '接口错误', duration: 1000})
      return res
    }
    if (res.Code === 40100) {
      message.error({content: '请先登录', duration: 1000})
      return res
    }
    return res
  },
  error => {
    console.log('接口信息报错' + error)
    return Promise.reject(error)
  },
)

export default service

