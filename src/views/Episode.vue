<template>
  <div class="container">
    <Header
      :title="currEpisode.title"
      :image="currEpisode.image"
      playBtn
    />
    <div
      class="description-body scrollbar"
    >
      <EpisodeDescription
        :description="currEpisode.description"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Header from '@/components/Header.vue';
import EpisodeDescription from '@/components/EpisodeDescription.vue';

export default {
  name: 'Episode',
  components: {
    Header,
    EpisodeDescription,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('episode', ['episodes']),
    episodeId() {
      console.log('[Episode][computed]', this.$route.params.id);
      if (!this.$route.params) {
        return this.episodes[0].guid || '';
      }

      return this.$route.params.id;
    },
    currEpisode() {
      const episode = this.episodes.find((ep) => ep.guid === this.episodeId);
      console.log('[Episode][currEpisode] episode: ', episode);
      if (!episode) {
        return {};
      }
      return {
        title: episode.title,
        image: episode.itunes.image,
        description: episode['content:encoded'],
      };
    },
  },
  mounted() {
    console.log('[Episode][mounted]', this.episodeId);
    if (this.episodes.length < 1) {
      this.fetchEpisodes('954689a5-3096-43a4-a80b-7810b219cef3');
    }
  },
  methods: {
    ...mapActions('episode', ['fetchEpisodes']),
    fetchData() {

    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column;
  height: 100%;

  .description-body {
    height: 100%;
    overflow: auto;
  }
}
</style>
