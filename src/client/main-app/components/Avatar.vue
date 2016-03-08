<template>
  <div>
    <div class="avatar z-depth-1">{{name.substr(0, 1)}}</div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',

  props: {
    name: {
      type: String,
      required: true,
      default: () => '?'
    }
  }
}
</script>

<style lang="stylus">
@import '../../palette'

avatar-size = 50px

.avatar
  display inline-block
  width avatar-size
  height avatar-size
  font-size 22px
  line-height avatar-size
  color color-grey-darken-1
  border-radius 50%
  background-color white
  cursor pointer
</style>
