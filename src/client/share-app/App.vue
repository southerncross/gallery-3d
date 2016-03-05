<template>
  <div class="app full-height">
    <div v-if="!isPointerLocked" id="instructions">
      按Esc退出
      <button @click="start">开始</button>
    </div>
    <gallery :gallery-info="galleryInfo" :keep-rendering="isPointerLocked"></gallery>
  </div>
</template>

<script>
import Fullscreen from './libs/Fullscreen'
import PointerLock from './libs/PointerLock'
import Gallery from './components/Gallery'

export default {
  name: 'App',

  data() {
    return {
      isPointerLocked: false,
      galleryInfo: window['gallery-3d'].data
    }
  },

  components: {
    'gallery': Gallery
  },

  methods: {
    start() {
      try {
        Fullscreen.requestFullscreen()
      } catch (ohoh) {
        try {
          PointerLock.requestPointerLock()
        } catch (err) {
          console.error(err)
        }
      }
    },

    fullscreenListener(err, inFullscreen) {
      if (err) {
        console.error(err)
      }
      if (inFullscreen) {
        try {
          PointerLock.requestPointerLock()
        } catch (err) {
          console.error(err)
        }
      }
    },

    pointerLockListener(err, isPointerLocked) {
      if (err) {
        console.error(err)
      }
      this.isPointerLocked = !err && isPointerLocked
    }
  },

  ready() {
    Fullscreen.addFullscreenListener(this.fullscreenListener)
    PointerLock.addPointerLockListener(this.pointerLockListener)
  },

  beforeDestroy() {
    Fullscreen.removeFullscreenListener(this.fullscreenListener)
    PointerLock.removePointerLockListener(this.pointerLockListener)
  }
}
</script>

<style lang="stylus">
html
  height 100%

body
  display flex
  align-items center
  justify-content center
  height 100%

#instructions
  position absolute
  left 50%
  top 50%
  width 200px
  height 200px
  background-color green
  transform translate(-50%, -50%)
</style>
