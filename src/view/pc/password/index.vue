<template>
    <div class="back">
      <van-nav-bar title="重置密码" :border="false" left-arrow fixed @click-left="goBack" />
      <div class="title">请输入手机号及真实姓名重置密码</div>
      <van-form @submit="onSubmit" class="form_back">
        <van-field v-model="username" name="username" label-width="7.5em" type="tel" label="手机号" placeholder="请输入手机号"
          :rules="telRules" />
        <van-field v-model="nickname" name="nickname" label-width="7.5em" label="真实姓名" placeholder="请输入真实姓名"
          :rules="[{ required: true}]" style="margin-top: 5%;"/>
        <div style="margin: 16px;">
          <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
            native-type="submit">提交
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  
  <script>
  import { password } from '@/api/login'
  
  export default {
    name: "Password",
    data () {
      return {
        username: '',
        loading: false,
        nickname: '',
        telRules: [{
          required: true,
          message: '请输入正确格式的手机号',
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
      }
    },
    methods: {
      goBack () {
        const replace = this.$route.params.replace
        this.$router.replace({ name: 'Login', params: { replace: replace } })
      },
      onSubmit (values) {
        this.loading = true
        password(values).then(res => {
          this.loading = false
          this.$toast.success('重置成功')
          this.goBack()
        }).catch(() => {
          this.loading = false
        })     
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  .back {
    margin-left: -350px;
    position: fixed;
    left: 50%;
    width: 700px;
    height: calc(100% - 45%);
    // overflow-y: hidden;
    display: flex;
    flex-direction: column;
    background: white;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    // background: linear-gradient(to bottom, #66c6a1, #f2f2f2 50%);
    .form_back {
      margin-top: 20px;
      margin-left: 20%;
      width: 60%;
      height: 250px;
    }
    .title {
      margin-top: 20px;
      margin-left: 150px;
      color: var(--themeColor);
      font-size: 13px;
      text-align: left;
    }
    .register_btn{
      border-radius: 5px;
      margin-top: 30px;
      // margin-block: 10px;
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