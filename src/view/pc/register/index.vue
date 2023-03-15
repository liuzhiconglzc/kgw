<template>
  <!-- <div style="width:40%;height:30%;background: #f9f9f9;position: relative"> -->
    <div class="back">

      <!-- <van-nav-bar title="注册" :border="false" left-arrow fixed @click-left="goBack">
      </van-nav-bar> -->
      <!-- <div class="title">*必填</div> -->
      <div class="de_back">
        <el-menu text-color="#42B285" active-text-color="#42B285" mode="horizontal">
          <el-menu-item index="1" style="height: 50px;margin-top: -10px;font-weight:bold;font-size:16px;">注册账号</el-menu-item>
          <button class="button" style="vertical-align:middle" @click="goBack"><span>返回</span></button>
        </el-menu>
        <!-- <van-form @submit="onSubmit" class="form_back">
          <van-field v-model="username" name="username" label-width="100px" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
            :rules="telRules" />
          <van-field v-model="password" name="password" label-width="7.5em" type="password" label="密码*" placeholder="至少8位，由数字和字母组成" autocomplete="off"
            :rules="pwRules" />
          <van-field v-model="password_again" name="password_again" label-width="7.5em" type="password" label="确认密码*" placeholder="请再次输入密码" autocomplete="off"
            :rules="[{ required: true }]" />
          <van-field v-model="nickname" name="nickname" label-width="7.5em" label="真实姓名*" placeholder="请输入真实姓名"
            :rules="[{ required: true }]" />
          <van-field v-model="identity" is-link readonly name="identity" label-width="7.5em" label="身份*" placeholder="点击选择身份"
            @click="showPicker = true" :rules="[{ required: true }]" />
          <van-field v-model="title" name="title" label-width="7.5em" label="职称" placeholder="请输入职称" />
          <van-field v-model="school" name="school" label-width="7.5em" label="学校(单位)*" placeholder="请输入学校或单位"
            :rules="[{ required: true }]" />
          <van-field v-model="college" name="college" label-width="7.5em" label="学院(部门)*" placeholder="请输入学院或部门"
            :rules="[{ required: true }]" />
          <van-field v-model="major" name="major" label-width="7.5em" label="专业" placeholder="请输入专业" />
          <van-field v-model="email" name="email" label-width="7.5em" label="邮箱" placeholder="请输入邮箱" />
          <van-popup v-model="showPicker"  position="center" style="width: 250px;height: 100px;">
            <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
          </van-popup>
          <van-field v-model="sms" name="sms" label-width="7.5em" label="验证码*" placeholder="请输入验证码"
            :rules="[{ required: true }]" />
          <div class="img">
            <van-image :src="this.img" @click="imageClick"></van-image>
          </div> 
          <div style="margin: 16px;">
            <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
              native-type="submit">注册
            </van-button>
          </div>
        </van-form> -->
        <el-form ref='ruleForm' class="form_back" label-width="auto" label-suffix="" :model="ruleForm" :rules="rules" >
          <el-form-item label="登录名(手机号)" style="margin: 15px 15px 15px 15px;" prop="username">
            <el-input v-model.number="ruleForm.username" :rows="5" name="username" label-width="300px" type="tel" placeholder="请输入手机号" >
            </el-input>
          </el-form-item>
          <el-form-item label="真实姓名" style="margin: 15px;" prop="nickname">
            <el-input v-model="ruleForm.nickname" name="nickname" label-width="300px" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码" style="margin: 15px;" prop="password">
            <el-input v-model="ruleForm.password" name="password" show-password label-width="300px" type="password" placeholder="至少8位，由数字和字母组成" autocomplete="off" 
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" style="margin: 15px;" prop="password_again">
            <el-input title="确认密码" v-model="ruleForm.password_again" show-password name="password_again" label-width="7.5em" type="password" placeholder="请确认密码" autocomplete="off"
            ></el-input>
          </el-form-item>
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
          <el-form-item label="职称" style="margin: 15px;" prop="title">
            <el-input v-model="ruleForm.title" name="title" label-width="7.5em" placeholder="请输入职称" ></el-input>
          </el-form-item>
          <el-form-item label="学校(单位)" style="margin: 15px;" prop="school">
            <el-input v-model="ruleForm.school" name="school" label-width="7.5em" placeholder="请输入学校或单位"
            ></el-input>          
          </el-form-item>
          <el-form-item label="学院(部门)" style="margin: 15px;" prop="college">
            <el-input v-model="ruleForm.college" name="college" label-width="7.5em" placeholder="请输入学院或部门"
              ></el-input>          
          </el-form-item>
          <el-form-item label="专业" style="margin: 15px;">
            <el-input v-model="ruleForm.major" name="major" label-width="7.5em" placeholder="请输入专业"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style="margin: 15px;">
            <el-input v-model="ruleForm.email" name="email" label-width="7.5em" placeholder="请输入邮箱"></el-input>            
          </el-form-item>
          <el-form-item label="验证码" style="margin: 15px;">
            <el-input v-model="ruleForm.sms" name="sms" label-width="7.5em" placeholder="请输入验证码"></el-input>            
          </el-form-item>
          <div class="img">
            <van-image :src="this.img" @click="imageClick"></van-image>
          </div> 
          <div style="margin: 16px;display: flex;">
            <!-- <van-button class="register_btn1" color="var(--themeColor)" block @click="Return">返回</van-button> -->
            <el-button type="primary" @click="submit('ruleForm')" style="display: flex;border-radius: 5px;width: 80px;height: 40px;margin-top: 5px;margin-left: 110px;background-color: #42B285;line-height: 18px;font-size: larger;"  block :loading="loading" loading-text="跳转中...">提交</el-button>      
          </div>
        </el-form>
      </div>
    
    </div>
  <!-- </div> -->

