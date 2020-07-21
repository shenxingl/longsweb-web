import Vue from 'vue'
import Vuex from 'vuex'
// import healthcarehome from './healthcarehome'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowMenu: true
  },
  mutations: {
    updateIsShowMenu(state, obj) {
      state.isShowMenu = obj
    },
  },
  modules: {
    // healthcarehome
  },
})
