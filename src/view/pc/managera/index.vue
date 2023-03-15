<template>
  <div class="de">
    <div class="detail_back">
      <div class="manager_back">
        <!-- <div class="title1">
          <div class="ti">联系管理员</div>
          <button class="button" style="vertical-align:middle" @click="goBack"><span>返回</span></button>
        </div> -->
      </div>
      <img :src="require('@/assets/logo_1.png')" style="height:200px; width:200px;display: flex;position: relative;transform: translate(230px,50px);transform-origin: left top;" fit="contain">
      <div class="text">
        <div style="flex-direction: column;margin-top: 15px;display: flex;position: relative;transform: translate(200px,50px);transform-origin: left top;">
          <div style="margin-top: 15px;margin: 10px 0;font-size: 20px;white-space: pre-line;">管理员电话：024-62602028</div>
          <div style="margin-top: 15px;margin: 10px 0;font-size: 20px;m;white-space: pre-line;">管理员邮箱：123456789@163.com</div>
        </div>
        <div style="font-weight: bolder;font-size: 10px;margin-left: 55px;margin-top: 15px;display: flex;position: relative;transform: translate(200px,60px);transform-origin: left top;">问题咨询、问题反馈、学术合作</div>
        <div style="font-weight: bolder;font-size: 10px;margin-left: 55px;margin-top: 15px;display: flex;position: relative;transform: translate(200px,60px);transform-origin: left top;">请通过上述方式联系砍瓜网</div>
        <div style="color: #747474;font-weight: bolder;font-size: 10px;margin-top: 3px;margin-top: 25px;margin-left: 70px;display: flex;position: relative;transform: translate(200px,50px);transform-origin: left top;">请工作日期间进行联系</div>
      </div>
      
    </div>
    <div class="right">
        <div class="mobile">
          <div class="mobile_left">
            <el-image style="width: 75px; height: 75px; margin-top: 25px; margin-left: 25px;" :src="require('@/assets/pc/code.png')" fit="contain"/>
            <el-image style="width: 100px; height: 22px; margin-top: 10px; margin-left: 12.5px;" :src="require('@/assets/pc/text.png')" fit="contain"/>
          </div>
          <div class="mobile_right">
            <el-image style="width: 65px; height: 110px; margin-top: 20px; margin-left: 25px;" :src="require('@/assets/pc/mobile.png')" fit="contain"/>
          </div>
        </div>
        <div class="ip">
          <div class="ip_top">
            <el-image style="width: 15px; height: 15px;" :src="require('@/assets/pc/view_ip.png')" fit="contain"/>
            <div class="tip1">“原砍瓜网”网址</div>
          </div>
          <div class="tip2" @click="cardClick">http://kangua.lnu.edu.cn/</div>
          <div class="title">已收录2万余条真实问题</div>
        </div>
    </div>
  </div>
</template>
  <script>
  export default {
    name: "Managera",
    methods: {
      goBack () {
        this.$router.back()
      },
      cardClick () {
        window.open("http://kangua.lnu.edu.cn", '_blank').location;
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
.de{
  margin-left: -400px;
  position: fixed;
  left: 50%;
  // margin-left: 150px;
  width: 700px;
  height: calc(100% - 0px);
  display: flex;
  flex-direction: column;
  background: white;
  overflow:hidden;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .detail_back {
    overflow-x:hidden;
    height: calc(100% - 180px);
    background: white;
    // width: 101%;
    width: 820px;
  .manager_back {
    display: flex;
    margin-top: 15px;
    background: white;
    // width: 100%;
    position: relative;
    transform: translate(7px,5px);
    transform-origin: left top;
    .title1{
      display: flex;
      align-items: center;
      // position: sticky; 
      // top: 0;
      background-color: white;
      // z-index:999;
      width: 800px;
      // margin-top: -100px;
      .ti{
        color:#42B285;
        margin-left: 20px;
      }
      .button {
        display: inline-block;
        border-radius: 4px;
        background-color: #42B285;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 14px;
        padding: 2px;
        width: 70px;
        height: 25px;
        transition: all 0.5s;
        cursor: pointer;
        margin-left: 480px;
        
      }

      .button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
      }

      .button span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
      }

      .button:hover span {
        padding-right: 25px;
      }

      .button:hover span:after {
        opacity: 1;
        right: 0;
      }
    }
    .text{
      position:absolute;
      display: flex;
      margin-left: 10px;
      // margin-right: -10px;
      padding: 1px;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      border-radius: 10px;
      // bottom: 100px;
      ._pe{
        margin-left: 200px;
      }
      ._intr{
        margin: 10px 0;
        font-size: 15px;
        white-space: pre-line;
        text-align: justify;
        margin-top: 15px;
      }
      .tip1 { 
        font-weight: bolder;
        font-size: 10px;
        margin-left: 5px;
      }
      .tip2 {
        font-weight: bolder;
        font-size: 10px;
        margin-top: 3px;
        margin-left: 20px;
    }

    
  }

  }
  }
}
.element::-webkit-scrollbar { width: 10px !important }
.right{
    // margin-top: 15px;
    margin-left: 710px;
    position: fixed;
    z-index: 999;
    .mobile{
      display: flex;
      width: 225px;
      height: 165px;
      background: linear-gradient(to bottom, #42B285, white 40%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      &_left{
        display: flex;
        flex-direction: column;
      }
    }
    .ip{
      width: 225px;
      height: 100px;
      background: white;
      margin-top: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      &_top{
        display: flex;
        padding-top: 20px; 
        margin-left: 20px;
      }
      .tip1 { 
        font-weight: bolder;
        font-size: 10px;
        margin-left: 5px;
        color: #42B285;
      }
      .tip2 {
        font-weight: bolder;
        font-size: 10px;
        margin-top: 3px;
        margin-left: 20px;
        color: #42B285;
      }
      .title {
        text-align: center;
        color: white;
        width: 150px;
        margin-left: 20px;
        margin-top: 10px;
        font-size: 10px;
        padding: 2px 10px;
        border-radius: 3px;
        background: #42B285;
      }
    }
  }
</style>