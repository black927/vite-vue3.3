<template>
  <WujieVue
    ref="wujieVueRef"
    width="100%"
    height="100%"
    name="user-groups"
    :url="props.url"
    :props="props"
    :plugins="[InstanceofPlugin()]"
  />
</template>

<script lang="ts" setup name="user-groups">
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import useStoreUser from '@/store/modules/user'

const router = useRouter()
const wujieVueRef = ref()
const storeUser = useStoreUser()
const { destroyApp, bus } = WujieVue
const props = {
  authId: storeUser.phoneNumber,
  brandId: '100002',
  brandName: '李与白',
  parentName: 'comm',
  redirectUrl: '/user/group',
  url: 'http://192.168.125.241:3012/user-tower/auth-redirect',
}
console.log('props：', props)

bus.$on('__USER_TOWER_LINK_HOME', () => {
  router.replace(`/internal-menu`)
})
onUnmounted(() => {
  bus.$clear()
  destroyApp('user-groups')
})
</script>
