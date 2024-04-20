import { reqGetDetailInfo, reqAddOrUpdateCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  detailInfo: {},
  uuid_token: getUUID()
}
const actions = {
  async getDetailInfo({ commit }, skuId) {
    const result = await reqGetDetailInfo(skuId)
    if (result.code === 200) commit('GETDETAILINFO', result.data)
  },
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error(result.message))
  }
}
const mutations = {
  GETDETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
