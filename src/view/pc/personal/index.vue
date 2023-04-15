<template>
  <div class="back">
    <div class="deback">
      <el-menu text-color="#42B285" active-text-color="#42B285" mode="horizontal" style="width: 522.5px;height: 30px;">
        <el-menu-item index="1" style="height: 42px;margin-top: -15px;font-size:14px;">个人设置</el-menu-item>
      </el-menu>
      <div v-if="state==false" style="width: 400px;">
        <el-form ref='ruleForm' class="form_back" label-width="auto" label-suffix="" :model="ruleForm" :rules="rules" >
          <el-form-item label="登录名(手机号)" size="mini" style="margin: 5px 5px 5px 5px;" prop="username">
            <el-input v-model.number="ruleForm.username" size="mini"  name="username" label-width="300px" type="tel" placeholder="请输入手机号" >
            </el-input>
          </el-form-item>
          <el-form-item label="真实姓名" size="mini" style="margin: 15px 5px 5px 5px;" prop="nickname">
            <el-input v-model="ruleForm.nickname" size="mini" name="nickname" label-width="300px" placeholder="请输入真实姓名"
                      readonly>
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码" size="mini" style="margin: 15px 5px 5px 5px;" prop="password">
            <el-input v-model="ruleForm.password" size="mini" name="password" show-password label-width="300px" type="password" placeholder="至少8位，由数字和字母组成" autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" size="mini" style="margin: 15px 5px 5px 5px;" prop="password_again">
            <el-input title="确认密码" v-model="ruleForm.password_again" size="mini" show-password name="password_again" label-width="7.5em" type="password" placeholder="请确认密码" autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" size="mini" style="margin: 15px 5px 5px 5px;" prop="identity">
            <el-select v-model="ruleForm.identity" size="mini" placeholder="请选择身份" >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称" size="mini" style="margin: 15px 5px 5px 5px;" prop="title">
            <el-input v-model="ruleForm.title" name="title" size="mini" label-width="7.5em" placeholder="请输入职称" ></el-input>
          </el-form-item>
          <el-form-item label="学校(单位)" size="mini" style="margin: 15px 5px 5px 5px;;" prop="school">
            <el-input v-model="ruleForm.school" name="school" size="mini" label-width="7.5em" placeholder="请输入学校或单位"
            ></el-input>
          </el-form-item>
          <el-form-item label="学院(部门)" size="mini" style="margin: 15px 5px 5px 5px;" prop="college">
            <el-input v-model="ruleForm.college" name="college" size="mini" label-width="7.5em" placeholder="请输入学院或部门"
            ></el-input>
          </el-form-item>
          <el-form-item label="专业" size="mini" style="margin: 15px 5px 5px 5px;">
            <el-input v-model="ruleForm.major" name="major" size="mini" label-width="7.5em" placeholder="请输入专业"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" size="mini" style="margin: 15px 5px 5px 5px;">
            <el-input v-model="ruleForm.email" name="email" size="mini" label-width="7.5em" placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <div style="display: flex;margin-left: 50px;">
            <el-button type="primary" size="mini" class="edit" block @click="Return">返回</el-button>
            <el-button type="primary" size="mini" @click="submit('ruleForm')"  class="edit2"  block :loading="loading" loading-text="跳转中...">提交</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="state==true" style="height: calc(100% - 0px);">
        <template>
          <el-descriptions class="margin-top" :column="1" :colon="false">
            <el-descriptions-item label=" 登录名(手机号)" class="item"><span class="span1">*</span><div style="margin-left: 30px;font-size: 13px;">{{ this.ruleForm.username }}</div></el-descriptions-item>
            <el-descriptions-item label=" 真实姓名" class="item"><span class="span1">*</span><div style="margin-left: 70px;margin-top: -30px;font-size: 13px;">{{ this.ruleForm.nickname }}</div></el-descriptions-item>
            <!-- <el-descriptions-item label=" 登陆密码" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.password }}</div></el-descriptions-item> -->
            <el-descriptions-item label=" 用户身份" class="item"><span class="span1">*</span><div style="margin-left: 70px;font-size: 13px;">{{ this.ruleForm.identity }}</div></el-descriptions-item>
            <el-descriptions-item label=" 职称/职务" class="item"><div style="margin-left: 72px;font-size: 13px;">{{ this.ruleForm.title }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学校(单位)" class="item"><span class="span1">*</span><div style="margin-left: 60px;font-size: 13px;">{{ this.ruleForm.school }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学院(部门)" class="item"><span class="span1">*</span><div style="margin-left: 60px;font-size: 13px;">{{ this.ruleForm.college }}</div></el-descriptions-item>
            <el-descriptions-item label=" 专业" class="item"><div style="margin-left: 102px;font-size: 13px;">{{ this.ruleForm.major }}</div></el-descriptions-item>
            <el-descriptions-item label=" 邮箱" class="item"><div style="margin-left: 102px;">{{ this.ruleForm.email }}</div></el-descriptions-item>
          </el-descriptions>
          <el-button class="edit" size="mini" @click="edit">修改设置</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mineInfo,mineEdit } from '@/api/mine'
// import { config } from 'vue/types/umd';

