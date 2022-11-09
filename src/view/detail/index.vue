<template>
  <div class="detail_back" v-if="item">
    <van-nav-bar title="问题详情" :border="false" fixed left-arrow @click-left="goBack" />
    <div class="detail" v-if="item.proTitle">
      <div class="content">
        <div class="header">
          <!-- <van-image class="header_img" :src="item.askUserAvatar"></van-image> -->
          <div class="header_img">
            <template>
              <van-image width="28px" height="28px" :src="require('@/assets/header.png')" />
            </template>
          </div>
          <div class="header_name">{{item.askUserName}}</div>
        </div>
        <div class="title">{{item.proTitle}}</div>
        <div class="date">
          <div class="date_back">{{item.createTime && item.createTime.substr(0, 10)}}</div>
          <div class="num" v-if="item.proId != 0">
            <div class="num_item" @click.stop="numClick(0)">
              <van-image class="num_item_img" fit="contain"
                :src="require(`@/assets/list_like${item.isLike == '1' ? '_1' : ''}.png`)"></van-image>
              <div class="num_item_text">{{item.likeNum}}</div>
            </div>
            <div class="num_item" @click.stop="numClick(1)">
              <van-image class="num_item_img" fit="contain"
                :src="require(`@/assets/list_collect${item.isCollect == '1' ? '_1' : ''}.png`)"></van-image>
              <div class="num_item_text">{{item.collectNum}}</div>
            </div>
            <div class="num_item">
              <van-image class="num_item_img" fit="contain" :src="require('@/assets/list_view.png')">
              </van-image>
              <div class="num_item_text">{{item.viewNum}}</div>
            </div>
            <div class="num_item">
              <van-image class="num_item_img" fit="contain" :src="require('@/assets/list_reply.png')">
              </van-image>
              <div class="num_item_text">{{item.answerNum}}</div>
            </div>
          </div>
        </div>
        <div class="line" v-if="item.proId == 0"></div>
        <div class="pro_title" v-if="item.proId != 0">社会现实场景</div>
        <div class="desc" :class="{'desc_1': item.proId != 0}">{{item.proRealityScene}}</div>
        <div class="pro_title" v-if="item.proId != 0">真实问题</div>
        <div class="desc" :class="{'desc_1': item.proId != 0}">{{item.proSpecific}}</div>
        <div class="files" v-if="item.imageList && item.imageList.length > 0">
          <van-image class="files_img" v-for="(image, index) in item.imageList" :key="index" fit="cover" :src="image"
            @click="imageClick(index)">
          </van-image>
        </div>
      </div>
      <div class="reply" v-if="replyList.length > 0 && item.proId != 0">
        <div class="reply_header">{{`共${replyList.length}回复`}}</div>
        <div class="reply_cell" v-for="item in replyList" :key="item.id">
          <div class="reply_cell_header">
            <template>
              <van-image :src="require('@/assets/header_detail.png')" />
            </template>
          </div>
          <div class="reply_cell_right">
            <div class="reply_cell_right_top">
              <div class="reply_cell_right_top_name">{{item.userName}}</div>
              <div class="reply_cell_right_top_date">{{item.createTime}}</div>
            </div>
            <div class="reply_cell_content">{{item.answer}} </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reply_box" v-if="item.proId != 0">
      <van-field class="reply_box_field" v-model="reply" autosize rows="1" type="textarea" maxlength="100"
        placeholder="请输入回复（100字以内）">
      </van-field>
      <div class="reply_box_btn" @click="replyClick">回复</div>
      <!-- <van-divider class="reply_box_line" /> -->
    </div>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { ImagePreview } from 'vant'
import { questionDetail, questionReply, likeAdd, likeCancel, collectAdd, collectCancel } from '@/api/question'
import forbiddenArray from "@/utils/badword";

export default {
  name: "Detail",
  data () {
    return {
      item: undefined,
      reply: '',
      replyList: [],
      fromWechat: false
    }
  },
  created () {
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
    goBack () {
      if (this.fromWechat) {
        this.$router.replace({ name: 'Question' })
      } else {
        this.$router.back()
      }
    },
    imageClick (index) {
      ImagePreview({
        images: this.item.imageList,
        startPosition: index
      });
    },
    getDetail (proId) {
      questionDetail(proId).then(res => {
        this.item = res.data
        this.replyList = res.data.answerList
        this.questionUpdate()
      })
    },
    replyClick () {
      if (!getToken()) {
        this.noLoginDialog()
      } else if (this.reply.length == 0) {
        this.$notify('请输入回复内容')
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
      params.answer = this.reply
      questionReply(params).then(res => {
        this.$toast.success('回复成功')
        this.reply = ''
        this.getDetail(this.item.proId)
      })
    },
    gotoLogin () {
      this.$router.push({ name: 'Login' })
    },
    numClick (type) {
      if (getToken()) {
        if (type == 0) {
          this.likeHandle()
        } else {
          this.collectHandle()
        }
      } else {
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
      }
    },
    likeHandle () {
      if (this.item.isLike == 1) {
        this.likeCancel()
      } else {
        this.likeAdd()
      }
    },
    collectHandle () {
      if (this.item.isCollect == 1) {
        this.collectCancel()
      } else {
        this.collectAdd()
      }
    },
    likeAdd () {
      likeAdd(this.item.proId.toString()).then(() => {
        this.item.isLike = '1'
        this.item.likeNum++
        this.questionUpdate()
      })
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
  }
}
</script>

<style lang="less" scoped>
.detail_back {
  width: 100vw;
  height: 100%;
  background: linear-gradient(to bottom, #66c6a1, #f2f2f2 50%);
  .detail {
    height: calc(100% - 44px);
    overflow: scroll;
    position: relative;
    .content {
      border-radius: 10px;
      background: white;
      margin: 10px;
      padding: 10px;
      .header {
        display: flex;
        align-items: center;
        &_img {
          width: 30px;
          height: 30px;
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
          }
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
          height: 80px;
          margin-right: 2%;
          border-radius: 5px;
          overflow: hidden;
        }
        &_img:last-child {
          margin-right: 0;
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
  }
  .reply_box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // margin: 0;
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