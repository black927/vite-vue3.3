<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="user-manages"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="user-manages">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import useStoreUser from '@/store/modules/user'

const wujieVueRef = ref()
const storeUser = useStoreUser()
const { destroyApp } = WujieVue
const props = {
  authId: storeUser.phoneNumber,
  brandId: '100002',
  brandName: '李与白',
  parentName: 'comm',
  redirectUrl: '/user/manage',
  url: 'http://192.168.125.241:3012/user-tower/auth-redirect',
  theme: {
    colors: {
      brand: {
          '1': '#014DA11A',
          '2': '#014DA14D',
          '3': '#014DA173',
          '4': '#014DA1BF',
          '5': '#014DA1',
      },
    },
  },
}
console.log('props：', props)

onUnmounted(() => {
  destroyApp('user-manages')
})
</script>
