<template>
<div>
  <div v-if="photos.length > 0">
    <div v-for="photo in photos" class="my-photos__item">
      <img class="my-photos__item__img" :src="photo.url"/>
      <span>{{photo.name}}</span>
    </div>div>
  </div>
  <div v-else>
    还没有任何照片
    <a v-link="{ name: 'upload-photos' }">现在去上传</a>
  </div>
</div>
</template>

<script>
import request from 'superagent'

export default {
  name: 'MyPhotos',

  data() {
    return {
      photos: []
    }
  },

  ready() {
    const that = this
    request.get('/api/photos')
    .end((err, res) => {
      if (err || !res.ok) {
        console.error(err)
        return
      }
      that.photos = res.body
    })
  }
}
</script>

<style lang="stylus">
.my-photos__item
  display inline-block
  width 120px
  margin 10px
  &__img
    display block
    width 100%
</style>
