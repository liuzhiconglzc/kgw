<template>
    <div>
      <div style="overflow-y:scroll;overflow-x:hidden;height:700px">
      <div style="background: #f9f9f9;position: relative;height: 1080px">
        <div class="back">
          <van-nav-bar :border="false" left-arrow fixed @click-left="goBack">
            <template #title>
              <div :class="{'review_title': state == 3}">{{pageTitle}}</div>
            </template>
          </van-nav-bar>
          <!--        <div style="width:600px;height:100%;margin-left: 50px;background: white">-->
          <div style="width: 50%;margin-left: 25%;background: white;position: relative">
            <!--            <div class="publish" v-if="bol">-->
            <!--              <el-button style="position:absolute; width: 108px; height: 32px; margin-top: 30px; margin-left: 10px;" :src="require('@/assets/pc/view_add.png')" @click="publish"/>-->
            <div style="color: #42b285; font-size: small; font-weight: bold;position: relative">
              <div style="margin-left: 230px;transform: translateY(15px);position: relative">
                发布问题
              </div>
              <el-image style="width: 10px; height: 10px; margin-left: 288px;position: relative" :src="require('@/assets/pc/pen.png')"/>
              <div>
                <div style="margin-top: 10px; font-size: small; line-height: 200%; text-align: center; border-radius:2px; background-color: #42b285; color: white;height: 30px; width: 80px;position: relative">问题题目</div>
                <div style="display: inline-block;margin-left: 79px;width: 425px;border:1px solid #ddd;height: 28px;transform: translateY(-30px)">
                  <el-input style="display: inline-block" size="mini" maxlength="25" show-word-limit placeholder="请输入问题，以问号结束(25字以内)" v-model="title">
                  <!--            <template slot="prepend">问题题目</template>-->
                </el-input>
                </div>
              </div>
              <div style="margin-top: -30px">
                <div style="display: inline-block; margin-top: 10px; font-size: small; line-height: 200%; text-align: center; border-radius:2px; background-color: #42b285; color: white;height: 30px; width: 80px;position: relative">专业分类</div>
                <div style="display: inline-block;width: 300px;position: relative">
<!--                  <el-select filterable clearable remote reserve-keyword v-model="professionNames" multiple  placeholder="请选择专业分类（可多选）" collapse-tags-->
<!--                             style="width: 200px;font-weight: bold;position: relative">-->
<!--&lt;!&ndash;                    multiple-limit="3"&ndash;&gt;-->
<!--                    <el-option-->
<!--                        v-for="item in options"-->
<!--                        :key="item.value"-->
<!--                        :label="item.label"-->
<!--                        :value="item.value">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
                  <van-field  style=" height: 30px;transform: translateY(9px);" readonly is-link :value="professionNames" rows="1" autosize type="textarea"
                             placeholder="请选择专业分类（可多选）" @click="topClick" />
                </div>
                <el-image style="position: absolute;width: 14px;margin-left: -30px;transform: translateY(23px);pointer-events:none" :src="require('@/assets/pc/triangle.png')"/>
              </div>
            </div>
            <div style="margin-top: 10px; font-size: small; line-height: 200%; text-align: center; border-radius:2px; background-color: #42b285; color: white;height: 30px; width: 80px;position: relative">问题描述</div>
            <div style="height: 25px;margin-top: 5px; font-size: xx-small; background: linear-gradient(to right, #42b285 0%, white 60%);border-left:1px solid #ddd;border-top:1px solid #ddd;border-right:1px solid #ddd; color: white;position: relative"><div style="margin-left: 10px;transform: translateY(5px)">社会现实场景</div></div>
            <el-input
                type="textarea"
                placeholder="“社会现实场景”具体描述(不超过200字)"
                v-model="realityScene"
                maxlength="200"
                :rows="5"
                resize='none'
            >
            </el-input>
            <div style="height: 25px;;font-size: xx-small; background: linear-gradient(to right, #42b285 0%, white 60%);border-left:1px solid #ddd;border-right:1px solid #ddd; color: white;position: relative"><div style="margin-left: 10px;transform: translateY(5px)">真实问题</div></div>
            <el-input
                type="textarea"
                placeholder="“真实问题”具体描述(不超过100字)"
                v-model="specific"
                maxlength="100"
                :rows="5"
                resize='none'
            >
            </el-input>
            <div style="border:1px solid #ddd;height: 50px;border-radius: 3px;position: relative;color: #b2b2b2">
