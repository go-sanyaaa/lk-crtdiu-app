import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookie from 'vue-cookie'

const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const AUTH_LOGOUT = 'AUTH_LOGOUT'

Vue.use(VueCookie)
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // token: localStorage.getItem('user-token') || ''
        token: Vue.cookie.get('user-token') || '',
        status: ''
    },
    mutations: {
        [AUTH_REQUEST]: (state) => {
            state.status = 'loading'
        },
        [AUTH_SUCCESS]: (state, token) => {
            state.status = 'success'
            state.token = token
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        },
        [AUTH_ERROR]: (state) => {
            state.status = 'error'
        },
        [AUTH_LOGOUT]: (state) => {
            state.token = ''
            state.status = ''
            delete axios.defaults.headers.common['Authorization']
        }
    },
    actions: {
        [AUTH_REQUEST]: ({commit, dispatch}, user) => {
            return new Promise((res,rej) => {
                commit(AUTH_REQUEST)
                axios({url: 'https://crtdiu-app.ru/wp-json/jwt-auth/v1/token', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token
                        // localStorage.setItem('user-token', token)
                        Vue.cookie.set('user-token',token,{expires: '7D', domain: 'crtdiu-app.ru'}),
                        commit(AUTH_SUCCESS,token)
                        res(resp)
                    })
                    .catch(err => {
                        commit(AUTH_ERROR, err)
                        Vue.cookie.delete('user-token',{domain: 'crtdiu-app.ru'})
                        // localStorage.removeItem('user-token')
                        rej(err)
                    })
            })
        },
        [AUTH_LOGOUT]: ({commit, dispatch}) => {
            return new Promise((res,rej) => {
                commit(AUTH_LOGOUT)
                // localStorage.removeItem('user-token')
                Vue.cookie.delete('user-token',{domain: 'crtdiu-app.ru'})
                res()
            })
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status
    }
})
