<template>
  <div style="width: calc(100% - 30px);height: calc(100% - 30px);border: 0;padding: 15px">
    <video ref="videoPlayer" class="videoPlayer" controls autoplay/>
  </div>
</template>

<script>
export default {
  name: "movieplayer",
  mounted() {
    this.$refs.videoPlayer.src = '/longs/videoctrl/videoplayer?vd101=' + this.$route.params.vd101
  }
}
</script>

<style scoped>
.videoPlayer {
  width: 500px;
  height: 350px;
  background-color: #000000
}
</style>
