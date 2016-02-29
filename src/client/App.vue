<template>
  <div class="app full-height">
    <form action="/logout" method="post">
      <button type="submit">注销</button>
    </form>
    <a v-link="{ name: 'demo' }">Demo page</a>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#container {
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
