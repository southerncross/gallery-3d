<template>
  <div class="login-container">
    <form action="/login" method="post">
      <div v-show="error" class="login-error">
        <span>{{error}}</span>
      </div>
      <div class="login-input">
        <input id="login__email" name="email" type="email" placeholder="邮箱"/>
        <input id="login__password" name="password" type="password" placeholder="密码"/>
      </div>
      <div class="login-submit">
        <button type="submit">登陆</button>
      </div>
   </form>
 </div>
</template>

<script>
export default {
  name: 'Login',

  props: {
    error: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="stylus">
</style>
