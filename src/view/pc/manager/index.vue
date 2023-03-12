<template>
  <div class="de">
    <div class="detail_back">
      <el-menu :default-active="1" text-color="#42B285" active-text-color="#42B285" mode="horizontal" @select="handleSelect" style="width: 700px;">
          <el-menu-item index="1" style="height: 50px;margin-top: -10px;font-weight:bold;font-size:16px;">联系管理员</el-menu-item>
      </el-menu>
      <div class="text">
        <div style="flex-direction: column;margin-top: 15px;display: flex;position: relative;transform: translate(0px,0px);transform-origin: left top;">
          <div style="margin-top: 15px;font-size: 15px;white-space: pre-line;margin-left: 30px;">管理员电话：024-62602028</div>
          <div style="margin-top: 15px;margin: 10px 0;font-size: 15px;white-space: pre-line;margin-left: 30px;">管理员邮箱：123456789@163.com</div>
        </div>
        <div style="color: #747474;font-weight: bolder;font-size: 10px;margin-left: 15px;margin-top: 5px;display: flex;position: relative;transform: translate(15px,70px);transform-origin: left top;">问题咨询、问题反馈、学术合作,请通过上述方式联系砍瓜网</div>
        <div style="color: #747474;font-weight: bolder;font-size: 10px;margin-top: 5px;margin-left: 30px;display: flex;position: relative;transform: translate(0px,70px);transform-origin: left top;">(请工作日期间进行联系)</div>
      </div>
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
.de{
  // margin-left: 200px;
  // width: 973px;
  height: calc(100% - 0px);
  display: flex;
  // transform: translate(-7px,-391px);
  // transform-origin: left top;
  flex-direction: column;
  background: white;
  overflow:hidden;
  // margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .detail_back {
    overflow-x:hidden;
    height: calc(100% - 0px);
    background: white;
    width: 700px;
  .manager_back {
    display: flex;
    margin-top: 15px;
    background: white;
    width: 100%;
    position: relative;
    // transform: translate(7px,5px);
    // transform-origin: left top;
    .title1{
      display: flex;
      align-items: center;
      // position: sticky; 
      // top: 0;
      background-color: white;
      // z-index:999;
      width: 500px;
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
</style>