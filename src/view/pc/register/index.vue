<template>
  <div class="back">
    <div class="de_back">
      <el-menu text-color="#42B285" active-text-color="#42B285" mode="horizontal">
        <el-menu-item index="1" style="height: 50px;margin-top: -10px;font-weight:bold;font-size:16px;">注册账号</el-menu-item>
      </el-menu>
      <el-form ref='ruleForm' class="form_back" label-width="auto" label-suffix="" :model="ruleForm" :rules="rules" >
        <el-form-item label="登录名(手机号)" style="margin: 15px 15px 15px 15px;" prop="username">
          <el-input v-model.number="ruleForm.username" :rows="5" name="username" label-width="100px" type="tel" placeholder="请输入手机号" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item label="真实姓名" style="margin: 15px;" prop="nickname">
          <el-input v-model="ruleForm.nickname" name="nickname" label-width="300px" placeholder="请输入真实姓名" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item label="设置密码" style="margin: 15px;" prop="password">
          <el-input v-model="ruleForm.password" name="password" show-password label-width="300px" type="password" placeholder="至少8位，由数字和字母组成" autocomplete="off" style="width: 200px;">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" style="margin: 15px;" prop="password_again">
          <el-input title="确认密码" v-model="ruleForm.password_again" show-password name="password_again" label-width="7.5em" type="password" placeholder="请确认密码" autocomplete="off" style="width: 200px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" style="margin: 15px;" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择身份" style="width: 200px;">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职称" style="margin: 15px;width: auto;margin-left: 350px;margin-top: -275px;display: flex;" prop="title">
          <el-autocomplete
              class="inline-input"
              v-model="ruleForm.title"
              :fetch-suggestions="querySearch"
              placeholder="请输入职称"
              @select="handleSelect"
              style="width: 200px;margin-left: -110px;"
          ></el-autocomplete>
          <!-- <el-input v-model="ruleForm.title" name="title" label-width="7.5em" placeholder="请输入职称" style="width: 200px;margin-left: -110px;"></el-input> -->
        </el-form-item>
        <el-form-item label="学校(单位)" style="margin: 15px;margin-left: 350px;display: flex;" prop="school">
          <el-input v-model="ruleForm.school" name="school" label-width="7.5em" placeholder="请输入学校或单位" style="width: 200px;margin-left: -110px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院(部门)" style="margin: 15px;margin-left: 350px;display: flex;" prop="college">
          <el-input v-model="ruleForm.college" name="college" label-width="7.5em" placeholder="请输入学院或部门" style="width: 200px;margin-left: -110px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="专业" style="margin: 15px;margin-left: 350px;display: flex;">
          <el-input v-model="ruleForm.major" name="major" label-width="7.5em" placeholder="请输入专业" style="width: 200px;margin-left: -110px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" style="margin: 15px;margin-left: 350px;display: flex;" prop="email">
          <el-input v-model="ruleForm.email" name="email" label-width="7.5em" placeholder="请输入邮箱" style="width: 200px;margin-left: -110px;"></el-input>
        </el-form-item>
        <el-form-item label="验证码" style="margin: 15px;" prop="sms">
          <el-input v-model="ruleForm.sms" name="sms" label-width="7.5em" placeholder="请输入验证码" style="width: 200px;height: 40px;"></el-input>
        </el-form-item>
        <div class="img">
          <van-image :src="this.img" @click="imageClick"></van-image>
        </div>
        <!-- <div style="margin: 16px;display: flex;width: 70px;height: 0.1px;"> -->
        <el-button type="primary" @click="submit('ruleForm')" class="button1"  block :loading="loading" loading-text="跳转中...">提交</el-button>
        <!-- </div> -->
        <el-button type="primary" class="button" @click="goBack">返回</el-button>
        <!-- line-height: 10px; -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { captchaImage, register } from '@/api/register'

