<template>
<div>
  <div class="gallery-thumbnail__head">
    <div class="gallery-thumbnail__head__title">{{gallery.name}}</div>
    <div class="gallery-thumbnail__head__subtitle">包含{{gallery.photos.length}}张照片</div>
  </div>
  <div class="gallery-thumbnail__footer">
    <div class="right" >
      <i class="gallery-thumbnail__footer__action--disable icon-delete waves-effect waves-light"></i>
      <i v-if="shareUrl" class="gallery-thumbnail__footer__action icon-share waves-effect waves-light" @click="onOpenSharePage"></i>
      <i v-if="shareUrl" class="gallery-thumbnail__footer__action icon-visibility" @click="onDeshareGallery"></i>
      <i v-else class="gallery-thumbnail__footer__action icon-visibility_off" @click="onShareGallery"></i>
  </div>
</div>
</template>

<script>
import request from 'superagent'

export default {
  name: 'GalleryThumbnail',

  props: {
    gallery: {
      type: Object,
      required: true
    }
  },

  computed: {
    shareUrl() {
      const gallery = this.gallery
      if (gallery.accessToken.token && gallery.accessToken.valid) {
        return `${window.location.origin}/share?access_token=${gallery.accessToken.token}`
      } else {
        return null
      }
    }
  },

  methods: {
    onShareGallery() {
      const that = this
      request.put(`/api/share-gallery/${that.gallery.id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err)
          return
        }
        that.gallery.accessToken = res.body
      })
    },

    onDeshareGallery() {
      const that = this
      request.put(`/api/deshare-gallery/${that.gallery.id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err)
          return
        }
        that.gallery.accessToken = res.body
      })
    },

    onOpenSharePage() {
      window.open(this.shareUrl)
    }
  }
}
</script>

<style lang="stylus">
@import '../../palette'

$action
  display inline-block
  width 30px
  height 30px
  font-size 23px
  vertical-align top
  line-height 30px
  text-align center
  color color-grey
  cursor pointer
  &:hover
    color color-grey-darken-1

.gallery-thumbnail
  &__head
    &__title
      font-size 21px
    &__subtitle
      height 30px
      margin-bottom 20px

  &__footer
    &__action
      @extends $action
      &--disable
        @extends $action
        color color-grey-lighten-1
        cursor no-drop
        &:hover
          color color-grey-lighten-1
</style>
