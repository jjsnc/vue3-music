<template>
  <div class="search">single</div>
</template>

<script>
import { getSingerList } from "@/service/singer";
export default {
  name: "single",
  data() {
    return {
      singers: [],
      selectedSinger: null,
    };
  },
  async created() {
    const result = await getSingerList();
    this.singers = result.singers;
  },
};
</script>

<style lang="scss" scoped></style>
