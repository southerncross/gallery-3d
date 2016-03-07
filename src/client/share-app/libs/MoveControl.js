import THREE from 'THREE'
import '../../vendors/PointerLockControls'

class MoveControl {
  constructor({ camera }) {
    this.control = new THREE.PointerLockControls(camera)
    this.control.getObject().position.z = 30
    this.control.getObject().showCameraVisible = true
    this.canJump = true
    this.state = {
      forward: false,
      left: false,
      backward: false,
      right: false
    }
    this.velocity = new THREE.Vector3()
    this.clock = new THREE.Clock()

    this.__onKeyDown = this.__onKeyDown.bind(this)
    this.__onKeyUp = this.__onKeyUp.bind(this)
    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)
    this.init = this.init.bind(this)
    this.destroy = this.destroy.bind(this)
    this.getObject = () => this.control.getObject()
    this.enabled = () => this.controls.enabled
  }

  __onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.state.forward = true
        break
      case 37: // left
      case 65: // a
        this.state.left = true
        break
      case 40: // down
      case 83: // s
        this.state.backward = true
        break
      case 39: // right
      case 68: // d
        this.state.right = true
        break
      case 32: // space
        if (this.canJump === true) {
          this.velocity.y += 250
        }
        this.canJump = false
        break
    }
  }

  __onKeyUp(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.state.forward = false
        break
      case 37: // left
      case 65: // a
        this.state.left = false
        break
      case 40: // down
      case 83: // s
        this.state.backward = false
        break
      case 39: // right
      case 68: // d
        this.state.right = false
        break
    }
  }

  enable() {
    this.control.enabled = true
  }

  disable() {
    this.velocity.set(0, 0, 0)
    this.control.enabled = false
  }

  move() {
    if (!this.control.enabled) {
      console.warn('Failed to move, controls are disabled,')
      return
    }

    const { control, velocity, clock, state: { forward, right, backward, left } } = this
    const delta = clock.getDelta()

    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta
    velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass

    if (forward) {
      velocity.z -= 400.0 * delta
    }
    if (backward) {
      velocity.z += 400.0 * delta
    }
    if (left) {
      velocity.x -= 400.0 * delta
    }
    if (right) {
      velocity.x += 400.0 * delta
    }

    control.getObject().translateX(velocity.x * delta)
    control.getObject().translateY(velocity.y * delta)
    control.getObject().translateZ(velocity.z * delta)

    if (control.getObject().position.y < 10) {
      velocity.y = 0
      control.getObject().position.y = 10
      this.canJump = true
    }
  }

  init() {
    document.addEventListener('keydown', this.__onKeyDown, false)
    document.addEventListener('keyup', this.__onKeyUp, false)
  }

  destroy() {
    document.removeEventListener('keydown', this.__onKeyDown, false)
    document.removeEventListener('keyup', this.__onKeyUp, false)
  }
}

export default MoveControl
