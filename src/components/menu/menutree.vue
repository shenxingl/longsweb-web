<template>
  <div class="row_div" :class="isLeft ? '' : 'row_div_hide'" @mouseover="isLeft = true" @mouseout="isLeft = false">
    <div style="display: flex">
      <div class="row_root"></div>
      <div class="row_big" @mouseover="showMenu = true" @mouseout="showMenu = false">
        <div class="menu_div" style="z-index: 999;border-top: 0;" @click="mainMenuClick">
          <p>{{mainMenu}}</p>
        </div>
        <div v-for="(item, index) in menuList" class="menu_div"
             :style="showMenu ? 'top: ' + 40 * (index + 1) + 'px' : ''" @click="toPage(item)">
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="row_small">
        <i class="row_icon el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainMenu: {             // 主菜单名称
      type: String,
      default: '主菜单'
    },
    menuList: {             // 子菜单数据[{name: '', router: ''}]，name子菜单名，router路由
      type: Array,
      default: () => [{name: '大龙', router: ''}, {name: '小龙', router: ''}]
    }
  },
  data() {
    return {
      isLeft: false,              // 是否显示向左，默认为右
      showMenu: false             // 是否显示子菜单
    }
  },
  methods: {
    /**
     * @desc 主菜单点击事件
     */
    mainMenuClick() {
      this.$emit('mainMenuClick')
    },
    /**
     * @desc 子菜单点击事件
     * @param val 子菜单数据
     */
    toPage(val) {
      if (val.router) {
        this.$router.push({name: val.router})
      } else {
        this.$message('您没有配置 [' + val.name + '] 的路由哦~')
      }
    }
  }
}
</script>

<style scoped>
.row_div {
  position: absolute;
  top: 10px;
  left: 0;
  width: 131px;
  height: 40px;
  cursor: pointer;
  transition: left .7s;
}

.row_div_hide {
  left: -103px;
}

.row_root {
  width: 10px;
  height: 40px;
  background-color: lightblue;
  box-shadow: 0 0 5px lightblue;
  border-right: white 1px solid;
}

.row_big {
  position: relative;
  width: 93px;
  height: 40px;
  box-shadow: 0 0 4px lightblue;
}

.menu_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 92px;
  height: 40px;
  display: flex;
  border-radius: 2px;
  background-color: lightblue;
  box-shadow: 0 0 1px lightblue;
  border-top: white 1px solid;
  transition: top .7s;
}

.menu_div:hover {
  z-index: 999;
  transform: scale(1.05);
  box-shadow: 0 0 10px #666666;
}

.menu_div p {
  margin: auto;
  font-size: 16px;
  color: white;
}

.row_small {
  width: 27px;
  height: 40px;
  border-radius: 0 20px 20px 0;
  background-color: lightblue;
  display: flex;
  box-shadow: 0 0 5px lightblue;
  border-left: white 1px solid;
}

.row_icon {
  font-size: 30px;
  color: white;
  margin: auto auto auto -3px;
}
</style>
