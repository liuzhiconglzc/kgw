<template>
    <div class="back">
      <div class="login">
        
        <van-form @submit="onSubmit" class="form_back">
          <el-button icon="el-icon-arrow-left" @click="goBack" class="bu">返回</el-button>
          <h1>Reset</h1>
          <van-field v-model="username" name="username" label-width="4em" type="tel" placeholder="手机号"
            :rules="telRules" class="inp"/>
          <van-field v-model="nickname" name="nickname" label-width="4em" placeholder="真实姓名"
            :rules="[{ required: true}]" class="inp"/>
          <div style="margin: 16px;margin-bottom: 10%;">
            <van-button class="register_btn" block :loading="loading"
              native-type="submit">提交
            </van-button>
          </div>
        </van-form>
        <div class="title">请输入手机号及真实姓名重置密码</div>
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
              return /^(0|86|17951)?(13[0-9]|15[012356789]|16[2567]|17[012345678]|18[0-9]|19[012356789]|14[01456789])[0-9]{8}$/
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
  h1
  {
    margin-top: -16%;
    // margin-left: 20%;
    font-size: 45px;
    font-weight: 400;
    /* 提高层级 */
    z-index: 1;
    color: var(--themeColor);
  } 
  .bu{
    color: var(--themeColor);
    width: 20px;
    height: 20px;
    position: fixed;
    margin-left: -270px;
    margin-top: -340px;
    outline: none;
    border: none;
  }
  .bu:hover{
      background-color: white;
    }
    .form_back {
      margin-top: 12%;
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
        margin-top: -20px;
    }
    .title {
      margin-top: -20px;
      margin-left: 20px;
      color: var(--themeColor);
      font-size: 13px;
      text-align: left;
    }
    .register_btn{
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
    .register_btn:hover{
      background-color: #eee;
    }
    .button{
      display: inline-block;
      margin-left: 20px;
      width: 93px;
      height: 33px;
      border-radius: 8px;
      // margin-top: 28px;
      font-size: 13px;
      font-weight: 600;
      color: white;
      background-color: #42B285;
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