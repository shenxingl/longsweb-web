<template>
  <div>
    <div>
      <button @click="localInit">本地视频流初始化</button>
      <button @click="play">加入</button>
      <button @click="stop">停止</button>
      <button @click="shengc">生成</button>
      {{e}}
      <div id="local"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: 'user1',
      userInfo: {},
      loading: false,
      localStream_: null,
      client_: null,
      e: 'eee'
    }
  },
  created() {
    this.userInfo = window.genTestUserSig(this.userId)
    this.load()
  },
  methods: {
    shengc(){
      let msg = ''
      for(let i=0;i<90;i++){
        msg = msg + '['+(i+1)+'r]\n' +
          'Meter=Shape\n' +
          'X=(#ypw#*'+(i+248)+')\n' +
          'Y=#yph#\n' +
          'Shape=Path MyPath | StrokeWidth 0 | Fill Color color\n' +
          'MyPath=0,0 | LineTo (#ypw#/2),(-[Bandr'+(i+1)+']*#yph#) | LineTo #ypw#,0 | LineTo (#ypw#/2),([Bandr'+(i+1)+']*#yph#)| ClosePath 1\n' +
          'DynamicVariables=1\n'
      }
      console.log(msg)
    },
    load() {
      this.localStream_ = TRTC.createStream({
        audio: true, // 采集麦克风
        video: true, // 采集摄像头
        userId: this.userId
        // cameraId: getCameraId(),
        // microphoneId: getMicrophoneId()
      })
      // 设置视频分辨率帧率和码率
      this.localStream_.setVideoProfile('480p')

      this.client_ = TRTC.createClient({
        mode: 'videoCall', // 实时通话模式
        sdkAppId: this.userInfo.SDKAppID,
        userId: this.userId,
        userSig: this.userInfo.userSig
      })
    },
    localInit() {
      this.e = '333'
      this.localStream_.initialize().then(() => {
        alert('本地视频流初始化成功')
      }).catch((e) => {
        this.e = e
        alert('初始化失败' + e)
      })
    },
    play() {
      this.localStream_.play('local')
    },
    stop() {
      this.localStream_.stop()
    }
  }
}
</script>

<style scoped>
#local {
  width: 600px;
  height: 500px;
  background-color: #888888;
}
</style>
