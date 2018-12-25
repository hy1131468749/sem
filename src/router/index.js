import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
  mounted () {
  }
});
const LOGIN_PAGE_NAME = 'login'

export default router
