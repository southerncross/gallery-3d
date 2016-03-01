<template>
<div>
  <div v-if="photos.length > 0">
    <div>
      <input type="text" v-model="galleryName" placeholder="名字"/>
    </div>
    <div class="create-gallery__photo" v-for="photo in photos">
      <img class="create-gallery__photo__img" :src="photo.url"/>
      <input type="checkbox" value="{{photo.id}}" v-model="selectedPhotoIds"/>
    </div>
    <div>
      <button @click="createGallery">创建</button>
    </div>
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
  name: 'CreateGallery',

  data() {
    return {
      galleryName: '',
      photos: [],
      selectedPhotoIds: []
    }
  },

  methods: {
    createGallery() {
      const that = this
      request.post('/api/galleries')
      .send(({
        name: this.galleryName,
        photoIds: this.selectedPhotoIds
      }))
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err)
          return
        }
        that.$route.router.go({ name: 'my-galleries' })
      })
    }
  },

  ready() {
    const that = this
    request.get('/api/photos')
    .end((err, res) => {
      if (err || !res.ok) {
        console.err(err)
        return
      }
      that.photos = res.body
    })
  }
}
</script>

<style lang="stylus">
.create-gallery__photo
  display inline-block
  width 120px
  margin 10px
  &__img
    display block
    width 100%
</style>
