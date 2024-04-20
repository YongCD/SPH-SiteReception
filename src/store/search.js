import {reqGetSearchInfo} from '@/api'
const state = {
  searchInfo: {}
}
const mutations = {
  GETSEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}
const actions = {
  async getSearchInfo({commit}, params={}) {
    let result = await reqGetSearchInfo(params)
    if(result.code === 200) commit('GETSEARCHINFO', result.data)
  }
}
const getters = {
  goodsList: state => state.searchInfo.goodsList || [],
  attrsList: state => state.searchInfo.attrsList || [],
  trademarkList: state => state.searchInfo.trademarkList || []
}

export default {
  state, mutations, actions, getters
}