</template>

<script>
import { captchaImage, register } from '@/api/register'

export default {
  name: "Register",
  data () {
    return {
      ruleForm:{
        nickname: '',
        username: '',
        password: '',
        password_again: '',
        title: '',
        sms: '',
        college: '',
        school: '',
        identity: '',
        major: '',
        email: '',
      },
      img: '',
      loading: false,
      showPicker: false,
      uuid: '',
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
        username:[{ required: true},{pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ ,message: '请输入正确格式的手机号码', trigger: "blur" }],
        nickname:[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        password:[{ required: false },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        password_again:[{ required: false },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        identity:[{ required: true, message: '您还未选择身份', trigger: 'blur' }],
        title:[{ required: true, message: '还未输入您的职称', trigger: 'blur' }],
        school:[{ required: true, message: '还未输入您的学校或单位', trigger: 'blur' }],
        college:[{ required: true, message: '还未输入您的学院或部门', trigger: 'blur'  }],
        sms:[{ required: true, message: '还未输入验证码', trigger: 'blur'  }]
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
              return false
          }
      })    
    },
    onsub(){
      this.loading = true
      const values = {}
      values.uuid = this.uuid
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
        register(values).then(res => {
          this.loading = false
          console.log('注册成功')
          this.$toast.success('注册成功')
          this.goBack()
        }).catch(() => {
          this.loading = false
          this.getData()
        })      
      }else{
        this.$notify('两次输入的密码不一致')
        this.loading = false
      } 
    },
    goBack () {
      const replace = this.$route.params.replace
      this.$router.replace({ name: 'Login', params: { replace: replace } })
    },
    // onSubmit (values) {
    //   // const params = values
    //   values.uuid = this.uuid
    //   this.loading = true
    //   if(this.password == this.password_again){
    //     register(values).then(res => {
    //       this.loading = false
    //       this.$toast.success('注册成功')
    //       this.goBack()
    //     }).catch(() => {
    //       this.loading = false
    //       this.getData()
    //     })
    //   }else{
    //     this.$notify('两次输入的密码不一致')
    //     this.loading = false
    //   }         
    // },
    onCancel () {
      this.showPicker = false
    },
    onConfirm (value) {
      this.identity = value.text
      this.showPicker = false
    },
    imageClick (){
      this.getData()
    },
    getData () {
      captchaImage().then(res => {
        this.img = "data:image/gif;base64," + res.img;
        this.uuid = res.uuid
      })  
    }
  }
}
</script>

<style lang="less" scoped>
.back {
  margin-left: -300px;
  position: fixed;
  left: 55%;
  width: 40%;
  height: calc(100% - -0px);
  background: white;
  position: relative;
  display: flex;
  margin-top: 15px;
  // overflow: hidden;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .de_back{
    overflow-x:hidden;
    height: calc(100% - -0px);
    width: 100%;
    .form_back {
    width: 100%;
    // overflow:hidden;
    // display: auto;
    // height: calc(100% - -350px);
    // flex-direction: column;
    background: white;
    // margin-top: 15px;
    // width: 105%;
    // position: relative;
    // transform: translate(0%,0%);
    // transform-origin: left top;
  }
  .button {
        display: inline-block;
        border-radius: 4px;
        background-color: #42B285;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 14px;
        padding: 2px;
        width: 70px;
        height: 25px;
        margin-top: 5px;
        transition: all 0.5s;
        cursor: pointer;
        margin-left: 250px;
        
      }

      .button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
      }

      .button span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
      }

      .button:hover span {
        padding-right: 25px;
      }

      .button:hover span:after {
        opacity: 1;
        right: 0;
      }
  }
  .title {
    color: var(--themeColor);
    font-size: 13px;
    // margin-top: 5px;
    text-align: center;
    // padding: 0px 18px;
  }

  .login_btn {
    border-radius: 5px;
  }
  .register_btn{
    border-radius: 5px;
    margin-top: 10px;
  }
  .img{
    width: 110px;
    height: 30px;
    margin-left: 8.0em;
    margin-top: 5px;
  }
}
:deep(.van-nav-bar__title) {
  font-size: 20px;
  color: var(--themeColor);
}
:deep(.van-nav-bar__arrow) {
  color: black;
  font-size: 20px;
}
*::-webkit-scrollbar {
  display: none;
}
</style>