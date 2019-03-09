import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/Auth.vue')
      },
      // beforeEnter: ifNotAuthenticated
    },
    {
      path: '/user',
      name: 'user',
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/User.vue')
      },
      beforeEnter: ifAuthenticated
    }
  ]
})
