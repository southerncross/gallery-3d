<template>
<div>
  <div id="gallery-canvas"></div>
</div>
</template>

<script>
import THREE from 'three'

export default {
  name: 'Gallery',

  props: {
    data: {
      type: Object,
      requied: true
    }
  },

  ready() {
    const webGLRenderer = new THREE.WebGLRenderer()
    webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0))
    webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    webGLRenderer.shadowMap.enabled = true

    document.getElementById('gallery-canvas').appendChild(webGLRenderer.domElement)

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
      webGLRenderer.render(scene, camera)
    }

    requestAnimationFrame(render)
  }
}
</script>

<style lang="stylus">
</style>
