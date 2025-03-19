<template>
  <div>
    <el-button type="primary" :icon="Plus" @click="dialogVisible = true">选择已有人群</el-button>
    <el-dialog v-model="dialogVisible" width="80%">
      <WujieVue
        ref="wujieVueRef"
        width="100%"
        height="100%"
        name="marketing-canvas"
        :url="props.url"
        :props="props"
        :plugins="[InstanceofPlugin()]"
      />
    </el-dialog>
  </div>
</template>

<script lang="tsx" setup name="UserTower">
import { Plus } from '@element-plus/icons-vue'
import WujieVue from 'wujie-vue3'
import { InstanceofPlugin } from 'wujie-polyfill'
import { ref, onMounted, onUnmounted } from 'vue'
import useUserStore from '@/store/modules/user'

const wujieVueRef = ref()
const userStore = useUserStore()
const { destroyApp, bus } = WujieVue
const dialogVisible = ref(false)
const props = {
  ComponentId: '1742353235468',
  authId: '18228329236',
  close: (u: any) => {
    console.log('close----', u)
  },
  env: 'DEV',
  maId: 'maId',
  type: 'select',
  brandId: '398628',
  url: userStore.env.userTower,
}
console.log('xxx', props)
onMounted(() => {
  bus.$on('__USER_TOWER_CLOSE_1742353235468', (res: any) => {
    console.log('ccc', res)
    dialogVisible.value = false
  })
})
onUnmounted(() => {
  bus.$clear()
  destroyApp('marketing-canvas')
})
</script>
