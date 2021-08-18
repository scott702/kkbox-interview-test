<template>
  <div class="home">
    <Header playBtn/>
    <EpisodeList />
    <EpisodeListItem />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import EpisodeList from '@/components/EpisodeList.vue';
import EpisodeListItem from '@/components/EpisodeListItem.vue';

export default {
  name: 'Home',
  components: {
    Header,
    EpisodeList,
    EpisodeListItem,
  },
};
</script>

<style lang="scss" scoped>

</style>
