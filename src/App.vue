<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.safariHacks()
  },
  methods: {
    safariHacks () {
      let windowsVH = window.innerHeight / 100;
      document.querySelector('body').style.setProperty('--vh', windowsVH + 'px');
      window.addEventListener('resize', function () {
        document.querySelector('body').style.setProperty('--vh', windowsVH + 'px');
      });
    },
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  --themeColor: #50bc93;
}
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}
</style>
