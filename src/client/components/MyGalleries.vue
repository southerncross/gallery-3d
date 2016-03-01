<template>
<div>
  <div v-if="galleries.length > 0">
    <div v-for="gallery in galleries">
      <span>{{gallery.name}}</span>
      <span>包含{{gallery.photos.length}}张照片</span>
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

  ready() {
    const that = this
    request.get('/api/galleries')
    .end((err, res) => {
      if (err || !res.ok) {
        console.error(err)
        return
      }
      that.galleries = res.body
    })
  }
}
</script>

<style lang="stylus">
</style>