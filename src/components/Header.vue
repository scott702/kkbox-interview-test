<template>
  <div class="header-container">
    <div class="image">
      <img :src="image" alt="image" v-if="!!image"/>
    </div>

    <div class="middle">
      <div class="title">{{ title }}</div>
      <p class="subtitle">{{ subtitle }}</p>
    </div>

    <div class="end-section">
      <slot></slot>
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
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@sty/color.scss';

.header-container {
  display: flex;
  flex-flow: row;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 60px;

  padding: 24px 16px;
  border-radius: 10px;
  background: $secondary;
  box-sizing: border-box;
  .image {
    height: 210px;
    margin-left: 8px;
    margin-right: 4px;
  }

  .middle {
    flex: auto;
    height: 100%;
    margin: 8px 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    box-sizing: border-box;
    flex-flow: column;
  }

  .end-section {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-basis: 1%;
    height: 100%;
    margin-right: 8px;
    margin-left: 4px;
  }
}
</style>
