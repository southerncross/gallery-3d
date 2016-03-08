<template>
<div>
  <div class="gallery-thumbnail__head">
    <div class="gallery-thumbnail__head__title">{{gallery.name}}</div>
    <div class="gallery-thumbnail__head__subtitle">包含{{gallery.photos.length}}张照片</div>
  </div>
  <div class="gallery-thumbnail__footer">
    <div class="right" v-if="gallery.shareUrl">
      <i class="gallery-thumbnail__footer__action icon-share waves-effect waves-light" @click="onOpenSharePage"></i>
      <i class="gallery-thumbnail__footer__action--disable icon-delete waves-effect waves-light"></i>
    </div>
    <div v-else>
      <i class="gallery-thumbnail__footer__action icon-share" @click="onShareGallery(gallery)"></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GalleryThumbnail',

  props: {
    gallery: {
      type: Object,
      required: true
    },

    onShareGallery: {
      type: Function,
      requierd: true
    }
  },

  methods: {
    onOpenSharePage() {
      window.open(this.gallery.shareUrl)
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
