import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueCookie from 'vue-cookie'
import axios from "axios"

Vue.use(VueCookie)

const token = Vue.cookie.get('user-token')
if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
