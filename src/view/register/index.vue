<template>
  <div class="back">
    <van-nav-bar title="注册" :border="false" left-arrow fixed @click-left="goBack" />
    <div class="title">*必填</div>
    <van-form @submit="onSubmit" class="form_back">
      <van-field v-model="username" name="username" label-width="7.5em" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
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
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
      <van-field v-model="sms" name="sms" label-width="7.5em" label="验证码*" placeholder="请输入验证码"
        :rules="[{ required: true }]" />
      <!-- <van-field v-model="sms" center clearable label="验证码*" placeholder="请输入验证码">
        <template #right-icon>
          <div class="img">
            <van-image :src="img" @click="imageClick"></van-image>
          </div>
        </template> 
      </van-field>   -->
      <div class="img">
        <van-image :src="this.img" @click="imageClick"></van-image>
      </div> 
      <div style="margin: 16px;">
        <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
          native-type="submit">注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { captchaImage, register } from '@/api/register'

export default {
  name: "Register",
  data () {
    return {
      nickname: '',
      username: '',
      password: '',
      password_again: '',
      title: '',
      sms: '',
      loading: false,
      college: '',
      showPicker: false,
      img: '',
      uuid: '',
      school: '',
      identity: '',
      major: '',
      email: '',
      columns: [{ id: 0, text: '教师' }, { id: 1, text: '学生' }, { id: 2, text: '企业人员' }, { id: 3, text: '其他' }],
      telRules: [{
        required: true,
        message: '手机号码不能为空',
        trigger: 'onBlur'
      }, {
      // 自定义手机号校验规则
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            .test(value)
          },
          message: '请输入正确格式的手机号码',
          trigger: 'onBlur'
      }],
      pwRules: [{
        required: true,
        trigger: 'onBlur'
      }, {
      // 自定义密码校验规则
          validator: value => {
            return /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/
            .test(value)
          },
          message: '至少8位，由数字和字母组成',
          trigger: 'onBlur'
      }],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    goBack () {
      const replace = this.$route.params.replace
      this.$router.replace({ name: 'Login', params: { replace: replace } })
    },
    onSubmit (values) {
      // const params = values
      values.uuid = this.uuid
      this.loading = true
      if(this.password == this.password_again){
        register(values).then(res => {
          this.loading = false
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
  .title {
    color: var(--themeColor);
    font-size: 13px;
    // margin-top: 5px;
    text-align: center;
    // padding: 0px 18px;
  }
  // .form_back {
  //   margin-top: 20px;
  // }
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
</style>