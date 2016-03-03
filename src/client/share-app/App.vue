<template>
  <div class="app full-height">
    This is sharing gallery.
    <gallery data="gallery"></gallery>
  </div>
</template>

<script>
import Gallery from './components/Gallery'

export default {
  name: 'App',

  data() {
    return {
      gallery: window['gallery-3d'].data
    }
  },

  components: {
    'gallery': Gallery
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
