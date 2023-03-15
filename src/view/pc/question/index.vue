<template>
  <div class="question_back">
    <div class="search_back">
      <div class="search" style="color: #42b285; font-size: 16px;">
        全部
      </div>
      <div style="font-size: 16px;">问题分类</div>
      <img class="category" :src="require('@/assets/pc/category.png')" alt="category" @click="categoryClick">
    </div>
    <div class="question">
      <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
        <van-list ref="scrollList" v-model="isLoading" :finished="isFinished" finished-text="没有更多了" @load="onLoad">
          <div class="question_item" :class="{'question_item_last':questionIndex + 1 == questionList.length}"
            v-for="(question, questionIndex) in questionList" :key="question.proId"
            @click="cellClick(question, questionIndex)">
            <!-- <div class="question_item_top" v-if="question.proTop > 0">【置顶】</div> -->
            <!-- <div class="question_item_title" :class="{'question_item_title_top': question.proTop > 0}">
              {{question.proTitle}}</div> -->
            <div class="question_item_total">
              <div class="question_item_title">{{question.proTitle}}</div>
              <div class="question_item_img" v-if="question.imageList && question.imageList.length > 0">
                <el-image style="width: 15px; height: 15px;margin-top: 3px;" :src="require('@/assets/pc/view_img.png')" fit="contain"/>
              </div>
            </div>
            <div class="question_item_total_2">  
              <div class="question_item_files" v-if="question.imageList && question.imageList.length > 0">
                <van-image class="question_item_files_img" v-for="(image, imageIndex) in question.imageList.slice(0,1)"
                  :key="imageIndex" fit="cover" :src="image">
                </van-image>
              </div>
              <div class="question_item_desc" :class="{'question_item_img_desc': question.imageList && question.imageList.length > 0}">{{question.proRealityScene}}</div>
            </div>
            <div class="question_item_bottom">
              <div class="header">
                <div class="header_img">
                  <template>
                    <van-image width="25px" height="25px" :src="require('@/assets/header_question.png')" />
                  </template>
                </div>
                <div class="header_right">
                  <div class="header_right_name">{{question.askUserName}}</div>
                  <div class="header_right_date">{{question.createTime && question.createTime.substr(0, 10)}}</div>
                </div>
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
          </div>
        </van-list>
      </van-pull-refresh>     
    </div>
    <!-- <div class="tab_add" @click="add">
      <van-image height="53" width="53" :src="require('@/assets/tab_add_1.png')" />
    </div> -->
    <div v-if="btnFlag" class="tab_top" @click="top">
      <van-image height="70" width="35" :src="require('@/assets/pc/view_top.png')" />
    </div>
    <el-backtop target=".question_back" :visibility-height="0" :right="130" :bottom="60"/>
    <van-popup v-model="showPicker" round position="bottom" style="width: 400px;margin-left: -250px;position: fixed;left: 50%;">
      <div class="pop">
        <div class="pop_cancel" @click="cancelClick">取消</div>
        <div class="pop_title">选择专业</div>
        <div class="pop_done" @click="doneClick">确认</div>
      </div>
      <van-tree-select :items="classifyItems" :main-active-index.sync="activeIndex" :active-id.sync="activeIds" />
    </van-popup>
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
import { classifyList, questionList, likeAdd, likeCancel, collectAdd, collectCancel } from '@/api/question'

