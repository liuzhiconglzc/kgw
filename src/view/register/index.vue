  <template>
    <div class="back">
      <van-nav-bar title="注册" :border="false" left-arrow fixed @click-left="goBack" />
      <van-form @submit="onSubmit" class="form_back">
        <van-field v-model="username" name="username" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
          :rules="telRules" />
        <van-field v-model="password" name="password" type="password" label="密码*" placeholder="至少8位，由数字和字母组成" autocomplete="off"
          :rules="pwRules" />
        <van-field v-model="password_again" name="password_again" type="password" label="确认密码*" placeholder="请再次输入密码" autocomplete="off"
          :rules="[{ required: true }]" />
        <van-field v-model="nickname" name="nickname" label="姓名*" placeholder="请输入姓名"
          :rules="[{ required: true }]" />
          <!-- 添加性别 -->
        <!-- <van-field name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="0">男</van-radio>
              <van-radio name="1">女</van-radio>
            </van-radio-group>
          </template>
        </van-field> -->
        <!-- 添加身份 -->
        <van-field v-model="identity" is-link readonly name="identity" label="身份*" placeholder="请点击选择您的身份" :rules="[{ required: true }]" @click="identityPicker = true"  />
        <van-popup v-model="identityPicker" position="bottom">
          <van-picker
            :columns="identitycolumns"
            @confirm="identityonConfirm"
            @cancel="identityPicker = false"
            :show-toolbar="true"
          />
        </van-popup>

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
        sex:'0',
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
        // identitycolumns:[{ id: 0, text: '教师'} , { id: 1, text: '学生' }, { id: 2, text: '企业人员' }, { id: 3, text: '其他' }],
        //身份选择需要的定义
        identitycolumns:["教师","学生","企业人员","其他"],
        identity:'',
        identityPicker:false,
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
      // onCancel () {
      //   this.showPicker = false
      // },
      // onConfirm (value) {
      //   this.college = value.text
      //   this.showPicker = false
      // },
      imageClick (){
        this.getData()
      },
      getData () {
        captchaImage().then(res => {
          this.img = "data:image/gif;base64," + res.img;
          this.uuid = res.uuid
        })  
      },
      // 身份的onConfirm
      identityonConfirm(value){
          this.identity=value;
          this.identityPicker=false;
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