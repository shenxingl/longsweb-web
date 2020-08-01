<template>
  <div id="app" v-if="isPhone" :class="{'back1':back===1,'back2':back===2, 'back3': back===3, 'back4': back===4, 'back5': back===5}" @click="appClick()">
    <router-view/>
  </div>
  <div v-else @click="appClick()">
    <router-view/>
    <video v-if="!isPhone" class="app_video" src="./assets/comm/vm1.mp4" autoplay muted loop></video>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      backList: [
        'assets/comm/back1.jpg',
        'assets/comm/back2.jpg',
        'assets/comm/back3.jpg'
      ],
      isPhone: false,
      back: 1,
      textList: ["❤富强❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤",
          "❤爱国❤", "❤敬业❤", "❤诚信❤", "❤友善❤"],
      textIndex: 0,
      textColor: ['#FF061A', '#FF07E8', '#443BFF', '#2DFF59', '#DBFF16', '#FF8C0E', '#68FFAF']
    }
  },
  created() {
    // 看板娘-------------------------------------------------------------------------------------------------
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-haru_1/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '/static/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json'},
        display: {position: 'right', width: 250, height: 550},
        mobile: {show: true},
        log: false
      })
    }, 1000)

    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.isPhone = true
      // 轮播图--------------------------------------------------------------------------------------------------
      setInterval(() => {
        if (this.back < 5) {
          this.back++
        } else {
          this.back = 1
        }
      }, 10000)
    }
  },
  methods: {
    appClick() {
      let num = Math.floor(Math.random() * this.textColor.length)
      let event = event || window.event;
      let x = event.clientX, y = event.clientY;
      let i = document.createElement('span');
      i.innerHTML = this.textList[this.textIndex]
      i.style.position = 'absolute'
      i.style.color = this.textColor[num]
      i.animate([
        {
          left: x - 31 + 'px',
          top: y - 22 + 'px',
          opacity: 1
        },
        {
          left: x - 31 + 'px',
          top: y - 102 + 'px',
          opacity: 1
        },
        {
          left: x - 31 + 'px',
          top: y - 222 + 'px',
          opacity: 0
        }
      ], {
        duration: 1500,
        iterations: Infinity
      });
      document.body.appendChild(i);
      setTimeout(() => {
        document.body.removeChild(i);
      }, 1500);
      if (this.textIndex < 11) {
        this.textIndex++
      } else {
        this.textIndex = 0
      }
    }
  }
}
</script>


<style>
body {
  cursor: url("./assets/icon/mouse.png"), pointer;
}

#app {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  transition: background 5s;
}

.back1 {
  background: url('assets/comm/sbz1.png') no-repeat;
}

.back2 {
  background: url('assets/comm/sbz2.jpeg') no-repeat;
}

.back3 {
  background: url('assets/comm/sbz3.jpeg') no-repeat;
}

.back4 {
  background: url('assets/comm/sbz4.jpeg') no-repeat;
}

.back5 {
  background: url('assets/comm/sbz5.jpeg') no-repeat;
}

.app_video{
  margin: 0;
  width: 100vw;
  height: auto;
  position: fixed;
  left:0;
  top: -5%;
  min-width: 100%;
  min-height: 100%;
  z-index: -9999;
}

div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 8px;
  background-color: rgba(147, 143, 151, 0.48);
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 8px;
}
</style>
