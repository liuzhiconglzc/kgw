<template>
    <div class="back">
      <van-nav-bar title="注册" :border="false" left-arrow fixed @click-left="goBack" />
      <van-form @submit="onSubmit" class="form_back">
        <!--  :rules="[{ required: true, message: '请输入学校(单位)'}]" -->
        <van-field v-model="username" name="username" type="tel" label="登录名(手机号)*" placeholder="请输入手机号" 
          :rules="[{ required: true}]" />
        <van-field v-model="password" name="password" type="password" label="密码*" placeholder="请输入8位密码（数字和字母组成）"  autocomplete="off" onkeyup="this.value=this.value.replace(/[^\a-\z\A-\Z0-9]/g, '')" maxlength="8"
          :rules="[{ required: true}]" />
        <van-field v-model="password_again" name="password" type="password" label="确认密码*" placeholder="请再次输入密码"  autocomplete="off"
          :rules="[{ required: true}]" />
        <van-field v-model="nickname" name="nickname" label="姓名*" placeholder="请输入姓名" 
          :rules="[{ required: true}]" />
        <van-field v-model="title" name="title" label="职称" placeholder="请输入职称" />
        <van-field v-model="school" name="school" label="学校(单位)*" placeholder="请输入学校(单位)" 
          :rules="[{ required: true}]" />
        <van-field v-model="college" name="college" label="学院(部门)*" placeholder="请输入学院(部门)" 
          :rules="[{ required: true}]" />
        <van-field v-model="major" name="major" label="专业" placeholder="请输入专业" />
        <van-field v-model="email" name="email" label="邮箱" placeholder="请输入邮箱" />
        <!-- <van-field v-model="college" is-link readonly name="picker" label="学院" placeholder="点击选择学院"
          @click="showPicker = true"/>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
        </van-popup> -->
        
        
        <!-- <van-field v-model="sms" name="sms" label="验证码" placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]" /> -->
        <van-field v-model="sms" center clearable label="验证码*" placeholder="请输入验证码" :rules="[{ required: true}]">
          <!-- <template #right-icon>
            <div class="main_logo" @click="imageClick">
              <van-image width="84px" height="28px" :src="require('@/assets/main_logo.png')" />
            </div>
          </template> -->

          
        </van-field>  
        <div class="img">
          <van-image :src="this.img" @click="imageClick"></van-image>
        </div> 
        <div style="margin: 16px;">
          <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." @click="publishClick" color="var(--themeColor)"
            native-type="submit">注册
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  
  <script>
  import { captchaImage,postRegmse} from '@/api/register'
  
  export default {
    name: "Register",
    data () {
      return {
        nickname: '',//姓名
        username: '',//登录名（手机号）
        password: '',
        password_again: '',
        title: '',
        sms: '',
        text: '图形验证码',
        loading: false,
        college: '',
        showPicker: false,
        img: '',
        uuid: '',
        school: '',
        major: '',
        email: '',
        columns: [{ id: 0, text: '信息学院' }, { id: 1, text: '物理学院' }],
      }
    },
    created () {
      this.getData()
      // this.$notify('注册失败')
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      publishClick(){//点击提交
        let msg
        if(!this.username){
          msg='请输入用户名（手机号）'
        }else if (!this.password) {
          msg = '请输入密码'
        }else if (this.password.length!=8) {
          msg = '密码长度需要为八位数'
        } else if (this.password != this.password_again) {
          msg = '两次密码不一致，请重新输入'
        } else if (!this.nickname) {
          msg='请输入姓名'
        }else if (!this.school) {
          msg='请输入学校（单位）'
        }else if (!this.college) {
          msg='请输入学院（部门）'
        }else if (!this.sms) {
          msg='请输入验证码'
        }else{
          msg=''
        }
        if(msg!=''){
          this.$notify(msg)
        }
        // else{
        //   this.onSubmit()
        // }
      },
      onSubmit (values) {
        try{
            postRegmse(values).then(res =>{
              values.uuid=this.uuid,
              values.username=this.user_name,
              values.nickname=this.nick_name,
              values.password=this.password,
              values.college=this.college,
              values.email=this.email,
              values.title=this.professional_title,
              values.school=this.school,
              values.major=this.major
            })
            this.$toast.success('注册成功')
            console.log(values)
            this.goNext()
        }catch(err){
          console.log(err)
          this.$notify('注册失败')
        }
        // this.$notify('注册失败，密码位数不足')
        // this.loading = true
        // login(values).then(res => {
        //   this.loading = false
        //   setToken(res.token)
        //   this.goNext()
        // }).catch(() => {
        //   this.loading = false
        // })
      },
      goNext () {//返回原位置
        const replace = this.$route.params.replace
        if (replace) {
          const query = {}
          if (replace == 'Add') {
            query.state = 0
          }
          this.$router.replace({ name: replace, query })
        } else {
          this.goBack()
        }
      },
      onCancel () {
        this.showPicker = false
      },
      onConfirm (value) {
        this.college = value.text
        this.showPicker = false
      },
      imageClick (){
        // console.log(this.img)
        // console.log(this.uuid)
        this.getData()
      },
      getData () {
        captchaImage().then(res => {
          this.img = "data:image/gif;base64," + res.img;
          // "data:image/gif;base64," + res.img;
          this.uuid = res.uuid
          console.log(this.uuid)
          // const blob = res
          // console.log(blob)
          // this.img = windowUrl.createObjectURL(blob)
        }) 
      },    
      }
  }
  </script>
  
  <style lang="less" scoped>
  .back {
    .form_back {
      margin-top: 20px;
    }
    .login_btn {
      border-radius: 5px;
    }
    .register_btn{
      border-radius: 5px;
      margin-top: 10px;
    }
    .img{
      margin-left: 30%;
      width: 110px;
      height: 30px;
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
  </style>