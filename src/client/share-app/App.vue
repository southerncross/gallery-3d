<template>
  <div class="app full-height">
    <div class="app__hint" v-if="!isPointerLocked">
      <div class="app__hint__item">按Esc退出</div>
      <div class="app__hint__item">按方向键控制行动</div>
      <button class="app__hint__start" @click="start">开始</button>
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
@import '../palette'

html
  height 100%

body
  display flex
  align-items center
  justify-content center
  height 100%

.app__hint
  position absolute
  left 50%
  top 50%
  padding 20px
  text-align center
  transform translate(-50%, -50%)
  background-color rgba(white, 70%)
  &__item
    font-size 23px
    margin 30px
  &__start
    font-size 23px
    margin 30px
    padding 10px 30px
    cursor pointer
    color white
    border none
    border-radius 30px
    background-color color-cyan
    box-shadow 3px 3px 3px color-grey
    &:hover
      background-color color-cyan-lighten-1
</style>
