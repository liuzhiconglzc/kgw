<template>
  <div class="back">
    <div class="login">
      <van-form @submit="onSubmit" class="form_back">
        <!-- <p>Login</p> -->
        <h1>Login</h1>
        <van-field v-model="username" name="username" type="tel" placeholder="手机号"
                   :rules="[{ required: true }]" class="inp"/>
        <van-field  v-model="password" name="password" type="password" placeholder="密码" autocomplete="off"
                   :rules="[{ required: true }]" class="inp"/>
        <div style="margin: 16px;margin-bottom: 10%;">
          <el-button class="login_btn" block :loading="loading" color="var(--themeColor)"
                      native-type="submit">登录
          </el-button>
        </div>
        <div class="nextStage">
          <el-button class="title" @click="register">新用户注册</el-button>
          <el-button class="title1" @click="forgotPassword">忘记密码</el-button>
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
  margin-left: -28%;
  position: fixed;
  left: 65%;
  margin-top: -1%;
  width: 400px;
  display: flex;
  // background: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // background-color: #2c3e50;
  .login{
    margin-top: -100px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 350px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 20px rgba(33, 44, 55, .3); 
  }
  .form_back {
    margin-top: 15%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 230px;
    /* 提高层级 */
    z-index: 1;
  }
  h1
{
  margin-top: -15%;
  // margin-left: 20%;
  font-size: 45px;
  font-weight: 400;
  /* 提高层级 */
  z-index: 1;
  color: var(--themeColor);
} 
.inp
{
    width: 200px;
    height: 40px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #eee;
    font-size: 16px;
    text-indent:1em;
    outline: none;
    margin-left: 10px;
    margin-top: -15px;
}

  .login_btn {
    // margin-left: 30%;
    width: 180px;
    height: 36px;
    border: 2px solid #eee;
    border-radius: 18px;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer; 
    background-color: white;
    color: var(--themeColor);
  }
  .login_btn:hover{
    background-color: #eee;
  }

  .register_btn{
    border-radius: 5px;
    margin-top: 10px;
  }
  .nextStage{
    display: flex;
    margin-top: -10%;
    margin-left: -10px;
    .title {
      // display: flex;
      color: var(--themeColor);
      // margin-top: -18%;
      // text-align: right;
      margin-left: 3%;
      font-size: 13px;
      border: none;
      width: 100px;
      height: 10px;
      // padding: 2px 25px;
    }
    .title:hover{
    background-color: white;
  }
    .title1 {
      // display: flex;
      color: var(--themeColor);
      // margin-top: -10%;
      // text-align: right;
      // margin-left: 20%;
      font-size: 12px;
      width: 100px;
      height: 10px;
      border: none;
      // padding: 2px 25px;
    }
    .title1:hover{
    background-color: white;
  }
  }
}
/deep/.van-field__control::-webkit-input-placeholder {
  left: 10px;
  font-size: 13px;
  color: #bebebe;
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