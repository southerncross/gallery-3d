<template>
  <div class="nav-column z-depth-2">
    <div class="center-align">
      <div class="nav-column__avatar__container" @mouseleave="onHideAvatarMenu">
        <avatar
          class="nav-column__avatar"
          :name="user.name || '?'"
          @mouseenter="onShowAvatarMenu"
        >
        </avatar>
        <div
          v-show="showAvatarMenu"
          class="nav-column__avatar__menu"
          transition="nav-column__avatar__menu"
        >
          <form action="/logout" method="post">
            <button class="nav-column__avatar__menu__btn" type="submit">登出</button>
          </form>
        </div>
      </div>
      <div class="nav-column__link__container">
        <div class="nav-column__link waves-effect" v-link="{ name: 'my-galleries' }">
          <span class="icon-perm_media"></span>
          我的画室
        </div>
        <div class="nav-column__link waves-effect" v-link="{ name: 'create-gallery' }">
          <span class="icon-color_lens"></span>
          新建画室
        </div>
        <div class="nav-column__link waves-effect" v-link="{ name: 'my-photos' }">
          <span class="icon-settings"></span>
          我的照片
        </div>
        <div class="nav-column__link waves-effect" v-link="{ name: 'upload-photos' }">
          <span class="icon-adb"></span>
          上传照片
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '../components/Avatar'

export default {
  name: 'NavColumn',

  components: {
    Avatar
  },

  data() {
    return {
      showAvatarMenu: false
    }
  },

  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  methods: {
    onShowAvatarMenu() {
      this.showAvatarMenu = true
    },

    onHideAvatarMenu() {
      this.showAvatarMenu = false
    }
  }
}
</script>

<style lang="stylus">
@import '../../palette.styl'

.expand
  &-transition
    transition all .3s ease
    height 30px
    padding 10px
    background-color #eee
    overflow hidden
  &-enter, &-leave
    height 0
    padding 0 10px
    opacity 0

.nav-column
  background-color color-cyan
  &__avatar
    margin 25% auto
    &__container
      position relative
      height 100px
    &__menu
      position absolute
      right 75px
      top 60px
      &-transition
        transition all .3s ease
      &-enter, &-leave
        right -10px
        opacity 0
      &__btn
        box-sizing border-box
        height 29px
        padding 2px 12px
        color white
        border none
        border-radius 14px
        background-color black
        opacity 0.8

  &__logout
    margin-bottom 50px
  &__link
    display block
    height 50px
    line-height 50px
    font-size 18px
    color white
    background-color color-cyan
    &:hover
      background-color color-cyan-darken-1
    &.v-link-active
      background-color color-cyan-darken-1
    &__container
      margin-top 100px
</style>