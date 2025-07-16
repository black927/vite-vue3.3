<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="user-label"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="UserLabel">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import useStoreUser from '@/store/modules/user'
import useAppStore from '@/store/modules/app'
const wujieVueRef = ref()

const { destroyApp } = WujieVue
const userStore = useStoreUser()

const props = {
  groupId: userStore.groupId,
  brandId: userStore.brandId,
  brandName: userStore.brandName,
  token: userStore.token,
  parentName: 'comm',
  url: userStore.env.value,
  redirectUrl: '/label-manage/user-label',
  theme: useAppStore().theme,
}

onUnmounted(() => {
  destroyApp('user-label')
})
</script>
