<template>
  <div
    :class="{ play: isPlay, paused: !isPlay, 'music-avatar': true }"
    :style="props.style"
  >
    <div class="circle"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isPlay: {
    type: Boolean,
    require: true,
  },
  src: {
    type: String,
    require: true,
  },
  m: {
    type: String,
    default: "0",
  },
  imgP: {
    type: String,
    default: "6px",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
@keyframes ratote365 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.music-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(208, 150, 233);
  // background-image: url(1.png);
  background-image: v-bind("`url(${props.src})`");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin: v-bind("m");
  animation: ratote365 12s infinite linear;
  // img {
  //   box-sizing: border-box;
  //   display: block;
  //   width: 96px;
  //   height: 96px;
  //   object-fit: cover;
  //   position: absolute;
  // }
  .circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid #eee;
    z-index: 1;
    position: relative;
    &::after {
      content: "";
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: #333;
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }
  }
}
.paused {
  animation-play-state: paused;
}
.play {
  animation-play-state: running;
}
</style>
