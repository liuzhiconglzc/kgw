<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.isMobile()
  },
  methods: {
    isMobile (){
      if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        this.safariHacks()
      }
    },
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
/* 移动端 */
@media (max-width:991px) {
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
  }
}
/* PC端 */
@media (min-width:992px) {
  body {
    /* margin: 0; */
    /* background: #f9f9f9; */
    /* width: 100%;
    height: 100%; */
    margin: 0;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
