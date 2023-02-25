<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          >
          </confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/search/search-input";
import Scroll from "@/components/wrap-scroll";
import Suggest from "@/components/search/suggest";
import Confirm from "@/components/base/confirm/confirm";
import SearchList from "@/components/base/search-list/search-list";
import { getHotKeys } from "@/service/search";
import { ref, watch, nextTick, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import storage from "good-storage";
import useSearchHistory from "@/components/search/use-search-history";
import { SINGER_KEY } from "@/assets/js/constant";
export default {
  name: "search",
  components: {
    SearchInput,
    Scroll,
    Confirm,
    SearchList,
    Suggest,
  },
  setup() {
    const query = ref("");
    const hotKeys = reactive([]);
    const scrollRef = ref(null);
    const confirmRef = ref(null);
    const store = useStore();
    const searchHistory = computed(() => store.state.searchHistory);
    const selectedSinger = ref(null);
    const { saveSearch, clearSearch, deleteSearch } = useSearchHistory();

    const router = useRouter();
    getHotKeys().then((result) => {
      hotKeys.value = result?.hotkey || [];
    });
    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick();
        refreshScroll();
      }
    });
    function refreshScroll() {
      scrollRef.value.scroll.refresh();
    }
    function selectSong(song) {
      saveSearch(query.value);
      store.dispatch("addSong", song);
    }
    function addQuery(s) {
      query.value = s;
    }
    function selectSinger(singer) {
      saveSearch(query.value);
      selectedSinger.value = singer;
      cacheSinger(singer);

      router.push({
        path: `/search/${singer.mid}`,
      });
    }
    function cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer);
    }
    function showConfirm() {
      confirmRef.value.show();
    }

    return {
      query,
      hotKeys,
      addQuery,
      searchHistory,
      confirmRef,
      showConfirm,
      clearSearch,
      deleteSearch,
      selectSong,
      selectSinger,
      selectedSinger,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
