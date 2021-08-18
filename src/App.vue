<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" src="@/assets/styles/base.scss"></style>
<style lang="scss" src="@/assets/styles/button.scss"></style>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    width: 50vmin;
    height: 90vh;
    border: 1px solid lightgrey;
    padding: 8px;
  }
}
</style>
