<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="user-tower"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="UserTower">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

const router = useRouter()
const wujieVueRef = ref()
const userStore = useUserStore()
const { destroyApp, bus } = WujieVue
const props = {
  groupId: userStore.groupId,
  brandId: userStore.brandId,
  brandName: userStore.brandName,
  token: userStore.token,
  parentName: 'comm',
  url: userStore.env.value,
  redirectUrl: '/crowd',
}
console.log('props：', props)

onMounted(() => {
  bus.$on('__USER_TOWER_OSP_INSIGHT', () => {
    router.push(`/crowd-insight`)
  })
  bus.$on('__USER_TOWER_CLICK_INSIGHT', () => {
    router.push(`/crowd-insight`)
  })
})
onUnmounted(() => {
  bus.$clear()
  destroyApp('user-tower')
})
</script>
