<template>
  <div class="de">
    <div class="detail_back" v-if="item">
      <el-main>
        <div class="detail" v-if="item.proTitle">
        <div class="title1">
          <div class="ti">问题详情</div>
          <button class="button" style="vertical-align:middle" @click="goBack"><span>返回</span></button>
        </div>
        <div class="content">
          <div class="header">
            <!-- <el-image class="header_img" :src="item.askUserAvatar"></el-image> -->
            <div class="header_img">
              <template>
                <el-image width="28px" height="28px"  :src="require('@/assets/header.png')" />
              </template>
            </div>
            <div class="header_name">{{item.askUserName}}</div>
          </div>
          <div class="title">{{item.proTitle}}</div>
          <div class="date">
            <div class="date_back">{{item.createTime && item.createTime.substr(0, 10)}}</div>
          </div>
          <div class="line" v-if="item.proId == 0"></div>
          <div class="pro_title" v-if="item.proId != 0">社会现实场景</div>
          <div class="desc" :class="{'desc_1': item.proId != 0}">{{item.proRealityScene}}</div>
          <div class="pro_title" v-if="item.proId != 0">真实问题</div>
          <div class="desc" :class="{'desc_1': item.proId != 0}">{{item.proSpecific}}</div>
          <div class="files" v-if="item.imageList && item.imageList.length > 0">
            <div class="demo-image__preview">
              <el-image class="files_img" v-for="(image, index) in item.imageList"  :key="index" fit="fill" initial-index="index" :src="image" :preview-src-list="srcList">
              </el-image>
              <!-- <van-image class="files_img" v-for="(image, index) in item.imageList" :key="index" fit="cover" :src="image"
              @click="imageClick(index)">
              </van-image> -->
            </div>
          </div>
        </div>
        <div class="re">
          <el-button type="primary" class="reply1" @click="reply1">回复此问题<i class="el-icon-chat-dot-round el-icon--right"></i></el-button>
          <div class="num" v-if="item.proId != 0">
              <div class="num_item" @click.stop="numClick(0)">
                <el-image class="num_item_img" fit="contain"
                  :src="require(`@/assets/list_like${item.isLike == '1' ? '_1' : ''}.png`)"></el-image>
                  <div class="num_item_text">好问题</div>
                  <div class="num_item_text1">{{item.likeNum}}</div>
              </div>
              <div class="num_item" @click.stop="numClick(1)">
                <el-image class="num_item_img" fit="contain"
                  :src="require(`@/assets/list_collect${item.isCollect == '1' ? '_1' : ''}.png`)"></el-image>
                  <div class="num_item_text">收藏</div>
                  <div class="num_item_text1">{{item.collectNum}}</div>
              </div>
            </div>
        </div>
        <div class="retext">
          <div v-if="restate == 1" style="display: flex;">
            <div class="retext_image">
              <el-image width="55px" height="55px"  :src="require('@/assets/header.png')" />
            </div>
            <div class="retext_t">
              <el-input
                ref="reply"
                type="textarea"
                autosize
                clearable
                :rows="2"
                placeholder="请输入回复内容"
                v-model="textarea"
                maxlength="100"
                show-word-limit
                >
              </el-input>
              <el-button type="primary" class="retext_t_b" @click="replyClick">回复</el-button>
            </div>
          </div>
        </div>
        <div class="reply" v-if="replyList.length > 0 && item.proId != 0">
          <div class="reply_header">{{`共${replyList.length}回复`}}</div>
          <div class="reply_cell" v-for="item in replyList" :key="item.id">
            <div class="reply_cell_header">
              <template>
                <el-image :src="require('@/assets/header_detail.png')" />
              </template>
            </div>
            <div class="reply_cell_right">
              <div class="reply_cell_right_top">
                <div class="reply_cell_right_top_name">{{item.userName}}</div>
              </div>
              <div class="reply_cell_content">{{item.answer}} </div>
              <div class="reply_cell_right_top_date">{{item.createTime}}</div>
            </div>
          </div>
        </div>
      </div>
      </el-main>
    </div>
    <!-- <div class="tab_top">
      v-if="btnFlag"  @click="top"
      <a id=”回到顶部” href=”#”><van-image height="70" width="35" :src="require('@/assets/pc/view_top.png')" /></a>
    </div> -->
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
import { getToken } from '@/utils/auth'
import { ImagePreview } from 'vant'
import { questionDetail, questionReply, likeAdd, likeCancel, collectAdd, collectCancel } from '@/api/question'
import forbiddenArray from "@/utils/badword";
import { mkdirSync } from 'fs';

