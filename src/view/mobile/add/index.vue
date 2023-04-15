<template>
  <div class="add_back">
    <van-nav-bar :border="false" left-arrow fixed @click-left="goBack">
      <template #title>
        <div :class="{'review_title': state == 3}">{{pageTitle}}</div>
      </template>
    </van-nav-bar>
    <div class="title">问题题目</div>
    <van-field v-model="title" rows="1" autosize maxlength="25" type="textarea" show-word-limit
      placeholder="请输入问题，以问号结尾（25字以内）" />
    <van-field readonly is-link label="专业分类" :value="professionNames" rows="1" autosize type="textarea"
      placeholder="请选择专业分类（可多选）" @click="topClick" />
    <div class="title_1">社会现实场景</div>
    <div class="content">
      <van-field v-model="realityScene" rows="5" autosize maxlength="200" type="textarea" show-word-limit
        placeholder="“社会现实场景”具体描述（不超过200字，图片3张以内，每张图片不超过1M）" />
    </div>
    <div class="title">真实问题</div>
    <div class="content">
      <van-field v-model="specific" rows="3" autosize maxlength="100" type="textarea" show-word-limit
        placeholder="“真实问题”具体描述（不超过100字）" />
    </div>
    <div class="image">
      <van-uploader v-model="imageList" max-count="3" :max-size="1024 * 1024" @oversize="onOversize"
        :after-read="afterRead" />
    </div>
    <div :class="{'label_reject': selectState.id == 0}">
      <van-field v-if="state == 3" readonly is-link label="审核状态" :value="selectState.text" placeholder="请选择审核状态"
        @click="stateClick" />
    </div>
    <div v-if="(state == 3 && selectState.id == 0) || state == 2">
      <div class="title title_reject">拒绝理由</div>
      <div class="content">
        <van-field v-model="reason" :readonly="state == 2" rows="4" autosize maxlength="300" type="textarea"
          show-word-limit placeholder="请输入拒绝理由" />
      </div>
    </div>
    <div class="publish">
      <div class="publish_btn" @click="publishClick">提交</div>
      <div class="publish_btn" v-if="(state == 1)" style="margin-left: 10%" @click="deleteClick(proId)">删除</div>
      <div class="publish_btn" v-if="(state == 2)" style="margin-left: 10%" @click="deleteClick(proId)">删除</div>
    </div>
    <van-popup v-model="showProfessionPicker" round position="bottom">
      <div class="pop">
        <div class="pop_cancel" @click="cancelClick">取消</div>
        <div class="pop_title">选择专业</div>
        <div class="pop_done" @click="doneClick">确认</div>
      </div>
      <van-tree-select :items="classifyItems" :main-active-index.sync="activeIndex" :active-id.sync="tempIds"
        @click-item="professionClick" />
    </van-popup>
    <van-popup v-model="showStatePicker" round position="bottom">
      <van-picker show-toolbar title="审核状态" :columns="stateList" @cancel="stateCancel" @confirm="stateDone" />
    </van-popup>
  </div>
</template>

<script>
import {questionDetail, classifyList, uploadImage, questionAdd, questionUpdate, questionDelete} from '@/api/question'
import forbiddenArray from "@/utils/badword";
import {Notify, showConfirmDialog} from 'vant';

