<template>
  <div class="header-container">
    <div class="image">
      <img :src="image" alt="image"/>
    </div>

    <div class="middle">
      <div class="title">{{ title }}</div>
    </div>

    <div class="btn-section" v-if="playBtn">
      <a class="btn btn-play" @click.prevent>{{ 'Play' }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Title',
    },
    playBtn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-flow: row;
  height: 15vmin;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 24px;
  .image {
    height: 100%;
    margin-left: 8px;
    margin-right: 4px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  .middle {
    flex: auto;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: left;
    margin: 8px;
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
