import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    includes: ['Question', 'Web'],
  },
  mutations: {
    addIncludes(state, value) {
      !state.includes.includes(value) && state.includes.push(value)
    },
    removeIncludes(state, value) {
      const index = state.includes.indexOf(value)
      index !== -1 && state.includes.splice(index, 1)
    },
  },
  getters: {
    includes: (state) => state.includes,
  },
})
