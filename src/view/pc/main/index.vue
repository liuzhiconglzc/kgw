<template>
  <div class="main_back">
    <div class="top">
      <div class="top_back">
        <el-image style="width: 104px; height: 33px; margin-top: 30px; margin-left: 150px;" :src="require('@/assets/pc/view_logo.png')" />
        <el-input v-model="keyword" class="search" placeholder="输入关键字" size="mini" style="position:absolute; width: 250px; height: 23px; margin-top: 33px; margin-left: 68px;z-index: 1;border: none;">
        </el-input>
        <el-image style="position:absolute; width: 450px; height: 33px; margin-top: 30px; margin-left: 30px;" :src="require('@/assets/pc/view_search.png')"  @click="search"/>
        <el-image style="position:absolute; width: 108px; height: 32px; margin-top: 30px; margin-left: 510px;" :src="require('@/assets/pc/view_add.png')" />
        <el-image style="position:absolute; width: 93px; height: 33px; margin-top: 30px; margin-left: 700px;" :src="require('@/assets/pc/view_login.png')" />
      </div>
      <div class="tab_back">
        <template>
          <el-tabs :stretch="false" 
           style="color: white; height: 30px; width: 500px;caret-color: transparent;margin-left: 150px;">
            <el-tab-pane label="首页" name="first"/>
            <el-tab-pane label="浏览问题" name="second"/>
            <el-tab-pane label="砍瓜网简介" name="third"/>
            <el-tab-pane label="真实问题释义" name="fourth"/>
            <el-tab-pane label="联系管理员" name="fifth"/>
          </el-tabs>
        </template>
        <div class="mine">
          <el-image style="width: 30px; height: 30px;margin-top: 5px;margin-left: 120px;" :src="require('@/assets/pc/view_mine.png')" fit="contain"/>      
        </div>
        <div class="tip">我的</div>
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
      dot: true,
      actions: [{ id: 0, text: '“砍瓜网”简介' }, { id: 1, text: '真实问题' }],
      shrinkPacket: undefined,
      shrinkPackett: undefined,
      needRefresh: true
    }
  },
  created(){
    this.startRotate();
    // setTimeout(this.endRotate,10000);
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
    }
  },
  computed: {
    includes () {
      return this.$store.getters.includes
    }
  },
  methods: {
    search () {
      this.$EventBus.$emit('searchValue', this.keyword)
    },
    startRotate() {
      // clearInterval(this.timer);
      this.shrinkPackett = false
      this.timer = setInterval(()=>{
        this.shrinkPacket = !this.shrinkPacket
      },150);
      setTimeout(this.endRotate,5000);
    },
    endRotate() {
      clearInterval(this.timer);
      this.timer = setInterval(()=>{
        this.shrinkPacket = !this.shrinkPacket
      },150);
      clearInterval(this.timer);
      this.shrinkPackett = true
      setTimeout(this.startRotate,5000);
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
        this.$router.push({ name: 'Mine' })
      } else {
        this.$router.push({ name: 'Login', params: { replace: 'Question' } })
      }
    },
    itemClick () {
      if (this.needRefresh) {
        this.$EventBus.$emit('questionReload')
      }
      this.needRefresh = true
    },
    onTabChange (index) {
      if (index == 1) {
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
      } else {
        this.needRefresh = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main_back {
  height: 100%;
  display: flex;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  .main_logo{
    margin-top: 5px;
  }
  .more{
    width: 21px;
    height: 18px;
    // margin-top: 7px;
    // transform: scale(1.8);
    // transform: scale(-1.8);
    // transition: all 5s;
    
    .r1{
      transform:rotate(-5deg);
    }
    .r2{
      transform:rotate(5deg);
    }
    .r3{
      transform:rotate(0deg);
    }
  }
  .top{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .top_back{
      // display: flex;
      overflow: hidden;
      width: 100%;
      height: 100px;
      background: white;
    }
    .tab_back{
      display: flex;
      // margin-top: 130px;
      height: 40px;
      background: #42b285;
      .tip{
        color: white;
        margin-left: 5px;
        margin-top: 10px;
      }
    }
  }
  .tab {
    flex: 1;
    margin-top: 140px;
    // height: 100%;
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