<template>
  <div class="container">
    <Header
      :title="channelInfo.title"
      :image="channelInfo.image"
    />
    <div class="body scrollbar">
      <EpisodeList
        :items="episodesList"
      />
    </div>
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
        description: '',
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
      this.channelInfo.description = res.description;
      this.episodesList = res.items.map((item) => ({
        title: item.title,
        image: item.itunes.image,
        publishDate: item.isoDate,
        id: item.guid,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
  .body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    margin: 4px 0;
  }
}
</style>