export default {
  name: "Personal",
  data () {
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.ruleForm.password) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      state:true,
      ruleForm:{
        nickname: '',
        username: '',
        title: '',
        college: '',
        school: '',
        identity: '',
        major: '',
        email: '',
        password: '',
        password_again: '',
      },
      pass:'0',
      loading: false,
      // columns: [{ id: 0, text: '教师' }, { id: 1, text: '学生' }, { id: 2, text: '企业人员' }, { id: 3, text: '其他' }],
      value: '',
      options: [{
        value: '教师',
        label: '教师'
      }, {
        value: '学生',
        label: '学生'
      }, {
        value: '企业人员',
        label: '企业人员'
      }, {
        value: '其他',
        label: '其他'
      }],
      rules:{
        username:[{ required: true,message: '手机号不能为空', trigger: "blur" }],
        nickname:[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        password:[{ required: false },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' , trigger: 'blur'}],
        password_again:[{ required: false ,message: '请再次输入密码',},{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        identity:[{ required: true, message: '您还未选择身份', trigger: 'blur' }],
        title:[{ required: true, message: '还未输入您的职称', trigger: 'blur' }],
        school:[{ required: true, message: '还未输入您的学校或单位', trigger: 'blur' }],
        college:[{ required: true, message: '还未输入您的学院或部门', trigger: 'blur'  }],
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    submit(formName){
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.onsub()
        } else {
          return false
        }
      })
    },
    onsub(){
      this.loading = true
      const values = {}
      if(this.ruleForm.username){
        // console.log(username)
        values.username = this.ruleForm.username
      }
      if(this.ruleForm.nickname){
        values.nickname = this.ruleForm.nickname
      }
      if(this.ruleForm.password){
        console.log('得到了密码')
        if(this.ruleForm.password == this.ruleForm.password_again){
          values.password = this.ruleForm.password
          console.log(values.password)
        }else{
          this.loading = false
          this.ruleForm.password_again=''
          this.$alert('两次密码输入不一致！')
        }
      }
      if(this.ruleForm.identity){
        values.identity = this.ruleForm.identity
      }
      if(this.options.value){
        values.title = this.options.value
      }
      if(this.ruleForm.sms){
        values.sms = this.ruleForm.sms
      }
      if(this.ruleForm.title){
        values.title = this.ruleForm.title
      }
      if(this.ruleForm.school){
        values.school = this.ruleForm.school
      }
      if(this.ruleForm.college){
        values.college = this.ruleForm.college
      }
      if(this.ruleForm.major){
        values.major = this.ruleForm.major
      }
      if(this.ruleForm.email){
        values.email = this.ruleForm.email
      }
      if(this.ruleForm.password == this.ruleForm.password_again){
        console.log('密码一致')
        mineEdit(values).then(res => {
          console.log(res)
          this.loading = false
          console.log('提交成功')
          this.$toast.success('提交成功')
          this.state=true
        }).catch(() => {
          this.loading = false
          this.getData()
        })
      }else{
        this.$notify('两次输入的密码不一致')
        this.loading = false
      }
    },
    getData () {
      mineInfo().then(res => {
        this.ruleForm.username = res.data.username
        this.ruleForm.nickname = res.data.nickname
        // this.ruleForm.password = res.data.password
        this.ruleForm.identity = res.data.identity
        this.ruleForm.title = res.data.title
        this.ruleForm.school = res.data.school
        this.ruleForm.college = res.data.college
        this.ruleForm.major = res.data.major
        this.ruleForm.email = res.data.email
      })
    },
    edit(){
      this.state=false
    },
    Return(){
      this.state=true
    },
  }
}
</script>

<style lang="less" scoped>
.back {
  // margin-left: 200px;
  // width: 973px;
  height: calc(100% - 0px);
  display: flex;
  // transform: translate(-7px,-391px);
  // transform-origin: left top;
  flex-direction: column;
  background: white;
  // overflow:hidden;
  // margin-top: 15px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .deback{
    flex-direction: column;
    height: 800px;
    display: flex;
    overflow-x:hidden;
    width: 103%;
  }
  .form_back {
    margin-top: 15px;
  }
  .login_btn {
    border-radius: 5px;
  }
  .register_btn1{
    width: 70px;
    border-radius: 5px;
    margin-top: -5px;
    left: 115px;
    height: 25px;
    background-color: #42B285;
  }
  .register_btn2{
    width: 70px;
    border-radius: 5px;
    margin-top: -5px;
    left: 145px;
    height: 25px;
    background-color: #42B285;
  }
  .register_btn{
    width: 100px;
    border-radius: 5px;
    margin-top: -5px;
    left: 150px;
    height: 30px;
  }
}

.margin-top{
  margin-top: 5px;
  margin-left: 30px;
  .item{
    .item.el-form-item__label{
      font-size: 13px;
    }
  }

}
.label{
  width: 100px;
  .icon::after {
    content: '* ';
    color: red;
  }
}
.edit{
  margin-left: 30px;
  font-size: 14px;
  background-color: #42B285;
  color: white;
}
.edit2{
  margin-left: 60px;
  font-size: 14px;
  background-color: #42B285;
  color: white;
}
.span1{
  color: red;
  height: 13px;
}
.span2{
  margin-left: 10px;
  margin-right: 10px;
  // font-size: 15px;
  font-weight:300
}
:deep(.el-input__inner){
  border: 0px;
}
:deep(.van-nav-bar__title) {
  font-size: 20px;
  color: var(--themeColor);
  color: black;
}
:deep(.van-nav-bar__arrow) {
  color: black;
  font-size: 20px;
}
:deep(.van-nav-bar__arrow) {
  font-size: 30px;
  color: black !important;
}

.message_box_alert {
  word-break: break-all !important;
  color: #42B285;
}
</style>