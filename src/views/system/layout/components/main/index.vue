<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f0f1f5;
  overflow: auto;
}
</style>