export default {
  name: "Add",
  data () {
    return {
      pageTitle: '',
      state: 0, //0：新增 1：审核中修改 2：拒绝后修改 3：审核
      proId: 0,
      showProfessionPicker: false,
      showStatePicker: false,
      stateList: [{ id: 1, text: '审核通过' }, { id: 0, text: '审核未通过' }],
      classifyItems: [],
      title: '',
      content: '',
      realityScene: '',
      specific: '',
      imageList: [],
      activeIndex: 0,
      tempIds: [],
      selectIds: [],
      tempNames: [],
      selectNames: [],
      professionNames: '',
      selectState: {},
      reason: '',
      fromWechat: false
    }
  },
  created () {
    this.state = this.$route.query.state
    this.proId = this.$route.query.proId
    switch (parseInt(this.state)) {
      case 1:
      case 2:
        this.pageTitle = '问题编辑'
        document.title = '问题编辑'
        break
      case 3:
        this.pageTitle = '待审核问题'
        document.title = '待审核问题'
        break
      default:
        this.pageTitle = '问题发布'
        document.title = '问题发布'
        break
    }
    if (this.state != 0) {
      this.getDetail()
    }
    this.getClassifyList()
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
    getDetail () {
      questionDetail(this.proId).then(res => {
        this.title = res.data.proTitle
        // this.content = res.data.proContent
        this.realityScene = res.data.proRealityScene
        this.specific = res.data.proSpecific
        if (res.data.professionIds) {
          this.tempIds = res.data.professionIds.split(',').map(Number)
          this.selectIds = this.tempIds
          this.tempNames = res.data.professionNames.split(',')
          this.selectNames = this.tempNames
          this.professionNames = this.selectNames.join('、')
        }
        res.data.imageList && res.data.imageList.map(item => {
          this.imageList.push({ url: item })
        })
        this.reason = res.data.reason
      })
    },
    getClassifyList () {
      classifyList().then(res => {
        res.rows.map(item => {
          const treeItem = {}
          treeItem.id = item.fieldId
          treeItem.text = item.fieldName
          treeItem.children = []
          item.professionList.map(profession => {
            treeItem.children.push({ id: profession.professionId, text: profession.professionName })
          })
          this.classifyItems.push(treeItem)
        })
      })
    },
    topClick () {
      this.showProfessionPicker = true
    },
    cancelClick () {
      this.showProfessionPicker = false
      this.tempIds = this.selectIds
      this.tempNames = this.selectNames
    },
    doneClick () {
      this.showProfessionPicker = false
      this.selectIds = this.tempIds
      this.selectNames = this.tempNames
      this.professionNames = this.selectNames.join('、')
    },
    professionClick (item) {
      const index = this.tempNames.indexOf(item.text)
      if (index == -1) {
        this.tempNames.push(item.text)
      } else {
        this.tempNames.splice(index, 1)
      }
    },
    stateClick () {
      this.showStatePicker = true
    },
    stateCancel () {
      this.showStatePicker = false
    },
    stateDone (item) {
      this.showStatePicker = false
      this.selectState = item
    },
    deleteClick(id) {
      this.$dialog.alert({
        showCancelButton: true,
        cancelButtonText: '否',
        confirmButtonText: '是',
        message: '请问是否删除？'
      })
          .then(() => {
            questionDelete(id).then((res) => {
              // this.$message({
              //   message: res.data,
              //   type: "success",
              // });
              this.questionUpdate();
              // this.$router.push({ path: `/list?state=0`});
              // this.$router.go(0)
              // this.dialogVisible=false;
              this.goBack()
            });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "已取消删除",
            // });
          });
      // this.then(() => {
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除",
      //   });
      // });
    },
    // deleteClick1(id) {
    //   // this.$confirm("是否删除?", "提示", {
    //   //   confirmButtonText: "确定",
    //   //   cancelButtonText: "取消",
    //   //   type: "warning",
    //   // })
    //   // this.then(() => {
    //   questionDelete(id).then((res) => {
    //     // this.$message({
    //     //   message: res.data,
    //     //   type: "success",
    //     // });
    //     this.questionUpdate();
    //     // this.$router.push({ path: `/list?state=2`});
    //     // this.$router.go(0)
    //     this.goBack()
    //     // this.dialogVisible=false;
    //   });
    //   // })
    //   // .catch(() => {
    //   //   this.$message({
    //   //     type: "info",
    //   //     message: "已取消删除",
    //   //   });
    //   // });
    // },
    publishClick () {
      let msg
      if (!this.title) {
        msg = '请输入标题'
      } else if (!this.professionNames) {
        msg = '请选择专业分类'
      } else if (!this.realityScene) {
        msg = '请输入场景'
      } else if (!this.specific) {
        msg = '请输入真实问题'
      } else if (this.state == 3 && !this.selectState.text) {
        msg = '请选择审核状态'
      } else if (this.selectState.id == 0 && !this.reason) {
        msg = '请输入拒绝理由'
      } else {
        forbiddenArray.some(item => {
          if (this.title.includes(item)) {
            msg = '标题中不能含有敏感词'
            return true
          }
          if (this.content.includes(item)) {
            msg = '描述中不能含有敏感词'
            return true
          }
          if (this.selectState.id == 0 && this.reason.includes(item)) {
            msg = '拒绝理由中不能含有敏感词'
            return true
          }
          return false
        })
      }
      if (msg) {
        Notify(msg)
      } else {
        this.questionUpdate()
      }
    },
    onOversize () {
      this.$notify('图片大小不能超过1M')
    },
    afterRead (file) {
      file.status = 'uploading';
      file.message = '上传中...';
      uploadImage(file.file).then(res => {
        file.status = 'done';
        file.url = res.imgUrl
      }).catch(() => {
        file.status = 'failed';
        file.message = '上传失败';
      })
    },
    async questionUpdate () {
      this.$toast.loading({ forbidClick: true })
      const params = {}
      params.proTitle = this.title
      // params.proContent = this.content
      params.proRealityScene = this.realityScene
      params.proSpecific = this.specific
      params.professionIds = this.selectIds.join(',')
      const list = []
      this.imageList.map(item => {
        item.url && list.push(item.url)
      })
      params.imageList = list
      if (this.state != 0) {
        params.proId = this.proId
        if (this.state == 3) {
          params.pass = this.selectState.id
          if (this.selectState.id == 0) {
            params.reason = this.reason
          }
        }
      }
      try {
        if (this.state == 0) {
          await questionAdd(params)
        } else {
          await questionUpdate(params)
        }
        this.$toast.success('提交成功')
        this.gotoQuestion()
      } catch (error) {
        this.$toast.clear()
        this.$notify('提交失败')
      }
    },
    gotoQuestion () {
      switch (parseInt(this.state)) {
        case 1:
        case 2:
        case 3:
          this.$EventBus.$emit('questionReload')
          this.goBack()
          break
        default:
          this.$router.replace({ name: 'List', query: { state: 0 } })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add_back {
  height: 100%;
  overflow: scroll;
  .title {
    color: white;
    width: 64px;
    margin-left: 16px;
    margin-top: 10px;
    padding: 2px 10px;
    border-radius: 3px;
    background: var(--themeColor);
  }
  .title_1 {
    color: white;
    width: 96px;
    margin-left: 16px;
    margin-top: 10px;
    padding: 2px 10px;
    border-radius: 3px;
    background: var(--themeColor);
  }
  .title_reject {
    background: #f16131;
  }
  .image {
    padding: 0 20px;
  }
  .publish {
    margin: 20px;
    display: flex;
    justify-content: center;
    &_btn {
      background: var(--themeColor);
      width: 100px;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-weight: bold;
    }
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
  .van-cell {
    align-items: center;
  }
  .van-sidebar-item--select::before {
    background-color: var(--themeColor);
  }
  .van-tree-select__item--active {
    color: var(--themeColor);
  }
  :deep(.van-picker__confirm) {
    color: var(--themeColor);
  }
  :deep(.van-cell__title) {
    span {
      color: white;
      width: 64px;
      padding: 2px 10px;
      border-radius: 3px;
      background: var(--themeColor);
      font-size: 16px;
    }
  }
  .label_reject {
    :deep(.van-cell__title) {
      span {
        color: white;
        width: 64px;
        padding: 2px 10px;
        border-radius: 3px;
        background: #f16131;
        font-size: 16px;
      }
    }
  }
  .review_title {
    color: #f16131;
  }
}
</style>