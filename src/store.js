import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    biography: null,
  },
  mutations: {
    setBiography(state, biography) {
      state.biography = biography;
    },
  },
  getters: {
    biography: state => state.biography,
  },
})
