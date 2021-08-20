<template>
  <div class="description-content">
    <div class="title">Episode Description</div>
    <div class="descriotion" v-html="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'EpisodeDescription',
  props: {
    description: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.description-content {
  margin: 0 8px;
  text-align: left;
}
</style>
