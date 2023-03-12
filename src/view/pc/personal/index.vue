<template>
  <div class="back">
    <div>
      <el-menu :default-active="1" text-color="#42B285" active-text-color="#42B285" mode="horizontal" @select="handleSelect" style="width: 700px;">
          <el-menu-item index="1" style="height: 50px;margin-top: -10px;font-weight:bold;font-size:16px;">个人资料</el-menu-item>
      </el-menu>
      <div v-if="state==false" style="width: 400px;">
        <el-form ref='ruleForm' class="form_back" label-width="auto" label-suffix="">
          <el-form-item label="登录名(手机号)" style="margin: -15px 5px 5px 5px;">
            <el-input v-model="username" :rows="5" name="username" label-width="300px" type="tel" placeholder="请输入手机号" :rules="[{ required: true, message: '手机号不能为空', trigger: 'blur' }]">
            </el-input>
          </el-form-item>
          <!-- <van-field v-model="username" name="username" label-width="7.5em" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
            readonly /> -->
          <el-form-item label="真实姓名" style="margin: 5px;">
            <el-input v-model="nickname" name="nickname" label-width="300px" placeholder="请输入真实姓名"
            :rules="[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }]" readonly>
            </el-input>
          </el-form-item>
          <!-- <van-field v-model="nickname" name="nickname" label-width="7.5em" label="真实姓名*" placeholder="请输入真实姓名"
            :rules="[{ required: true }]" readonly /> -->
          <el-form-item label="设置密码" style="margin: 5px;">
            <el-input v-model="password" name="password" show-password label-width="300px" type="password" placeholder="至少8位，由数字和字母组成" autocomplete="off" 
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]">
                  </el-input>
          </el-form-item>
          <!-- <van-field v-model="password" name="password" label-width="7.5em" type="password" label="设置密码" placeholder="至少8位，由数字和字母组成" autocomplete="off"
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]"
          /> -->
          <el-form-item label="确认密码" style="margin: 5px;">
            <el-input title="确认密码" v-model="password_again" show-password name="password_again" label-width="7.5em" type="password" placeholder="请确认密码" autocomplete="off"
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]"></el-input>
          </el-form-item>

          <!-- <van-field v-model="password_again" name="password_again" label-width="7.5em" type="password" label="确认密码" placeholder="请确认密码" autocomplete="off"
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]"
          /> -->
          <!-- <van-field v-model="identity" is-link readonly name="identity" label-width="7.5em" label="身份*" placeholder="点击选择身份"
            @click="showPicker = true" :rules="[{ required: true }]" /> -->
          <el-form-item label="身份" style="margin: 5px;">
            <el-select v-model="identity" placeholder="请选择身份" :rules="[{ required: true, message: '您还未选择身份', trigger: 'blur' }]">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>

          <!-- <van-field v-model="title" name="title" label-width="7.5em" label="职称" placeholder="请输入职称" /> -->
          <el-form-item label="职称" style="margin: 5px;">
            <el-input v-model="title" name="title" label-width="7.5em" placeholder="请输入职称" :rules="[{ required: true, message: '还未输入您的职称', trigger: 'blur' }]"></el-input>
          </el-form-item>

          <!-- <van-field v-model="school" name="school" label-width="7.5em" label="学校(单位)*" placeholder="请输入学校或单位"
            :rules="[{ required: true }]" /> -->
          <el-form-item label="学校(单位)" style="margin: 5px;">
            <el-input v-model="school" name="school" label-width="7.5em" placeholder="请输入学校或单位"
            :rules="[{ required: true, message: '还未输入您的学校或单位', trigger: 'blur' }]"></el-input>          
          </el-form-item>

          <!-- <van-field v-model="college" name="college" label-width="7.5em" label="学院(部门)*" placeholder="请输入学院或部门"
            :rules="[{ required: true }]" /> -->
          <el-form-item label="学院(部门)" style="margin: 5px;">
          <el-input v-model="college" name="college" label-width="7.5em" placeholder="请输入学院或部门"
            :rules="[{ required: true, message: '还未输入您的学院或部门', trigger: 'blur'  }]"></el-input>          
          </el-form-item>

          <!-- <van-field v-model="major" name="major" label-width="7.5em" label="专业" placeholder="请输入专业" /> -->
          <el-form-item label="专业" style="margin: 5px;">
            <el-input v-model="major" name="major" label-width="7.5em" placeholder="请输入专业"></el-input>
          </el-form-item>

          <!-- <van-field v-model="email"  name="email" label-width="7.5em" label="邮箱" placeholder="请输入邮箱" />  -->
          <el-form-item label="邮箱" style="margin: 5px;">
          <el-input v-model="email" name="email" label-width="7.5em" placeholder="请输入邮箱"></el-input>            
          </el-form-item>
          <!-- <van-popup v-model="showPicker" round position="bottom">
            <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
          </van-popup> -->
          <div style="margin: 16px;display: flex;">
            <van-button class="register_btn1" color="var(--themeColor)" block @click="Return">返回</van-button>
            <!-- <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
              native-type="submit">提交修改
            </van-button> -->
            <el-button type="primary" @click="submit" style="display: flex;border-radius: 5px;width: 70px;height: 30px;margin-top: -5px;margin-left: 130px;background-color: #42B285;line-height: 5px;text-align: center;"  block :loading="loading" loading-text="跳转中...">提交</el-button>      
          </div>
        </el-form>
      </div>
      <div v-if="state==true">
        <template>
          <el-descriptions class="margin-top" :column="1" :colon="false">
            <el-descriptions-item label=" 登录名(手机号)"><span class="span1">*</span><div style="margin-left: 30px;">{{ this.username }}</div></el-descriptions-item>
            <el-descriptions-item label=" 真实姓名" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.nickname }}</div></el-descriptions-item>
            <!-- <el-descriptions-item label=" 登陆密码" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.password }}</div></el-descriptions-item> -->
            <el-descriptions-item label=" 用户身份" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.identity }}</div></el-descriptions-item>
            <el-descriptions-item label=" 职称/职务"><div style="margin-left: 72px;">{{ this.title }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学校(单位)" ><span class="span1">*</span><div style="margin-left: 60px;">{{ this.school }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学院(部门)" ><span class="span1">*</span><div style="margin-left: 60px;">{{ this.college }}</div></el-descriptions-item>
            <el-descriptions-item label=" 专业"><div style="margin-left: 102px;">{{ this.major }}</div></el-descriptions-item>
            <el-descriptions-item label=" 邮箱"><div style="margin-left: 102px;">{{ this.email }}</div></el-descriptions-item>
          </el-descriptions>
          <el-button class="edit" size="mini" @click="edit">修改设置</el-button>
        </template>
      </div>      
    </div> 
  </div>  
</template>

<script>
import { mineInfo,mineEdit } from '@/api/mine'

export default {
  name: "Personal",
  data () {
    return {
      state:true,
      nickname: '',
      username: '',
      title: '',
      loading: false,
      college: '',
      showPicker: false,
      school: '',
      identity: '',
      major: '',
      email: '',
      password: '',
      password_again: '',
      // columns: [{ id: 0, text: '教师' }, { id: 1, text: '学生' }, { id: 2, text: '企业人员' }, { id: 3, text: '其他' }],
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
        value: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    submit(){
      this.loading = true
      const values = {}
      if(this.username){
        values.username = this.username
      }
      if(this.nickname){
        values.nickname = this.nickname
      }
      if(this.password){
        if(this.password==this.password_again){
          values.password = this.password
        }
      }
      if(this.identity){
        values.identity = this.identity
      }
      if(this.options.value){
        values.title = this.options.value
      }
      if(this.school){
        values.school = this.school
      }
      if(this.college){
        values.college = this.college
      }
      if(this.major){
        values.major = this.major
      }
      if(this.email){
        values.email = this.email
      }
      mineEdit(values).then(res => {
        this.loading = false
        this.$toast.success('修改成功')
        // this.textarea = ''
        this.Return()
        this.getDetail()
      })        
    },
    getData () {
      mineInfo().then(res => {
        this.username = res.data.username
        this.nickname = res.data.nickname
        this.password = res.data.password
        this.identity = res.data.identity
        this.title = res.data.title
        this.school = res.data.school
        this.college = res.data.college
        this.major = res.data.major
        this.email = res.data.email
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
  overflow:hidden;
  // margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
    left: 100px;
    height: 30px;
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
  margin-top: 15px;
  margin-left: 30px;
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
  background-color: #42B285;
  color: white;
}
.span1{
        color: red;
    }
.span2{
  margin-left: 10px;
  margin-right: 10px;
  // font-size: 15px;
  font-weight:300
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
</style>