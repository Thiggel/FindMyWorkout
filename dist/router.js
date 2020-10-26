import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _02de2448 = () => interopDefault(import('../src/pages/results.vue' /* webpackChunkName: "pages/results" */))
const _3b85751e = () => interopDefault(import('../src/pages/subPages/ages.vue' /* webpackChunkName: "pages/subPages/ages" */))
const _29bb1fc0 = () => interopDefault(import('../src/pages/subPages/extras.vue' /* webpackChunkName: "pages/subPages/extras" */))
const _1cffb4a0 = () => interopDefault(import('../src/pages/subPages/goal.vue' /* webpackChunkName: "pages/subPages/goal" */))
const _107fface = () => interopDefault(import('../src/pages/subPages/languages.vue' /* webpackChunkName: "pages/subPages/languages" */))
const _097fa0cc = () => interopDefault(import('../src/pages/subPages/levels.vue' /* webpackChunkName: "pages/subPages/levels" */))
const _2d903fd3 = () => interopDefault(import('../src/pages/subPages/paymentType.vue' /* webpackChunkName: "pages/subPages/paymentType" */))
const _6ff4635e = () => interopDefault(import('../src/pages/subPages/programType.vue' /* webpackChunkName: "pages/subPages/programType" */))
const _170c5d34 = () => interopDefault(import('../src/pages/subPages/timeExtent.vue' /* webpackChunkName: "pages/subPages/timeExtent" */))
const _16cdacb8 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/results",
    component: _02de2448,
    name: "results"
  }, {
    path: "/subPages/ages",
    component: _3b85751e,
    name: "subPages-ages"
  }, {
    path: "/subPages/extras",
    component: _29bb1fc0,
    name: "subPages-extras"
  }, {
    path: "/subPages/goal",
    component: _1cffb4a0,
    name: "subPages-goal"
  }, {
    path: "/subPages/languages",
    component: _107fface,
    name: "subPages-languages"
  }, {
    path: "/subPages/levels",
    component: _097fa0cc,
    name: "subPages-levels"
  }, {
    path: "/subPages/paymentType",
    component: _2d903fd3,
    name: "subPages-paymentType"
  }, {
    path: "/subPages/programType",
    component: _6ff4635e,
    name: "subPages-programType"
  }, {
    path: "/subPages/timeExtent",
    component: _170c5d34,
    name: "subPages-timeExtent"
  }, {
    path: "/",
    component: _16cdacb8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
