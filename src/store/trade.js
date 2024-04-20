import { reqAddressInfo, reqOrderInfo, reqMockAddress } from '@/api'
const state = {
  addressInfo: [],
  orderInfo: {}
}
const actions = {
  async getAddressInfo({ commit }) {
    const result = await reqMockAddress()
    if (result.code === 200) commit('GETADDRESSINFO', result.data)
  },
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) commit('GETORDERINFO', result.data)
  }
}
const mutations = {
  GETADDRESSINFO(state, addressInfo) {
    state.addressInfo = addressInfo
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

export default {
  state,
  actions,
  mutations
}
