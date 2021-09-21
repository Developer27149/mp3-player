<template>
  <div class="music-avatar" :style="props.style">
    <img
      :class="{ play: isPlay, paused: !isPlay }"
      :src="props.src"
      alt=""
      ref="imgRef"
    />
    <div class="circle"></div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

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
// const imgRef = ref(null);

// watch(props, () => {
//   imgRef.value.style.animationPlayState = props.isPlay ? "running" : "paused";
//   // console.log(props.isPlay);
//   // console.log(imgRef);
//   // if (imgRef.value !== null) {
//   //   imgRef.value.style.animationPlayState = "";
//   // }
// });
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
  background-color: rgb(208, 150, 233);
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: v-bind("m");
  img {
    box-sizing: border-box;
    display: block;
    padding: v-bind("imgP");
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    animation: ratote365 12s infinite linear;
  }
  .paused {
    animation-play-state: paused;
  }
  .play {
    animation-play-state: running;
  }
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
</style>
