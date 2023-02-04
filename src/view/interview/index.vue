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
        </div>
        <div class="line"></div>
        <div class="desc">{{item.proContent}}</div>
        <van-swipe autoplay="3000" height="180" indicator-color="white" v-if="item.imageList">
          <van-swipe-item v-for="(item, index) in item.imageList" :key="index" @click="topClick(index)">
            <van-image width="100%" height="100%" fit="cover" :src="item" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div> 
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  name: "Interview",
  data () {
    return {
      item: undefined,
    }
  },
  created () {
    const item = this.$route.params
    this.item = item
  },
  methods: {
    topClick (index) {
      ImagePreview({
        images: this.item.imageList,
        startPosition: index
      });
    },
    goBack () {
      if (this.fromWechat) {
        this.$router.replace({ name: 'Question' })
      } else {
        this.$router.back()
      }
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
      }
      .line {
        background: #dedede;
        height: 1px;
      }
      .desc {
        margin: 10px 0;
        color: #7f7f7f;
        font-size: 14px;
        white-space: pre-wrap;
        text-align: justify;
      }
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