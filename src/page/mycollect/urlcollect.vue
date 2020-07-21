<template>
  <div>
    按时间排序
    日期段
    分类   查询
    关键字查询
    新增分类
    新增url
    <el-button @click="getUrlList">查询</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'urlcollect',
  methods: {
    getUrlList() {
      axios.get('/api/urlctrl/getUrlList').then((res) => {

      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
