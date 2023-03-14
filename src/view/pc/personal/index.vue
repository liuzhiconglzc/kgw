<template>
  <div class="back">
    <div class="deback">
      <el-menu text-color="#42B285" active-text-color="#42B285" mode="horizontal" style="width: 700px;">
          <el-menu-item index="1" style="height: 50px;margin-top: -10px;font-weight:bold;font-size:16px;">个人资料</el-menu-item>
      </el-menu>
      <div v-if="state==false" style="width: 400px;">
        <el-form ref='ruleForm' class="form_back" label-width="auto" label-suffix="" :model="ruleForm" :rules="rules" >
          <el-form-item label="登录名(手机号)" style="margin: 15px 15px 15px 15px;" prop="username">
            <el-input v-model.number="ruleForm.username" :rows="5" name="username" label-width="300px" type="tel" placeholder="请输入手机号" >
            </el-input>
          </el-form-item>
          <!-- <van-field v-model="username" name="username" label-width="7.5em" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
            readonly /> -->
          <el-form-item label="真实姓名" style="margin: 15px;" prop="nickname">
            <el-input v-model="ruleForm.nickname" name="nickname" label-width="300px" placeholder="请输入真实姓名"
             readonly>
            </el-input>
          </el-form-item>
          <!-- <van-field v-model="nickname" name="nickname" label-width="7.5em" label="真实姓名*" placeholder="请输入真实姓名"
            :rules="[{ required: true }]" readonly /> -->
          <el-form-item label="设置密码" style="margin: 15px;" prop="password">
            <el-input v-model="ruleForm.password" name="password" show-password label-width="300px" type="password" placeholder="至少8位，由数字和字母组成" autocomplete="off" 
            >
            </el-input>
          </el-form-item>
          <!-- <van-field v-model="password" name="password" label-width="7.5em" type="password" label="设置密码" placeholder="至少8位，由数字和字母组成" autocomplete="off"
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]"
          /> -->
          <el-form-item label="确认密码" style="margin: 15px;" prop="password_again">
            <el-input title="确认密码" v-model="ruleForm.password_again" show-password name="password_again" label-width="7.5em" type="password" placeholder="请确认密码" autocomplete="off"
            ></el-input>
          </el-form-item>

          <!-- <van-field v-model="password_again" name="password_again" label-width="7.5em" type="password" label="确认密码" placeholder="请确认密码" autocomplete="off"
            :rules="[
                  { required: false },
                  { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
                  ]"
          /> -->
          <!-- <van-field v-model="identity" is-link readonly name="identity" label-width="7.5em" label="身份*" placeholder="点击选择身份"
            @click="showPicker = true" :rules="[{ required: true }]" /> -->
          <el-form-item label="身份" style="margin: 15px;" prop="identity">
            <el-select v-model="ruleForm.identity" placeholder="请选择身份" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <van-field v-model="title" name="title" label-width="7.5em" label="职称" placeholder="请输入职称" /> -->
          <el-form-item label="职称" style="margin: 15px;" prop="title">
            <el-input v-model="ruleForm.title" name="title" label-width="7.5em" placeholder="请输入职称" ></el-input>
          </el-form-item>

          <!-- <van-field v-model="school" name="school" label-width="7.5em" label="学校(单位)*" placeholder="请输入学校或单位"
            :rules="[{ required: true }]" /> -->
          <el-form-item label="学校(单位)" style="margin: 15px;" prop="school">
            <el-input v-model="ruleForm.school" name="school" label-width="7.5em" placeholder="请输入学校或单位"
            ></el-input>          
          </el-form-item>

          <!-- <van-field v-model="college" name="college" label-width="7.5em" label="学院(部门)*" placeholder="请输入学院或部门"
            :rules="[{ required: true }]" /> -->
          <el-form-item label="学院(部门)" style="margin: 15px;" prop="college">
            <el-input v-model="ruleForm.college" name="college" label-width="7.5em" placeholder="请输入学院或部门"
              ></el-input>          
          </el-form-item>

          <!-- <van-field v-model="major" name="major" label-width="7.5em" label="专业" placeholder="请输入专业" /> -->
          <el-form-item label="专业" style="margin: 15px;">
            <el-input v-model="ruleForm.major" name="major" label-width="7.5em" placeholder="请输入专业"></el-input>
          </el-form-item>

          <!-- <van-field v-model="email"  name="email" label-width="7.5em" label="邮箱" placeholder="请输入邮箱" />  -->
          <el-form-item label="邮箱" style="margin: 15px;">
          <el-input v-model="ruleForm.email" name="email" label-width="7.5em" placeholder="请输入邮箱"></el-input>            
          </el-form-item>
          <!-- <van-popup v-model="showPicker" round position="bottom">
            <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
          </van-popup> -->
          <div style="margin: 16px;display: flex;">
            <van-button class="register_btn1" color="var(--themeColor)" block @click="Return">返回</van-button>
            <!-- <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
              native-type="submit">提交修改
            </van-button> -->
            <el-button type="primary" @click="submit('ruleForm')" style="display: flex;border-radius: 5px;width: 70px;height: 30px;margin-top: -5px;margin-left: 135px;background-color: #42B285;line-height: 5px;text-align: center;"  block :loading="loading" loading-text="跳转中...">提交</el-button>      
          </div>
        </el-form>
      </div>
      <div v-if="state==true" style="height: calc(100% - 0px);">
        <template>
          <el-descriptions class="margin-top" :column="1" :colon="false">
            <el-descriptions-item label=" 登录名(手机号)"><span class="span1">*</span><div style="margin-left: 30px;">{{ this.ruleForm.username }}</div></el-descriptions-item>
            <el-descriptions-item label=" 真实姓名" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.ruleForm.nickname }}</div></el-descriptions-item>
            <!-- <el-descriptions-item label=" 登陆密码" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.password }}</div></el-descriptions-item> -->
            <el-descriptions-item label=" 用户身份" ><span class="span1">*</span><div style="margin-left: 70px;">{{ this.ruleForm.identity }}</div></el-descriptions-item>
            <el-descriptions-item label=" 职称/职务"><div style="margin-left: 72px;">{{ this.ruleForm.title }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学校(单位)" ><span class="span1">*</span><div style="margin-left: 60px;">{{ this.ruleForm.school }}</div></el-descriptions-item>
            <el-descriptions-item label=" 学院(部门)" ><span class="span1">*</span><div style="margin-left: 60px;">{{ this.ruleForm.college }}</div></el-descriptions-item>
            <el-descriptions-item label=" 专业"><div style="margin-left: 102px;">{{ this.ruleForm.major }}</div></el-descriptions-item>
            <el-descriptions-item label=" 邮箱"><div style="margin-left: 102px;">{{ this.ruleForm.email }}</div></el-descriptions-item>
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
        password:[{ required: false },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        password_again:[{ required: false },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
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
          if (valid) {
            this.onsub()
          } else {
              // this.$alert('请按照提示正确输入!!!')
              // this.$message({
              //     duration: 3000,
              //     content: '请按照提示正确输入'
              // });
              return false
          }
      })    
    },
    onsub(){
      this.loading = true
      const values = {}
      if(this.ruleForm.username){
        values.username = this.username
      }
      if(this.ruleForm.nickname){
        values.nickname = this.nickname
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
          if(res){
            this.loading = false
            this.$toast.success('修改成功')
            this.Return()
            // this.getDetail()
          }else{
            this.loading = false
            this.$alert('请按照提示正确输入!!')
          }
          })        
      }
    },
    getData () {
      mineInfo().then(res => {
        this.ruleForm.username = res.data.username
        this.ruleForm.nickname = res.data.nickname
        this.ruleForm.password = res.data.password
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
  
  .message_box_alert {
      word-break: break-all !important;
      color: #42B285;
  }
</style>