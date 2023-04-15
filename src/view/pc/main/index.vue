<template>
  <div class="main_back">
    <div class="top">
      <div class="top_back">
        <div style="margin-left: 23%;position: absolute;">
          <el-image style="position: fixed;width: 104px; height: 33px; margin-top: 38px; margin-left: -120px;" :src="require('@/assets/pc/view_logo.png')" @click="titleClick"/>
          <el-image style="position: absolute;width: 450px; height: 33px; margin-top: 38px; margin-left: 12%;z-index: 9;" :src="require('@/assets/pc/view_search.png')"  @click="search"></el-image>>
          <el-input v-model="keyword" class="search" placeholder="输入关键字" size="mini" style=" z-index: 999;position: relative;width: 300px; height: 23px; margin-top: 22px;border: none;margin-left: 22%;"></el-input>
          <el-image style="position:fixed;width: 108px; height: 32px; margin-top: -25px;margin-left: 560px;" :src="require('@/assets/pc/view_add.png')"  @click="jumpToAdd"/>
          <el-image v-if="hlogin==false" style="position: absolute;width: 93px; height: 32px; margin-top: -25px;margin-left: 700px; " :src="require('@/assets/pc/view_login.png')" @click="jumpToLogin"/>
          <el-button class="add" @click="logout" v-if="hlogin==true">
            退出登录
          </el-button>
        </div>

      </div>
      <div class="tab_back">
        <template>
          <el-tabs :stretch="false" v-model="activeName" @tab-click="handleClick"
                   style="position: fixed; left: 50%; color: white; height: 10px; width: 500px;caret-color: transparent; margin-left: -450px;">
            <el-tab-pane label="首页" name="first"/>
            <el-tab-pane label="浏览问题" name="second"/>
            <el-tab-pane label="砍瓜网简介" name="third"/>
            <el-tab-pane label="真实问题释义" name="fourth"/>
            <el-tab-pane label="联系管理员" name="fifth"/>
          </el-tabs>
        </template>
        <div class="mine" @click="jumpToLogin" >
          <el-image style="position: fixed; left: 49%; width: 30px; height: 30px;margin-top: 5px;margin-left: 170px;" :src="require('@/assets/pc/view_mine.png')" fit="contain"/>
        </div>
        <div class="tip" style="position: fixed; left: 49%; margin-left: 205px;" @click="jumpToLogin">我的</div>
      </div>
    </div>
    <div class="tab">
      <keep-alive :include="includes">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
import { bannerSwipes } from '@/components/data'
import mixin from "@/utils/mixin.js";

