<template>
  <div class="index_back">
    <div class="kangua_back">
      <van-image class="kangua" fit="contain" :src="require('@/assets/index_kangua.png')" />
    </div>
    <van-image class="logo" fit="contain" :src="require('@/assets/logo_1.png')" />
    <!-- <div class="title">真实问题研究平台</div>
    <div class="tip">与您的生产、生活、学习、科研紧密相关</div>
    <div class="tip">抛问题，取问题，学知识，做科研，招人才</div> -->
    <van-image class="image" fit="contain" :src="require('@/assets/index_view_1.png')" @click="jumpToQuestion" />
    <!-- <div class="tip1">{{proNum}}条真实问题被收录</div> -->
    <!-- <div class="tip1">网站已被浏览<span class="visit_num">{{visitNum}}</span>次</div> -->
    <van-image class="image1" fit="contain" :src="require('@/assets/index_publish_1.png')" @click="jumpToAdd" />
    <!-- <div class="tip1">网站已发布真实问题<span class="visit_num">{{proNum}}</span>个</div> -->
    <!-- <div class="tip3" @click="cardClick">原砍瓜网网址：</div>
    <div class="tip2" @click="cardClick">http://kangua.lnu.edu.cn</div> -->
    <a href='http://kangua.lnu.edu.cn' target="_blank" class="tip3">原砍瓜网网址：</a>
    <a href='http://kangua.lnu.edu.cn' target="_blank" class="tip2">http://kangua.lnu.edu.cn</a>
  </div>
</template>

<script>
import { indexNum, visitAdd } from '@/api/index'
import { getToken } from '@/utils/auth'

export default {
  name: "Index",
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .kangua_back{
    width: 100vw;
    .kangua{
      width: 100vw;
      // height: 160px;
      margin-left: 0px;
      z-index: 0;
    }
  } 
  .logo {
    width: 100px;
    height: 120px;
    // margin-top: 50px;
    // margin-bottom: 15px;
    position: absolute; 
    top: 10%;
    text-align: center;
    z-index: 1;
  }
  .title {
    font-size: 14px;
    color: #747474;
    letter-spacing: 8px;
  }
  .tip {
    font-size: 12px;
    color: #9c9c9c;
    margin-top: 5px;
  }
  .image {
    margin: 13% 30px 10px;
    z-index: 1;
    margin-bottom: 35px;
  }
  .image1 {
    margin: 5px 30px 5px;
  }
  .tip1 {
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: bolder;
  }
  .tip2 {
    font-size: 15px;
    color: var(--themeColor);
    font-weight: bolder;
  }
  .tip3 {
    margin-top: 10px;
    font-size: 15px;
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