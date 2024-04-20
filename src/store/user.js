import {
  reqSendCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqUserLogout
} from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const actions = {
  async sendCode({ commit }, phone) {
    const result = await reqSendCode(phone)
    if (result.code === 200) {
      commit('SENDCODE', result.data)
      return 'ok'
    }
    return Promise.reject(new Error(result.message))
  },
  async userRegister(_, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error(result.message))
  },
  async userLogin({ commit }, user) {
    const result = await reqUserLogin(user)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    }
    return Promise.reject(new Error('no'))
  },
  async userLogout({ commit }) {
    try {
      await reqUserLogout()
      commit('CLEAR')
      return 'ok'
    } catch (error) {}
  }
}
const mutations = {
  SENDCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
