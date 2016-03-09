<template>
  <div class="upload-photos__container container">
    <div class="upload-photos__dropzone" id="upload-photos__dropzone">
      <input class="upload-photos__dropzone__button" id="upload-photos__button" type="file">
      <label v-show="photos.length === 0" class="upload-photos__dropzone__label" for="upload-photos__button">
        点击上传图片，支持拖拽
      </label>
      <div v-show="photos.length > 0">
        <div class="upload-photos__photo" v-for="photo in photos">
          <div class="upload-photos__photo__img card">
            <img v-if="photoIdToUrl[photo.id]" :src="photoIdToUrl[photo.id]"/>
            <div v-else class="upload-photos__photo__fake">
              <div class="upload-photos__photo__progress progress">
                <div class="determinate" :style="{ width: photo.percent + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="upload-photos__photo__info">
            <div class="upload-photos__photo__name">{{photo.name}}</div>
            <div class="upload-photos__photo__size">{{photo.size / 1000}}Kb</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qiniu from 'Qiniu'
import plupload from 'plupload'
import request from 'superagent'

export default {
  name: 'UploadPhotos',

  data() {
    return {
      photos: [],
      photoIdToUrl: {}
    }
  },

  methods: {
    addPhoto(photo) {
      this.photos.push(photo)
    },

    savePhotoLink(photo, sourceLink) {
      request.post('/api/photos')
      .send({
        name: photo.name,
        url: sourceLink
      })
      .end((err, res) => {
        if (err || !res.ok) {
          console.error(err)
          return
        }
      })
    }
  },

  ready() {
    const that = this
    Qiniu.uploader({
      runtimes: 'html5,flash,html4', // 上传模式,依次退化
      browse_button: 'upload-photos__button', // 上传选择的点选按钮，**必需**
      uptoken_url: '/api/uptoken', // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      // downtoken_url: '/downtoken',
      // Ajax请求downToken的Url，私有空间时使用,JS-SDK将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
      // uptoken : '<Your upload token>', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
      unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
      // save_key: true, // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
      domain: 'http://7xprgf.com1.z0.glb.clouddn.com/', // bucket 域名，下载资源时用到，**必需**
      get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的token
      container: 'upload-photos__dropzone', // 上传区域DOM ID，默认是browser_button的父元素，
      max_file_size: '5mb', // 最大文件体积限制
      flash_swf_url: 'js/plupload/Moxie.swf', // 引入flash,相对路径
      max_retries: 3, // 上传失败最大重试次数
      dragdrop: true, // 开启可拖曳上传
      drop_element: 'upload-photos__dropzone', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb', // 分块上传时，每片的体积
      auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
      init: {
        FilesAdded: function(up, files) {
          plupload.each(files, function(file) {
            that.addPhoto(file)
          })
        },
        FileUploaded: function(up, file, info) {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

          const domain = up.getOption('domain')
          const res = JSON.parse(info)
          const url = domain + res.key // 获取上传成功后的文件的Url
          that.photoIdToUrl = Object.assign({}, JSON.parse(JSON.stringify(that.photoIdToUrl)), { [file.id]: url })
          that.savePhotoLink(file, url)
        },
        Error: function(up, err, errTip) {
          // TODO: boring, finish error handler
          console.error('upload error', err)
        },
        UploadComplete: function() {
          console.log('upload complete')
        }
      }
    })
  }
}
</script>

<style lang="stylus">
@import '../../palette'

.upload-photos
  &__container
    margin-top 10%
  &__dropzone
    min-height 200px
    text-align center
    color color-grey-lighten-2
    border 4px dashed color-grey-lighten-2
    &__button
      display none
    &__label
      font-size 30px
      line-height 200px
      cursor pointer
      &:hover
        color color-grey-lighten-1
  &__photo
    position relative
    display inline-block
    margin 8px
    color color-grey-darken-2
    &__img
      padding 2px
      margin-bottom 40px
      & img
        max-height 280px
        max-width 200px
    &__fake
      width 100px
      height 140px
    &__progress
      margin-top 80%
    &__info
      position absolute
      bottom -10px
      width 100%
    &__name
      width 100%
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
    &__size
      max-width 100px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
</style>