export default {
name: "Question",
data () {
  return {
    keyword: '',
    showPicker: false,
    classifyItems: [],
    activeIndex: 0,
    activeIds: [],
    params: { pageNum: 1, pageSize: 10 },
    questionList: [],
    isLoading: false,
    isRefreshing: false,
    isFinished: true,
    selectIndex: 0,
    element: undefined,
    scrollTop: 0,
    btnFlag: false
  }
},
created () {
  this.getClassifyList()
  this.getQuestionList()
  this.$EventBus.$on('questionReload', () => {
    this.questionList = []
    this.isRefreshing = true
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
  this.$EventBus.$on('searchValue', (data) => {
    this.keyword = data
    this.searchClick()
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
  cardClick () {
    window.open("http://kangua.lnu.edu.cn", '_blank').location;
  },
  add(){
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
  handleScroll () {
    const elements = document.getElementsByClassName('van-pull-refresh')
    let self = this
    Array.prototype.forEach.call(elements, function (item) {
      if (item.scrollTop > 0) {
        self.element = item
        self.scrollTop = item.scrollTop
      }
      if (item.scrollTop > 60) {
        self.btnFlag = true
      } else {
        self.btnFlag = false
      }
    });
  },
  searchClick () {
    this.params.searchValue = this.keyword
    this.isRefreshing = true
    this.onRefresh()
  },
  categoryClick () {
    this.showPicker = true
  },
  cancelClick () {
    this.showPicker = false
  },
  doneClick () {
    this.showPicker = false
    this.params.professionIdList = this.activeIds
    this.isRefreshing = true
    this.onRefresh()
  },
  getClassifyList () {
    classifyList().then(res => {
      res.rows.map(item => {
        const treeItem = {}
        treeItem.text = item.fieldName
        treeItem.children = []
        item.professionList.map(profession => {
          treeItem.children.push({ id: profession.professionId, text: profession.professionName })
        })
        this.classifyItems.push(treeItem)
      })
    })
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
    this.$router.push({ path: `/detail/${question.proId}` })
  },
  numClick (type, index) {
    if (type == 0) {
      this.likeHandle(index)
    } else if(type == 1){
      this.collectHandle(index)
    } 
  },
  likeHandle (index) {
    const item = this.questionList[index]
    this.likeAdd(item.proId, index)
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
.question_back {
// width: 100vw;
margin-left: -400px;
position: fixed;
left: 50%;
// top: 2%;
// bottom: 2%;
width: 700px;
height: calc(100% - 0px);
display: flex;
flex-direction: column;
background: white;
margin-top: 10px;
padding-bottom: 2%;
.search_back {
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 20px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .search {
    overflow: hidden;
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    &_left {
      height: 30px;
      border-radius: 17px 17px 17px 17px;
      border-style: solid solid solid solid;
      border-width: 2px;
      border-color: var(--themeColor);
      display: flex;
      align-items: center;
      overflow: hidden;
      flex: 1;
      .search_bar {
        padding: 0 20px 0 15px;
      }
    }
    &_right {
      margin-left: -1px;
      width: 42px;
      background: var(--themeColor);
      height: 30px;
      border-radius: 0 17px 17px 0;
      border-width: 2px;
      border-style: solid;
      border-color: var(--themeColor);
    }
    &_btn {
      height: 29px;
      padding: 0px 18px;
      line-height: 30px;
      // letter-spacing: 1px;
      color: white;
      background: var(--themeColor);
      border-radius: 15px;
      position: absolute;
      margin-bottom: 0.2px;
      // margin-top: 5px;
      right: 2.5px;
    }
  }
  .category {
    width: 20px;
    margin-left: 10px;
  }
}
.question {
  flex: 1;
  overflow: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  &_item {
    // margin-bottom: 15px;
    padding: 10px;
    background: white;
    // border-radius: 10px;
    &_last {
      margin-bottom: 0;
    }
    &_total {
      display: flex;
    }
    &_total_2 {
      display: flex;
    }
    &_img {
      font-size: 16px;
      font-weight: 600;
      // position: absolute;
      color: var(--themeColor);
    }
    &_title {
      font-size: 16px;
      font-weight: 600;
    }
    &_title_top {
      text-indent: 64px;
    }
    &_desc {
      margin: 5px 0 10px;
      font-size: 15px;
      color: #7f7f7f;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &_img_desc {
      margin-left: 10px;
      -webkit-line-clamp: 4;
    }
    &_files {
      margin: 5px 0;
      &_img:first-child {
        // width: 32%;
        width: 180px;
        height: 80px;
        margin-right: 2%;
        border-radius: 5px;
        overflow: hidden;
      }
    }
    &_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: 5px;
      .header {
        display: flex;
        align-items: center;
        &_img {
          overflow: hidden;
          margin-right: 10px;
          margin-top: 4px;
        }
        &_right {
          display: flex;
          flex-direction: row;
          // justify-content: center;
          &_name {
            color: var(--themeColor);
            font-size: 6px;
          }
          &_date {
            color: #adadad;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 2px;
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
    }
  }
}
.tab_add{
  // border-radius: 50%;
  // box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 2.6%;
  z-index: 1;
  bottom: 4%;
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
.pop {
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_cancel {
    color: #969799;
    line-height: 44px;
    padding: 0 16px;
    font-size: 14px;
  }
  &_title {
    font-weight: 500;
    font-size: 16px;
  }
  &_done {
    color: var(--themeColor);
    line-height: 44px;
    padding: 0 16px;
    font-size: 14px;
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
.van-list {
  padding: 15px 15px 0;
}
.van-pull-refresh {
  height: 100%;
  overflow: scroll;
}
.van-sidebar-item--select::before {
  background-color: var(--themeColor);
}
.van-tree-select__item--active {
  color: var(--themeColor);
}
.van-tree-select__nav{
  flex: 1.5;
}
*::-webkit-scrollbar {
  display: none;
}
* {
  scrollbar-width: none;
}
* {
  -ms-overflow-style: none;
}
}
</style>