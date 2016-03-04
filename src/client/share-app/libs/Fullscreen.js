const callbacks = new Set()

const isFullscreenAvailable = /Firefox/i.test(navigator.userAgent)

const element = document.body

if (isFullscreenAvailable) {
  const fullscreenChange = () => {
    const inFullscreen = (
      (document.fullscreenElement === element) ||
      (document.mozFullscreenElement === element) ||
      (document.mozFullScreenElement === element) ||
      (document.msFullScreenElement === element) ||
      (document.webkitFullScreenElement === element)
    )
    for (const callback of callbacks) {
      callback(null, inFullscreen)
    }
  }

  document.addEventListener('fullscreenchange', fullscreenChange, false)
  document.addEventListener('mozfullscreenchange', fullscreenChange, false)

  element.requestFullscreen = (
    element.requestFullscreen ||
    element.mozRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen ||
    element.webkitRequestFullscreen
  )
} else {
  console.warn('Fullscreen API is not supported in your browser.')
}

function addFullscreenListener(callback) {
  if (isFullscreenAvailable) {
    callbacks.add(callback)
  } else {
    console.warn('Failed to add listener: Fullscreen API is not supported in your browser.')
  }
}

function removeFullscreenListener(callback) {
  if (isFullscreenAvailable) {
    callbacks.delete(callback)
  }
}

function requestFullscreen() {
  if (isFullscreenAvailable) {
    element.requestFullscreen()
  } else {
    throw new Error('Failed to request fullscreen: Fullscreen API is not supported in your browser.')
  }
}

export default {
  addFullscreenListener,
  removeFullscreenListener,
  requestFullscreen
}
