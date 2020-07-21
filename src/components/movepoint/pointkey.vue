<template>
  <div class="div_body">
    <div ref="test" class="test_div" :style="testStyle"></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      top: 0,
      left: 0,
      testStyle: ''
    }
  },
  created() {
    document.onkeydown = (e) => {
      let key = window.event.keyCode
      this.move(key)
    };
  },
  methods: {
    move(val) {
      if (val === 37) {
        this.left = this.left - 5
      }
      if (val === 38) {
        this.top = this.top - 5
      }
      if (val === 39) {
        this.left = this.left + 5
      }
      if (val === 40) {
        this.top = this.top + 5
      }
      this.testStyle = 'top:' + this.top + 'px;left:' + this.left + 'px;'
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
}
</style>
