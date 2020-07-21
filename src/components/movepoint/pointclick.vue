<template>
  <div class="div_body" @click="doClick" @mousemove="doMove">
    <div class="test_div" :style="testStyle"></div>
    <div class="test_div1" :style="testStyle1"></div>
    <div class="test_div2" :style="testStyle2"></div>
    <div class="test_div3" :style="testStyle3"></div>
  </div>
</template>

<script>
export default {
  props: {
    canMove: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      testStyle: '',
      testStyle1: '',
      testStyle2: '',
      testStyle3: ''
    }
  },
  created() {
  },
  methods: {
    doClick() {
      if (!this.canMove) {
        let event = event || window.event;
        this.left = event.offsetX;
        this.top = event.offsetY;
        this.showPoint()
      }
    },
    doMove() {
      if (this.canMove) {
        let event = event || window.event;
        this.left = event.pageX;
        this.top = event.pageY;
        this.showPoint()
      }
    },
    showPoint() {
      this.testStyle = 'top:' + (this.top - 15) + 'px;left:' + (this.left - 15) + 'px;'
      setTimeout(() => {
        this.testStyle1 = 'top:' + (this.top - 13) + 'px;left:' + (this.left - 13) + 'px;'
      }, 120)
      setTimeout(() => {
        this.testStyle2 = 'top:' + (this.top - 11) + 'px;left:' + (this.left - 11) + 'px;'
      }, 190)
      setTimeout(() => {
        this.testStyle3 = 'top:' + (this.top - 8) + 'px;left:' + (this.left - 8) + 'px;'
      }, 210)
    }
  }
}
</script>

<style scoped>
.div_body {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: lightblue;
}

.test_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: red;
  box-shadow: 0 0 5px red;
  transition: all 2s  cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 999;
}

.test_div1 {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: rgba(255, 110, 110, 1);
  box-shadow: 0 0 5px rgba(255, 110, 110, 1);
  transition: all 2s  cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 998;
}

.test_div2 {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgba(255, 150, 150, 1);
  box-shadow: 0 0 5px rgba(255, 150, 150, 1);
  transition: all 2s  cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 997;
}

.test_div3 {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(255, 200, 200, 1);
  box-shadow: 0 0 5px rgba(255, 200, 200, 1);
  transition: all 2s  cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 996;
}
</style>
