import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

requests.interceptors.request.use(config => {
  config.headers.userTempId = store.state.detail.uuid_token
  config.headers.token = store.state.user.token
  nprogress.start()
  return config
})

requests.interceptors.response.use(res => {
  nprogress.done()
  return res.data
}, error => {
  console.log(error);
  return Promise.reject(error)
})

export default requests
