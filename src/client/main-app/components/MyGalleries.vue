<template>
<div class="my-gallery__container container">
  <div class="row" v-if="galleries.length > 0">
    <div class="my-gallery__info">
      共{{galleries.length}}个画室
    </div>
    <div class="divider"></div>
    <div class="my-gallery__gallery-item card col s6 m4 l3" v-for="gallery in galleries">
      <gallery-thumbnail :gallery="gallery" :onShareGallery="share"></gallery-thumbnail>
    </div>
  </div>
  <div class="my-gallery__hint" v-else>
    还没有画室
    <a v-link="{ name: 'create-gallery' }">现在去创建</a>
  </div>
</div>
</template>

<script>
import request from 'superagent'

import GalleryThumbnail from './GalleryThumbnail'

export default {
  name: 'MyGalleries',

  components: {
    GalleryThumbnail
  },

  data() {
    return {
      galleries: []
    }
  },

  methods: {
    share(gallery) {
      const that = this
      request.put(`/api/share-gallery/${gallery.id}`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err)
          return
        }
        const idx = that.galleries.indexOf(gallery)
        if (idx >= 0) {
          that.galleries[idx] = res.body
        }
      })
    }
  },

  ready() {
    const that = this
    request.get('/api/galleries')
    .end((err, res) => {
      if (err || !res.ok) {
        console.error(err)
        return
      }
      that.galleries = res.body.map((gallery) => {
        if (gallery.accessToken.token) {
          gallery.shareUrl = `${window.location.origin}/share?access_token=${gallery.accessToken.token}`
        }
        return gallery
      })
    })
  }
}
</script>

<style lang="stylus">
@import '../../palette'

.my-gallery
  &__container
    margin-top 10%
  &__info
    font-size 23px
    color color-grey-darken-1
  &__gallery-item
    display inline-block
    margin 20px
    color color-grey-darken-2
    overflow hidden
  &__hint
    font-size 23px
    color color-grey-darken-2
</style>