<script lang="ts" setup name="user-label">
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

const list = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 },
])

const log = (event: any) => {
  console.log('拖拽结束', event)
}
const onStart = (event: any) => {
  console.log('onStart>>', event.originalEvent)
}
const onEnd = (event: any) => {
  console.log('onEnde>>', event.originalEvent)
}
const onMove = (event: any) => {
  console.log('onMove>>>>', event)
  return true
}
</script>

<template>
  <div class="flex m-10">
    <VueDraggableNext class="dragArea list-group w-full" :list="list" @change="log" @start="onStart" @end="onEnd" @move="onMove">
      <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list" :key="element.name">
        {{ element.name }}
      </div>
    </VueDraggableNext>
  </div>
</template>

<style lang="scss" scoped></style>
