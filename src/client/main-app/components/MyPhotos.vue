<template>
<div class="my-photos__container container">
  <div v-if="photos.length > 0">
    <div class="my-photos__info">
      共{{photos.length}}张照片
    </div>
    <div class="divider"></div>
    <div v-for="photo in photos" class="my-photos__item">
      <img class="my-photos__item__img card" :src="photo.url"/>
      <div class="my-photos__item__name">{{photo.name}}</div>
    </div>
  </div>
  <div class="my-photos__hint" v-else>
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
@import '../../palette'

.my-photos
  &__container
    margin-top 10%
  &__info
    font-size 23px
    color color-grey-darken-1
  &__item
    display inline-block
    width 120px
    margin 10px
    &__img
      display block
      width 100%
      padding 2px
    &__name
      width 100%
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
  &__hint
    font-size 23px
    color color-grey-darken-2
</style>
