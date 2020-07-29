<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px"
       v-loading="loading"
       :element-loading-text="loadText"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)">

    <!-- 查询条件 -->
    <el-form :inline="true" :model="fileForm" style="height: 52px;overflow: auto">
      <el-form-item label="文件名" prop="cco105">
        <el-input v-model="fileForm.fl103" placeholder="请输入文件名" clearable style="width: 175px"></el-input>
      </el-form-item>
      <el-button @click="getFileList">查询</el-button>
      <el-button type="primary" @click="uploadFile">上传</el-button>
    </el-form>

    <!-- 文件列表 -->
    <el-table :data="fileList" border height="calc(100% - 55px)">
      <el-table-column prop="fl103" align="center" min-width="180" label="文件名"></el-table-column>
      <el-table-column prop="fl105" align="center" min-width="230" label="存储位置"></el-table-column>
      <el-table-column prop="fl106" align="center" min-width="60" label="下载次数"></el-table-column>
      <el-table-column prop="fl107" align="center" min-width="130" label="上传时间"></el-table-column>
      <el-table-column fixed="right" align="center" width="140" label="操作">
        <template slot-scope="scope">
          <a :href="downBaseUrl + scope.row.fl101" :download="scope.row.fl103">下载</a>
<!--          <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 文件上传 -->
    <input style="display: none"
           id="file"
           ref="Uploader"
           type="file"
           @change="fileChange($event)">
    </input>

    <el-dialog :title="loadTitle"
               :visible.sync="showDialog"
               :show-close="false"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               width="45%" top="15%">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="loaded"></el-progress>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'filelist',
  data() {
    return {
      downBaseUrl: '/longs/filectrl/downloadFile?fl101=',
      file: '',
      fileForm: {
        fl103: ''
      },
      fileList: [],
      loading: false,
      loadText: '',
      showDialog: false,
      loadTitle: '',
      loaded: 0           // 下载进度
    }
  },
  created() {
    this.getFileList()
  },
  methods: {
    /**
     * 查询文件列表
     */
    getFileList() {
      this.loadText = '正在查询文件列表，请稍后...'
      this.loading = true
      axios.get('/filectrl/getFileList?fl103=' + this.fileForm.fl103).then((res) => {
        if (res.data.code === 0) {
          this.fileList = []
          this.fileList = res.data.fileList.content
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
        this.loadText = ''
      }).catch(() => {
        this.loading = false
        this.loadText = ''
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
      let self = this
      let formData = new FormData()
      formData.append('file', this.file)

      this.loadTitle = '文件上传中...'
      this.showDialog = true
      axios({
        method: 'post',
        url: '/filectrl/upload',
        onUploadProgress(e) {
          self.loaded = Number((e.loaded / e.total * 100).toFixed(1))
          if (e.loaded === e.total) {
            self.loadTitle = '正在保存文件，请稍后...'
          }
        },
        data: formData
      }).then((res) => {
        if (res.data.code === 0) {
          let fileInfo = res.data.fileInfo
          this.$message.success('上传成功，文件位置：' + fileInfo.filePath)
          this.getFileList()
        } else {
          this.$message.error(res.data.msg)
        }
        this.cleanData()
        this.showDialog = false
        this.loadTitle = ''
        this.loaded = 0
      }).catch(() => {
        this.cleanData()
        this.showDialog = false
        this.loadTitle = ''
        this.loaded = 0
        this.$message.error('服务异常')
      })
    },

    // /**
    //  * 下载文件
    //  */
    // downloadFile(val) {
    //   this.$confirm('下载文件：[' + val.fl103 + ']', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //   }).then(() => {
    //     this.loadText = '正在获取文件，请稍后...'
    //     this.loading = true
    //     axios.get('/filectrl/downloadFile?fl101=' + val.fl101).then((res) => {
    //       let data = res.data;
    //       if (!data) {
    //         return;
    //       }
    //       let link = document.createElement('a');
    //       link.style.display = 'none';
    //       link.href = '/longs/filectrl/downloadFile?fl101=' + val.fl101;
    //       document.body.appendChild(link);
    //       link.click()
    //       this.getFileList()
    //       this.loading = false
    //       this.loadText = ''
    //     }).catch(() => {
    //       this.loading = false
    //       this.loadText = ''
    //       this.$message.error('服务异常')
    //     })
    //   })
    // },

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
/deep/ .el-dialog {
  border-radius: 10px;
}

a {
  text-decoration: none;
  color: blue;
}
</style>
