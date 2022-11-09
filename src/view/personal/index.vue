<template>
    <div class="manage_back">
      <van-nav-bar title="个人设置" :border="false" fixed left-arrow @click-left="goBack" />
      <van-cell title="头像" :border="false" is-link to="index" >
        <van-icon :name="require(`@/assets/header.png`)" size="25" />
      </van-cell>
      <van-cell-group :border="false">
        <van-cell title="真实姓名" :value="publishedNum" is-link to="index" style="height: 50px;">
        </van-cell>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="手机号" :value="publishedNum" is-link style="height: 50px;">
        </van-cell>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="性别" :value="publishedNum" is-link style="height: 50px;">
        </van-cell>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="地区" :value="publishedNum" is-link style="height: 50px;">
        </van-cell>
      </van-cell-group>
  
      <van-field
        v-model="fieldValue"
        input-align="right"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
  
      
  
     
  
     
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Manage",
    data () {
      return {
        publishedNum: '1',
        likeNum: '',
        askUserName: 'haha',
        show: false,
        options: [],
        fieldValue: '',
        cascaderValue: '',
        selectedOptions: ''
      }
    },
    created () {
      this.getOption();
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      close () {
        this.show = false;
      },
      onFinish ({selectedOptions}) {
        this.show = false;
        this.fieldValue = selectedOptions.map((option) => option.text).join('/');
        console.log(this.fieldValue)
      },
  
      getOption() {
        // 选项列表，children 代表子选项，支持多级嵌套
        this.options = [
         {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }],
         },
         {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }],
         },
        ];// 全部选项选择完毕后，会触发 finish 事件   
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>