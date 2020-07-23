<template>
<div>
  <div style="width: 300px;height: 200px;border: 1px solid #909399"></div>
  <input ref="file" type="file" @change="fileChange($event)"></input>
  <el-button @click="upload">上传</el-button>
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
    fileChange(event) {
      this.file = event.target.files[0]
    },
    upload() {
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post('/filectrl/upload', formData).then((res) => {
        let fileInfo = res.data.fileInfo
        this.$confirm('上传成功。上传图片：' + fileInfo.fileName + '。存储路径：' + fileInfo.filePath, '提示', {
          confirmButtonText: '确定'
        })
      }).catch()
    },
  }
}
</script>

<style scoped>

</style>
