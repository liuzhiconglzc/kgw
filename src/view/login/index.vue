<template>
  <div class="back">
    <van-nav-bar title="登录" :border="false" left-arrow fixed @click-left="goBack" />
    <van-form @submit="onSubmit" class="form_back">
      <van-field v-model="username" name="username" type="tel" label="手机号" placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]" />
      <van-field v-model="password" name="password" type="password" label="密码" placeholder="请输入密码" autocomplete="off"
        :rules="[{ required: true, message: '请输入密码' }]" />
      <div style="margin: 16px;">
        <van-button class="login_btn" block :loading="loading" loading-text="登录中..." color="var(--themeColor)"
          native-type="submit">登录
        </van-button>
        <!-- <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
          @click="register()">还没账号，前往注册
        </van-button> -->
      </div>
    </van-form>
    <div class="title" @click="register">新用户注册</div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from "@/utils/auth";

export default {
  name: "Login",
  data () {
    return {
      username: '13811111111',
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
    }
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
  .title {
    color: var(--themeColor);
    margin-top: 5px;
    text-align: right;
    padding: 2px 25px;
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