<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px">
    <el-form :inline="true" :model="dataForm" style="height: 52px;overflow: auto">
      <el-form-item label="关键字" prop="cco105">
        <el-input v-model="dataForm.uf203" placeholder="请输入备注关键字" clearable style="width: 175px"></el-input>
      </el-form-item>
      <el-form-item label="URL类型">
        <el-select v-model="dataForm.uf101" placeholder="请选择" style="width: 100px">
          <el-option v-for="item in uf101Options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button @click="getUrlList">查询</el-button>
      <el-button type="primary" @click="">新增</el-button>
    </el-form>
    <div class="data-line data-line-title">
      <div>URL地址</div>
      <div>备注</div>
      <div>操作</div>
    </div>
    <div class="data-line-content" v-loading="dataListLoading">
      <div class="data-line" v-for="item in dataList">
        <div>
          <a :href="item.uf202" target="_blank">{{item.uf202}}</a>
        </div>
        <div>
          <span>{{item.uf203}}</span>
        </div>
        <div>
          <el-button type="text" size="medium" @click="beInvalid(item.uf201)">作废</el-button>
        </div>
      </div>
      <div v-if="dataList.length === 0" style="margin-top: 20px;color: #999999">暂无数据</div>
    </div>
    <!--    <el-pagination style="float: right"-->
    <!--                   v-if="paginationShow"-->
    <!--                   @size-change="sizeChangeHandle"-->
    <!--                   @current-change="currentChangeHandle"-->
    <!--                   :current-page="dataForm.pageIndex"-->
    <!--                   :page-sizes="[10, 20, 50, 100]"-->
    <!--                   :page-size="dataForm.pageSize"-->
    <!--                   :total="totalElements"-->
    <!--                   layout="total, sizes, prev, pager, next, jumper">-->
    <!--    </el-pagination>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'urlcollect',
  data() {
    return {
      dataForm: {
        uf203: '',
        uf101: ''
      },
      uf101Options: [
        {value: '', label: '全部'},
        {value: '1', label: '分类1'},
        {value: '2', label: '分类2'}
      ],
      dataList: [],
      dataListLoading: false
    }
  },
  methods: {
    getUrlList() {
      this.dataList = []
      this.dataListLoading = true
      axios.get('/api/urlctrl/getUrlList?uf203=' + this.dataForm.uf203 + '&uf101=' + this.dataForm.uf101).then((res) => {
        if (res.data.code === 0) {
          this.dataList = res.data.urlList.content
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.$message.error('服务异常')
      }).finally(() => {
        this.dataListLoading = false
      })
    },
    beInvalid(val) {
    }
  }
}
</script>

<style scoped>
.data-line {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.data-line div {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
  padding: 8px;
}

.data-line div:nth-of-type(1){
  width: 40%;
}

.data-line div:nth-of-type(2){
  width: 53%;
}

.data-line div:nth-of-type(3){
  width: 7%;
}

.data-line-title {
  font-size: 14px;
  color: #409eff;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  font-weight: bold;
}

.data-line-content {
  width: 100%;
  height: calc(100% - 93px);
  overflow: auto;
  font-size: 14px;
  text-align: center
}
</style>
