// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
import getRandom from './utils/getRandom'
import TRTC from 'trtc-js-sdk'

window.TRTC = TRTC;
Vue.prototype.getRandom = getRandom
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.BASE_URL
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    Message
  },
  template: '<App/>'
})
