<template>
  <div class="div_body" @mousedown="startFire" @mousemove="iconSelfMove" @mouseup="stopFire">
    <div ref="element" class="div_content" @mousemove="iconMove">
      <div class="zd_div" v-for="item in zdList" :style="item.style + zdSizeStyle"></div>
    </div>
    <div class="icon_gun" :style="gunStyle">
      <img src="../../assets/tools/gun.png" style="width: 80px"/>
    </div>
    <img src="../../assets/icon/miaozhun.png" class="icon_mz" :style="iconStyle" @mousemove="iconSelfMove">
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      speed: 3,                          // 移动速度
      clientHeight: 0,                   // 可移动区域高度
      clientWidth: 0,                    // 可移动区域宽度
      iconPos: {top: 0, left: 0},        // 鼠标显示图片位置
      iconStyle: '',                     // 鼠标显示style
      zdSize: 12,                         // 子弹大小
      zdSizeStyle: 'width: 12px;height:12px;',                   // 子弹大小style
      zdStyle: '',   // 子弹style
      zd: {},           // 子弹位置
      zdList: [],                        // 子弹列表
      gunStyle: '',                      //
      timer: '',                          // 定时器
      timer1: '',                          // 定时器
    }
  },
  watch: {
    zdSize: function (val) {
      this.zdSizeStyle = 'width: ' + val + 'px;height: ' + val + 'px;'
    },
    iconPos: {
      handler: function (val) {
        this.iconStyle = 'top:' + (val.top - 25) + 'px;left:' + (val.left - 25) + 'px;'
      },
      deep: true
    },
  },
  created() {

  },
  mounted() {
    this.clientHeight = this.$refs.element.clientHeight
    this.clientWidth = this.$refs.element.clientWidth
  },
  methods: {
    fire() {
      let zd = {}
      zd.top = this.clientHeight - 41
      zd.left = 30
      zd.style = 'top:' + (zd.top - this.zdSize / 2) + 'px;left:' + (zd.left - this.zdSize / 2) + 'px;'
      this.zdList.push(zd)
      let xdLeft = this.iconPos.left - zd.left
      let xdTop = this.iconPos.top - zd.top
      let xl = xdTop / xdLeft
      let fm = Math.sqrt(Math.pow(xl, 2) + 1)
      let top, left
      left = (xdLeft < 0 ? -1 : 1) / fm * this.speed
      top = (xdTop < 0 ? -Math.abs(xl) : Math.abs(xl)) / fm * this.speed
      this.timer = setInterval(() => {
        if (zd.top > 0 && zd.top < this.clientHeight - this.zdSize / 2) {
        } else {
          top = -top
        }
        if (zd.left > 0 && zd.left < this.clientWidth - this.zdSize / 2) {
        } else {
          left = -left
        }
        zd.top = zd.top + top
        zd.left = zd.left + left
        zd.style = 'top:' + (zd.top - this.zdSize / 2) + 'px;left:' + (zd.left - this.zdSize / 2) + 'px;'
      }, 5);
    },
    startFire() {
      this.timer1 = setInterval(() => {
        this.fire()
      },200)
    },
    stopFire() {
      clearInterval(this.timer1);
    },
    iconSelfMove() {
      let event = event || window.event;
      this.iconPos.left = this.iconPos.left + event.offsetX - 25;
      this.iconPos.top = this.iconPos.top + event.offsetY - 25;
      this.gunChange(this.iconPos.left, this.iconPos.top)
    },
    iconMove() {
      let event = event || window.event;
      this.iconPos.left = event.offsetX;
      this.iconPos.top = event.offsetY;
      this.gunChange(this.iconPos.left, this.iconPos.top)
    },
    gunChange(mx, my) {
      let qx = 30
      let qy = this.clientHeight - 45
      let deg = this.angle({x: qx, y: qy}, {x: mx, y: my})
      this.gunStyle = 'transform: rotateZ(' + deg + 'deg)'
    },
    angle(start, end) {
      let diff_x = end.x - start.x,
        diff_y = end.y - start.y;
      //返回角度,不是弧度
      return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    }
  }
}
</script>

<style scoped>
.div_body {
  position: relative;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  /*width: 600px;*/
  /*height: 600px;*/
  background-color: rgba(127, 127, 127, 0.44);
  border: 1px solid #666666;
  overflow: hidden;
}

.div_content {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: none;
}

.icon_gun {
  position: absolute;
  bottom: 26px;
  left: 5px;
  width: 50px;
  height: 30px;
  cursor: none;
}

.icon_mz {
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: none;
}

.zd_div {
  position: absolute;
  background-color: #ff05f2;
  border-radius: 50%;
}
</style>
