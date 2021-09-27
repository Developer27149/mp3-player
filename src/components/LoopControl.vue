<template>
  <div class="container">
    <Icon
      :icon="`${
        mode === SINGLE_LOOP
          ? 'carbon:repeat-one'
          : mode === ALL_LOOP
          ? 'carbon:repeat'
          : 'bi:music-note-list'
      }`"
      color="white"
      width="1.2rem"
      class="icon"
      @click="
        emits(
          'change_mode',
          mode === SINGLE_LOOP
            ? ALL_LOOP
            : mode === ALL_LOOP
            ? LIST_LOOP
            : SINGLE_LOOP
        )
      "
    />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { SINGLE_LOOP, ALL_LOOP, LIST_LOOP } from "../lib/index.js";

defineProps({
  mode: {
    type: String,
    default: SINGLE_LOOP,
  },
});
const emits = defineEmits(["change_mode"]);
</script>

<style lang="scss" scoped>
.container {
  width: 1.2rem;
  height: 1.2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.icon {
  // padding: 1rem;
  cursor: pointer;
}
</style>
