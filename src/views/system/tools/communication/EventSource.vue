<script lang="ts" setup>
import { ref, onUnmounted, watchEffect } from 'vue'
import { useEventSource } from '@vueuse/core'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown-light.css'
// import hljs from 'highlight.js'

/**
 * https://marked.js.org/using_pro#use
 * async: 默认 false，是否异步，开启之后 walkTokens 的所有函数都 resolve之后，marked.parse 函数返回一个 Promise<string>
 * break : 默认 false，开启之后，在一个换行之后加一个<br>
 * gmf: 默认 true，使用 Github Flavored Markdown (GFM) specification.
 * pedantic: 默认false
 * renderer: {}, new Renderer(), 是一个对象，包含一些将 tokens render 成 html 的函数
 * silent: 默认 false，开启之后，不会抛出任何错误或者输出任何警告，错误会被返回成字符串
 * tokenizer: {}, new Tokenizer()，是一个对象，包含一些函数从 markdown 中创建 token
 * walkTokens: function, 是一个被所有的 token 调用的函数
 */
//  class CustomRenderer extends marked.Renderer {
//   heading({ tokens, depth }: Tokens.Heading) {
//     console.log('xxx', tokens, depth)
//     if (depth === 1) {
//       return `<h1 class="hClass">#${tokens[0].raw}</h1>`;
//     } else if (depth === 2) {
//       return `<h2 class="hClass">##${tokens[0].raw}</h2>`;
//     } else if (depth === 3) {
//       return `<h3 class="hClass">###${tokens[0].raw}</h3>`;
//     }
//     return `<h4 class="hClass">####${tokens[0].raw}</h4>`;
//   }
// }
// const renderer = new CustomRenderer();
marked.setOptions({
  // renderer: renderer,
  async: false,
  breaks: false,
  extensions: null,
  gfm: true,
  hooks: null,
  pedantic: false,
  silent: false,
  tokenizer: null,
  walkTokens: null,
})

const { status, data, error, close } = useEventSource('http://127.0.0.1:8888/api/markdown', [])
const parsedHtml = ref('')

watchEffect(() => {
  parsedHtml.value += data.value ? marked(JSON.parse(data.value), { async: false }) : ''
  console.log('parsedHtml>>>', status.value, data.value, error.value)
})

onUnmounted(() => {
  close()
})

const tabelData = ref([
  { userName: '钱钱钱钱钱', createUser: 'liyang', createTime: '是擦吉萨' },
  { userName: '钱钱钱钱钱', createUser: 'liyang', createTime: '是擦吉萨' },
  { userName: '钱钱钱钱钱', createUser: 'liyang', createTime: '是擦吉萨' },
  { userName: '钱钱钱钱钱', createUser: 'liyang', createTime: '是擦吉萨' },
  { userName: '钱钱钱钱钱', createUser: 'liyang', createTime: '是擦吉萨' },
])
</script>

<template>
  <div class="bg-#fff p16px">
    <div v-if="!parsedHtml">生成中...</div>
    <div v-else class="bg-#fff markdown-preview1 markdown-body" v-html="parsedHtml" />
    <el-table :data="tabelData" border>
      <el-table-column label="序号" type="index" width="55" align="center" />
      <el-table-column label="用户名称" prop="userName" />
      <el-table-column label="创建人" prop="createUser" align="center" />
      <el-table-column label="创建时间" prop="createTime" />
    </el-table>
  </div>
</template>
