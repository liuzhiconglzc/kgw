<template>
  <div class="back">
    <div class="login">
      <van-nav-bar title="登录" :border="false" left-arrow fixed @click-left="goBack"/>
      <van-form @submit="onSubmit" class="form_back">
        <!-- <p>Login</p> -->
        <van-field v-model="username" name="username" type="tel" label="手机号" placeholder="请输入手机号"
          :rules="[{ required: true }]" style="margin-top: -5%;font-size: 13px;"/>
        <van-field v-model="password" name="password" type="password" label="密码" placeholder="请输入密码" autocomplete="off"
          :rules="[{ required: true }]" style="margin-top: 5%;font-size: 13px;"/>
        <div style="margin: 16px;margin-bottom: 10%;">
          <van-button class="login_btn" block :loading="loading" color="var(--themeColor)"
            native-type="submit">登录
          </van-button>
          <!-- <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
            @click="register()">还没账号，前往注册
          </van-button> -->
        </div>
        <div class="nextStage">
          <div class="title" @click="register">新用户注册</div>
          <div class="title1" @click="forgotPassword">忘记密码</div>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onSubmit (values) {
      this.loading = true
      login(values).then(res => {
        this.loading = false
        setToken(res.token)
        this.goNext()
      }).catch(() => {
        this.loading = false
      })
    },
    goNext () {
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
    register (){
      const replace = this.$route.params.replace
      this.$router.replace({ name: 'Register', params: { replace: replace } })
    },
    forgotPassword (){
      const replace = this.$route.params.replace
      this.$router.replace({ name: 'Password', params: { replace: replace } })
    }
  }
}
</script>

<style lang="less" scoped>
.back {
  margin-left: -27%;
  position: fixed;
  left: 65%;
  margin-top: 5%;
  width: 400px;
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
    height: 250px;
    border-radius: 15px;
    text-align: center;
    padding: 5px 40px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .form_back {
    margin-top: 15%;
    margin-left: 5%;
    // width: 40%;
    // width:150px;
    // height: 200px;
    // display: flex;
  }
  p{
    font-size: 42px;
    font-weight: 600;
}
  .login_btn {
    margin-left: 30%;
    width: 93px;
    height: 33px;
    border-radius: 8px;
    margin-top: 30px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    background-color: #42B285;
  }
  .login_btn:hover{
    background-color: #59c2c5;
}
  .register_btn{
    border-radius: 5px;
    margin-top: 10px;
  }
  .nextStage{
    display: flex;
    margin-top: -5%;
    margin-left: 5px;
    .title {
      // display: flex;
      color: var(--themeColor);
      margin-top: -18%;
      // text-align: right;
      margin-left: 3%;
      font-size: 13px;
      // padding: 2px 25px;
    }
    .title1 {
      // display: flex;
      color: var(--themeColor);
      margin-top: -10%;
      // text-align: right;
      margin-left: -21.5%;
      font-size: 13px;
      // padding: 2px 25px;
    }
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