<template>
  <div class="p12px bg-#fff h-full">
    <WujieVue
      ref="wujieVueRef"
      width="100%"
      height="100%"
      name="intelligent-strategy"
      :url="props.url"
      :props="props"
      :plugins="[InstanceofPlugin()]"
    />
  </div>
</template>

<script lang="ts" setup name="Intelligent-strategy">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import useUserStore from '@/store/modules/user'

const wujieVueRef = ref()
const userStore = useUserStore()
const { destroyApp, bus } = WujieVue
const props = {
  url: `${userStore.env.dataDashboardWeb}/intelligent-strategy`,
  parentName: 'osp',
  userInfo: {
    accountNm: userStore.accountNm,
    jobNumber: userStore.jobNumber,
    name: userStore.name,
  },
}

console.log('props：', props)

onUnmounted(() => {
  bus.$clear()
  destroyApp('intelligent-strategy')
})
</script>
