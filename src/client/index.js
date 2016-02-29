import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Demo from './components/Demo'

Vue.config.debug = true
Vue.use(Router)

const router = new Router()

router.map({
  '/demo': {
    name: 'demo',
    component: Demo
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.start(App, '#app')
