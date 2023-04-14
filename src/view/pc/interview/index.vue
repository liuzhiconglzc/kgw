<template>
  <div class="detail_back" v-if="this">
    <div class="d_back">
      <div class="detail" v-if="this.proTitle">
        <div class="content">
          <div class="header">
            <div class="header_img">
              <template>
                <el-image width="28px" height="28px" :src="require('@/assets/header.png')" />
              </template>
            </div>
            <div class="header_name">{{this.askUserName}}</div>
          </div>
          <div class="title">{{this.proTitle}}</div>
          <div class="date">
            <div class="date_back">{{this.createTime && this.createTime.substr(0, 10)}}</div>
          </div>
          <div class="line"></div>
          <div class="desc" :class="{'desc_1': this.proId == 0}">{{this.proContent}}</div>
          <div class="files" v-if="this.imageList && this.imageList.length > 0">
            <div class="demo-image__preview">
              <el-image class="files_img" v-for="(image, index) in this.imageList" :key="index" initial-index="index" :preview-src-list="imageList" fit="fill"
                style="width: 210px; height: 150px"
                :src="image">
              </el-image>
            </div>
          </div>
        </div>
      </div> 
    </div>
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
import { ImagePreview } from 'vant'

export default {
  name: "Interview",
  data () {
    return {
      item: undefined,
      img: require('@/assets/index_banner_0.png'),
      imageList: [
        require('@/assets/detail_interview_0_0.png'),
        require('@/assets/detail_interview_0_1.png'),
        require('@/assets/detail_interview_0_2.png'),
      ],
      askUserAvatar: require('@/assets/detail_banner_0.png'),
      proId: 0,
      title: '“砍瓜网”简介',
      proTitle: '“砍瓜网”简介',
      askUserName: '砍瓜网管理员',
      createTime: '2022-05-05',
      proContent:
        '“砍瓜网”是辽宁大学真实问题研究中心创建的“深度融合社会现实场景真实问题”网络平台，用于搜集发生在社会现实场景中的真实问题、查询真实问题以及为真实问题提供解决方案。该网络平台旨在将社会与高校形成有效链接，将社会的研究需求和高校的研究资源有效整合，为真实问题的提出与解决形成相辅相成的创新链。与此同时，辽宁大学依托砍瓜网构建了深度融合社会现实场景真实问题的一流人才培养模式，通过将真实问题转化为教学资源，构建真实问题贯通人才培养全流程的一体化融合育人体系和综合管理保障机制，培养一流人才的同时，有效促进了政产学研融合，增强了高校的社会服务能力。\n “砍瓜”是一种可以随吃随砍、迅速再生的瓜类，是具有极强自愈再生能力的奇瓜。以“砍瓜网”命名该网站，寓意源源不断的真实问题涌入我们的网站，真实问题永不枯竭、对问题的研究与解决永不停歇。',
    }
  },
  created () {
    const item = this.$route.params
    this.item = item
  },
  methods: {
    cardClick () {
    window.open("http://kangua.lnu.edu.cn", '_blank').location;
  },
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
  margin-left: -450px;
  position: fixed;
  left: 50%;
  width: 700px;
  height: 100%;
  // overflow-y: hidden;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  // background: linear-gradient(to bottom, #66c6a1, #f2f2f2 50%);
  .d_back{
    // overflow-x:hidden;
    width: 105%;
    height: calc(100% - 100px);
  }
  .title1{
        display: flex;
        align-items: center;
        margin-top: 10px;
        // position: sticky; 
        // top: 0;
        // background-color: white;
        // z-index:999;
        width: 700px;
        // margin-top: -100px;
        .ti{
        // border-radius: 16px;
        // color:#42B285;
        color: white;
        margin-left: 20px;
      }
      .back{
        background-color:#42B285;
        margin-left: 570px;
        // color: white;
      }   
      }
  .detail {
    height: calc(100% - 44px);
    overflow-y: scroll;
    position: relative;
    width: 725px;
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
        font-size: 16px;
        white-space: pre-wrap;
        // word-spacing: 23px;
        word-spacing: 2em;
        // text-indent:2em;
        text-align: justify;
      }
      .desc_1{
        // text-indent: 27px;
        text-indent:2em;
        margin: 10px 10px 10px 0px;
      }
      .files {
          &_img {
            width: 32%;
            // margin-left: 2%;
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
  }
}
.right{
    // margin-top: 15px;
    margin-left: 710px;
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
      margin-top: 10px;
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