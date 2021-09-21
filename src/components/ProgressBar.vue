<template>
  <div class="container">
    <div class="cur-time">{{ coverTimeHHMMSS(curTime) }}</div>
    <div id="progress-bar" @click="modifyProgress"></div>
    <div class="duration">{{ coverTimeHHMMSS(duration) }}</div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { coverTimeHHMMSS } from "../lib/index.js";
const props = defineProps({
  curTime: {
    type: Number,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
});

const emits = defineEmits(["change_progress"]);

const modifyProgress = (e) => {
  const el = e.target;
  const offsetX = e.clientX;
  const { width, left } = el.getBoundingClientRect();
  // 计算出点击的百分比，可以直接赋值给音量 🔊
  emits("change_progress", Number(((offsetX - left) / width).toFixed(2)));
};
const progress = computed(() => {
  if (props.duration === 0 || props.curTime === 0) {
    return 0;
  }
  return (props.curTime / props.duration) * 100;
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.5rem;
  .cur-time,
  .duration {
    user-select: none;
    min-width: 2.2rem;
  }
}
#progress-bar {
  max-width: 720px;
  min-width: 360px;
  height: 4px;
  border-radius: 4px;
  margin: 4px 1rem;
  background-color: rgb(152, 150, 150);
  z-index: 1;
  position: relative;
  cursor: pointer;
  &::after {
    z-index: 2;
    content: "";
    display: inline-block;
    height: 4px;
    border-radius: 4px;
    background-color: white;
    position: absolute;
    left: 0;
    width: v-bind("`${progress}%`");
  }
}
</style>
