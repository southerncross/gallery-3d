import THREE from 'three'
import Stats from 'Stats'

import MoveControl from './MoveControl'

function createMeshFromPhoto(photo) {
  const geometry = new THREE.BoxGeometry(20, 20, 20)
  const material = new THREE.MeshLambertMaterial({ color: '#ffffff', emissive: '#a4a4a4' })
  const cube = new THREE.Mesh(geometry, material)
  return cube
}

class ThreeGallery {
  constructor({ statsDom, canvasDom, galleryInfo: { photos } }) {
    this.three = {
      stats: null,
      renderer: null,
      scene: null,
      camera: null,
      moveControl: null,
      keepRendering: false
    }

    this.__initScene = this.__initScene.bind(this)
    this.__initCamera = this.__initCamera.bind(this)
    this.__initMoveControl = this.__initMoveControl.bind(this)
    this.__initLight = this.__initLight.bind(this)
    this.__initAxes = this.__initAxes.bind(this)
    this.__initPhotos = this.__initPhotos.bind(this)
    this.__render = this.__render.bind(this)
    this.init = this.init.bind(this)
    this.destroy = this.destroy.bind(this)
    this.startRendering = this.startRendering.bind(this)
    this.stopRendering = this.stopRendering.bind(this)
    this.addPhotos = this.addPhotos.bind(this)

    if (statsDom) {
      const stats = new Stats()
      stats.setMode(0)
      // stats.domElement.style.position = 'absolute'
      // stats.domElement.style.left = '0px'
      // stats.domElement.style.top = '0px'
      statsDom.appendChild(stats.domElement)
      this.three.stats = stats
    }

    if (canvasDom) {
      const renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(new THREE.Color(0x000000, 1.0))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      canvasDom.appendChild(renderer.domElement)
      this.three.renderer = renderer
    } else {
      console.warn('No canvas DOM element is provided, gallery will not be rendered.')
      return
    }

    if (Array.isArray(photos) && photos.length > 0) {
      this.photos = photos
    } else {
      console.warn('No photo is provided, empty gallery will be rendered.')
      this.photos = []
    }
  }

  __initScene() {
    this.three.scene = new THREE.Scene()
  }

  __initCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 10
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.three.camera = camera
  }

  __initMoveControl() {
    const { scene, camera } = this.three
    const control = new MoveControl({ camera })
    control.init()
    scene.add(control.getObject())
    this.three.moveControl = control
  }

  __initLight() {
    const ambiColor = '#0c0c0c'
    const ambientLight = new THREE.AmbientLight(ambiColor)
    this.three.scene.add(ambientLight)
  }

  __initAxes() {
    const axes = new THREE.AxisHelper(200)
    this.three.scene.add(axes)
  }

  __initPhotos() {
    this.photos.forEach((photo, idx) => {
      const mesh = createMeshFromPhoto(photo)
      mesh.position.set(0, 10 * idx, 0)
      this.three.scene.add(mesh)
    })
  }

  init() {
    this.__initScene()
    this.__initCamera()
    this.__initMoveControl()
    this.__initLight()
    this.__initAxes()
    this.__initPhotos()
  }

  destroy() {
    this.moveControl.destroy()
  }

  __render() {
    const { stats, renderer, scene, camera, moveControl, keepRendering } = this.three
    if (stats) {
      stats.update()
    }
    renderer.render(scene, camera)
    moveControl.move()
    if (keepRendering) {
      requestAnimationFrame(this.__render)
    }
  }

  startRendering() {
    this.three.keepRendering = true
    this.three.moveControl.enable()
    this.__render()
  }

  stopRendering() {
    this.three.keepRendering = false
    this.three.moveControl.disable()
  }

  addPhotos(photos) {
    photos.forEach((photo, idx) => {
      this.photos.push(photo)
      const mesh = createMeshFromPhoto(photo)
      mesh.position.set(0, 10 * (this.photos.length + idx), 0)
      this.three.scene.add(mesh)
    })
  }
}

export default ThreeGallery
