<template>
    <div class="manager_back">
      <van-nav-bar class="nav_bar" title="联系管理员" :border="false" fixed left-arrow @click-left="goBack" />
      <van-cell-group>
        <van-cell class="tip1" title="管理员电话：024-62602028" />
        <van-cell class="tip1" title="管理员邮箱：kanguawang@163.com" />
      </van-cell-group>
      <div class="bottom">
        <van-image class="logo" fit="contain" :src="require('@/assets/logo_1.png')" style="height:150px; width:150px"/>
        <div class="tip">问题咨询、问题反馈、学术合作</div>
        <div class="tip">请通过上述方式联系砍瓜网</div>
        <div class="tip2">请工作日期间进行联系</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Manager",
    methods: {
      goBack () {
        this.$router.back()
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  .manager_back {
    font-weight: 500;
    height: 100%;
    background: #f9f9f9; 
  }
  .tip1{
    font-size: 16px;
  }
  .bottom{
    margin-top: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 100px;
    .logo {
      width: 98px;
      height: 98px;
      margin-top: 40px;
      margin-bottom: 15px;
    }
    .tip {
      font-size: 13px;
      margin-top: 5px;
    }
    .tip2 {
      margin-top: 25px;
      font-size: 13px;
      color: #747474;
      letter-spacing: 2px;
    }
  }
  :deep(.van-nav-bar__title) {
    font-size: 20px;
    color: black;
  }
  :deep(.van-nav-bar__arrow) {
    color: black !important;
  }
  .nav_bar{
      background-color: #f9f9f9;
  }
  </style>