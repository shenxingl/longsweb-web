<template>
  <div class="index_body">
    <div style="width: calc(100% - 60px);height: calc(100% - 20px);padding: 10px 30px">
      <div class="menu_box">
        <!-- 主页标题部分 ---------------------------------------------------------------------------------------------->
        <div class="menu_title">
          <div class="menu_userinfo"></div>
          <el-dropdown class="menu_userinfo">
            <div class="userinfo_show">
              <i class="el-icon-key"></i>
              <p>当前登录：long</p>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px;">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 主页内容部分 ---------------------------------------------------------------------------------------------->
        <div class="menu_content">
          <!-- 主页内容  菜单部分 --------------------------------------------------------------------------------------->
          <div style="width: 18%;height:100%;overflow: auto">
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" router>
              <div style="width: 100%;height: 20px"></div>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu" style="color: white"></i>
                  <span slot="title" style="color: white">我的收藏</span>
                </template>
                <el-menu-item index="urlcollect">网址收藏</el-menu-item>
                <el-menu-item index="filelist">文件列表</el-menu-item>
              </el-submenu>
              <el-menu-item>
                <i class="el-icon-user" style="color: white"></i>
                <span slot="title" style="color: white">我的信息</span>
              </el-menu-item>
            </el-menu>
          </div>
          <!-- 主页内容  数据部分 --------------------------------------------------------------------------------------->
          <div class="datapage">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      isCollapse: false,
      showDialog: false,
      passwordForm: {
        oldPass: '',
        newPass: '',
        rePass: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.index_body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#91d197, #f5f5f5);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: calc(100% - 1px);
  height: 100%;
  background-color: rgba(162, 162, 162, 0.63);
  box-shadow: 0 0 5px #919191;
  font-family: 黑体;
  overflow: auto;
}

.menu_box {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.menu_title {
  width: 100%;
  height: 62px;
  background-color: #f0f0f0;
  margin-bottom: 8px;
  box-shadow: 0 0 5px #919191;
  position: relative;
}

.menu_userinfo {
  width: 180px;
  height: 100%;
  position: absolute;
  right: 40px;
  top: 0;
  cursor: pointer;
}

.menu_userinfo:hover {
  background-color: rgba(207, 241, 233, 0.83);
}

.userinfo_show {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.userinfo_show p {
  font-family: 黑体;
  font-size: 14px;
  color: #888;
}

.menu_content {
  width: 100%;
  height: calc(100% - 70px);
  display: flex
}

.datapage {
  margin-left: 8px;
  width: calc(82% - 8px);
  height: 100%;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 2px #eaeaea;
  padding: 0;
}
</style>
