<template>
  <div class="container">
    <div class="icons">
      <Icon
        v-show="volume < 0.5"
        :icon="isMuted ? 'bx:bx-volume-mute' : 'bx:bx-volume-low'"
        width="1.2rem"
        color="#fff"
        class="icon"
        @click="emits('change_mute')"
      />
      <Icon
        v-show="volume >= 0.5"
        :icon="isMuted ? 'bx:bx-volume-mute' : 'bx:bx-volume-full'"
        width="1.2rem"
        color="#fff"
        class="icon"
        @click="emits('change_mute')"
      />
    </div>
    <div class="progress" @click="modifyProgress"></div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  isMuted: {
    type: Boolean,
    require: true,
  },
  volume: {
    type: Number,
    default: 0.5,
  },
  test: {
    type: Number,
    default: 0.5,
  },
});

const emits = defineEmits(["change_volume", "change_mute"]);

const modifyProgress = (e) => {
  const el = e.target;
  const offsetX = e.clientX;
  const { width, left } = el.getBoundingClientRect();
  // 计算出点击的百分比，可以直接赋值给音量 🔊
  emits("change_volume", Number(((offsetX - left) / width).toFixed(2)));
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-top: 0.4rem;
  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1.2rem;
    .icon {
      cursor: pointer;
      position: absolute;
    }
  }

  .progress {
    position: relative;
    height: 4px;
    width: 96px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.365);
    cursor: pointer;
    &::after {
      content: "";
      display: block;
      height: 4px;
      border-radius: 4px;
      background-color: #fff;
      width: v-bind("`${volume * 100}%`");
    }
  }
}
</style>
