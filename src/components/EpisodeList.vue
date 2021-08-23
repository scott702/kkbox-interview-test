<template>
  <div class="episode-list">
    <div class="title">All Episodes</div>
    <div class="list-content scrollbar">
      <EpisodeListItem
        v-for="(item) in items"
        :image="item.image"
        :title="item.title"
        :publishDate="item.publishDate"
        :duration="formatSecond(item.duration)"
        :episodeId="item.id"
        :key="item.id"
        @click="handleClickItem(item.id)"
      />
    </div>
  </div>
</template>

<script>
import EpisodeListItem from '@/components/EpisodeListItem.vue';
import { formatSecond } from '@/scripts/utils';

export default {
  name: 'EpisodeList',
  components: {
    EpisodeListItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatSecond,
    handleClickItem(itemId) {
      this.$router.push({
        name: 'Episode',
        params: { id: itemId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
