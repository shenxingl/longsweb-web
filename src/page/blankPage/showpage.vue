<template>
  <div style="width: 100%;height: 100%">
    <div class="back" @click="back">
      <p class="el-icon-back"></p>
    </div>
    <point-click v-if="showContent === 'pointClick'" :can-move="true"></point-click>
    <tc-she  v-if="showContent === 'tcShe'"></tc-she>
    <qq-dzz  v-if="showContent === 'qqDzz'"></qq-dzz>
    <jc-gun  v-if="showContent === 'jcGun'"></jc-gun>
  </div>
</template>

<script>
import pointClick from '../../components/movepoint/pointclick'
import tcShe from '../../components/game/tcShe'
import qqDzz from '../../components/game/qqDzz'
import jcGun from '../../components/game/jcGun'

export default {
  components: {tcShe, pointClick, qqDzz, jcGun},
  data() {
    return {
      showContent: ''
    }
  },mounted() {
    //监听返回键
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.backButton, false);//false阻止默认事件
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.backButton, false);//false阻止默认事件
  },
  created() {
    this.showContent = this.$route.params.showContent
    document.onkeydown = (e) => {
      let key = window.event.keyCode
      if (key === 27) {
        this.back()
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    backButton () {//点击返回键时实现的业务逻辑
      // history.forward(1)
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.back {
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  z-index: 1000;
  top: 25px;
  left: 30px;
  color: silver;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e3e3e3;
  border: 2px solid silver;
  box-shadow: 0 0 10px silver;
  display: flex;
}

.back:hover {
  border: 2px solid #999;
  box-shadow: 0 0 10px #888;
  color: #666666;
}

.back p {
  margin: auto;
  font-size: 20px;
  font-weight: bold;
}
</style>
