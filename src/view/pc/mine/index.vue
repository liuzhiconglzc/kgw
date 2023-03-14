<template>
  <div style="width:100%;height:100%;">
    <div class="mine_back">
      <div class="person">
        <div class="pic">
          <template>
            <el-image class="header" :src="data.askUserAvatar" fit="fill" round/>
          </template>
        </div>
        <template>
          <div style="display: inline;">
            <div class="user"> 
              <h4>{{ data.askUserName }}</h4>
              <div style="margin-left: 50px;margin-top: -35px;font-size: 10px;color:#808080;">
                {{ data.askUserPhone }}
              </div>
            </div>  
          </div> 
        </template>
        <template>
          <div class="grid" :column-num="3" :border="false">
            <div style="display: flex;margin-left: 15px;margin-right: 15px;">
              <span class="num_2">获赞数</span>
              <span class="num_1">{{data.likeNum || 0}}</span>
            </div>
            <span> | </span>
            <div style="display: flex;margin-left: 15px;margin-right: 15px;">
              <span class="num_2">被回复数</span>
              <span class="num_1">{{data.replyNum || 0}}</span>
            </div>
            <span>|</span>
            <div style="display: flex;margin-left: 15px;margin-right: 15px;">
              <span class="num_2">被浏览数</span>
              <span class="num_1">{{data.viewedNum || 0}}</span>
            </div>
            <span>|</span>
            <div style="display: flex;margin-left: 15px;margin-right: 15px;">
              <span class="num_2">被收藏数</span>
              <span class="num_1">{{data.collectNum || 0}}</span>
            </div>
          </div>
        </template>
        <template>
          <!-- <div class="add">
            <el-image class="header2" :src="require('@/assets/pc/view_add.png')" fit="fill" round @click="add">
            </el-image>
          </div>   -->
          <div>
            <el-button class="add" @click="logout">
              退出登录
            </el-button>
          </div>
        </template>
      </div>
      <div style="height: calc(100% - 0px);display: inline;">
        <el-row class="menu">
          <el-col :span="4">
            <el-menu active-text-color=#42B285 router>
              <el-menu-item index="1" @click="Click1" class="button">
                <el-image :src="require('@/assets/mine_1.png')" class="header1"></el-image>
                <span class="te">已发布问题</span>
                <van-icon name="arrow"></van-icon>
              </el-menu-item>
              <el-menu-item index="2" @click="Click2" class="button">
                <el-image :src="require('@/assets/mine_2.png')" class="header1"></el-image>
                <span class="te">发布中问题</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
              <el-menu-item index="3" @click="Click3" class="button">
                <el-image :src="require('@/assets/mine_3.png')" class="header1"></el-image>
                <span class="te">待审核问题</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
              <el-menu-item index="4" @click="Click4" class="button">
                <el-image :src="require('@/assets/mine_4.png')" class="header1"></el-image>
                <span class="te">审核未通过问题</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
              <el-menu-item index="5" @click="Click5" class="button">
                <el-image :src="require('@/assets/mine_5.png')" class="header1"></el-image>
                <span class="te">已收藏问题</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
              <el-menu-item index="6" @click="Click6" class="button">
                <el-image :src="require('@/assets/more.png')" class="header1"></el-image>
                <span class="te">个人设置</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
              <el-menu-item index="7" @click="Click7" class="button">
                <el-image :src="require('@/assets/mine_6.png')" class="header1"></el-image>
                <span class="te">联系管理员</span>
                <van-icon name="arrow" ></van-icon>
              </el-menu-item>
            </el-menu>
          </el-col>
          <div class="back-right">
            <keep-alive exclude="searchResult">
              <router-view :key="$route.fullPath"></router-view>
            </keep-alive>
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
        </el-row>           
      </div>
    </div> 
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
import { mineNum } from '@/api/mine'

