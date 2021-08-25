<template>
  <a
    class="btn"
    :class="{
      'btn-play-circle': circle,
      'btn-play': !circle,
      disabled,
    }"
    @click.prevent="onClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: '',
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" src="@sty/button.scss" scoped></style>
