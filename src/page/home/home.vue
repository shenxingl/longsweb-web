<template>
  <div class="home">
      <div v-if="showMenu" style="position: absolute;top: 0;left: 0">
        <menu-six v-if="$store.state.isShowMenu" :menuList="menuList" :showSonMenu = 'showSonMenu' @mainMenuClick = 'toMainMenu'></menu-six>
      </div>
    <router-view/>
  </div>
</template>

<script>
import menuSix from '../../components/menu/menusix'
export default {
  components: { menuSix },
  data() {
    return {
      menuList: [{
        name: '首页', router: 'home', index: 0
      },{
        name: '组件', router: 'componentList', index: 2
      },{
        name: '测试1', router: 'ceshi1', index: 5
      }],
      showSonMenu: true,
      showMenu: true
    }
  },
  methods: {
    /**
     * 主菜单
     */
    toMainMenu() {
      this.$router.push('mainMenu')
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}

.home_menu {
  width: 100%;
  height: 12%;
  background-color: lightblue;
  position: relative;
}

.home_route {
  width: 100%;
  height: 88%;
}
</style>