export default {
  name: "Mine",
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getData()
  },
  watch: {
    $route (to, from) {
      to.meta.keepAlive && this.$store.commit('addIncludes', to.name)
      from.meta.keepAlive && this.$store.commit('addIncludes', from.name)
      // if ((from.name == 'Detail' && to.name !== 'Login')
      //   || (from.name == 'Add' && to.name !== 'Login')
      //   || (from.name == 'List' && to.name !== 'Add' && to.name !== 'Detail')) {
      //   this.$store.commit('removeIncludes', from.name)
      // }
    }
  },
  methods: {
        cardClick () {
    window.open("http://kangua.lnu.edu.cn", '_blank').location;
  },
    goBack () {
      this.$router.back()
    },
    Click1(){
      this.$router.push({ name: 'List', query : { state: 1 } }) 
    },
    Click2(){
      this.$router.push({ name: 'List', query: { state: 0 } }) 
    },
    Click3(){
      this.$router.push({ name: 'List', query: { state: 3 } }) 
    },
    Click4(){
      this.$router.push({ name: 'List', query: { state: 2 } }) 
    },
    Click5(){
      this.$router.push({ name: 'List', query: { state: 4 } }) 
    },
    Click6(){
      this.$router.push({ name: 'Personal' }) 
    },
    Click7(){
      this.$router.push({ name: 'Manager' }) 
    },
    getData () {
      mineNum().then(res => {
        this.data = res.data
        if (this.data.askUserAvatar.length == 0) {
          this.data.askUserAvatar = require(`@/assets/header.png`)
        }
      })
    },
    add(){
      this.$router.push({ name: 'Add', query: { state: 0 } })
    },
    logout () {
      this.$dialog.alert({
        showCancelButton: true,
        message: '确定退出登录？',
      })
        .then(() => {
          removeToken()
          this.$router.replace({ name: 'Question' })
        })
        .catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
.mine_back {
  margin-top: 10px;
  // font-weight: 700px;
  width: 102%;
  height: 102%;
  overflow: scroll;
  // background: #f9f9f9;
}
.person{
  border-radius:  10px 10px 0px 0px;
  display: flex;
  height: 90px;
  width: 940px;
  position: relative;
  // margin-top: 5px;
  // margin-left: 70px;
  left: 10%;
  // margin-right: 150px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.add{
    // width: 235px;
    // height:150px;
    // margin-top: 25px;
    color: white;
    display: auto;
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 300px;
    background-color: #42B285;
  }
.pic{
  margin-left: 10px;
  width: 100px;
  height: 100px;
}
.user{
  // display: flex;
  height: 100px;
  // width: 700px;
  margin-left: 40px;
  margin-top: -10px;
}
.ph{
  display: flex;
  height: 50px;
  // width: 700px;
  margin-left: -20px;
  // margin-top: -400px;
  }
.header {
  margin-left: 10px;
  margin-top: 10px;
  width: 60px;
  height: 60px;
}
.header1 {
  // margin-left: 5px;
  margin-top: 1px;
  margin-left: -11px;
  width: 20px;
  height: 20px;
}
.header2 {
  // display: flex;
  // margin-left: 300%;
  // margin-right: 300%;
  margin-top: 15px;
  width: 120px;
  height: 35px;
  // margin-right: 10px;
  margin-left: 100px;
}
.grid {
  // margin-bottom: 20px;
  display: flex;
  margin-top: 50px;
  margin-left: -130px;
}
.menu{
  margin-top: 15px;
  margin-left: 10%;
  position: relative;
  height: 100%;
  // width: 80%;
  // width: 90px;
  width: 84%;
  background-color: white;
  // overflow: auto;
  // height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.te{
  // margin-top: 5px;
  margin-left: 10px;
  text-align: center;
  }
.manage {
  margin-top: 12%;
  // width: 300px;
  width: 20%;
}
.num_1 {
  margin-left: 5px;
  font-size: 16px;
  font-weight: 550;
}
.num_2 {
  font-size: 14px;
  font-weight: 550;
  width: 58px;
  color: var(--themeColor);
}

.button {
        // display: inline-block;
        display: block;
        // border-radius: 4px;
        background-color: white;;
        // border: none;
        // color: #FFFFFF;
        // text-align: center;
        font-size: 10px;
        width: 100%;
        padding: 2px;
        // width: 125px;
        // height: 25px;
        transition: all 0.3s;
        cursor: pointer;
        // margin-top: 10px;
        // margin-left: -10px;
        
      }

      .button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.3s;
      }

      .button span:after {
        // content: '';
        position: absolute;
        // margin-left: 30px;
        // margin-right: 30px;
        opacity: 0;
        top: 0;
        right: 10px;
        transition: 0.3s;
      }

      .button:hover span {
        // margin-right: 30px;
        // padding-right: 5px;
        color: #66c6a1;
        font-size: 14px;
      }

      .button:hover span:after {
        font-size: 10px;
        opacity: 1;
        right: 0;
      }
.back-right{
  // margin-left: 15%;
  width: 781px;
  height: calc(100% - -22px);
  display: flex;
  transform: translate(-0px,-0px);
  transform-origin: left top;
  flex-direction: column;
  background: white;
  overflow:hidden;
  // margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.right{
    margin-left: 540px;
    position: fixed;
    z-index: 999;
    .mobile{
      display: flex;
      width: 225px;
      height: 165px;
      margin-top: 15px;
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
      margin-top: 5px;
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
:deep(.van-cell__title) {
  font-size: 16px;
  font-weight: 500;
}
:deep(.van-cell__label) {
  font-size: 14px;
  font-weight: 500;
}
</style>