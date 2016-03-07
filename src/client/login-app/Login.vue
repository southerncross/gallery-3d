<template>
  <div class="login__container card">
    <div class="login__logo">
      <img src="/images/logo.png">
      <span>3D画室</span>
    </div>
    <div class="login__input input-field">
      <input
        :class="emailClass"
        v-model="email"
        v-on:input="setErrorMessage('')"
        id="login__email"
        type="email"
      >
      <label for="login__email">邮箱</label>
    </div>
    <div class="login__input input-field">
      <input
        :class="passwordClass"
        v-model="password"
        v-on:input="setErrorMessage('')"
        id="login__password"
        type="password"
      >
      <label for="login__password">密码</label>
    </div>
    <div class="login__error">
      <span>{{errorMessage}}</span>
    </div>
    <div class="login__submit">
      <button class="btn" @click="login">登陆</button>
    </div>
 </div>
</template>

<script>
import request from 'superagent'

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      emailClass: '',
      passwordClass: '',
      errorMessage: ''
    }
  },

  methods: {
    setErrorMessage(message) {
      this.errorMessage = message
    },

    login() {
      const that = this
      const { email, password } = this
      if (!email || !password) {
        this.setErrorMessage('邮箱或密码不能为空')
        return
      }
      request.post('/login')
      .send({ email, password })
      .end((err, res) => {
        if (!err && res && res.ok) {
          window.location.href = '/'
          return
        }
        that.setErrorMessage(res ? res.body.message : '网络错误')
      })
    }
  }
}
</script>

<style lang="stylus">
.login
  &__container
    box-sizing border-box
    width 480px
    height 400px
    padding 30px
  &__logo
    & img
      width 120px
      height 120px
      vertical-align top
    & span
      padding-left 30px
      font-size 24px
      line-height 120px
  &__error
    height 40px
    color red
  &__submit
    text-align right
</style>
