<template>
  <div class="mine_back">
    <van-nav-bar title="我的" :border="false" fixed left-arrow @click-left="goBack" />
    <van-cell class="user" :border="false" :title="data.askUserName || ''" :label="data.askUserPhone || ''" value="个人设置"
      is-link center @click="goPersonal">
      <template #icon>
        <van-image class="header" :src="data.askUserAvatar" fit="cover" width="44" height="44" round />
      </template>
    </van-cell>
    <van-grid class="grid" :column-num="3" :border="false">
      <van-grid-item>
        <span class="num_1">{{data.likeNum || 0}}</span>
        <span class="num_2">获赞数</span>
      </van-grid-item>
      <van-grid-item>
        <span class="num_1">{{data.replyNum || 0}}</span>
        <span class="num_2">被回复数</span>
      </van-grid-item>
      <van-grid-item>
        <span class="num_1">{{data.viewedNum || 0}}</span>
        <span class="num_2">被浏览数</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group calss="manage" :border="true">
      <van-cell title="已发布问题" :value="data.publishedNum || 0" is-link :to="{name: 'List', query: { state: 1 }}"
        style="height: 50px;" center>
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_1.png')" width="20" height="22" />
        </template>
      </van-cell>
      <van-cell title="发布中问题" :value="data.waitReviewNum || 0" is-link :to="{name: 'List', query: { state: 0 }}"
        style="height: 50px;" center>
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_2.png')" width="20" height="22" />
        </template>
      </van-cell>
      <van-cell title="待审核问题" :value="data.needReviewNum || 0" is-link :to="{name: 'List', query: { state: 3 }}"
        style="height: 50px;" center>
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_3.png')" width="20" height="25" />
        </template>
      </van-cell>
      <van-cell title="审核未通过问题" :value="data.rejectNum || 0" is-link :to="{name: 'List', query: { state: 2 }}"
        style="height: 50px;" center>
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_4.png')" width="20" height="22" />
        </template>
      </van-cell>
      <van-cell title="已收藏问题" :value="data.collectNum || 0" is-link :to="{name: 'List', query: { state: 4 }}"
        style="height: 50px;" center>
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_5.png')" width="20" height="22" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="manage">
      <van-cell title="联系管理员" is-link :to="{name: 'Manager'}">
        <template #icon>
          <van-image class="header" :src="require('@/assets/mine_6.png')" width="20" height="22" />
        </template>
      </van-cell>
    </van-cell-group>
    <div style="margin: 20px;">
      <van-button class="login_btn" block color="var(--themeColor)" @click="logout">退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
import { mineNum } from '@/api/mine'

export default {
  name: "Mine",
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    goPersonal () {
      this.$router.push({ name: 'Personal' }) 
    },
    getData () {
      mineNum().then(res => {
        this.data = res.data
        if (this.data.askUserAvatar.length == 0) {
          this.data.askUserAvatar = require(`@/assets/header.png`)
        }
      })
    },
    logout () {
      this.$dialog.alert({
        showCancelButton: true,
        message: '确定退出登录？',
      })
        .then(() => {
          removeToken()
          this.$router.replace({ name: 'Question' })
        })
        .catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
.mine_back {
  font-weight: 500;
  height: 100%;
  background: #f9f9f9;
}
.header {
  margin-right: 10px;
}
.grid {
  margin-bottom: 20px;
}
.manage {
  margin-top: 20px;
}
.num_1 {
  font-size: 16px;
  font-weight: 550;
}
.num_2 {
  font-size: 14px;
  font-weight: 550;
  color: var(--themeColor);
}
:deep(.van-cell__title) {
  font-size: 16px;
  font-weight: 500;
}
:deep(.van-cell__label) {
  font-size: 14px;
  font-weight: 500;
}
</style>