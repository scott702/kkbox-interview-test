<template>
  <div class="episode-list">
    <EpisodeListItem
      v-for="(item) in items"
      :image="item.image"
      :title="item.title"
      :publishDate="item.publishDate"
      :episodeId="item.id"
      :key="item.id"
      @click="handleClickItem(item.id)"
    />
  </div>
</template>

<script>
import EpisodeListItem from '@/components/EpisodeListItem.vue';

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
    handleClickItem(itemId) {
      console.log(itemId);
      this.$router.push({
        name: 'Episode',
        params: {
          id: itemId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.episode-list {
  margin-right: 4px;
}
</style>
