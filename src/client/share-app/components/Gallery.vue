<template>
<div>
  <div id="stats-output"></div>
  <div v-if="!isPointerLocked" id="instructions">
    按Esc退出
    <button @click="start">开始</button>
  </div>
  <div id="gallery-canvas"></div>
</div>
</template>

<script>
import THREE from 'three'
import Stats from 'Stats'

import Fullscreen from '../libs/Fullscreen'
import PointerLock from '../libs/PointerLock'

export default {
  name: 'Gallery',

  data() {
    return {
      isPointerLocked: false
    }
  },

  props: {
    data: {
      type: Object,
      requied: true
    }
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
    const initStats = function() {
      const stats = new Stats()
      stats.setMode(0)

      stats.domElement.style.position = 'absolute'
      stats.domElement.style.left = '0px'
      stats.domElement.style.top = '0px'

      document.getElementById('stats-output').appendChild(stats.domElement)

      return stats
    }

    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    document.getElementById('gallery-canvas').appendChild(webGLRenderer.domElement)

    const stats = initStats()
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const ambiColor = '#0c0c0c'
    const ambientLight = new THREE.AmbientLight(ambiColor)
    scene.add(ambientLight)

    const axes = new THREE.AxisHelper(200)
    scene.add(axes)

    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.MeshLambertMaterial({ color: '#ffffff', emissive: '#a4a4a4' })
    const cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true
    cube.position.x = 0
    cube.position.y = 10
    cube.position.z = 0
    scene.add(cube)

    const render = () => {
      stats.update()
      webGLRenderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    render()

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
#instructions
  position absolute
  left 50%
  top 50%
  width 200px
  height 200px
  background-color green
  transform translate(-50%, -50%)
</style>
