<template>
  <div class="player-container">
    <div class="seek-bar">
      <vue-slider
        :max="playDuration"
        tooltip="none"
        v-model="seekValue"
        @change="handleSeekChange"
        @input="handleSeekInput"
      ></vue-slider>
      <audio
        ref="audio"
        @ended="onAudioEnd"
        @timeupdate="onAudioTimeUpdate"
        @play="onPlay"
        @pause="onPause"
        @progress="onAudioProgress"
        @loadeddata="onLoadeddata"
        @suspended="onSuspended"
        :key="audioLink"
        :src="audioLink"
      >
      </audio>
    </div>
    <div class="info">
      <div class="btn-section">
        <a class="btn btn-play-circle" @click="togglePlayerState">
          <span>
            <font-awesome-icon :icon="['fas', 'spinner']" v-if="isLoading" />
            <font-awesome-icon
              :icon="['fas', 'pause']"
              v-else-if="playerState === PLAYER_STATE.PLAY"
            />
            <font-awesome-icon :icon="['fas', 'play']" v-else />
          </span>
        </a>
      </div>
      <div class="playing-info">Now playing {{ episodeTitle }}</div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters, mapState, mapActions, mapMutations,
} from 'vuex';
import VueSlider from 'vue-slider-component';
import { PLAYER_STATE } from '@/scripts/constants';

import 'vue-slider-component/theme/default.css';

export default {
  name: 'EpisodePlayer',
  components: {
    VueSlider,
  },
  computed: {
    ...mapState('episode', ['episodes', 'currEpisodeId']),
    ...mapState('player', ['playerState', 'playingData']),
    ...mapGetters('episode', ['currEpisode']),
    audioLink() {
      if (Object.keys(this.playingData).length < 1) {
        return '';
      }

      return this.playingData.enclosure.url;
    },
    episodeTitle() {
      if (Object.keys(this.playingData).length < 1) {
        return '';
      }

      return this.playingData.title;
    },
    playDuration() {
      if (Object.keys(this.playingData).length < 1) {
        return 0;
      }

      return parseInt(this.playingData.itunes.duration, 10);
    },
  },
  data() {
    return {
      PLAYER_STATE,
      seekValue: 0,
      isBuffered: true,
      isLoading: false,
    };
  },
  watch: {
    playerState(newState, oldState) {
      if (newState !== oldState) {
        this.watchPlayerState(newState);
      }
    },
    playingData() {
      this.isLoading = true;
      this.handlePlayNew();
    },
  },
  methods: {
    ...mapMutations('player', ['resetPlayerState', 'setPlayingData']),
    ...mapActions('player', ['handlePlayState', 'handlePauseState', 'togglePlayerState']),
    handlePlayNew() {
      this.handleResetAudioPlayer();

      if (Object.keys(this.playingData).length > 0) {
        this.$nextTick(() => {
          this.$refs.audio.load();
          this.handlePlayState();
        });
      }
    },
    onSuspended() {
      this.isLoading = true;
    },
    onPlay() {
      this.isLoading = false;
      this.handlePlayState();
    },
    onPause() {
      if (this.$refs.audio.buffered.length > 0) {
        this.isLoading = false;
        this.handlePauseState();
      }
    },
    onLoadeddata() {
      this.handlePlayState();
    },
    onAudioTimeUpdate(e) {
      if (this.isLoading) {
        this.isLoading = false;
      }
      this.seekValue = e.target.currentTime;
    },
    onAudioProgress() {
      this.isLoading = true;
      const isBuffered = this.checkBuffered();
      const isPasued = this.$refs.audio.paused;
      if ((isPasued && isBuffered) || this.$refs.audio.buffered.length === 0) {
        this.isLoading = false;
        this.handlePlayState();
      }

      if (this.$refs.audio.readyState !== 0) {
        this.isLoading = false;
      }
    },
    checkBuffered() {
      const { buffered } = this.$refs.audio;
      const { length } = buffered;
      for (let i = 0; i < length; i += 1) {
        if (buffered.start(i) < this.seekValue && buffered.end(i) > this.seekValue) {
          return true;
        }
      }

      return false;
    },
    handleSeekChange() {
      this.$refs.audio.currentTime = this.seekValue;
    },
    handleSeekInput() {
      const isPlaying = !this.$refs.audio.paused;
      if (isPlaying) {
        this.handlePauseAudio();
      }
    },
    checkAudioLoeded() {
      if (this.$refs.audio.readyState !== 4) {
        this.$refs.audio.load();
        return false;
      }

      return true;
    },
    onAudioEnd() {
      this.handlePlayToNext();
    },
    handlePlayToNext() {
      const { guid } = this.playingData;
      const index = this.episodes.findIndex((ep) => ep.guid === guid);
      this.resetPlayerState();

      if (index + 1 < this.episodes.length) {
        this.setPlayingData(this.episodes[index + 1]);
      }
    },
    handlePlayAudio() {
      if (!this.$refs.audio.paused) {
        return;
      }
      this.$refs.audio.play().then(() => {
        this.isLoading = false;
      });
    },
    handlePauseAudio() {
      if (this.$refs.audio.paused) {
        return;
      }
      this.$refs.audio.pause();
    },
    handleResetAudioPlayer() {
      this.$refs.audio.currentTime = 0;
      this.seekValue = 0;
      if (Object.keys(this.playingData).length > 0) {
        this.$nextTick(() => {
          this.$refs.audio.load();
        });
      }
    },
    watchPlayerState(state) {
      switch (state) {
        case PLAYER_STATE.PLAY:
          this.handlePlayAudio();
          break;

        case PLAYER_STATE.PAUSE:
          this.handlePauseAudio();
          break;

        default:
          this.handleResetAudioPlayer();
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.player-container {
  // border: 3px solid black;
  box-sizing: border-box;
  width: 100%;
  height: 5vmin;
  display: flex;
  flex-flow: column;
  position: relative;
  margin-top: 10px;
  .seek-bar {
    width: 100%;
    position: absolute;
    transform: translate(0, -60%);
    margin: 0;
  }

  .info {
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    flex: 1 1 auto;

    .btn-section {
      margin: 0 20px;
    }

    .playing-info {
      width: 100%;
      flex: 1 1 auto;
      text-align: left;
    }
  }
}
</style>
