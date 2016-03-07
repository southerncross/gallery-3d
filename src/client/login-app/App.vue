<template>
<div class="login-container">
  <login :error="error || ''"></login>
</div>
</template>

<script>
import Login from './Login'

export default {
  name: 'App',

  data() {
    return {
      error: ''
    }
  },

  components: {
    Login
  },

  ready() {
    this.error = window['gallery-3d'].data
  }
}
</script>

<style lang="stylus">

</style>