import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import servicesRoutes from './modules/services.js'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let AllRoutes = {}
AllRoutes.routes = []

AllRoutes.concatRoutes = function (routes) {
  AllRoutes.routes = AllRoutes.routes.concat(routes)
}

AllRoutes.concatRoutes(servicesRoutes)

let router = new Router({
  routes: AllRoutes.routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'componentList' || to.name === 'ceshi1' || to.name === 'mainMenu') {
    store.commit('updateIsShowMenu', false)
    next()
  } else {
    store.commit('updateIsShowMenu', true)
    next()
  }
})
export default router
