<template>
  <div class="container">
    <Header
      :title="currEpisode.title || ''"
      :image="episodeImage"
      playBtn
    />
    <div
      class="description-body scrollbar"
    >
      <EpisodeDescription
        v-show="episodeDescription"
        :description="episodeDescription"
      />
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';
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
    ...mapState('episode', ['episodes', 'currEpisodeId']),
    ...mapGetters('episode', ['currEpisode']),
    episodeImage() {
      if (!this.currEpisode.itunes) {
        return '';
      }

      return this.currEpisode.itunes.image || '';
    },

    episodeDescription() {
      return this.currEpisode['content:encoded'] || '';
    },
  },
  mounted() {
    console.log('[Episode][mounted]', this.currEpisodeId);
    this.fetchData();
  },
  methods: {
    ...mapMutations('episode', ['setCurrEpisodeId']),
    ...mapActions('episode', ['fetchEpisodes']),
    async fetchData() {
      const loader = this.$loading.show({
        loader: 'dots',
      });
      if (this.episodes.length < 1) {
        await this.fetchEpisodes('954689a5-3096-43a4-a80b-7810b219cef3');
      }
      const { id } = this.$route.params;
      this.setCurrEpisodeId(id);
      loader.hide();
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

  .description-body {
    height: 100%;
    overflow: auto;
  }
}
</style>
