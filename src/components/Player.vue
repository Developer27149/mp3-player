<script setup>
import "../static/style.scss";
import { onMounted } from "vue";
import {
  ALL_LOOP,
  generateUUID,
  LIST_LOOP,
  nextIdx,
  onceOption,
  prevIdx,
  SINGLE_LOOP,
} from "../lib/index.js";
import MusicAvatar from "./MusicAvatar.vue";
import { Icon } from "@iconify/vue";
import { reactive, toRefs, ref, computed, watch } from "vue";
import ProgressBar from "./ProgressBar.vue";
import VolumeBar from "./VolumeBar.vue";
import LoopControl from "./LoopControl.vue";
import SongListVue from "./SongList.vue";

const props = defineProps({
  songList: {
    type: Array,
    default: [
      {
        src: "1.mp3",
        pic: "1.png",
        artist: "JJ Lin",
        songName: "Allways online",
        id: generateUUID(),
      },
      {
        src: "2.mp3",
        pic: "2.png",
        songName: "山川",
        artist: "李荣浩",
        id: generateUUID(),
      },
      {
        src: "3.mp3",
        pic: "1.png",
        artist: "Jay",
        songName: "一路向北",
        id: generateUUID(),
      },
      {
        src: "4.mp3",
        pic: "2.png",
        songName: "触不可及",
        artist: "佚名",
        id: generateUUID(),
      },
    ],
  },
  loopMode: {
    type: String,
    default: SINGLE_LOOP,
  },
  volume: {
    type: Number,
    default: 0.3,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
});
// basic player attr
const { isMuted, volume, loopMode } = props;
const data = reactive({
  v_isMuted: isMuted,
  v_loopMode: loopMode,
  v_volume: volume,
  isPlay: false,
  curTime: 0,
  curIdx: 0,
  curDuration: 0,
  isCanplay: false,
});
const audioRef = ref(null);
const curSong = computed(() => {
  const {
    src = "1.mp3",
    pic = "1.png",
    artist = "林俊杰",
    songName = "allways online",
  } = props.songList[data.curIdx] || {};
  return {
    src,
    pic,
    songName,
    artist,
  };
});

const controlAction = (action = "turn") => {
  if (props.songList.length === 0) return;
  // 切换播放和暂停状态，不传参数
  if (action === "turn") {
    data.isPlay = !data.isPlay;
  } else {
    const _idx = data.curIdx;

    if (action === "next") {
      data.curIdx = nextIdx(props.songList.length, _idx);
    } else if (action === "prev") {
      data.curIdx = prevIdx(props.songList.length, _idx);
    }
  }
};

watch(data, () => {
  // mute and volume
  const audio = audioRef.value;
  if (audio) {
    data.curDuration = audio.duration;
    audio.volume = data.v_volume;
    audio.muted = data.v_isMuted;
    if (audio.paused && data.isPlay) {
      if (data.isCanplay) {
        setTimeout(() => {
          audio.play();
        }, 30);
      }
    } else if (!audio.paused && !data.isPlay) {
      audio.pause();
    }
  }
});

const changeMode = (mode) => (data.v_loopMode = mode);

const changeMute = () => (data.v_isMuted = !data.v_isMuted);

const changeVolume = (v) => (data.v_volume = v);

const changeProgress = (percent) => {
  const audio = audioRef.value;
  if (audio) {
    audio.currentTime = data.duration * percent;
  }
};

onMounted(() => {
  const audio = audioRef.value;
  const setCurTime = () => {
    if (audio.currentTime !== 0 && data.curTime < data.duration) {
      data.curTime = audio.currentTime;
    }
  };
  const handlePlayEnd = () => {
    // 结束的时候切歌
    data.curTime = 0;
    if (data.v_loopMode === ALL_LOOP) {
      data.isCanplay = false;
      data.curIdx = nextIdx(props.songList.length, data.curIdx);
      // audio.load();
    } else if (data.v_loopMode === LIST_LOOP) {
      if (data.curIdx !== props.songList.length - 1) {
        data.isCanplay = false;
        data.curIdx = nextIdx(props.songList.length, data.curIdx);
      } else {
        data.isCanplay = true;
        data.isPlay = false;
      }
    } else {
      // single loop
      data.isPlay = true;
    }
  };

  audio.addEventListener("durationchange", () => {
    data.duration = audio.duration;
    audio.addEventListener("timeupdate", setCurTime);
    audio.addEventListener("ended", handlePlayEnd, onceOption);
    audio.addEventListener(
      "canplay",
      () => (data.isCanplay = true),
      onceOption
    );
  });
});
</script>

<template>
  <div class="music-player-wrapper">
    <audio ref="audioRef" :src="curSong.src" preload="auto" />
    <div class="content">
      <MusicAvatar :src="curSong.pic" :isPlay="data.isPlay" />
      <div class="info">
        <div class="name">{{ curSong.songName }}</div>
        <div class="artist">{{ curSong.artist }}</div>
      </div>
      <div class="control">
        <div class="action">
          <Icon
            @click="() => controlAction('prev')"
            class="icon"
            icon="bx:bxs-skip-previous-circle"
            color="#fff"
            width="1.6rem"
          />
          <Icon
            @click="() => controlAction()"
            class="icon"
            :icon="
              data.isPlay
                ? 'mdi:motion-pause-outline'
                : 'mdi:motion-play-outline'
            "
            color="#fff"
            width="2rem"
          />
          <Icon
            @click="() => controlAction('next')"
            class="icon"
            icon="bx:bxs-skip-next-circle"
            color="#fff"
            width="1.6rem"
          />
        </div>
        <VolumeBar
          :volume="data.v_volume"
          :isMuted="data.v_isMuted"
          @change_mute="changeMute"
          @change_volume="changeVolume"
        />
      </div>
      <ProgressBar
        :curTime="data.curTime"
        :duration="data.curDuration"
        @change_progress="changeProgress"
      />
      <LoopControl @change_mode="changeMode" :mode="data.v_loopMode" />
    </div>
    <SongListVue
      v-if="props.songList.length > 0"
      :songList="props.songList"
      :setCurIdx="(idx) => (data.curIdx = idx)"
      :curIdx="data.curIdx"
      :isPlay="data.isPlay"
      @play="() => (data.isPlay = true)"
    />
  </div>
</template>
