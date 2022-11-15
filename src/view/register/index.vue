  <template>
    <div class="back">
      <van-nav-bar title="注册" :border="false" left-arrow fixed @click-left="goBack" />
      <van-form @submit="onSubmit" class="form_back">
        <van-field v-model="username" name="username" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
          :rules="[{ required: true }]" />
        <van-field v-model="password" name="password" type="password" label="密码*" placeholder="至少8位，由数字和字母组成" autocomplete="off"
          :rules="[{ required: true }]" />
        <van-field v-model="password_again" name="password_again" type="password" label="确认密码*" placeholder="请再次输入密码" autocomplete="off"
          :rules="[{ required: true }]" />
        <van-field v-model="nickname" name="nickname" label="姓名*" placeholder="请输入姓名"
          :rules="[{ required: true }]" />
        <van-field v-model="title" name="title" label="职称" placeholder="请输入职称" />
        <van-field v-model="school" name="school" label="学校(单位)*" placeholder="请输入学校(单位)"
          :rules="[{ required: true }]" />
        <van-field v-model="college" name="college" label="学院(部门)*" placeholder="请输入学院(部门)"
          :rules="[{ required: true }]" />
        <van-field v-model="major" name="major" label="专业" placeholder="请输入专业" />
        <van-field v-model="email" name="email" label="邮箱" placeholder="请输入邮箱" />
        <!-- <van-field v-model="college" is-link readonly name="picker" label="学院" placeholder="点击选择学院"
          @click="showPicker = true"/>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"/>
        </van-popup> -->
        <van-field v-model="sms" name="sms" label="验证码*" placeholder="请输入验证码"
          :rules="[{ required: true }]" />
        <!-- <van-field v-model="sms" center clearable label="验证码*" placeholder="请输入验证码">
          <template #right-icon>
            <div class="main_logo" @click="imageClick">
              <van-image width="84px" height="28px" :src="require('@/assets/main_logo.png')" />
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
        major: '',
        email: '',
        columns: [{ id: 0, text: '信息学院' }, { id: 1, text: '物理学院' }],
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
        this.college = value.text
        this.showPicker = false
      },
      imageClick (){
        this.getData()
      },
      getData () {
        captchaImage().then(res => {
          this.img = "data:image/gif;base64," + res.img;
          this.uuid = res.uuid
          console.log(this.uuid)
        })  
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