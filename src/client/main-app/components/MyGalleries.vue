<template>
<div>
  <div v-if="galleries.length > 0">
    <div v-for="gallery in galleries">
      <span>{{gallery.name}}</span>
      <span>包含{{gallery.photos.length}}张照片</span>
      <div v-if="gallery.shareUrl">
        分享链接 <span>{{ gallery.shareUrl }}</span>
      </div>
      <div v-else>
        <button @click="share(gallery)">分享</button>
      </div>
    </div>
  </div>
  <div v-else>
    还没有画廊
    <a v-link="{ name: 'create-gallery' }">现在去创建</a>
  </div>
</div>
</template>

<script>
import request from 'superagent'

export default {
  name: 'MyGalleries',

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
</style>