export default {
  name: "Detail",
  data () {
    return {
      item: undefined,
      reply: '',
      replyList: [],
      fromWechat: false,
      isLike: 0,
      restate: false,
      srcList: [],
      textarea: '',
      }
    
  },
  created () {
    this.isLike = this.$route.query.isLike
    const item = this.$route.params
    if (item.proId == 0) {
      this.item = item
    } else {
      this.getDetail(item.proId)
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.fromWechat = vm.fromWechat || from.name == null
    })
    next()
  },
  methods: {
    cardClick () {
    window.open("http://kangua.lnu.edu.cn", '_blank').location;
  },
    goBack () {
      if (this.fromWechat) {
        this.$router.replace({ name: 'Question' })
      } else {
        this.$router.back()
      }
    },
    getDetail (proId) {
      questionDetail(proId).then(res => {
        this.item = res.data
        this.item.isLike = this.isLike
        this.replyList = res.data.answerList
        this.srcList = this.item.imageList
        this.questionUpdate()
      })
    },
    replyClick () {
      if (!getToken()) {
        this.noLoginDialog()
      } else if (this.textarea.length == 0) {
        // this.$notify('请输入回复内容')
        this.$alert('请输入回复内容', '提交错误', {
          confirmButtonText: '确定',
        });
        // this.$notify({
        //   title: '提示',
        //   message: '请输入回复内容',
        //   duration: 0,
        // });
      } else {
        const isBad = forbiddenArray.some(item => {
          if (this.reply.includes(item)) {
            this.$notify('回复内容中不能含有敏感词')
            return true
          }
          return false
        })
        if (!isBad) {
          this.questionReply()
        }
      }
    },
    noLoginDialog () {
      this.$dialog.alert({
        showCancelButton: true,
        cancelButtonText: '否',
        confirmButtonText: '是',
        message: '您暂未登录，请问是否登录？'
      })
        .then(() => {
          this.gotoLogin()
        })
        .catch(() => { })
    },
    questionReply () {
      const params = {}
      params.proId = this.item.proId
      params.answer = this.textarea
      questionReply(params).then(res => {
        this.$toast.success('回复成功')
        this.textarea = ''
        this.getDetail(this.item.proId)
      })
    },
    gotoLogin () {
      this.$router.push({ name: 'Login' })
    },
    // numClick (type) {
    //   if (getToken()) {
    //     if (type == 0) {
    //       this.likeHandle()
    //     } else if(type == 1) {
    //       this.collectHandle()
    //     } else {
    //       this.replyHandle()
    //     }
    //   } else {
    //     this.$dialog.alert({
    //       showCancelButton: true,
    //       cancelButtonText: '否',
    //       confirmButtonText: '是',
    //       message: '您暂未登录，请问是否登录？'
    //     })
    //       .then(() => {
    //         this.gotoLogin()
    //       })
    //       .catch(() => { })
    //   }
    // },
    reClick(){
      if(this.restate =false){
        this.reply1()
      }else{
        this.reply0()
      }
    },
    reply1(){
      this.restate = true
    },
    reply0(){
      this.restate = false
    },
    numClick (type) {

        if (type == 0) {
          this.likeHandle()
        } else if(type == 1) {
          this.collectHandle()
        } else {
          this.replyHandle()
        }
      
    },
    likeHandle () {
      if (getToken()) {
        if (this.item.isLike == 1) {
          this.likeCancel()
        } else {
          this.likeAdd()
        }
      } else {
        this.likeAddUp()
      }
    },
    collectHandle () {
      if (this.item.isCollect == 1) {
        this.collectCancel()
      } else {
        this.collectAdd()
      }
    },
    replyHandle () {
      this.$refs.reply.focus()
    },
    likeAdd () {
      likeAdd(this.item.proId.toString()).then(() => {
        this.item.isLike = '1'
        this.item.likeNum++
        this.questionUpdate()
      })
    },
    likeAddUp () {
      
        this.item.isLike = '1'
        this.item.likeNum++
        this.questionUpdate()
      
    },
    likeCancel () {
      likeCancel(this.item.proId.toString()).then(() => {
        this.item.isLike = '0'
        this.item.likeNum--
        this.questionUpdate()
      })
    },
    collectAdd () {
      collectAdd(this.item.proId).then(() => {
        this.item.isCollect = '1'
        this.item.collectNum++
        this.questionUpdate()
      })
    },
    collectCancel () {
      collectCancel(this.item.proId).then(() => {
        this.item.isCollect = '0'
        this.item.collectNum--
        this.questionUpdate()
      })
    },
    questionUpdate () {
      this.$EventBus.$emit('questionUpdate', { isLike: this.item.isLike, isCollect: this.item.isCollect, likeNum: this.item.likeNum, collectNum: this.item.collectNum, viewNum: this.item.viewNum, answerNum: this.item.answerNum })
    },
    top () {
    const elements = document.getElementsByClassName('van-pull-refresh')
    Array.prototype.forEach.call(elements, function (item) {
      if (item.scrollTop > 0) {
        // item.scrollTop = 0
        let timer = setInterval(() => {
          let ispeed = Math.floor(-item.scrollTop / 5)
          item.scrollTop = item.scrollTop + ispeed
          if (item.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      }
    });
  },
  }
}
</script>

<style lang="less" scoped>
.de{
  margin-left: -400px;
  position: fixed;
  left: 50%;
  width: 700px;
  height: calc(100% - 100px);
  // overflow-y: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .title1{
        display: flex;
        align-items: center;
        // position: sticky; 
        // top: 0;
        background-color: white;
        // z-index:999;
        width: 700px;
        // margin-top: -100px;
      }
  .detail_back {
    overflow-x:hidden;
    display: flex;
    // height: calc(100% - 0px);
    // flex-direction: column;
    background: white;
    margin-top: 15px;
    width: 100%;
    // overflow: scroll;
    position: relative;
    transform: translate(0px,-15.5px);
    transform-origin: left top;
    .detail {
      // width: 700px;
      // height: auto;
      position: relative;

      .ti{
        // border-radius: 16px;
        color:#42B285;
        margin-left: 20px;
        // overflow: hidden;
        // display: flex;
        // align-items: center;
        // flex: 1;
        // position: relative;
      }
      .back{
        background-color:#42B285;
        margin-left: 470px;
        color: white;
      }   
      .button {
        display: inline-block;
        border-radius: 4px;
        background-color: #42B285;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 16px;
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
      .content {
        // width: 700px;
        border-radius: 10px;
        background: white;
        margin: 10px;
        padding: 10px;
        // overflow-x:hidden;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        .header {
          display: flex;
          align-items: center;
          &_img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          &_name {
            color: #adadad;
            font-size: 14px;
          }
        }
        .title {
          margin: 10px 0;
          line-height: 25px;
          text-align: left;
          font-size: 16px;
          font-weight: 500;
        }
        .date {
          margin: 10px 0;
          display: flex;
          justify-content: space-between;
          &_back {
            color: #adadad;
            font-size: 12px;
          }

        }
        .line {
          background: #dedede;
          height: 1px;
        }
        .pro_title {
          color: white;
          font-size: 13px;
          width: 95%;
          // margin-left: 10px;
          margin-top: 10px;
          padding: 2px 10px;
          // border-radius: 3px;
          background: linear-gradient(to right, #66c6a1, white 90%);
        }
        .desc {       
          margin: 10px 0;
          color: #7f7f7f;
          font-size: 15px;
          white-space: pre-line;
          text-align: justify;
        }
        .desc_1{
          text-indent: 31px;
        }
        .files {
          &_img {
            width: 32%;
            height: 120px;
            margin-right: 2%;
            border-radius: 5px;
            overflow: hidden;
          }
          &_img:last-child {
            margin-right: 0;
          }
        }
      }
      .re{
        display: flex;
        
      }
      .retext{
        display: flex;
        margin-left: 30px;
        margin-top: 15px;
        &_image{
          height: 25px;
          width: 25px;
        }
        &_t{
          margin-left: 15px;
          width: 580px;
          border-style:solid;
          border-width:2px;
          border-color:#42B285;
          border-radius: 3px;
          &_b{
            height: 25px;
            width: 60px;
            border-radius: 3px;
            font-size: 12px;
            text-align: center;
            padding:  0;
            margin-top:3px;
            margin-bottom:3px;
            margin-left: 518px;
            background: #42B285;
          }
        }
      }
      .reply1{
        height: 25px;
        width: 100px;
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        padding: 0%;
        margin-left: 20px;
        background: #42B285;
        // background:#66c6a1;
      }
      .num {
            display: flex;
            align-items: center;
            &_item {
              display: flex;
              align-items: center;
              &_img {
                width: 15px;
                height: 15px;
                margin: 0 3px 0 8px;
              }
              &_text {
                color: var(--themeColor);
                font-size: 14px;
              }
              &_text1 {
                color: var(--themeColor);
                margin-left: 5px;
                margin-top: 3px;
                font-size: 14px;
              }
            }
          }
      .reply {
        border-radius: 10px;
        background: white;
        margin: 10px;
        padding: 10px;
        &_cell {
          display: flex;
          padding-top: 10px;
          &_header {
            height: 23px;
            width: 23px;
            padding-top: 3px;
            flex-shrink: 0;
          }
          &_right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 8px;
            &_top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 30px;
              &_name {
                color: var(--themeColor);
                font-size: 14px;
              }
              &_date {
                color: #c8c8c8;
                font-size: 12px;
              }
            }
          }
          &_content {
            color: #555555;
            font-size: 15px;
            padding: 5px 0;
            word-break: break-all;
          }
        }
      }
      .reply_box {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      display: flex;
      align-items: center;
      background: white;
      &_field {
        flex: 1;
      }
      &_line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
      }
      &_btn {
        width: 50px;
        height: 30px;
        background: var(--themeColor);
        border-radius: 5px;
        margin-right: 20px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: white;
      }
    }
    }
  }
}
.tab_top{
  // border-radius: 50%;
  // box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: fixed;
  right: 4%;
  z-index: 1;
  bottom: 5%;
}
.right{
    // margin-top: 15px;
    margin-left: 715px;
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
      margin-top: 15px;
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


::-webkit-scrollbar {
  width: 1px;
}
:deep(.van-nav-bar) {
  background: linear-gradient(to bottom, var(--themeColor), #66c6a1);
}
:deep(.van-nav-bar__arrow) {
  color: white !important;
}
:deep(.van-nav-bar__title) {
  color: white !important;
}
</style>