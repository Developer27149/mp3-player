<template>
  <div class="container">
    <ul>
      <li
        v-for="(song, idx) in songList"
        :key="song.id"
        @click="() => handlePlay(idx)"
        :class="{ current: idx === curIdx }"
      >
        <div class="item">
          <Icon
            icon="fluent:music-note-2-play-20-filled"
            v-if="idx === curIdx"
            width="20"
            height="20"
            :class="{ play: isPlay, pause: isPlay, icon: isPlay }"
          />
          <span v-else>
            {{ idx + 1 }}
          </span>

          <span>{{ song.artist.length > 0 ? song.artist : "未知来源" }}</span>
          <span>{{ song.songName }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const emits = defineEmits(["play"]);

const props = defineProps({
  songList: {
    type: Array,
    require: true,
  },
  setCurIdx: {
    type: Function,
    require: true,
  },
  curIdx: {
    type: Number,
    require: true,
  },
  isPlay: {
    type: Boolean,
    require: true,
  },
});

const handlePlay = (idx) => {
  emits("play");
  props.setCurIdx(idx);
};
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
.container {
  color: #eee;
  ul {
    padding: 1rem;
  }
  ul li {
    list-style: none;
    cursor: pointer;
    border: 1.5px solid rgb(56, 58, 55);
    transition: color 0.4s ease-in-out;
    &:hover {
      color: tomato;
    }
  }
  ul li:nth-child(odd) {
    background-color: rgb(56, 58, 55);
  }
  .item {
    padding: 1rem;
    display: flex;
    align-items: center;
    :nth-child(1) {
      width: 3rem;
      text-align: center;
    }
    :nth-child(2) {
      flex-grow: 1;
      padding-left: 1rem;
    }
  }
  .paused {
    animation-play-state: paused;
  }
  .play {
    animation-play-state: running;
  }
  .icon {
    animation: ratote365 12s infinite linear;
  }
  .current {
    color: tomato;
  }
}
</style>
