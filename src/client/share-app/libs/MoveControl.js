class MoveControl {
  constructor({ controls, canJump }) {
    this.controls = controls
    this.canJump = canJump
    this.move = {
      forward: false,
      left: false,
      backward: false,
      right: false,
      jump: false
    }
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    }

    this.__onKeyDown = this.__onKeyDown.bind(this)
    this.__onKeyUp = this.__onKeyUp.bind(this)
    this.addMoveListener = this.addMoveListener.bind(this)
    this.removeMoveListener = this.removeMoveListener.bind(this)
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

  addMoveListener() {
    document.addEventListener('keydown', this.__onKeyDown, false)
    document.addEventListener('keyup', this.__onKeyUp, false)
  }

  removeMoveListener() {
    document.removeEventListener('keydown', this.__onKeyDown, false)
    document.removeEventListener('keyup', this.__onKeyUp, false)
  }
}

export default MoveControl
