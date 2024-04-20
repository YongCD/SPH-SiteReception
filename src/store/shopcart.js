import { reqGetCartList, reqDeleteCart, reqUpdateChecked } from '@/api'

const state = {
  cartInfoList: []
}
const actions = {
  async getCartList({ commit }) {
    const result = await reqGetCartList()
    if (result.code === 200)
      commit('GETCARTLIST', (result.data[0] || []).cartInfoList)
  },
  async deleteCart(_, skuId) {
    const result = await reqDeleteCart(skuId)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error(result.message))
  },
  async updateChecked(_, { skuId, isChecked }) {
    const result = await reqUpdateChecked(skuId, isChecked)
    if (result.code === 200) return 'ok'
    else return Promise.reject(result.message)
  },
  deleteAllCheckedCart({ dispatch }, cartInfoList) {
    const delArr = []
    cartInfoList.forEach((item) => {
      if (item.isChecked) delArr.push(dispatch('deleteCart', item.skuId))
    })
    return Promise.all(delArr)
  },
  changeAllChecked({ dispatch, state }, isChecked) {
    const changeArr = []
    state.cartInfoList.forEach((item) => {
      changeArr.push(
        dispatch('updateChecked', { skuId: item.skuId, isChecked })
      )
    })
    return Promise.all(changeArr)
  }
}
const mutations = {
  GETCARTLIST(state, cartInfoList) {
    state.cartInfoList = cartInfoList || []
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
