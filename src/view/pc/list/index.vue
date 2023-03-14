<template>
  <!-- <div class="list_back" :class="{'review_back': state == 3}"> -->
  <div class="list_back">
    <div class="question">
      <el-menu text-color="#42B285" active-text-color="#42B285" mode="horizontal" style="width: 700px;">
          <el-menu-item index="1" style="height: 50px;width: 100px;margin-top: -10px;font-weight:bold;font-size:16px;">全部</el-menu-item>
          <!-- <el-menu-item v-if="state==0||state==1" index="2" style="height: 50px;width: 100px;margin-top: -10px;font-weight:bold;font-size:16px;">已删除</el-menu-item> -->
      </el-menu>
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <van-list v-model="isLoading" :finished="isFinished" @load="onLoad">
          <div class="question_item" :class="{'question_item_last':questionIndex + 1 == questionList.length}"
            v-for="(question, questionIndex) in questionList" :key="question.proId"
            @click="cellClick(question, questionIndex)">
            <div class="question_item_top" v-if="question.proTop > 0">【置顶】</div>
            <div class="question_item_title" :class="{'question_item_title_top': question.proTop > 0}">{{question.proTitle}}</div>
            <div class="question_item_total_2">
              <div class="question_item_files" v-if="state==4">
                <van-image class="question_item_files_img"
                  :key="imageIndex" fit="cover" :src="question.imageList[0]">
                </van-image>
              </div>
              <div class="question_item_desc" v-if="state==4">{{question.proRealityScene}}</div>              
            </div>
            <div class="question_item_bottom">
              <div class="header">
                <div class="header_right">
                  <div class="header_right_date">{{question.createTime && question.createTime.substr(0, 10)}}</div>
                  </div>
                  <div class="num">
                    <div class="num_item" @click.stop="numClick(0, questionIndex)">
                      <van-image class="num_item_img" fit="contain"
                        :src="require(`@/assets/list_like${question.isLike == '1' ? '_1' : ''}.png`)"></van-image>
                      <div class="num_item_text">{{question.likeNum}}</div>
                    </div>
                    <div class="num_item" @click.stop="numClick(1, questionIndex)">
                      <van-image class="num_item_img" fit="contain"
                        :src="require(`@/assets/list_collect${question.isCollect == '1' ? '_1' : ''}.png`)"></van-image>
                      <div class="num_item_text">{{question.collectNum}}</div>
                    </div>
                    <div class="num_item">
                      <van-image class="num_item_img" fit="contain" :src="require('@/assets/list_view.png')">
                      </van-image>
                      <div class="num_item_text">{{question.viewNum}}</div>
                    </div>
                    <div class="num_item">
                      <van-image class="num_item_img" fit="contain" :src="require('@/assets/list_reply.png')">
                      </van-image>
                      <div class="num_item_text">{{question.answerNum}}</div>
                    </div>
                  </div>                  
              </div>
              <div class="review" v-if="state == 3" @click="goreview">前往审核</div>
            </div>
            <hr class="hr-edge-weak">
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { questionList, likeAdd, likeCancel, collectAdd, collectCancel } from '@/api/question'

