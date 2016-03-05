import THREE from 'three'

class MoveControl {
  constructor({ camera }) {
    this.control = new THREE.PointerLockControls(camera)
    this.control.getObject().position.z = 30
    this.control.getObject().showCameraVisible = true
    this.canJump = true
    this.move = {
      forward: false,
      left: false,
      backward: false,
      right: false,
      jump: false
    }
    this.velocity = new THREE.Vector3()

    this.__onKeyDown = this.__onKeyDown.bind(this)
    this.__onKeyUp = this.__onKeyUp.bind(this)
    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)
    this.init = this.init.bind(this)
    this.destroy = this.destroy.bind(this)
    this.getObject = () => this.control.getObject()
  }

  __onKeyDown(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true
        break
      case 37: // left
      case 65: // a
        this.moveLeft = true
        break
      case 40: // down
      case 83: // s
        this.moveBackward = true
        break
      case 39: // right
      case 68: // d
        this.moveRight = true
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
        this.moveForward = false
        break
      case 37: // left
      case 65: // a
        this.moveLeft = false
        break
      case 40: // down
      case 83: // s
        this.moveBackward = false
        break
      case 39: // right
      case 68: // d
        this.moveRight = false
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
