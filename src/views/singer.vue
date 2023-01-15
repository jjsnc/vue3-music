<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger"></index-list>
  </div>
</template>

<script>
import { getSingerList } from "@/service/singer";
import IndexList from "@/components/index-list/index-list";
export default {
  name: "single",
  components: {
    IndexList,
  },
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
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.cacheSinger(singer);
      this.$router.push({
        path: `/singer/${singer.mid}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
