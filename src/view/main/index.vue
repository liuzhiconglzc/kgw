<template>
  <div class="main_back">
    <van-nav-bar :border="false" fixed @click-left="leftClick" @click-right="jumpToLogin">
      <template #title>
        <div class="main_logo" @click="titleClick">
          <template>
            <van-image width="84px" height="28px" :src="require('@/assets/main_logo.png')" />
          </template>
        </div>
      </template>
      <template #left>
        <van-popover v-model="showPopover" placement="bottom-start" overlay :actions="actions" @select="onSelect">        
          <template #reference>
            <van-badge :dot="dot">
              <div class="more">
                <van-image class="rotate" :class="[{'r1': shrinkPacket}, {'r2': !shrinkPacket}, {'r3': shrinkPackett}]" width="18px" height="15px" :src="require('@/assets/more.png')" />
              </div>
            </van-badge>
          </template>          
        </van-popover>
      </template>
      <template #right>
        <van-image width="28px" height="28px" :src="require('@/assets/header.png')" />
      </template>
    </van-nav-bar>
    <div class="tab">
      <keep-alive :include="includes">
        <router-view></router-view>
      </keep-alive>
      <!-- <van-tabbar route v-model="active" active-color="#07c160" inactive-color="#7b7b7b" @change="onTabChange"
        v-if="$route.meta.isShowTabBar">
        <van-tabbar-item class="tab_btn" replace to="/question" @click="itemClick">
          <template #icon="props">
            <img class="tab_btn_img" :src="require(`@/assets/tab_real${props.active ? '_1' : ''}.png`)" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item class="tab_add">
          <template>
            <img height="40" width="40" :src="require('@/assets/tab_add.png')" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item class="tab_btn" replace to="/web">
          <template #icon="props">
            <img class="tab_btn_img" :src="require(`@/assets/tab_reality${props.active ? '_1' : ''}.png`)" />
          </template>
        </van-tabbar-item>
      </van-tabbar> -->
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { bannerSwipes } from '@/components/data'

export default {
  name: "Main",
  data () {
    return {
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
      if (action.id === 1){
        this.$router.push({ name: 'Detail', params: bannerSwipes[action.id] })
      }else{
        this.$router.push({ name: 'Interview', params: bannerSwipes[action.id] })
      }
    },
    jumpToLogin () {
      if (getToken()) {
        this.$router.push({ name: 'Mine' })
      } else {
        this.$router.push({ name: 'Login', params: { replace: 'Mine' } })
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
  .main_logo{
    margin-top: 5px;
  }
  .more{
    width: 18px;
    height: 15px;
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
  .tab {
    flex: 1;
    margin-top: 46px;
    // &_btn {
    //   display: flex;
    //   flex-direction: row;
    //   margin-top: 5px;
    //   flex: 10;
    //   &_img {
    //     height: 30px;
    //     width: 110px;
    //   }
    // }
    // &_add {
    //   width: 100px;
    //   display: flex;
    //   flex-direction: row;
    //   margin-top: 2px;
    //   flex: 1;
    // }
  }
}
// :deep(.van-tabbar) {
//   height: 53px;
//   box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.2);
// }
:deep(.van-nav-bar__title) {
  font-size: 20px;
  color: var(--themeColor);
}
:deep(.van-nav-bar__right .van-nav-bar__text) {
  color: #7f7f7f;
}
:deep(.van-nav-bar__arrow) {
  color: var(--themeColor) !important;
  font-size: 20px;
}
</style>