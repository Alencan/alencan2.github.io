import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';

Vue.use(MintUI)
import "mui/css/mui.css"
import vant from 'vant'
Vue.use(vant)

import Randlisten from'./views/love/RandomListen.vue'
import ShowList from'./views/love/ShowList.vue'

import "font_1295916_iuwu2hsgn7e/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
