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
  props: {
    rssId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('episode', ['episodes', 'currEpisodeId', 'episodeName']),
    ...mapState('player', ['playerState', 'playingData']),
    ...mapGetters('episode', ['currEpisode']),
    routeId() {
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
      if (!this.playingData
        || Object.keys(this.playingData).length < 1
        || !this.playingData.guid) {
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
    this.init(id);
  },
  watch: {
    routeId(id) {
      if (!id) {
        return;
      }
      this.init(id);
    },
  },
  methods: {
    ...mapMutations('episode', ['setCurrEpisodeId']),
    ...mapMutations('player', ['setPlayingData', 'resetPlayerState']),
    ...mapActions('episode', ['fetchEpisodes']),
    ...mapActions('player', ['togglePlayerState']),
    async init(id) {
      if (this.episodes.length > 0) {
        this.setCurrEpisodeId(id);
        return;
      }

      const loader = this.$loading.show({
        loader: 'dots',
      });
      let res;
      try {
        res = await this.fetchEpisodes(this.rssId);
      } catch (e) {
        console.error(e);
      }

      if (!res) {
        return;
      }
      this.setCurrEpisodeId(id);

      loader.hide();
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
