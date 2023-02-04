<template>
  <div class="back">
    <van-nav-bar title="个人设置" :border="false" left-arrow fixed @click-left="goBack" />
    <van-form @submit="onSubmit" class="form_back">
      <van-field v-model="username" name="username" label-width="7.5em" type="tel" label="登录名(手机号)*" placeholder="请输入手机号"
        readonly />
      <van-field v-model="nickname" name="nickname" label-width="7.5em" label="真实姓名*" placeholder="请输入真实姓名"
        :rules="[{ required: true }]" readonly />
      <van-field v-model="password" name="password" label-width="7.5em" type="password" label="设置密码" placeholder="至少8位，由数字和字母组成" autocomplete="off"
        :rules="[
              { required: false },
              { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
              ]"
      />
      <van-field v-model="password_again" name="password_again" label-width="7.5em" type="password" label="确认密码" placeholder="请确认密码" autocomplete="off"
        :rules="[
              { required: false },
              { pattern: /(^$)|^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/  , message: '至少8位，由数字和字母组成' }
              ]"
      />
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
      <div style="margin: 16px;">
        <van-button class="register_btn" block :loading="loading" loading-text="跳转中..." color="var(--themeColor)"
          native-type="submit">提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mineInfo,mineEdit } from '@/api/mine'

export default {
  name: "Personal",
  data () {
    return {
      nickname: '',
      username: '',
      title: '',
      loading: false,
      college: '',
      showPicker: false,
      school: '',
      identity: '',
      major: '',
      email: '',
      password: '',
      password_again: '',
      columns: [{ id: 0, text: '教师' }, { id: 1, text: '学生' }, { id: 2, text: '企业人员' }, { id: 3, text: '其他' }],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onSubmit (values) {
      // const params = values
      this.loading = true
      if(this.password == this.password_again){
        mineEdit(values).then(res => {
          this.loading = false
          this.$toast.success('修改成功')
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
    getData () {
      mineInfo().then(res => {
        this.username = res.data.username
        this.nickname = res.data.nickname
        this.identity = res.data.identity
        this.title = res.data.title
        this.school = res.data.school
        this.college = res.data.college
        this.major = res.data.major
        this.email = res.data.email
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