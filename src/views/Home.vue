<template>
  <div class="container">
    <Header
      :title="channelInfo.title"
      :image="channelInfo.image"
      :subtitle="channelInfo.author"
    />
    <EpisodeList
      class="content"
      :items="episodesList"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/Header.vue';
import EpisodeList from '@/components/EpisodeList.vue';

export default {
  name: 'Home',
  components: {
    Header,
    EpisodeList,
  },
  data() {
    return {
      channelInfo: {
        name: '',
        image: '',
        author: '',
      },
      episodesList: [],
      isLoading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions('episode', ['fetchEpisodes']),
    async fetchData() {
      this.isLoading = true;
      const loader = this.$loading.show({
        loader: 'dots',
      });
      let res;
      try {
        res = await this.fetchEpisodes('954689a5-3096-43a4-a80b-7810b219cef3');
      } catch (err) {
        console.error(err);
      }
      if (!res) {
        return;
      }
      this.isLoading = false;
      loader.hide();

      this.channelInfo.title = res.title;
      this.channelInfo.image = res.image.url;
      this.channelInfo.author = res.itunes.author;
      this.episodesList = res.items.map((item) => ({
        title: item.title,
        image: item.itunes.image,
        publishDate: item.isoDate,
        duration: item.itunes.duration,
        id: item.guid,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .title {
    margin: 0 8px;
  }
}
</style>
