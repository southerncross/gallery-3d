<template>
<div>
  <div id="stats-output"></div>
  <div id="gallery-canvas"></div>
</div>
</template>

<script>
import ThreeGallery from '../libs/ThreeGallery'

export default {
  name: 'Gallery',

  three: null,

  props: {
    galleryInfo: {
      type: Object,
      required: true
    },
    keepRendering: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    keepRendering: 'toggleRendering'
  },

  methods: {
    toggleRendering(keepRendering) {
      if (keepRendering) {
        this.three.startRendering()
      } else {
        this.three.stopRendering()
      }
    }
  },

  ready() {
    const galleryInfo = JSON.parse(JSON.stringify(this.galleryInfo))
    const statsDom = document.getElementById('stats-output')
    const canvasDom = document.getElementById('gallery-canvas')
    this.three = new ThreeGallery({ statsDom, canvasDom, galleryInfo })
    this.three.init()
  },

  beforeDestroy() {
    this.three.destroy()
  }
}
</script>

<style lang="stylus">
#stats-output
  position fixed
  left 0
  right 0
</style>