export default {
  name: "Main",
  mixins: [mixin],
  data () {
    return {
      keyword: '',
      active: 0,
      showPopover: false,
      needRefresh: true,
      activeName: 'second',
      hlogin: false,
    }
  },
  created(){
    // this.startRotate();
    // setTimeout(this.endRotate,10000);
    if (getToken()){
      this.hlogin=true
    }else{
      this.hlogin=false
    }
  },
  watch: {
    $route (to, from) {
      to.meta.keepAlive && this.$store.commit('addIncludes', to.name)
      from.meta.keepAlive && this.$store.commit('addIncludes', from.name)
      if ((from.name == 'Detail' && to.name !== 'Login')
          || (from.name == 'Add' && to.name !== 'Login')
          || (from.name == 'List' && to.name !== 'Add' && to.name !== 'Detail')) {
        this.$store.commit('removeIncludes', from.name)
      }
      if (getToken()){
        this.hlogin=true
      }else{
        this.hlogin=false
      }
    }
  },
  computed: {
    includes () {
      return this.$store.getters.includes
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.index == 0) {
        this.$router.push({ path: '/' })
      } else if (tab.index == 1) {
        this.$router.push({ name: 'Question' })
      } else if (tab.index == '2' ) {
        this.$router.push({ name: 'Interview', params: bannerSwipes[0] })
        // tab.index == ''
      } else if (tab.index == '3'){
        this.$router.push({ name: 'Interviewa'})
      }else {
        this.$router.push({name: 'Managera'})
      }
    },
    search () {
      this.$EventBus.$emit('searchValue', this.keyword)
      this.$router.push({ name: 'Question' })
    },
    titleClick () {
      this.$router.push({ path: '/' })
    },
    leftClick () {
      this.showPopover = true
    },
    onSelect (action) {
      this.dot = false
      this.$router.push({ name: 'Interview', params: bannerSwipes[action.id] })
    },
    jumpToLogin () {
      if (getToken()) {
        // this.$router.push({ name: 'Mine' })
        this.$router.push({ name: 'List', query : { state: 1 } })
      } else {
        this.$router.push({ name: 'Login', params: { replace: 'Question' } })
      }
      this.activeName = ""
    },
    itemClick () {
      if (this.needRefresh) {
        this.$EventBus.$emit('questionReload')
      }
      this.needRefresh = true
    },
    jumpToAdd () {
      if (getToken()) {
        this.$router.push({ name: 'Publish' })
      } else {
        this.$dialog.alert({
          showCancelButton: true,
          cancelButtonText: '否',
          confirmButtonText: '是',
          message: '您暂未登录，请问是否登录？'
        })
            .then(() => {
              this.$router.push({ name: 'Login', params: { replace: 'Publish' } })
            })
            .catch(() => { })
      }},
    logout () {
      this.$dialog.alert({
        showCancelButton: true,
        message: '确定退出登录？',
      })
          .then(() => {
            removeToken()
            this.$router.replace({ name: 'Question' })
            this.hlogin=false
          })
          .catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
.main_back {
  height: 104%;
  // height: 150px;
  display: flex;
  position: relative;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  .top{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    // z-index: 9;

    .top_back{
      display:flex;
      flex-direction: row;
      flex: 1;
      overflow: hidden;
      // width: 50%;
      height: 80px;
      min-width:500px;
      // position: absolute;
      // background: white;
    }
    .tab_back{
      display: flex;
      // margin-top: 24px;
      // transform: translate(0, 60%);
      // transform-origin: left top;
      height: 40px;
      background: #42b285;
      .tip{
        color: white;
        margin-left: 5px;
        margin-top: 10px;
      }
    }
  }
  .add{
    position:absolute;
    width: 93px;
    height:33px;
    margin-top: -25px;
    margin-left: 700px;
    color:  #42B285;
    // display: auto;
    padding: 1px 1px 1px 1px;
    background-color: white;
    border:2px solid #42B285;
    border-radius:8px;
  }
  .tab {
    flex: 1;
    margin-top: 120px;
    // margin-left: 200px;
    background: #f2f2f2;
    .right{
      margin-top: 15px;
      margin-left: 765px;
      position: fixed;
      z-index: 999;
      .mobile{
        display: flex;
        width: 225px;
        height: 165px;
        background: linear-gradient(to bottom, #42B285, white 40%);
        &_left{
          display: flex;
          flex-direction: column;
        }
      }
      .ip{
        width: 225px;
        height: 100px;
        background: white;
        margin-top: 15px;
        &_top{
          display: flex;
          padding-top: 20px;
          margin-left: 20px;
        }
        .tip1 {
          font-size: 10px;
          margin-left: 5px;
          color: #42B285;
        }
        .tip2 {
          font-size: 10px;
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
  }
}
:deep(.van-nav-bar__title) {
  font-size: 20px;
  color: var(--themeColor);
}
:deep(.van-nav-bar__right .van-nav-bar__text) {
  color: #7f7f7f;
}
:deep(.van-nav-bar__left) {
  margin-top: 5px;
}
:deep(.van-nav-bar__arrow) {
  color: var(--themeColor) !important;
  font-size: 20px;
}
::v-deep .el-tabs__active-bar {
  background-color: white; // 跟随 element  系统颜色  自己修改
  height: 4px;
  border-radius: 2px;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__item {
  color: white;
}
.search /deep/ .el-input__inner {
  border: none;
}

</style>