<template>
  <div class="div_body"  id="body">
    <div class="div_header">速度：<span class="el-icon-remove-outline" @click="changeSpeed(-1)"></span>&nbsp;{{speed}}&nbsp;<span class="el-icon-circle-plus-outline" @click="changeSpeed(1)"></span>&nbsp;&nbsp;&nbsp;&nbsp;得分：{{score}}&nbsp;&nbsp;
    </div>
    <div ref="element" class="div_box" v-loading="isStopping" element-loading-text="已暂停，空格继续"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div v-for="item in pointStyle" class="test_div" :style="item.style"></div>
      <div class="food_div" :class="foodBling ? 'food_bling' : ''" :style='foodStyle'></div>
      <div class="fxKey" style="bottom: 25px;left: 15px" @click="init(37)"><p>←</p></div>
      <div class="fxKey" style="bottom: 55px;right: 15px" @click="init(38)"><p>↑</p></div>
      <div class="fxKey" style="bottom: 25px;left: 60px" @click="init(39)"><p>→</p></div>
      <div class="fxKey" style="bottom: 10px;right: 15px" @click="init(40)"><p>↓</p></div>
    </div>
    <div v-if="isDeaded" class="div_dead">
      <p>你死了！</p>
    </div>
    <div v-if="showTip" class="div_tip">
      <div>
        <p>You lose</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 整体控制
      speed: 2,                    // 速度
      score: 0,                    // 分数
      isStopping: false,           // 是否暂停中
      isDeaded: false,             // 是否死亡
      showTip: false,              // 是否显示提示
      timeInterval: 200,           // 时间间隔（ms）
      lastKeyTime: 0,              // 最后一次按键时间
      fangX: null,                 // 当前方向 -1左 -2上 1右 2下
      key: 0,                      // 当前方向对应的key值
      clientHeight: 0,             // box高度
      clientWidth: 0,              // box宽度
      pointList: [{
        top: 0,
        left: 80
      }, {
        top: 0,
        left: 60
      }, {
        top: 0,
        left: 40
      }, {
        top: 0,
        left: 20
      }, {
        top: 0,
        left: 0
      }],
      pointStyle: [{
        style: 'left:80px'
      }, {
        style: 'left:60px'
      }, {
        style: 'left:40px'
      }, {
        style: 'left:20px'
      }, {
        style: ''
      }],
      foodPosition: {
        top: 100,
        left: 100
      },                           // 食物位置
      foodStyle: '',               // 食物附加css
      foodBling: false,
      timer: '',
      foodTimer: ''
    }
  },
  watch: {
    foodPosition: {
      handler: function (val) {
        this.foodStyle = 'top:' + val.top + 'px;left:' + val.left + 'px;'
      },
      deep: true
    },
    speed: function (val) {
      this.timeInterval = 400 / val
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
      this.init(key)
    };
  },
  mounted() {
    let height = Math.floor((document.getElementById('body').clientHeight - 25) / 20) *20 + 25 +'px'
    let width = Math.floor(document.getElementById('body').clientWidth / 20) *20 +'px'
    document.getElementById('body').style.width = width
    document.getElementById('body').style.height = height
    this.clientHeight = this.$refs.element.clientHeight
    this.clientWidth = this.$refs.element.clientWidth
    // 食物初始化
    this.showFood()
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.foodTimer);
  },
  methods: {
    init(key) {
      if (this.isDeaded) {              // 判断是否死亡状态
        this.showTip = true             // 已死亡显示死亡画面
      } else {                          // 未死亡
        if (this.isStopping) {          // 判断是否暂停状态
          if (key === 32) {             // 暂停时空格继续
            let oldKey = this.key       // 按之前的方向走
            this.timer = setInterval(() => {
              this.move(oldKey)
            }, this.timeInterval);
            this.isStopping = false
          }
        } else {                        // 不是暂停
          if (key === 32) {             // 如果是空格
            clearInterval(this.timer);  // 暂停
            this.isStopping = true      // 显示暂停画面
          } else if (this.isKey(key)) { // 如果key值是上下左右
            let sjjg = new Date().getTime() - this.lastKeyTime
            this.lastKeyTime = new Date().getTime()
            if (sjjg < this.timeInterval) {
              setTimeout(() => {
                this.runTimer(key)
              }, this.timeInterval - sjjg + 1)
            } else {
              this.runTimer(key)
            }
          }
        }
      }
    },
    runTimer(key) {
      let to = 0
      switch (key) {
        case 37: {
          to = -1;
          break;
        }
        case 38: {
          to = -2;
          break;
        }
        case 39: {
          to = 1;
          break;
        }
        case 40: {
          to = 2;
          break;
        }
      }
      if (to === this.fangX || (to + this.fangX === 0)) {
        return
      } else {
        this.fangX = to
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.key = key                             // 保存当前key值
        this.timer = setInterval(() => {
          this.move(key)
        }, this.timeInterval);
      }
    },
    move(val) {
      let newList = []                             // 注册局部变量以计算新的圆点的位置
      let length = this.pointList.length           // 圆点的数量
      this.pointList.forEach((item, index) => {    // 新数组记录除头部之外的其他圆点位置
        if (index + 1 < length) {
          newList[index + 1] = {
            top: item.top,
            left: item.left
          }
        }
      })
      switch (val) {
        case 37: {                                 // 向左移动
          newList[0] = {
            top: this.pointList[0].top,
            left: this.pointList[0].left - 20
          };
          break;
        }
        case 38: {                                 // 向上移动
          newList[0] = {
            top: this.pointList[0].top - 20,
            left: this.pointList[0].left
          };
          break;
        }
        case 39: {                                 // 向右移动
          newList[0] = {
            top: this.pointList[0].top,
            left: this.pointList[0].left + 20
          };
          break;
        }
        case 40: {                                 // 向下移动
          newList[0] = {
            top: this.pointList[0].top + 20,
            left: this.pointList[0].left
          };
          break;
        }
      }
      this.pointList = []
      this.pointList = newList
      if (this.isDead()) {
        this.isDeaded = true
        clearInterval(this.timer)
      } else {
        this.showPoint()
      }
    },
    showPoint() {
      this.pointList.forEach((item, index) => {
        this.pointStyle[index].style = 'top:' + item.top + 'px;left:' + item.left + 'px;'
      })
      if (this.pointList[0].top === this.foodPosition.top && this.pointList[0].left === this.foodPosition.left) {
        this.score++
        let length = this.pointList.length
        let newPoint = {
          top: this.pointList[length - 1].top * 2 - this.pointList[length - 2].top,
          left: this.pointList[length - 1].left * 2 - this.pointList[length - 2].left
        }
        this.pointList.push(newPoint)
        this.pointStyle.push({
          style: 'top:' + newPoint.top + 'px;left:' + newPoint.left + 'px;'
        })
        this.showFood()
      }
    },
    /**
     * @desc 食物设置
     */
    showFood() {
      let foodPoint = {
        top: Math.floor(Math.random() * (this.clientHeight / 20)) * 20,
        left: Math.floor(Math.random() * (this.clientWidth / 20)) * 20
      }
      this.pointList.forEach((item) => {
        if (foodPoint.top === item.top && foodPoint.left === item.left) {
          this.showFood()
          return
        }
      })
      this.foodPosition = foodPoint
      this.foodTimer = setInterval(() => {
        this.foodBling = !this.foodBling
      }, 600);
    },
    /**
     * @desc 判断是否死亡
     */
    isDead() {
      let me = false
      // 是否撞上了边界
      if (this.pointList[0].top < 0 || this.pointList[0].top > (this.clientHeight - 20) || this.pointList[0].left < 0 || this.pointList[0].left > (this.clientWidth - 20)) {
        me = true
      } else {
        // 是否撞上自己
        this.pointList.forEach((item, index) => {
          if (index > 0) {
            if (this.pointList[0].top === item.top && this.pointList[0].left === item.left) {
              me = true
            }
          }
        })
      }
      return me
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
    /**
     * @desc 改变速度
     */
    changeSpeed(val) {
      this.speed = this.speed + val
    }
  }
}
</script>

<style scoped>
.div_body {
  position: relative;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: lightblue;
  border: 1px solid #666666;
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
  height: calc(100% - 25px);
  position: relative;
}

.test_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  box-shadow: 0 0 5px red;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1) -.1s;
  z-index: 999;
}

.food_div {
  position: absolute;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  background-color: #ff35ab;
  box-shadow: 0 0 5px #ff35ab;
  transition: box-shadow, transform 0.6s;
  z-index: 998;
}

.food_bling {
  transform: scale(1.1);
  /*background-color: rgb(255, 108, 230);*/
  box-shadow: 0 0 8px rgb(255, 108, 230);
  transition: box-shadow, transform 0.6s;
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

.fxKey {
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: #dddddd;
  border-radius: 5px;
  box-shadow: 0 0 5px #b8b8b8;
  display: flex;
}

.fxKey p {
  margin: auto;
  font-size: 20px;
  font-weight: bolder;
  color: #ff57e6;
}
</style>
