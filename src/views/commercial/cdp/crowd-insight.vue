<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="crowd-insight"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="UserLabel">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import useUserStore from '@/store/modules/user'

const wujieVueRef = ref()

const { destroyApp } = WujieVue
const userStore = useUserStore()

const props = {
  groupId: userStore.groupId,
  brandId: userStore.brandId,
  brandName: userStore.brandName,
  token: userStore.token,
  parentName: 'comm',
  url: userStore.env.value,
  redirectUrl: '/crowd-insight',
}
console.log('人群洞察props：', props)
onUnmounted(() => {
  destroyApp('crowd-insight')
})
</script>