export default {
  name: "Register",
  data () {
    return {
      ruleForm:{
        nickname: '',
        username: '',
        password: '',
        password_again: '',
        title: '',
        college: '',
        school: '',
        identity: '',
        major: '',
        email: '',
        sms: '',
      },
      img: '',
      loading: false,
      showPicker: false,
      uuid: '',
      value: '',
      restaurants: [],
      options: [{
        value: '教师',
        label: '教师'
      }, {
        value: '学生',
        label: '学生'
      }, {
        value: '企业人员',
        label: '企业人员'
      }, {
        value: '其他',
        label: '其他'
      }],
      rules:{
        username:[{ required: true},{pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ ,message: '请输入正确格式的手机号码', trigger: "blur" }],
        nickname:[{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
        password:[{ required: true },{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        password_again:[{ required: true ,message: '请再次输入密码',},{ pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }],
        identity:[{ required: true, message: '您还未选择身份', trigger: 'blur' }],
        title:[{ required: true, message: '请输入职称', trigger: 'blur' }],
        school:[{ required: true, message: '请输入您的学校或单位', trigger: 'blur' }],
        college:[{ required: true, message: '请输入您的学院或部门', trigger: 'blur'  }],
        email:[{type: 'email', message:'请输入正确的邮箱格式', trigger: 'blur'}],
        sms:[{ required: true, message: '请输入验证码', trigger: 'blur'  }],
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    submit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onsub()
        } else {
          return false
        }
      })
    },
    onsub(){
      this.loading = true
      const values = {}
      values.uuid = this.uuid
      if(this.ruleForm.username){
        // console.log(username)
        values.username = this.ruleForm.username
      }
      if(this.ruleForm.nickname){
        values.nickname = this.ruleForm.nickname
      }
      if(this.ruleForm.password){
        console.log('得到了密码')
        if(this.ruleForm.password == this.ruleForm.password_again){
          values.password = this.ruleForm.password
          console.log(values.password)
        }else{
          this.loading = false
          this.ruleForm.password_again=''
          this.$alert('两次密码输入不一致！')
        }
      }
      if(this.ruleForm.identity){
        values.identity = this.ruleForm.identity
      }
      if(this.options.value){
        values.title = this.options.value
      }
      if(this.ruleForm.sms){
        values.sms = this.ruleForm.sms
      }
      if(this.ruleForm.title){
        values.title = this.ruleForm.title
      }
      if(this.ruleForm.school){
        values.school = this.ruleForm.school
      }
      if(this.ruleForm.college){
        values.college = this.ruleForm.college
      }
      if(this.ruleForm.major){
        values.major = this.ruleForm.major
      }
      if(this.ruleForm.email){
        values.email = this.ruleForm.email
      }
      if(this.ruleForm.password == this.ruleForm.password_again){
        console.log('密码一致')
        register(values).then(res => {
          console.log(res)
          this.loading = false
          console.log('注册成功')
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "教师请填写职称" },
        { "value": "本科生"},
        { "value": "硕士生"},
        { "value": "博士生"},
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    // },
    goBack () {
      const replace = this.$route.params.replace
      this.$router.replace({ name: 'Login', params: { replace: replace } })
    },
    // onSubmit (values) {
    //   // const params = values
    //   values.uuid = this.uuid
    //   this.loading = true
    //   if(this.password == this.password_again){
    //     register(values).then(res => {
    //       this.loading = false
    //       this.$toast.success('注册成功')
    //       this.goBack()
    //     }).catch(() => {
    //       this.loading = false
    //       this.getData()
    //     })
    //   }else{
    //     this.$notify('两次输入的密码不一致')
    //     this.loading = false
    //   }
    // },
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
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
}
</script>

<style lang="less" scoped>
.back {
  margin-left: -455px;
  position: fixed;
  left: 55%;
  width: 800px;
  height: 450px;
  // height: calc(100% - -0px);
  background: white;
  position: relative;
  display: flex;
  margin-top: 1%;
  // overflow: hidden;
  border-radius: 15px;
  padding: 5px 40px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .de_back{
    overflow-x:hidden;
    height: calc(100% - -0px);
    width: 100%;
    .form_back {
      width: 100%;
      background: white;

    }
    .button1 {
      display: inline-block;
      border-radius: 4px;
      background-color: #42B285;
      border: none;
      border:1px solid #42B285;
      color:  #FFFFFF;
      text-align: center;
      font-size: 13px;
      padding: 2px;
      width: 70px;
      height: 25px;
      margin-top: 30px;
      transition: all 0.5s;
      cursor: pointer;
      // margin-left: 40px;

    }
    .button {
      display: inline-block;
      // display:flex;
      border-radius: 4px;
      background-color: #42B285;
      border: none;
      border:1px solid #42B285;
      color:  #FFFFFF;
      // text-align: center;
      font-size: 13px;
      padding: 2px;
      width: 70px;
      height: 25px;
      margin-top: -25px;
      transition: all 0.5s;
      cursor: pointer;
      margin-left: 20px;

    }

    // .button span {
    //   cursor: pointer;
    //   display: inline-block;
    //   position: relative;
    //   transition: 0.5s;
    // }

    // .button span:after {
    //   content: '»';
    //   position: absolute;
    //   opacity: 0;
    //   top: 0;
    //   right: -20px;
    //   transition: 0.5s;
    // }

    // .button:hover span {
    //   padding-right: 25px;
    // }

    // .button:hover span:after {
    //   opacity: 1;
    //   right: 0;
    // }
  }
  .title {
    color: var(--themeColor);
    font-size: 13px;
    // margin-top: 5px;
    text-align: center;
    // padding: 0px 18px;
  }

  .login_btn {
    border-radius: 5px;
  }
  .register_btn{
    border-radius: 5px;
    margin-top: 10px;
  }
  .img{
    width: 100px;
    height: 26px;
    margin-left: 350px;
    margin-top: -54px;
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
*::-webkit-scrollbar {
  display: none;
}
</style>