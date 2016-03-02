import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import UploadPhotos from './components/UploadPhotos'
import MyPhotos from './components/MyPhotos'
import MyGalleries from './components/MyGalleries'
import CreateGallery from './components/CreateGallery'

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
  },

  '/my-galleries': {
    name: 'my-galleries',
    component: MyGalleries
  },

  '/create-gallery': {
    name: 'create-gallery',
    component: CreateGallery
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.start(App, '#app')
