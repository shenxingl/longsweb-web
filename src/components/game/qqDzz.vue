<template>
  <div class="div_body">
    <div ref="element" class="div_box" v-loading="isStopping">
      <div class="div_point" :style="pointStyle">
        <p>{{weight}}g</p>
      </div>
      <div v-for="item in foodList" class="div_food" :style="item.style"></div>
    </div>
    <!--    <div v-if="isDeaded" class="div_dead">-->
    <!--      <p>你死了！</p>-->
    <!--    </div>-->
    <!--    <div v-if="showTip" class="div_tip">-->
    <!--      <div>-->
    <!--        <p>You lose</p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      // 整体控制
      isStopping: false,           // 是否暂停中
      isDeaded: false,             // 是否死亡
      showTip: false,              // 是否显示提示
      clientHeight: 0,             // 可动区域高度
      clientWidth: 0,              // 可动区域宽度
      // 点的设置
      point: {                     // 球的属性
        top: 0,                    // 距顶框
        left: 0,                   // 距左框
        width: 20,                 // 宽度
        height: 20                 // 高度
      },
      pointStyle: '',              // 球的位置显示
      radius: 10,                  // 球的半径
      weight: 1,                   // 球的重量
      zhRates: 0.85,               // 转化率
      // 食物
      foodList: [],                //
      // 全局控制
      key: [],                     // 键盘按键
      timer: []                    // 定时器
    }
  },
  watch: {
    radius: function (newVal, oldVal) {
      this.point.left = this.point.left - (newVal - oldVal)
      this.point.top = this.point.top - (newVal - oldVal)
      this.point.width = newVal * 2
      this.point.height = newVal * 2
    },
    point: {
      handler: function (val) {
        if (val.top < 0) {
          val.top = 0
        }
        if (val.left < 0) {
          val.left = 0
        }
        if (val.top > this.clientHeight - val.height * 0.85) {
          val.top = this.clientHeight - val.height * 0.85
        }
        if (val.left > this.clientWidth - val.width * 0.85) {
          val.left = this.clientWidth - val.width * 0.85
        }
        this.pointStyle = 'top:' + val.top + 'px;left:' + val.left + 'px;width:' + val.width + 'px;height:' + val.height + 'px;'
      },
      deep: true
    },
    showTip: function (val) {
      if (val) {
        setTimeout(() => {
          this.showTip = false
        }, 2000)
      }
    }
  },
  created() {
    document.onkeydown = (e) => {
      let key = window.event.keyCode
      if (this.isKey(key)) {
        let index = this.isInKeyList(key)
        if (index === undefined) {
          this.key.push(key)
          let newTimer = setInterval(() => {
            this.move(key)
          }, this.weight * 2 + 8);
          this.timer.push(newTimer)
        }
      }
    };
    document.onkeyup = (e) => {
      let key = window.event.keyCode
      let index = this.isInKeyList(key)
      if (index !== undefined) {
        this.key.splice(index, 1)
        clearInterval(this.timer[index])
        this.timer.splice(index, 1)
      }
    };
  },
  mounted() {
    this.clientHeight = this.$refs.element.clientHeight
    this.clientWidth = this.$refs.element.clientWidth
    this.createFood()
  },
  beforeDestroy() {
    this.timer.forEach(item => {
      clearInterval(item);
    })
  },
  methods: {
    createFood() {
      let num = Math.floor(Math.sqrt(this.clientHeight * this.clientWidth) * 1.2)
      for (let i = 0; i < num; i++) {
        // 食物属性：top,left,radius(5-10),weight,color
        let food = {}
        food.radius = this.getRandom.getSjzs(1, 4)
        food.weight = food.radius * food.radius * food.radius / 1000
        food.top = this.getRandom.getSjzs(0, this.clientHeight - food.radius * 2)
        food.left = this.getRandom.getSjzs(0, this.clientWidth - food.radius * 2)
        let color = this.getRandom.getSjzs(0, 5)
        switch (color) {
          case 0: {                                 // 绿色
            food.color = '#68FF59'
            break;
          }
          case 1: {                                 // 红色
            food.color = '#FF4C4C'
            break;
          }
          case 2: {                                 // 黄色
            food.color = '#FFF26D'
            break;
          }
          case 3: {                                 // 蓝色
            food.color = '#1d28ff'
            break;
          }
          case 4: {                                 // 白色
            food.color = '#FFF'
            break;
          }
        }
        food.style = 'top: ' + food.top + 'px;left: ' + food.left + 'px;width: ' + food.radius * 2 + 'px;height: ' + food.radius * 2 + 'px;background-color: ' + food.color + ';box-shadow: 0 0 5px ' + food.color + ';'
        this.foodList.push(food)
      }
    },
    /**
     * @desc 方向移动及边界判定
     */
    move(key) {
      switch (key) {
        case 37: {                                 // 向左移动
          if (this.point.left > 0) {
            this.point.left = this.point.left - 1;
          }
          break;
        }
        case 38: {                                 // 向上移动
          if (this.point.top > 0) {
            this.point.top = this.point.top - 1;
          }
          break;
        }
        case 39: {                                 // 向右移动
          if (this.point.left < this.clientWidth - this.point.width * 0.85) {
            this.point.left = this.point.left + 1;
          }
          break;
        }
        case 40: {                                 // 向下移动
          if (this.point.top < this.clientHeight - this.point.height * 0.85) {
            this.point.top = this.point.top + 1;
          }
          break;
        }
      }
      for (let i = 0; i < this.foodList.length; i++) {
        let topcha = this.foodList[i].top + this.foodList[i].radius - (this.point.top + this.radius)
        let leftcha = this.foodList[i].left + this.foodList[i].radius - (this.point.left + this.radius)
        if (topcha * topcha + leftcha * leftcha <= this.radius * this.radius) {
          let weight = this.weight + this.foodList[i].weight * this.zhRates
          this.weight = parseFloat(weight.toFixed(3))
          this.radius = Math.cbrt(this.weight * 1000)           // 立方根，保留两位小数
          this.foodList.splice(i, 1)
        }
      }
    },
    isInKeyList(key) {
      let length = this.key.length
      for (let i = 0; i < length; i++) {
        if (key === this.key[i]) return i
      }
    },
    /**
     * @desc 判断按键是否是上下左右
     */
    isKey(key) {
      if (key === 37 || key === 38 || key === 39 || key === 40) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style scoped>
.div_body {
  position: relative;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: #4d4d4d;
  border: 1px solid #666666;
  /*transform: scale(1.3);*/
}

.div_header {
  width: 100%;
  height: 25px;
  background-color: #bbbbbb;
  border-bottom: 1px solid #666666;
  text-align: right;
}

.div_header p {
  line-height: 25px;
}

.div_box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.div_point {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  box-shadow: 0 0 6px #ff57e6;
  transition: all 0.05s cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 999;
  display: flex;
}

.div_point p {
  color: white;
  font-size: 12px;
  margin: auto;
  transform: scale(.7);
}

.div_food {
  position: absolute;
  border-radius: 50%;
  z-index: 998;
}

.div_dead {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 102, 102, 0.8);
  z-index: 1000;
  display: flex;
}

.div_dead p {
  margin: auto;
  color: red;
  font-size: 30px;
  font-weight: bolder;
}

.div_tip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
}

.div_tip div {
  width: 200px;
  height: 130px;
  border-radius: 10px;
  border: 2px solid #666;
  margin: auto;
  background-color: white;
  display: flex;
}

.div_tip div p {
  margin: auto;
  color: red;
  font-size: 30px;
  font-weight: bolder;
}
</style>
