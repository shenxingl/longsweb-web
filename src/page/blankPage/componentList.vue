<template>
  <div style="width: 100%;height: 100%">
    <div style="display: flex">
      <el-card class="box-card">
        <div slot="header">
          <p>圈圈菜单</p>
        </div>
        <div class="box-content">
          <menu-six></menu-six>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <p>弹出的菜单</p>
        </div>
        <div class="box-content" style="position: absolute">
          <menu-tree></menu-tree>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="position: relative">
          <div class="box_header_switch">
            <el-switch v-model="useKey[0]" @change="changeUserKey(0)" active-color="#13ce66" inactive-color="#999"></el-switch>
          </div>
          <p>键盘移动圆点</p>
        </div>
        <div class="box-content">
          <point-key v-if="useKey[0]"></point-key>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="position: relative">
          <p>点击移动圆点</p>
          <div class="box_header_more" @click="toShowPage('pointClick')">
            <el-tooltip effect="dark" content="点击演示圆点随鼠标移动效果" placement="bottom">
              <p>👉</p>
            </el-tooltip>
          </div>
        </div>
        <div class="box-content">
          <point-click></point-click>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="position: relative">
          <div class="box_header_switch">
            <el-switch v-model="useKey[1]" @change="changeUserKey(1)" active-color="#13ce66" inactive-color="#999"></el-switch>
          </div>
          <p>贪吃蛇</p>
          <div class="box_header_more" @click="toShowPage('tcShe')">
            <el-tooltip effect="dark" content="点击演示大屏贪吃蛇" placement="bottom">
              <p>👉</p>
            </el-tooltip>
          </div>
        </div>
        <div class="box-content" style="width: 202px">
          <tc-she v-if="useKey[1]"></tc-she>
        </div>
      </el-card>
    </div>
    <div style="display: flex">
      <el-card class="box-card">
        <div slot="header" style="position: relative">
          <div class="box_header_switch">
            <el-switch v-model="useKey[2]" @change="changeUserKey(2)" active-color="#13ce66" inactive-color="#999"></el-switch>
          </div>
          <p style="font-size: 13px">球球大作战—次品</p>
          <div class="box_header_more" @click="toShowPage('qqDzz')">
            <el-tooltip effect="dark" content="点击演示大屏球球大作战" placement="bottom">
              <p>👉</p>
            </el-tooltip>
          </div>
        </div>
        <div class="box-content">
          <qq-dzz v-if="useKey[2]"></qq-dzz>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" style="position: relative">
          <p style="font-size: 13px">打手枪</p>
          <div class="box_header_more" @click="toShowPage('jcGun')">
            <el-tooltip effect="dark" content="点击演示大屏打手枪" placement="bottom">
              <p>👉</p>
            </el-tooltip>
          </div>
        </div>
        <div class="box-content">
          <jc-gun></jc-gun>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import menuSix from '../../components/menu/menusix'
import menuTree from '../../components/menu/menutree'
import pointKey from '../../components/movepoint/pointkey'
import pointClick from '../../components/movepoint/pointclick'
import tcShe from '../../components/game/tcShe'
import qqDzz from '../../components/game/qqDzz'
import jcGun from '../../components/game/jcGun'

export default {
  components: {menuSix, menuTree, pointKey, pointClick, tcShe, qqDzz, jcGun},
  data() {
    return {
      activeNames: ['1'],
      useKey: [true, false]
    }
  },

  watch: {
  },
  methods: {
    toShowPage(val) {
      this.$router.push({name: 'showpage', params: {showContent: val}})
    },
    changeUserKey(val) {
      for (let i=0; i < this.useKey.length; i++){
        if (i !== val) {
          this.useKey[i] = false
        }
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: 15px;
  width: 240px;
  text-align: center;
}

.box-card div p {
  margin: 0;
  font-size: 16px;
  line-height: 16px;
}

.box-content {
  background-color: silver;
  width: 200px;
  height: 200px;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.box_style {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 5px;
}

.box_header_switch {
  position: absolute;
  top: -3px;
  left: 0;
  cursor: pointer;
}

.box_header_more {
  position: absolute;
  top: 0;
  right: 2px;
  cursor: pointer;
}
</style>
