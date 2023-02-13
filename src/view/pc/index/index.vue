<template>
  <div style="width:100%;height:100%;background: #f9f9f9;position: relative">
    <div class="index_back" ref="index">    
        <div class="kangua_back">
          <van-image class="kangua" :src="require('@/assets/pc/index_kangua.png')" />
        </div> 
        <div class="logo_back">
          <!-- <van-image class="logo" :src="require('@/assets/pc/logo_2.png')" /> -->
          <el-image class="logo" style="width: 330px; height: 105px" :src="require('@/assets/pc/logo_2.png')" fit="contain"></el-image>
        </div>
        <div class="card_back">
          <el-image class="image_1" style="width: 520px; height: 246px" :src="require('@/assets/pc/index_view_2.png')" fit="contain" @click="jumpToQuestion"></el-image>
          <el-image class="image_2" style="width: 520px; height: 246px" :src="require('@/assets/pc/index_publish_2.png')" fit="contain" @click="jumpToAdd"></el-image>
        </div>
        <div class="tip2" @click="cardClick">原砍瓜网网址：http://kangua.lnu.edu.cn</div>
        <div class="tip1">砍瓜网：问题集库+知识分享社群。用问题引发思考，让思考衍生问题，用研究推动创新。</div>
        <div class="tip">©辽宁大学真实问题研究中心</div>
    </div>
  </div>
</template>

<script>
import { indexNum, visitAdd } from '@/api/index'
import { getToken } from '@/utils/auth'
import mixin from "@/utils/mixin.js";

export default {
  name: "Index",
  mixins: [mixin],
  data () {
    return {      
      proNum: 0,
      userNum: 0,
      visitNum: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    cardClick () {
      location.href = "http://kangua.lnu.edu.cn"
    },
    jumpToQuestion () {
      this.$router.push({ name: 'Question' })   
    },
    jumpToAdd () {
      //发布问题所调用接口
      visitAdd()
      if (getToken()) {
        this.$router.push({ name: 'Add', query: { state: 0 } })
      } else {
        this.$dialog.alert({
          showCancelButton: true,
          cancelButtonText: '否',
          confirmButtonText: '是',
          message: '您暂未登录，请问是否登录？'
        })
          .then(() => {
            this.$router.push({ name: 'Login', params: { replace: 'Add' } })
          })
          .catch(() => { })
      }
    },
    getData () {
      indexNum().then(res => {
        this.proNum = res.data.proNum
        this.userNum = res.data.userNum
        this.visitNum = res.data.visitNum
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index_back {
    width: 1500px;
    height: 1015px;
    background: white;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    .kangua_back{
      .kangua{
        position: absolute; 
        width: 600px;
        height: 270px;
        margin-left: 0px;
        z-index: 0;
      } 
    }
    .logo_back{
      display: flex;
      flex-direction: row;
      justify-content: center;  
      z-index: 1;
      .logo {
        margin-top: 16%;
        margin-left: 30%;
        margin-right: 30%;
      }
    }
    .card_back{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .image_1 {
        margin-top: 5%;
        margin-left: 10%;
        margin-right: 5%;
      }
      .image_2 {
        margin-top: 5%;
        margin-left: 5%;
        margin-right: 10%;
      }
    }
    .title {
      font-size: 14px;
      color: #747474;
      letter-spacing: 8px;
    }
    .tip {
      text-align: center;
      font-size: 20px;
      color: #9c9c9c;
      margin-top: 10px;
    }
    .tip1 {
      text-align: center;
      font-size: 22px;
      color: #808080;
      font-weight: bolder;
      margin-top: 5px;
    }
    .tip2 {
      margin-top: 10%;
      text-align: center;
      font-size: 22px;
      color: var(--themeColor);
      font-weight: bolder;
    }
    .visit_num{
      color: red;
      font-size: 15px;
      margin-bottom: 15px;
      font-weight: bolder;
    }
}
</style>