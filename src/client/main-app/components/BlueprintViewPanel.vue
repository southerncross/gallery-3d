<template>
<div class="create-blueprint__view-panel">
  <div id="create-blueprint__canvas--3d"></div>
</div>
</template>

<script>
import THREE from 'THREE'

import '../../vendors/OrbitControls'

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
      keepRendering: false
    }
  },

  methods: {
    render() {
      const { renderer, scene, camera, clock, cameraControls, keepRendering } = this
      const delta = clock.getDelta()
      cameraControls.update(delta)
      if (keepRendering) {
        requestAnimationFrame(this.render)
        renderer.render(scene, camera)
      }
    },

    drawWalls() {
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
        const wallMesh = new THREE.Mesh(boxGeo)
        wallMesh.updateMatrix()
        wallGeo.merge(wallMesh.geometry, wallMesh.matrix)
      })
      const wallMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const wallMesh = new THREE.Mesh(wallGeo, wallMat)
      this.scene.add(wallMesh)
    }
  },

  ready() {
    const canvasDom = document.getElementById('create-blueprint__canvas--3d')

    this.clock = new THREE.Clock()

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

    const cameraControls = new THREE.OrbitControls(camera, renderer.domElement)
    cameraControls.target.set(0, 50, 0)
    this.cameraControls = cameraControls

    // const ambientLight = new THREE.AmbientLight(0xffffff)
    // scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.color.setHSL(0.1, 1, 0.95)
    dirLight.position.set(-1, 1.75, 1)
    dirLight.position.multiplyScalar(50)
    scene.add(dirLight)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    hemiLight.color.setHSL(0.6, 1, 0.6)
    hemiLight.groundColor.setHSL(0.095, 1, 0.75)
    hemiLight.position.set(0, 500, 0)
    scene.add(hemiLight)

    const axes = new THREE.AxisHelper(200)
    scene.add(axes)

    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0xcccccc })
    )
    planeMesh.receiveShadow = true
    planeMesh.rotation.x = -0.5 * Math.PI
    scene.add(planeMesh)

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
