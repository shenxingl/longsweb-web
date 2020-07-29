<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="videoForm" style="height: 52px;overflow: auto">
      <el-form-item label="视频名称">
        <el-input v-model="videoForm.vd103" placeholder="请输入视频名称" clearable style="width: 175px"></el-input>
      </el-form-item>
      <el-button @click="getVideoList">查询</el-button>
    </el-form>

    <!-- 视频列表 -->
    <el-table :data="videoList" border height="calc(100% - 55px)" v-loading="loading">
      <el-table-column prop="vd102" align="center" min-width="180" label="视频名称"></el-table-column>
      <el-table-column prop="vd107" align="center" min-width="60" label="观看次数"></el-table-column>
      <el-table-column prop="vd108" align="center" min-width="100" label="上传人"></el-table-column>
      <el-table-column prop="vd109" align="center" min-width="130" label="上传时间"></el-table-column>
      <el-table-column fixed="right" align="center" width="140" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="videoPlay(scope.row)">播放</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "movielist",
  data() {
    return {
      loading: false,
      videoForm: {
        vd103: ''
      },
      videoList: []
    }
  },
  created() {
    this.getVideoList()
  },
  methods: {
    /**
     * 查询视频列表
     */
    getVideoList() {
      this.loading = true
      axios.get('/videoctrl/getVideoList?vd103=' + this.videoForm.vd103).then((res) => {
        if (res.data.code === 0) {
          this.videoList = []
          this.videoList = res.data.videoList.content
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务异常')
      }).finally(() => {
        this.loading = false
      })
    },

    /**
     * 播放
     */
    videoPlay(val) {
      this.$router.push({
        name: 'movieplayer',
        params: {
          vd101: val.vd101
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
