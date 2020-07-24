<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px">

    <!-- 查询条件 -->
    <el-form :inline="true" :model="fileForm" style="height: 52px;overflow: auto">
      <el-form-item label="文件名" prop="cco105">
        <el-input v-model="fileForm.fl103" placeholder="请输入文件名" clearable style="width: 175px"></el-input>
      </el-form-item>
      <el-button @click="getFileList">查询</el-button>
      <el-button type="primary" @click="uploadFile">上传</el-button>
    </el-form>

    <!-- 文件列表 -->
    <el-table :data="fileList" v-loading="dataListLoading" border height="calc(100% - 55px)">
      <el-table-column prop="fl103" align="center" min-width="180" label="文件名"></el-table-column>
      <el-table-column prop="fl105" align="center" min-width="230" label="存储位置"></el-table-column>
      <el-table-column prop="fl106" align="center" min-width="60" label="下载次数"></el-table-column>
      <el-table-column prop="fl107" align="center" min-width="130" label="上传时间"></el-table-column>
    </el-table>

    <!-- 文件上传 -->
    <input style="display: none"
           id="file"
           ref="Uploader"
           type="file"
           @change="fileChange($event)">
    </input>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filelist',
  data() {
    return {
      file: '',
      fileForm: {
        fl103: ''
      },
      fileList: [],
      dataListLoading: false
    }
  },
  created(){
    this.getFileList()
  },
  methods: {
    /**
     * 查询文件列表
     */
    getFileList() {
      axios.get('/filectrl/getFileList?fl103=' + this.fileForm.fl103).then((res) => {
        if (res.data.code === 0) {
          this.fileList = []
          this.fileList = res.data.fileList.content
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务异常')
      })
    },

    /**
     * 上传按钮
     */
    uploadFile() {
      document.getElementById('file').click()
    },

    /**
     * 文件改变或选择时
     */
    fileChange(event) {
      this.$confirm('当前选择文件：[' + event.target.files[0].name + ']，是否上传？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.file = event.target.files[0]
        this.doUpload()
      }).catch(() => {
        this.cleanData()
      })
    },

    /**
     * 上传文件
     */
    doUpload() {
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post('/filectrl/upload', formData).then((res) => {
        if (res.data.code === 0) {
          let fileInfo = res.data.fileInfo
          this.$confirm('上传成功。上传图片：' + fileInfo.fileName + '。存储路径：' + fileInfo.filePath, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
          this.cleanData()
          this.getFileList()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务异常')
      })
    },

    /**
     * 清空
     */
    cleanData() {
      this.$refs.Uploader.value = ''
      this.file = ''
    }
  }
}
</script>

<style scoped>

</style>
