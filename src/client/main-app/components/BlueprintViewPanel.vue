<template>
<div class="create-blueprint__view-panel">
  <div id="create-blueprint__canvas--3d"></div>
</div>
</template>

<script>
import THREE from 'THREE'
import '../../vendors/TrackballControls'

export default {
  name: 'BlueprintViewPanel',

  props: {
    svg: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      keepRendering: false,
      renderer: null,
      clock: null,
      scene: null,
      camera: null,
      moveControl: null
    }
  },

  methods: {
    render() {
      const { renderer, scene, camera, clock, moveControl, keepRendering } = this
      const delta = clock.getDelta()
      moveControl.update(delta)
      if (keepRendering) {
        requestAnimationFrame(this.render)
        renderer.render(scene, camera)
      }
    },

    drawWalls() {
      const color = '#EEAA66'
      const wallGeo = new THREE.Geometry()
      this.svg.selectAll('.wall').forEach((wall, idx) => {
        const height = 60
        let depth = 5
        let width = 5
        const x1 = Number(wall.attr('x1'))
        const y1 = Number(wall.attr('y1'))
        const x2 = Number(wall.attr('x2'))
        const y2 = Number(wall.attr('y2'))
        const x = (x1 + x2) / 20
        const y = (y1 + y2) / 20
        if (x1 === x2) {
          depth = Math.abs(y1 - y2) / 10 + width
        } else {
          width = Math.abs(x1 - x2) / 10 + depth
        }

        const boxGeo = new THREE.BoxGeometry(width, height, depth)
        boxGeo.translate(x, height / 2, y)
        const boxMat = new THREE.MeshBasicMaterial({ color, wireframe: true })
        const wallMesh = new THREE.Mesh(boxGeo, boxMat)
        wallMesh.updateMatrix()
        wallGeo.merge(wallMesh.geometry, wallMesh.matrix)
      })
      const wallMat = new THREE.MeshBasicMaterial({ color: '#AAA', wireframe: false })
      const wallMesh = new THREE.Mesh(wallGeo, wallMat)
      this.scene.add(wallMesh)
    }
  },

  ready() {
    const canvasDom = document.getElementById('create-blueprint__canvas--3d')

    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color(0x000000, 1.0))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    canvasDom.appendChild(renderer.domElement)
    this.renderer = renderer

    const scene = new THREE.Scene()
    this.scene = scene

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = 100
    camera.position.y = 100
    camera.position.z = 100
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.camera = camera

    const control = new THREE.TrackballControls(camera)
    control.rotateSpeed = 1.0
    control.zoomSpeed = 1.0
    control.panSpeed = 1.0
    this.moveControl = control

    const ambiColor = '#0c0c0c'
    const ambientLight = new THREE.AmbientLight(ambiColor)
    scene.add(ambientLight)

    const axes = new THREE.AxisHelper(200)
    scene.add(axes)

    this.drawWalls()

    this.keepRendering = true
    this.render()
  },

  beforeDestroy() {
    this.keepRendering = false
  }
}
</script>

<style>

</style>
