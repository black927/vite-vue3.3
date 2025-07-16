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
import useAppStore from '@/store/modules/app'

const router = useRouter()
const wujieVueRef = ref()
const userStore = useUserStore()
const appStore = useAppStore()
const { destroyApp, bus } = WujieVue
// const cbdBrand5 = '#014da1'
// const ThemePlugin = () => {
//   return {
//     cssBeforeLoaders: [
//       {
//         content: `:root {
//         --cbd-brand-2: #014DA11A !important;
//         --cbd-brand-3: #014DA1BF !important;
//         --cbd-brand-5: ${cbdBrand5} !important;
//         --cbd-brand-7: #014DA11A !important;
//         --cbd-brand-8: red !important;
//         --cbd-brand-13: #014DA14D !important;
//         --el-color-primary-light-9: #014DA11A !important;
//         --el-color-primary-light-5: #014DA173 !important;}`,
//       },
//       // {
//       //   src: "/theme.css"  // 加载本地主题覆盖文件
//       // }
//     ],
//     // cssAfterLoaders: [{ content: `:root { --cbd-brand-5: ${cbdBrand5} !important }` }]
//   }
// }
const props = {
  groupId: userStore.groupId,
  brandId: userStore.brandId,
  brandName: userStore.brandName,
  token: userStore.token,
  parentName: 'comm',
  url: userStore.env.value,
  // url: userStore.env.preview,
  redirectUrl: '/crowd',
  theme: appStore.theme,
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
