<template>
  <div>
    <input id="file" ref="Uploader" type="file" style="display: none" @change="fileChange($event)"></input>
    <el-button @click="uploadFile">上传</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filelist',
  data() {
    return {
      file: ''
    }
  },
  methods: {

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
