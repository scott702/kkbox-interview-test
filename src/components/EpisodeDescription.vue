<template>
  <div class="description-content">
    <div class="title">Episode Description</div>
    <div class="descriotion scrollbar" v-html="description">{{ description }}</div>
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
  text-align: left;
}
</style>
