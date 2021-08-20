<template>
  <div class="episode-list-item" @click="$emit('click')">
    <div class="episode-image">
      <img :src="image" alt="episode image" />
    </div>
    <div class="episode-body">
      <div class="episode-title">{{ title }}</div>
      <div class="episode-publish-date">{{ publishDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpisodeListItem',
  props: {
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    publishDate: {
      type: String,
      default: '',
    },
    episodeId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.episode-list-item {
  display: flex;
  flex-flow: row;
  margin: 8px 0;
  border-radius: 10px;
  padding: 8px;

  &:hover {
    cursor: pointer;
    background-color: lightgray;
    color: #2c3e50;
  }

  .episode-body {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    margin: 0 8px;
  }

  .episode-image {
    // width: 5vmin;
    height: 5vmin;
    margin-left: 8px;
    margin-right: 4px;
  }

  .episode-publish-date {
    font-size: 0.8rem;
  }
  .episode-publish-date, .episode-title {
    margin: 4px 0;
  }

}
</style>
