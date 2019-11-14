import Vue from 'vue'
import routes from './router'
import Router from 'vue-router'
import Axios from './assets/axios'
import {cubeCard,cubeTable} from '../lib/index'

Vue.use(Router);
Vue.use(Axios);
Vue.use(cubeCard);
Vue.use(cubeTable);
const router = new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes:[...routes]
})
new Vue({
  router,
}).$mount('#app')