export default {
  name: "List",
  data () {
    return {
      state: '',  //0：待审核 1：已发布 2：未通过 3：需审核 4：已收藏
      pageTitle: '',
      params: { pageNum: 1, pageSize: 10 },
      questionList: [],
      isLoading: false,
      isRefreshing: false,
      isFinished: true,
      selectIndex: 0,
      element: undefined,
      scrollTop: 0
    }
  },
  created () {
    this.state = this.$route.query.state
    this.params.state = this.state
    switch (parseInt(this.state)) {
      case 0:
        this.pageTitle = '发布中问题'
        document.title = '发布中问题'
        break
      case 1:
        this.pageTitle = '已发布问题'
        document.title = '已发布问题'
        break
      case 2:
        this.pageTitle = '审核未通过问题'
        document.title = '审核未通过问题'
        break
      case 3:
        this.pageTitle = '待审核问题'
        document.title = '待审核问题'
        break
      case 4:
        this.pageTitle = '已收藏问题'
        document.title = '已收藏问题'
        break
      default:
        this.pageTitle = '问题列表'
        document.title = '问题列表'
        break
    }
    this.getQuestionList()
    this.$EventBus.$on('questionReload', () => {
      this.questionList = []
      this.onRefresh()
    })
    this.$EventBus.$on('questionUpdate', params => {
      const item = this.questionList[this.selectIndex]
      item.isLike = params.isLike
      item.likeNum = params.likeNum
      item.isCollect = params.isCollect
      item.collectNum = params.collectNum
      item.viewNum = params.viewNum
      item.answerNum = params.answerNum
    })
  },
  activated () {
    window.addEventListener("scroll", this.handleScroll, true)
    this.element && (this.element.scrollTop = this.scrollTop)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    this.$EventBus.$off(['questionReload', 'questionUpdate'])
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    handleScroll () {
      const elements = document.getElementsByClassName('van-pull-refresh')
      let self = this
      Array.prototype.forEach.call(elements, function (item) {
        if (item.scrollTop > 0) {
          self.element = item
          self.scrollTop = item.scrollTop
        }
      });
    },
    goreview(){
      
    },
    getQuestionList (isLoad) {
      questionList(this.params).then(res => {
        if (isLoad) {
          this.questionList = this.questionList.concat(res.rows)
          this.isLoading = false
        } else {
          this.questionList = res.rows
          this.isRefreshing = false
        }
        this.isFinished = res.total <= this.questionList.length
      })
    },
    onRefresh () {
      this.params.pageNum = 1
      this.getQuestionList()
    },
    onLoad () {
      this.params.pageNum++
      this.getQuestionList(true)
    },
    cellClick (question, index) {
      this.selectIndex = index
      switch (parseInt(this.state)) {
        case 0:
        case 1:
          this.$router.push({ path: `/detaila/${question.proId}` })
          // this.$router.push({name:'detaila' ,params:{ state:this.state}})
          break
        case 2:
          this.$router.push({ path: `/detaila/${question.proId}`})
          // this.$router.push({name:'detaila' ,params:{ state:this.state}})
          break
        case 3:
          // this.$router.push({ path: `/detaila/${question.proId}`})
          // this.$router.push({name:'detaila' ,params:{ state:this.state}})
          // break
          this.$router.push({ name: 'Add', query: { state: this.state == 0 ? 1 : this.state, proId: question.proId } })
          break
        case 4:
          this.$router.push({ path: `/detaila/${question.proId}`})
          // this.$router.push({name:'detaila' ,params:{ state:this.state}})
          break
        default:
          this.$router.push({ path: `/detaila/${question.proId}` })
          break
      }
    },
    numClick (type, index) {
      if (getToken()) {
        if (type == 0) {
          this.likeHandle(index)
        } else {
          this.collectHandle(index)
        }
      } else {
        this.$dialog.alert({
          showCancelButton: true,
          cancelButtonText: '否',
          confirmButtonText: '是',
          message: '您暂未登录，请问是否登录？'
        })
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
          .catch(() => { })
      }
    },
    likeHandle (index) {
      const item = this.questionList[index]
      if (item.isLike == '1') {
        this.likeCancel(item.proId, index)
      } else {
        this.likeAdd(item.proId, index)
      }
    },
    collectHandle (index) {
      const item = this.questionList[index]
      if (item.isCollect == '1') {
        this.collectCancel(item.proId, index)
      } else {
        this.collectAdd(item.proId, index)
      }
    },
    likeAdd (id, index) {
      likeAdd(id).then(() => {
        const item = this.questionList[index]
        item.isLike = '1'
        item.likeNum++
      })
    },
    likeCancel (id, index) {
      likeCancel(id).then(() => {
        const item = this.questionList[index]
        item.isLike = '0'
        item.likeNum--
      })
    },
    collectAdd (id, index) {
      collectAdd(id).then(() => {
        const item = this.questionList[index]
        item.isCollect = '1'
        item.collectNum++
      })
    },
    collectCancel (id, index) {
      collectCancel(id).then(() => {
        const item = this.questionList[index]
        item.isCollect = '0'
        item.collectNum--
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list_back {
  height: calc(100% - 0px);
  display: flex;
  // transform: translate(-7px,-391px);
  // transform-origin: left top;
  // flex-direction: column;
  background: white;
  // overflow:hidden;
  width: 103%;
  // margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .question {
    flex: 1;
    // overflow: scroll;
    // background: #f2f2f2;
    width: 50px;
    background-color: white;
    &_item {
      margin-left: 5px;
      margin-top: -10px;
      padding: 10px;
      width: 65%;
      background: white;
      // border-radius: 10px;
      &_last {
        margin-bottom: 0;
      }
      &_top {
        font-size: 10px;
        font-weight: 600;
        position: absolute;
        color: var(--themeColor);
      }
      &_title {
        font-size: 10px;
        font-weight: 600;
      }
      &_total_2 {
      display: flex;
      }
      &_title_top {
        text-indent: 64px;
      }
      &_desc {
        margin: 5px 15px 10px;
        font-size: 9px;
        color: #7f7f7f;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &_files {
        margin: 5px 0;
        &_img {
          width: 180px;
          height: 80px;
          margin-right: 2%;
          border-radius: 5px;
          overflow: hidden;
        }
        &_img:last-child {
          margin-right: 0;
        }
      }
      &_bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        .header {
          display: flex;
          align-items: center;
          &_img {
            overflow: hidden;
            margin-right: 10px;
          }
          &_right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            &_name {
              color: var(--themeColor);
              font-size: 14px;
            }
            &_date {
              color: #adadad;
              font-size: 12px;
            }
          }
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
        .review {
          font-size: 12px;
          color: white;
          background: #f16131;
          width: 80px;
          height: 20px;
          border-radius: 6px;
          text-align: center;
          line-height: 20px;
          margin-top: -20px;
        }
      }
    }
  }
  .hr-edge-weak {
		border: 0;
		padding-top: 1px;
    background-color: #d0d0d5;
    border:10
		// background: linear-gradient(to right, transparent, #d0d0d5, transparent);
	}
  .van-list {
    padding: 15px 15px 0;
  }
  .van-pull-refresh {
    height: 100%;
    overflow: scroll;
  }
}
.review_back {
  // :deep(.van-nav-bar) {
  //   background: linear-gradient(to bottom, #f16131, #f68666);
  // }
  :deep(.van-nav-bar__arrow) {
    color: white !important;
  }
  :deep(.van-nav-bar__title) {
    color: white !important;
  }
  // .question {
  //   background: linear-gradient(to bottom, #f68666, #f2f2f2 50%);
  // }
}
</style>