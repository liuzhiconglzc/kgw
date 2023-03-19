<template>
    <div class="back">
      <div class="login">
        <!-- <div class="title">请输入手机号及真实姓名重置密码</div> -->
        <p>PASSWORD</p>
        <van-form @submit="onSubmit" class="form_back">
          <van-field v-model="username" name="username" label-width="4em" type="tel" label="手机号" placeholder="请输入正确格式的手机号码"
            :rules="telRules" style="margin-top: -5%;font-size: 18px;"/>
          <van-field v-model="nickname" name="nickname" label-width="4em" label="真实姓名" placeholder="请输入真实姓名"
            :rules="[{ required: true}]" style="margin-top: 5%;font-size: 28px;font-size: 18px;"/>
          <div style="margin: 16px;margin-top: 5%;margin-bottom: 10%;">
            <van-button class="register_btn" block :loading="loading" color="var(--themeColor)"
              native-type="submit">提交
            </van-button>
          </div>
        </van-form>
      </div>
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
          // message: '请输入正确格式的手机号',
          trigger: 'onBlur'
        }, {
        // 自定义手机号校验规则
            validator: value => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              .test(value)
            },
            // message: '请输入正确格式的手机号码',
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
    margin-left: -27%;
    position: fixed;
    left: 65%;
    width: 400px;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    background: white;
    .login{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -51%;
    background-color: white;
    width: 400px;
    height: 300px;
    border-radius: 15px;
    text-align: center;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  p{
    margin-top: 30px;
    font-size: 42px;
    font-weight: 600;
}
    .form_back {
      margin-top: -5%;
      margin-left: 5%;
      width: 90%;
      // height: 250px;
    }
    .title {
      margin-top: 15px;
      margin-left: 60px;
      color: var(--themeColor);
      font-size: 13px;
      text-align: left;
    }
    .register_btn{
      margin-left: 32%;
      width: 38%;
      height: 48px;
      border-radius: 8px;
      margin-top: 10px;
      font-size: 28px;
      font-weight: 600;
      color: white;
      background-color: #42B285;
      }
      .register_btn:hover{
      background-color: #59c2c5;
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