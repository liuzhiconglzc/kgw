<template>
  <div class="education">
    <div class="card" @click="cardClick(0)">中华人民共和国教育部</div>
    <div class="card" @click="cardClick(1)">辽宁省教育厅</div>
  </div>
</template>

<script>
export default {
  name: "Web",
  methods: {
    cardClick (index) {
      if (index == 0) {
        window.open('http://www.moe.gov.cn/', '_blank')
      } else {
        window.open('http://jyt.ln.gov.cn/', '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.education {
  height: calc(100% - 80px);
  padding: 15px;
  background: #f9f9f9;
}
.card {
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  padding: 20px;
  background: white;
  border-radius: 10px;
}
</style>