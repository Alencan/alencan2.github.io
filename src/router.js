import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RandomListen from './views/love/RandomListen.vue'
import ShowList from './views/love/ShowList.vue'
import Programs from './views/love/Programs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/RandomListen/:fatherID/:id',
      component:RandomListen,
      
    },
    {
      path:'/ShowList',
      component:ShowList
    },
    {
      path:'/Programs/:id',
      component:Programs
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
