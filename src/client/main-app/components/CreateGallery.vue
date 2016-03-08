<template>
<div class="create-gallery__container container">
  <div v-if="photos.length > 0">
    <div class="section">
      <div class="create-gallery__step__title"><i class="icon-looks_one"></i>起个好名儿</div>
      <div class="input-field">
        <input id="create-gallery__name" type="text" v-model="galleryName" @input="nameError = ''"/>
        <label for="create-gallery__name">名字</label>
      </div>
      <div class="create-gallery__error">{{nameError}}</div>
    </div>
    <div class="section">
      <div class="create-gallery__step__title"><i class="icon-looks_two"></i>选几张照片</div>
      <div class="create-gallery__photo" v-for="photo in photos">
        <img class="create-gallery__photo__img card" :src="photo.url"/>
        <input id="{{'create-gallery__photo--' + photo.id}}" type="checkbox" value="{{photo.id}}" v-model="selectedPhotoIds"/>
        <label for="{{'create-gallery__photo--' + photo.id}}" @click="photoError = ''"></label>
      </div>
      <div class="create-gallery__error">{{photoError}}</div>
    </div>
    <div>
      <button class="btn cyan right" @click="createGallery">创建</button>
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
      selectedPhotoIds: [],
      nameError: '',
      photoError: ''
    }
  },

  methods: {
    createGallery() {
      const that = this
      let invalid = false
      if (!this.galleryName) {
        invalid = true
        this.nameError = '名字不能为空'
      }
      if (this.selectedPhotoIds.length === 0) {
        invalid = true
        this.photoError = '至少要选择一张照片'
      }
      if (invalid) {
        return
      }
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
@import '../../palette'

.create-gallery
  &__container
    margin-top 10%
    color color-grey-darken-2
  &__step__title
    font-size 23px
    & i
      margin-right 20px
  &__photo
    display inline-block
    width 120px
    margin 10px
    &__img
      display block
      width 100%
      padding 2px
  &__error
    color red
</style>
