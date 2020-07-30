<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px">
    <audio controls id="myaudio" src="/longs/videoctrl/videoplayer?vd101=1"></audio>
    <canvas id="canvas"></canvas>
    <el-button @click="play">播放</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "mymusic",
  data() {
    return {
    }
  },
  methods: {
    play() {
      var oAudio = document.getElementById('myaudio');
      window.onclick = function () {
        if (oAudio.paused) {
          oAudio.play();
        } else {
          oAudio.pause();
        }
      }
      // 创建音频上下文对象
      var oCtx = new AudioContext();
      // console.log(oCtx);
      // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
      var audioSrc = oCtx.createMediaElementSource(oAudio);
      // 创建分析机
      var analyser = oCtx.createAnalyser();
      // 媒体源与分析机连接
      audioSrc.connect(analyser);
      // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
      analyser.connect(oCtx.destination);

      // 效果（实现的具体方法）
      // 绘制音频图的条数(fftSize)
      /*
        根据分析音频的数据去获取音频频次界定音频图的高度
        放在与音频频次等长的8位无符号字节数组
        Uint8Array:初始化默认值为1024
      */
      // 利用cancas渐变进行音频绘制
      var ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth/2;
      canvas.height = window.innerHeight/2;
      var oW = canvas.width;
      var oH = canvas.height;
      // var color1 = ctx.createLinearGradient(oW / 2, oH / 2 - 30, oW / 2, oH / 2 - 100);
      // var color2 = ctx.createLinearGradient(oW / 2, oH / 2 + 30, oW / 2, oH / 2 + 100);
      // color1.addColorStop(0, '#000');
      // color1.addColorStop(.5, '#069');
      // color1.addColorStop(1, '#f6f');
      // color2.addColorStop(0, '#000');
      // color2.addColorStop(.5, '#069');
      // color2.addColorStop(1, '#f6f');
      // 音频图的条数
      var count = 320;
      // 缓冲区:进行数据的缓冲处理，转换成二进制数据
      var voiceHeight = new Uint8Array(analyser.frequencyBinCount);

      function draw() {
        // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
        analyser.getByteFrequencyData(voiceHeight);
        // 自定义获取数组里边数据的频步
        var step = Math.round(voiceHeight.length / count);
        ctx.clearRect(0, 0, oW, oH);
        for (var i = 0; i < count; i++) {
          var audioHeight = voiceHeight[step * i];
          ctx.fillStyle = 'rgba(255,255,255,0.29)'
          ctx.fillRect(0, oH / 2, oW, 1);
          ctx.fillStyle = '#fff'
          if (i<160) {
            if (i%3 === 0) {
              ctx.fillRect(oW - (i*5/3), oH / 2, 3, -audioHeight);
              ctx.fillRect(oW - (i*5/3), oH / 2, 3, audioHeight);
            }
            if (i%4 === 0) {
              ctx.fillRect(oW - 265 - (i*5/4), oH / 2, 3, -audioHeight/2);
              ctx.fillRect(oW - 265 - (i*5/4), oH / 2, 3, audioHeight/2);
            }
            if (i%5 === 0) {
              ctx.fillRect(oW - 465 - i, oH / 2, 3, -audioHeight/4);
              ctx.fillRect(oW - 465 - i, oH / 2, 3, audioHeight/4);
            }
          }
          if(i>160){
            ctx.fillRect(oW +180- (i*5), oH / 2, 3, -audioHeight/4);
            ctx.fillRect(oW +180 - (i*5), oH / 2, 3, audioHeight/4);
          }

          // ctx.fillStyle = color1;  // 绘制向上的线条
          // ctx.fillRect(oW - i, oH / 2, 3, -audioHeight);
          // ctx.fillStyle = color2;  // 绘制向下的线条
          // ctx.fillRect(oW - i, oH / 2, 3, audioHeight);
        }
        window.requestAnimationFrame(draw);
      }

      draw();
    }
  }
}
</script>

<style scoped>
#canvas {
  display: block;
  background: linear-gradient(135deg, rgb(142, 13, 133) 0%, rgb(230, 132, 110) 100%);
}
</style>
