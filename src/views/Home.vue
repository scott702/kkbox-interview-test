<template>
  <div class="home">
    <Header
      :title="channelInfo.title"
      :image="channelInfo.image"
      playBtn
    />
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
  data() {
    return {
      channelInfo: {
        name: '',
        image: '',
        description: '',
      },
      episodes: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let res;
      try {
        res = await this.$rss.getRss('https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml');
      } catch (error) {
        console.log(error);
      }

      if (!res) {
        return;
      }
      console.log(res);

      this.channelInfo.title = res.title;
      this.channelInfo.image = res.image.url;
      this.channelInfo.description = res.description;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
