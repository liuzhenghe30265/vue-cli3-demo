import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    setUserInfo(ctx, data) {
      ctx.commit('setUserInfo', data)
    },
  }
})