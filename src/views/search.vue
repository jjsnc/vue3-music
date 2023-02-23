<template>
  <div class="search-input-wrapper">
    <search-input v-model="query"></search-input>
  </div>
</template>

<script>
import SearchInput from "@/components/search/search-input";
import { ref } from "vue";
export default {
  name: "search",
  components: {
    SearchInput,
  },
  setup() {
    const query = ref("");

    return {
      query,
    };
  },
};
</script>

<style lang="scss" scoped></style>
