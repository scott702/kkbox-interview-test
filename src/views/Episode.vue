<template>
  <div class="container">
    <Header
      :title="currEpisode.title"
      :subtitle="episodeName"
      :image="episodeImage"
      playBtn
    >
      <Button
        @click="handleClickPlayBtn"
      >{{ playBtnText }}</Button>
      <!-- <a-button @click="handleClickPlayBtn">{{ playBtnText }}</a-button> -->
    </Header>

    <EpisodeDescription
      class="content"
      :description="episodeDescription"
    />
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';
import Button from '@widget/Button.vue';
import Header from '@/components/Header.vue';
import EpisodeDescription from '@/components/EpisodeDescription.vue';
import { PLAYER_STATE } from '@/scripts/constants';

export default {
  name: 'Episode',
  components: {
    Header,
    Button,
    EpisodeDescription,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('episode', ['episodes', 'currEpisodeId', 'episodeName']),
    ...mapState('player', ['playerState', 'playingData']),
    ...mapGetters('episode', ['currEpisode']),
    routeId() {
      if (!this.$route.params) {
        return '';
      }
      return this.$route.params.id;
    },
    episodeImage() {
      if (!this.currEpisode.itunes) {
        return '';
      }

      return this.currEpisode.itunes.image || '';
    },
    episodeDescription() {
      return this.currEpisode['content:encoded'] || '';
    },
    playingId() {
      if (!this.playingData || Object.keys(this.playingData).length < 1) {
        return '';
      }

      return this.playingData.guid;
    },
    isCurrEpisodePlaying() {
      return this.playingId === this.currEpisodeId;
    },
    playBtnText() {
      if (this.playerState === PLAYER_STATE.PLAY && this.isCurrEpisodePlaying) {
        return PLAYER_STATE.PAUSE;
      }
      return PLAYER_STATE.PLAY;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.fetchData(id);
  },
  watch: {
    routeId(id) {
      this.fetchData(id);
    },
  },
  methods: {
    ...mapMutations('episode', ['setCurrEpisodeId']),
    ...mapMutations('player', ['setPlayingData', 'resetPlayerState']),
    ...mapActions('episode', ['fetchEpisodes']),
    ...mapActions('player', ['togglePlayerState']),
    async fetchData(id) {
      let loader;
      if (this.episodes.length < 1) {
        loader = this.$loading.show({
          loader: 'dots',
        });
        await this.fetchEpisodes('954689a5-3096-43a4-a80b-7810b219cef3');
      }
      this.setCurrEpisodeId(id);
      if (loader) {
        loader.hide();
      }
    },
    handleClickPlayBtn() {
      if (this.isCurrEpisodePlaying) {
        this.togglePlayerState();
        return;
      }

      this.resetPlayerState();
      this.setPlayingData(this.currEpisode);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .description-body {
    height: 100%;
    overflow: auto;
  }
}
</style>
