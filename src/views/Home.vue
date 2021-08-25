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
  props: {
    rssId: {
      type: String,
      required: true,
    },
  },
  components: {
    Header,
    EpisodeList,
  },
  data() {
    return {
      channelInfo: {
        title: '',
        image: '',
        author: '',
      },
      episodesList: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions('episode', ['fetchEpisodes']),
    async fetchData() {
      const loader = this.$loading.show({ loader: 'dots' });
      let res;
      try {
        res = await this.fetchEpisodes(this.rssId);
      } catch (err) {
        console.error(err);
      }

      loader.hide();

      if (!res) {
        return;
      }

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
