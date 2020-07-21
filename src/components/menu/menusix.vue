<template>
  <div class="menu_box" @mouseover="showMenu = true" @mouseout="showMenu = false">
    <button class="btn_menu" :class="showMenu ? '' : 'btn_main_menu'" style="z-index: 999" @click="mainMenuClick">{{mainMenu}}</button>
    <button v-for="(item, index) in menus" v-if="showSonMenu || item.isShow" class="btn_menu"
            :class="showMenu ? 'btn_menu' + index : ''" @click="toPage(item)">{{item.name}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mainMenu: {             // 主菜单名称
      type: String,
      default: '菜单'
    },
    menuList: {             // 子菜单数据[{name: '', router: '', index: 0}]，name子菜单名，router路由，index索引
      type: Array,
      default: () => []
    },                      // 是否显示未赋值的子菜单
    showSonMenu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMenu: false,      // 是否显示子菜单和动画
      menus: [              // 页面显示菜单数据（未赋值的默认）
        {name: '首页', router: '', isShow: false},
        {name: '龙', router: '', isShow: false},
        {name: '龙', router: '', isShow: false},
        {name: '龙', router: '', isShow: false},
        {name: '龙', router: '', isShow: false},
        {name: '龙', router: '', isShow: false}]
    }
  },
  created() {
    // 对传进来的子菜单数据进行赋值
    this.menuList.forEach(item => {
      this.menus[item.index].name = item.name
      this.menus[item.index].router = item.router
      this.menus[item.index].isShow = true
    })
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
.menu_box {
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 50%;
  transform: scale(0.9);
}

.btn_menu {
  position: absolute;
  top: 75px;
  left: 75px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0;
  outline: none;
  background-color: lightpink;
  color: white;
  cursor: pointer;
  transition: transform 1s;
  box-shadow: 0 0 5px lightpink;
}

.btn_menu:hover {
  box-shadow: 0 0 10px #666666;
}

.btn_main_menu {
  transform: scale(1.3);
}

.btn_menu0 {
  transform: rotateZ(0deg) translateX(70px) rotateZ(0deg);
}

.btn_menu1 {
  transform: rotateZ(60deg) translateX(70px) rotateZ(-60deg);
}

.btn_menu2 {
  transform: rotateZ(120deg) translateX(70px) rotateZ(-120deg);
}

.btn_menu3 {
  transform: rotateZ(180deg) translateX(70px) rotateZ(-180deg);
}

.btn_menu4 {
  transform: rotateZ(240deg) translateX(70px) rotateZ(-240deg);
}

.btn_menu5 {
  transform: rotateZ(300deg) translateX(70px) rotateZ(-300deg);
}
</style>
