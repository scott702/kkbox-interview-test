<template>
  <nav class="navbar">
    <a-breadcrumb :routes="currRoutes">
      <template slot="itemRender" slot-scope="{ route, routes }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.name }}
        </span>
        <router-link v-else :to="{ name: route.name }">
          {{ route.name }}
        </router-link>
      </template>
    </a-breadcrumb>

    <div class="row right-breadcrumbs" v-if="isEpisode">
      <router-link
        v-if="!!prevNextEpisodeIds.prev"
        class="prev-episode"
        :to="{
          params: {
            id: prevNextEpisodeIds.prev ,
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
import { ROUTE_NAME, BREADCRUMB_CONFIG } from '@/scripts/constants';
import { routes } from '@/router';

export default {
  name: 'Navbar',
  data() {
    return {
      ROUTE_NAME,
      routes,
    };
  },
  computed: {
    ...mapGetters('episode', ['prevNextEpisodeIds']),
    isEpisode() {
      return this.$route.name === ROUTE_NAME.EPISODE;
    },
    currRoutes() {
      const { name } = this.$route;
      const breadcrumbs = BREADCRUMB_CONFIG[name].map(
        (na) => (routes.find((ro) => ro.name === na)),
      );

      return breadcrumbs.reverse();
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
@import '@sty/color.scss';

nav.navbar {
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;

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

  .right-breadcrumbs,
  .ant-breadcrumb {
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

nav.navbar .ant-breadcrumb::v-deep {
  color: $text;
  span.ant-breadcrumb-link,
  span.ant-breadcrumb-separator {
    color: $text;

    a {
      color: $highlight;
    }
  }
}
</style>
