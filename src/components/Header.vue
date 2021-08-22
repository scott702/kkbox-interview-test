<template>
  <div class="header-container">
    <div class="image">
      <img :src="image" alt="image" v-if="!!image"/>
    </div>

    <div class="middle">
      <div class="title">{{ title }}</div>
    </div>

    <div class="btn-section" v-if="playBtn">
      <a
        class="btn btn-play"
        @click.prevent="handleClickPlayBtn"
      >{{ playBtnText }}</a>
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';
import { PLAYER_STATE } from '@/scripts/constants';

export default {
  name: 'Header',
  props: {
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    playBtn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('episode', ['currEpisodeId']),
    ...mapGetters('episode', ['currEpisode']),
    ...mapState('player', ['playingData', 'playerState']),
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
  methods: {
    ...mapActions('player', ['handlePlayState', 'handlePauseState', 'togglePlayerState']),
    ...mapMutations('player', ['setPlayingData', 'resetPlayerState']),
    handleClickPlayBtn() {
      console.log('');
      console.log('[Header][handleClickPlayBtn]');
      console.log(1);
      if (this.isCurrEpisodePlaying) {
        this.togglePlayerState();
        return;
      }

      this.resetPlayerState();
      this.setPlayingData(this.currEpisode);
      console.log(4);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 210px;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 60px;

  .image {
    height: 210px;
    margin-left: 8px;
    margin-right: 4px;
  }
  .middle {
    flex: auto;
    height: 100%;
    margin: 8px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    box-sizing: border-box;
    .title {
      line-height: 1;
    }
  }

  .btn-section {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-basis: 20%;
    height: 100%;
    margin-right: 8px;
    margin-left: 4px;
  }
}
</style>
