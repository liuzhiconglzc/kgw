<template>
  <div class="detail_back" v-if="this">
    <div class="d_back" >
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
          <!-- <van-swipe autoplay="3000" height="180" indicator-color="white" v-if="item.imageList">
            <van-swipe-item v-for="(item, index) in item.imageList" :key="index" @click="topClick(index)">
              <el-image width="100%" height="100%" fit="cover" :src="item" />
            </van-swipe-item>
          </van-swipe> -->
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
  name: "Interviewa",
  data () {
    return {
      item: undefined,
      img: require('@/assets/index_banner_1.png'),
      imageList: [
        require('@/assets/detail_question_0_0.png'),
        require('@/assets/detail_question_0_1.png'),
        require('@/assets/detail_question_0_2.png'),
      ],
      askUserAvatar: require('@/assets/detail_banner_1.png'),
      proId: 0,
      title: '何为“真实问题”？',
      proTitle: '何为“真实问题”？',
      askUserName: '砍瓜网管理员',
      createTime: '2022-05-05',
      proContent:
        '在学校教育中给学生提出的问题通常是结构良好的封闭式问题，这些问题一般具有清晰的界定，包含获得一个正确答案所需要的所有要素。学生只要掌握了课堂所学的理论，就可以应用理论解决问题，这种问题的解决通常导致学生对消极或惰性知识的掌握。\n 真实问题是来自于社会现实中真实发生的问题。由于现实世界模糊不定、复杂多变，因此相较于传统学校教育中的问题，真实问题具有结构不良、开放、复杂、混乱、不确定等特点。由于真实问题来自于社会现实，因此真实问题必定要与社会现实场景紧密相连，使学生有机会了解他们所学知识的价值以及学习的意义，并锻炼他们将理论应用于实践来解决真实问题的能力；由于真实问题以结构不良的真实社会场景为特征，问题本身并没有呈现所有的信息，因此可以有效鼓励学生去搜索额外的信息并探索用多样的方式解决问题，可有效培养学生的好奇心、独立分析能力、创造与批判性思维；由于真实问题复杂、不确定等特点，因此真实问题可能需要将多学科领域联系起来，与跨学科学习以及合作学习紧密相连。\n 综上，真实问题能激发学生更有深度和有意义的学习，并培养学生成为具备独立分析、合作开展工作、创造和批判性思维等21世纪一流人才必备技能的问题解决者、终身学习者和有效团队协作者，迎接当今全球化、数智时代高度复杂工作场景的挑战。',
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
  margin-left: -400px;
  position: fixed;
  left: 50%;
  width: 700px;
  height: calc(100% - 0px);
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
    // width: 105%;
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
        word-spacing: 23px;
        text-align: justify;
      }
      .desc_1{
        text-indent: 27px;
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