import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    likeShows: [],
    currentIndex:0,
    audioList:[]
  },
  mutations: {
    //将喜欢的添加进数组中
    addToLikeShows(state, obj) {
      var flag = false;
      state.likeShows.forEach(item => {
        if (obj.showID == item.showID) {
          flag = true;
          //console.log(state.likeShows)
          return true
        }
      })
      if (flag == false) {
        state.likeShows.push(obj)
        //console.log(state.likeShows)
      }
    },
    setCurrentIndex(state,index){
        state.currentIndex=index
    }
  },
  getters: {
    isLike(state) {
      state.likeShows.forEach(item => {
        //console.log(item.likeFlag)
        return item.likeFlag;

      })

    }
  },
  actions: {

  }
})
