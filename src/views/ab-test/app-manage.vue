<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="app-manage"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="app-manage">
// import { genCrowdParams } from '@cbd-wujie-components/osp-query'
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'

const wujieVueRef = ref()

const { destroyApp, bus } = WujieVue
const userStore = useUserStore()
const props = {
  groupId: userStore.groupId,
  brandId: userStore.brandId,
  brandName: userStore.brandName,
  token: userStore.token,
  // token: '1734320084|lctbxqrW6LJg4Llg.cAwqVORvOtZ2kdnHRRiDuj1Se5P/Hz+Vx9Ft/CNl+Hs=.dc8e3be96eea310d1',
  parentName: 'comm',
  url: userStore.env.abTestUrl,
  redirectUrl: '/app-manage',
}
console.log('AB实验props：', props)
const router = useRouter()
bus.$on('__AB_TEST_ENTER_EXP', (data: { appId: string | number }) => {
  console.log(data.appId)
  router.push(`/experiment-manage-layer`)
})
onUnmounted(() => {
  destroyApp('app-manage')
})
</script>
