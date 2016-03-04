const callbacks = new Set()

const isPointerLockAvailable = (
  ('pointerLockElement' in document) ||
  ('mozPointerLockElement' in document) ||
  ('webkitPointerLockElement' in document)
)

const element = document.body

if (isPointerLockAvailable) {
  const pointerlockchange = () => {
    const inPointerLock = (
      (document.pointerLockElement === element) ||
      (document.mozPointerLockElement === element) ||
      (document.msPointerLockElement === element) ||
      (document.webkitPointerLockElement === element)
    )
    for (const callback of callbacks) {
      callback(null, inPointerLock)
    }
  }

  const pointerlockerror = () => {
    for (const callback of callbacks) {
      callback(new Error('locking the pointer failed'))
    }
  }

  // Hook pointer lock state change events
  document.addEventListener('pointerlockchange', pointerlockchange, false)
  document.addEventListener('mozpointerlockchange', pointerlockchange, false)
  document.addEventListener('mspointerlockchange', pointerlockchange, false)
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false)

  document.addEventListener('pointerlockerror', pointerlockerror, false)
  document.addEventListener('mozpointerlockerror', pointerlockerror, false)
  document.addEventListener('mspointerlockerror', pointerlockerror, false)
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false)

  // Ask the browser to lock the pointer
  element.requestPointerLock = (
    element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.msRequestPointerLock ||
    element.webkitRequestPointerLock
  )
} else {
  console.warn('Pointer Lock API is not supported in your browser.')
}

function addPointerLockListener(callback) {
  if (isPointerLockAvailable) {
    callbacks.add(callback)
  } else {
    console.warn('Failed to add listener: Pointer Lock API is not supported in your browser.')
  }
}

function removePointerLockListener(callback) {
  if (isPointerLockAvailable) {
    callbacks.delete(callback)
  }
}

function requestPointerLock() {
  if (isPointerLockAvailable) {
    element.requestPointerLock()
  } else {
    throw new Error('Failed to request pointer lock: Pointer Lock API is not supported in your browser.')
  }
}

export default {
  addPointerLockListener,
  removePointerLockListener,
  requestPointerLock
}
