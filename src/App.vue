<template>
  <div id="app">
    <div class="main">
      <Navbar />
      <router-view :rssId="rssId"/>
    </div>
    <EpisodePlayer v-show="showPlayer"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EpisodePlayer from '@/components/EpisodePlayer.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    EpisodePlayer,
  },
  data() {
    return {
      rssId: '954689a5-3096-43a4-a80b-7810b219cef3',
    };
  },
  computed: {
    ...mapState('player', ['playingData']),
    showPlayer() {
      return Object.keys(this.playingData).length > 0;
    },
  },
};
</script>

<style lang="scss" src="@sty/base.scss"></style>
<style lang="scss" src="@sty/scrollbar.scss"></style>
<style lang="scss" scoped>
@import '@sty/color.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  background-color: $primary;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column;
  overflow: hidden;

  .main {
    padding: 8px;
    width: 80vw;
    box-sizing: border-box;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    flex: 1 1 auto;
  }
}
</style>