<!--              <div class="image">-->
                <van-uploader v-model="imageList" max-count="3" :max-size="1024 * 1024" @oversize="onOversize"
                              :after-read="afterRead" upload-icon="">
                  <el-image style="height: 53px;width: 84px;margin-left: -2px;margin-top: -2px" :src="require('@/assets/pc/add.png')">
                  </el-image>
              </van-uploader>
              <div style="display: inline-block;margin-left: 15px;transform: translateY(-20px)">可添加"问题描述"图片(不超过3张)</div>
<!--              </div>-->
<!--              <el-upload-->
<!--                  v-model="imageList"-->
<!--                  class="upload-demo"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->

<!--                  @oversize="onOversize"-->
<!--                  multiple>-->
<!--                <el-image style="width: 31px;position: relative" :src="require('@/assets/pc/add.png')"/>-->
<!--                <div style="display: inline-block;font-size: xx-small;font-weight: bold;font-family: normal;color: #c8c8c8;transform: translateY(-12px);margin-left: 5px;position: relative"><em>可添加"问题描述"图片(不超过3张)&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160</em></div>-->
<!--                &lt;!&ndash;                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;-->
<!--              </el-upload>-->
            </div>
            <el-button @click="publishClick" style="margin-top: 15px; margin-left: 220px; font-size: small; line-height: 15%; border-radius:2px; background-color: #42b285; color: white;height: 27px; width: 80px;display: inline-block">
              <div style="margin-left: -7px">提交发布</div>
            </el-button>
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
          <el-dropdown-menu style="margin-left: 335px;margin-top: 115px;width: 270px;height: 330px" v-model="showProfessionPicker" round position="bottom">
            <van-tree-select style="margin-top: -12px" :items="classifyItems" :main-active-index.sync="activeIndex" :active-id.sync="tempIds"
                             @click-item="professionClick" />

            <div style="margin-top: 20px;display: inline-block">
              <div style="margin-left: 180px;transform: translateY(-7px)" @click="cancelClick">取消</div>
<!--              <div style="display: inline-block;">选择专业</div>-->
              <div style="display: inline-block;margin-left: 50px;transform: translateY(-28px)" @click="doneClick">确认</div>
            </div>
          </el-dropdown-menu>
          <van-popup v-model="showStatePicker" round position="bottom">
            <van-picker show-toolbar title="审核状态" :columns="stateList" @cancel="stateCancel" @confirm="stateDone" />
          </van-popup>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { questionDetail, classifyList, uploadImage, questionAdd, questionUpdate } from '@/api/question'
import forbiddenArray from "@/utils/badword";
import {Notify} from "vant";
// Vue.use(Notify)
export default {
  name: "Publish",
  data() {
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
      fromWechat: false,
      bol: false,
      input1: '',
      textarea: '',
      textarea1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1: [],
      value2: []
    }
  },
  created () {
  //   this.state = this.$route.query.state
  //   this.proId = this.$route.query.proId
  //   switch (parseInt(this.state)) {
  //     case 1:
  //     case 2:
  //       this.pageTitle = '问题编辑'
  //       document.title = '问题编辑'
  //       break
  //     case 3:
  //       this.pageTitle = '待审核问题'
  //       document.title = '待审核问题'
  //       break
  //     default:
  //       this.pageTitle = '问题发布'
  //       document.title = '问题发布'
  //       break
  //   }
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
    publishClick() {
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
        // Notify('通知内容');
      } else {
        this.questionUpdate()
      }
    },
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

<style scoped>
.index{
  width:100%;
}
.back {
  /*//margin-top: 80px;*/
  /*//margin-left:720px;*/
  /*//background: white;*/
  /*//width: 30%;*/
  /*//height: 50%;*/
  width: 80%;
  height: 100%;
  margin: 0 0 0 130px;
  background: white;
  position: relative;
}
.publish{
  background-color: white;
  width: 810px;
  height: 810px;
  margin: 10px auto auto;
}
:deep(.el-input__inner) {
  height: 28px;
  border: 0px
}

:deep(input::-webkit-input-placeholder) {
  font-size: 12px;
}
</style>