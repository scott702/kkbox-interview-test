<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
    <EpisodePlayer v-show="showPlayer"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EpisodePlayer from '@/components/EpisodePlayer.vue';

export default {
  name: 'App',
  components: {
    EpisodePlayer,
  },
  computed: {
    ...mapState('player', ['playingData']),
    showPlayer() {
      return Object.keys(this.playingData).length > 0;
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/base.scss"></style>
<style lang="scss" src="@/assets/styles/button.scss"></style>
<style lang="scss" src="@/assets/styles/scrollbar.scss"></style>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lightgrey;
  background-color: #2c3e50;
  width: 100%;
  height: 100%;
  // display: flex;
  align-items: center;
  justify-content: center;
  // width: 80vmin;
  // height: 90vh;
  // height: 100%;
  // border: 1px solid lightgrey;
  display: flex;
  flex-flow: column;
  // flex: 1 1 auto;
  overflow: hidden;
  .main {
    padding: 8px;
    width: 80vw;
    box-sizing: border-box;
    flex: 1 1 auto;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

    // .player-section {
    //   flex-basis: 5vmin;
    // }
}
</style>
