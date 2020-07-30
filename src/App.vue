<template>
  <div id="app" :class="{'back1':back===1,'back2':back===2, 'back3': back===3}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      backList: [
        'assets/comm/back1.jpg',
        'assets/comm/back2.jpg',
        'assets/comm/back3.jpg'
      ],
      back: 1
    }
  },
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-z16/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/static/live2dw/live2d-widget-model-z16/assets/z16.model.json' },
        display: { position: 'right', width: 240, height: 420 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
    setInterval(() => {
      if (this.back<3){
        this.back++
      } else {
        this.back=1
      }
    }, 30000)
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  transition: background 1s;
  /*cursor: url("./src/assets/icon/miaozhun.png")*/
}

.back1 {
  background:url('assets/comm/back1.jpg');
}

.back2 {
  background:url('assets/comm/back2.jpg');
}

.back3 {
  background:url('assets/comm/back3.jpg');
}

div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 8px;
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
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 8px;
}
</style>
