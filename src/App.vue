<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onBeforeMount } from "@vue/runtime-core";
import { ref } from "vue";
import Player from "./components/Player.vue";
import initData from "./lib/http";
const songs = ref([]);
onBeforeMount(async () => {
  const data = await initData();
  songs.value = data.map((song) => {
    const { url, songId, artist, picUrl, songName } = song;
    return {
      src: url,
      pic: picUrl,
      id: songId.toString(),
      artist,
      songName,
    };
  });
});
</script>

<template>
  <Player :songList="songs" />
</template>
