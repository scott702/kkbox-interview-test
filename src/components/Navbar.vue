<template>
  <nav class="navbar">
    <Breadcrumbs class="row"/>

    <div class="row right-breadcrumbs" v-if="isEpisode">
      <router-link
        v-if="!!prevNextEpisodeIds.prev"
        class="prev-episode"
        :to="{
          params: {
            id: prevNextEpisodeIds.prev,
          },
        }"
      >&#60; Previous Episode</router-link>
      <div
        v-if="prevNextEpisodeIds.prev && prevNextEpisodeIds.next"
        class="divider"
      >|</div>
      <router-link
        v-if="!!prevNextEpisodeIds.next"
        class="next-episode"
        :to="{
          params: {
            id: prevNextEpisodeIds.next,
          },
        }"
      >Next Episode > </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTE_NAME } from '@/scripts/constants';

export default {
  name: 'Navbar',
  data() {
    return {
      ROUTE_NAME,
    };
  },
  computed: {
    ...mapGetters('episode', ['prevNextEpisodeIds']),
    isEpisode() {
      return this.$route.name === ROUTE_NAME.EPISODE;
    },
  },
  methods: {
    toNextEpisode() {
      this.$router.push({
        params: {
          id: this.prevNextEpisodeIds.next,
        },
      });
    },
    toPrevEpisode() {
      this.$router.push({
        params: {
          id: this.prevNextEpisodeIds.prev,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;

  .row {
    display: flex;
    flex-flow: row;
    flex: 1;
  }

  .divider {
    margin: 0 8px;
  }

  .right-breadcrumbs {
    justify-content: flex-end;
  }

  ol.breadcrumb, .right-breadcrumbs  {
    list-style: none;
    list-style-type: none;
    font-size: 1.2rem;
    margin: 4px 0;
  }
  ol.breadcrumb::v-deep {
    justify-content: flex-start;
    padding:  0;

    li.breadcrumb-item+li.breadcrumb-item::before {
      font-weight: bold;
      content: "/";
    }
  }
}
</style>
