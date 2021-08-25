<template>
  <div class="player-container">
    <div class="seek-bar">
      <a-slider
        :defaultValue="0"
        :max="playDuration"
        :tooltipVisible="false"
        tooltip="none"
        v-model="seekValue"
        @change="handleSeekChange"
        @afterChange="handleSeekInput"
      />
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
        <Button
          circle
          :disabled="isLoading"
          @click="togglePlayerState"
        >
          <font-awesome-icon
            class="buffer-loading"
            icon="spinner" v-if="isLoading"
          />
          <font-awesome-icon
            icon="pause"
            v-else-if="playerState === PLAYER_STATE.PLAY"
          />
          <font-awesome-icon icon="play" v-else />
        </Button>
      </div>
      <div class="playing-info">Now playing
        <router-link
          v-if="playingData.guid"
          class="episode-title"
          :to="{
            name: ROUTE_NAME.EPISODE,
            params: {
              id: playingData.guid || '',
            }
          }"
        >{{ episodeTitle }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters, mapState, mapActions, mapMutations,
} from 'vuex';
import colors from '@sty/color.scss';
import Button from '@widget/Button.vue';
import { PLAYER_STATE, ROUTE_NAME } from '@/scripts/constants';

export default {
  name: 'EpisodePlayer',
  components: {
    Button,
  },
  computed: {
    ...mapState('episode', ['episodes']),
    ...mapState('player', ['playerState', 'playingData']),
    ...mapGetters('episode', ['prevNextEpisodeIds']),
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
      ROUTE_NAME,
      seekValue: 0,
      isBuffered: true,
      isLoading: false,
      seekbarSty: {
        process: {
          background: colors.highlightColor,
        },
        dot: {
          background: colors.highlightColor,
        },
      },
    };
  },
  watch: {
    playerState(newState, oldState) {
      if (newState !== oldState) {
        this.watchPlayerState(newState);
      }
    },
    playingData() {
      this.$set(this, 'isLoading', true);
      this.handlePlayNew();
    },
  },
  methods: {
    ...mapMutations('player', [
      'setPlayerStateToPlay',
      'setPlayerStateToPause',
      'resetPlayerState',
      'setPlayingData',
    ]),
    ...mapActions('player', ['togglePlayerState']),
    handlePlayNew() {
      this.handleResetAudioPlayer();

      if (Object.keys(this.playingData).length > 0) {
        this.$nextTick(() => {
          this.$refs.audio.load();
          this.setPlayerStateToPlay();
        });
      }
    },
    onSuspended() {
      this.$set(this, 'isLoading', true);
    },
    onPlay() {
      this.$set(this, 'isLoading', false);
      this.setPlayerStateToPlay();
    },
    onPause() {
      if (this.$refs.audio.buffered.length > 0) {
        this.$set(this, 'isLoading', false);
        this.setPlayerStateToPause();
      }
    },
    onLoadeddata() {
      this.setPlayerStateToPlay();
    },
    onAudioTimeUpdate(e) {
      this.seekValue = e.target.currentTime;
    },
    onAudioProgress() {
      const isBuffered = this.checkBuffered();
      const isPasued = this.$refs.audio.paused;
      if ((isPasued && isBuffered) || this.$refs.audio.buffered.length === 0) {
        this.$set(this, 'isLoading', false);
        this.setPlayerStateToPlay();
      }
    },
    checkBuffered() {
      const { buffered, readyState, currentTime } = this.$refs.audio;
      const { length } = buffered;
      this.$set(this, 'isLoading', true);
      const isReady = readyState === 4;

      if (isReady) {
        this.$set(this, 'isLoading', false);
        return true;
      }
      for (let i = 0; i < length; i += 1) {
        if (
          (buffered.start(i) < currentTime
          && buffered.end(i) > currentTime)
        ) {
          this.$set(this, 'isLoading', false);
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
      const { next } = this.prevNextEpisodeIds;

      if (next) {
        this.resetPlayerState();
        const episode = this.episodes.find((ep) => ep.guid === next);
        this.setPlayingData(episode);
        return;
      }
      this.setPlayingData({});
    },
    handlePlayAudio() {
      if (!this.$refs.audio.paused) {
        return;
      }
      this.$refs.audio.play().then(() => {
        this.$set(this, 'isLoading', false);
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
@import '@sty/color.scss';

.player-container {
  box-sizing: border-box;
  width: 100%;
  height: 5vmin;
  display: flex;
  flex-flow: column;
  position: relative;
  margin-top: 10px;

  .episode-title {
    font-weight: bold;
  }

  .seek-bar::v-deep {
    width: 100%;
    position: absolute;
    transform: translate(0, -60%);
    margin: 0;
    .ant-slider {
      margin-right: 0;
      margin-left: 0;
    }
    .ant-slider-track {
      background-color: $highlight;
    }
    .ant-slider-handle {
      background-color: $highlight;
    }
  }

  .info {
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    flex: 1 1 auto;
    font-size: 1.1rem;

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
<style lang="scss">
.buffer-loading {
  animation-name: loading;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
