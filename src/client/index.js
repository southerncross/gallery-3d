import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import UploadPhotos from './components/UploadPhotos'
import MyPhotos from './components/MyPhotos'

Vue.config.debug = true
Vue.use(Router)

const router = new Router()

router.map({
  '/upload-photos': {
    name: 'upload-photos',
    component: UploadPhotos
  },

  '/my-photos': {
    name: 'my-photos',
    component: MyPhotos
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.start(App, '#app')
