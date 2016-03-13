<template>
<div class="login-app__container cyan lighten-5">
  <login class="login-app__center"></login>
</div>
</template>

<script>
import Login from './Login'

export default {
  name: 'App',

  components: {
    Login
  }
}
</script>

<style lang="stylus">
html, body
  padding 0
  margin 0
  width 100%
  height 100%

.login-app
  &__container
    position fixed
    width 100%
    height 100%
  &__center
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
</style>