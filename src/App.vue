<template>
  <div id="app" :class="{'back1':back===1,'back2':back===2, 'back3': back===3}" @click="appClick()">
    <router-view/>
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
      back: 1,
      textList: ["❤富强❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤",
          "❤爱国❤", "❤敬业❤", "❤诚信❤", "❤友善❤"],
      textIndex: 0,
      textColor: ['#FF061A', '#FF07E8', '#443BFF', '#2DFF59', '#DBFF16', '#FF8C0E', '#68FFAF']
    }
  },
  created() {
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
    setInterval(() => {
      if (this.back < 3) {
        this.back++
      } else {
        this.back = 1
      }
    }, 30000)
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
  transition: background 1s;
}

.back1 {
  background: url('assets/comm/back1.jpg');
}

.back2 {
  background: url('assets/comm/back2.jpg');
}

.back3 {
  background: url('assets/comm/back3.jpg');
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
