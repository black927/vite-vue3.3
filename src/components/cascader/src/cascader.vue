<template>
  <el-tooltip
    ref="tooltipRef"
    :visible="popperVisible"
    :teleported="teleported"
    :popper-class="[nsCascader.e('dropdown'), popperClass]"
    :popper-options="popperOptions"
    :fallback-placements="fallbackPlacements"
    :stop-popper-mouse-event="false"
    :gpu-acceleration="false"
    :placement="placement"
    :transition="`${nsCascader.namespace.value}-zoom-in-top`"
    effect="light"
    pure
    :persistent="persistent"
    @hide="hideSuggestionPanel"
  >
    <template #default>
      <div
        v-clickoutside:[contentRef]="() => togglePopperVisible(false)"
        :class="cascaderKls"
        :style="cascaderStyle"
        @click="() => togglePopperVisible(readonly ? undefined : true)"
        @keydown="handleKeyDown"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <el-input
          ref="input"
          v-model="inputValue"
          :placeholder="currentPlaceholder"
          :readonly="readonly"
          :disabled="isDisabled"
          :validate-event="false"
          :size="realSize"
          :class="inputClass"
          :tabindex="multiple && filterable && !isDisabled ? -1 : undefined"
          @compositionstart="handleComposition"
          @compositionupdate="handleComposition"
          @compositionend="handleComposition"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        >
          <template #suffix>
            <el-icon v-if="clearBtnVisible" key="clear" :class="[nsInput.e('icon'), 'icon-circle-close']" @click.stop="handleClear">
              <circle-close />
            </el-icon>
            <el-icon v-else key="arrow-down" :class="cascaderIconKls" @click.stop="togglePopperVisible()">
              <arrow-down />
            </el-icon>
          </template>
        </el-input>

        <div v-if="multiple" ref="tagWrapper" :class="[nsCascader.e('tags'), nsCascader.is('validate', Boolean(validateState))]">
          <el-tag
            v-for="tag in presentTags"
            :key="tag.key"
            :type="tagType"
            :size="tagSize"
            :effect="tagEffect"
            :hit="tag.hitState"
            :closable="tag.closable"
            disable-transitions
            @close="deleteTag(tag)"
          >
            <template v-if="tag.isCollapseTag === false">
              <span>{{ tag.text }}</span>
            </template>
            <template v-else>
              <el-tooltip
                :disabled="popperVisible || !collapseTagsTooltip"
                :fallback-placements="['bottom', 'top', 'right', 'left']"
                placement="bottom"
                effect="light"
              >
                <template #default>
                  <span>{{ tag.text }}</span>
                </template>
                <template #content>
                  <div :class="nsCascader.e('collapse-tags')">
                    <div v-for="(tag2, idx) in allPresentTags.slice(maxCollapseTags)" :key="idx" :class="nsCascader.e('collapse-tag')">
                      <el-tag
                        :key="tag2.key"
                        class="in-tooltip"
                        :type="tagType"
                        :size="tagSize"
                        :effect="tagEffect"
                        :hit="tag2.hitState"
                        :closable="tag2.closable"
                        disable-transitions
                        @close="deleteTag(tag2)"
                      >
                        <span>{{ tag2.text }}</span>
                      </el-tag>
                    </div>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-tag>
          <input
            v-if="filterable && !isDisabled"
            v-model="searchInputValue"
            type="text"
            :class="nsCascader.e('search-input')"
            :placeholder="presentText ? '' : inputPlaceholder"
            @input="(e) => handleInput(searchInputValue, e as KeyboardEvent)"
            @click.stop="togglePopperVisible(true)"
            @keydown.delete="handleDelete"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @focus="handleFocus"
            @blur="handleBlur"
          >
        </div>
      </div>
    </template>

    <template #content>
      <cascader-panel
        v-show="!filtering"
        ref="cascaderPanelRef"
        v-model="checkedValue"
        :options="options"
        :props="props.props"
        :border="false"
        :render-label="$slots.default"
        :titles="titles"
        @expand-change="handleExpandChange"
        @close="$nextTick(() => togglePopperVisible(false))"
      >
        <template #empty>
          <slot name="empty" />
        </template>
      </cascader-panel>
      <el-scrollbar
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        :class="nsCascader.e('suggestion-panel')"
        :view-class="nsCascader.e('suggestion-list')"
        @keydown="handleSuggestionKeyDown"
      >
        <!-- <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="[
              nsCascader.e('suggestion-item'),
              nsCascader.is('checked', item.checked),
            ]"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <el-icon v-if="item.checked">
              <check />
            </el-icon>
          </li>
        </template> -->
        <template v-if="optionsData.length">
          <cascader-panel
            ref="cascaderPanelRef2"
            v-model="checkedValue2"
            :options="optionsData"
            :props="props.props"
            :border="false"
            :render-label="$slots.default"
            :titles="titles"
            suggestions
            @check-change="handleCheckChange"
          >
            <template #empty>
              <slot name="empty" />
            </template>
          </cascader-panel>
        </template>
        <slot v-else name="empty">
          <li :class="nsCascader.e('empty-text')">
            {{ t('el.cascader.noMatch') }}
          </li>
        </slot>
      </el-scrollbar>
    </template>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, useAttrs, watch, watchEffect } from 'vue'
import { cloneDeep, debounce } from 'lodash-unified'
import { isClient, useCssVar, useResizeObserver } from '@vueuse/core'
import { ClickOutside as vClickoutside, useLocale, useNamespace, EVENT_CODE, useFormItem, useFormSize } from 'element-plus'
import { isPromise, debugWarn, focusNode, getSibling } from 'element-plus/es/utils/index.mjs'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from 'element-plus/es/constants/index.mjs'
import { useComposition } from '../hooks'
import { useEmptyValues } from 'element-plus/es/hooks/index.mjs'
import { ArrowDown, CircleClose } from '@element-plus/icons-vue'
import { cascaderEmits, cascaderProps } from './cascader'
import CascaderPanel from './cascader-panel/index.vue'
import { filterTree, flattenTree } from './cascader-panel/utils'
import type { ComputedRef, Ref, StyleValue } from 'vue'
import type {
  CascaderNode,
  CascaderPanelInstance,
  Tag,
  ScrollbarInstance,
  InputInstance,
  Options,
  TooltipInstance,
  CascaderOption,
} from 'element-plus'
import type { CascaderValue } from './cascader-panel/node'

const popperOptions: Partial<Options> = {
  modifiers: [
    {
      name: 'arrowPosition',
      enabled: true,
      phase: 'main',
      fn: ({ state }: any) => {
        const { modifiersData, placement } = state as any
        if (['right', 'left', 'bottom', 'top'].includes(placement)) return
        modifiersData.arrow.x = 35
      },
      requires: ['arrow'],
    },
  ],
}
const COMPONENT_NAME = 'ElCascader'

defineOptions({
  name: COMPONENT_NAME,
})

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const attrs = useAttrs()

let inputInitialHeight = 0
let pressDeleteCount = 0

const nsCascader = useNamespace('cascader')
const nsInput = useNamespace('input')

const { t } = useLocale()
const { form, formItem } = useFormItem()
const { valueOnClear } = useEmptyValues(props)
const { isComposing, handleComposition } = useComposition({
  afterComposition(event) {
    const text = (event.target as HTMLInputElement)?.value
    handleInput(text)
  },
})

const tooltipRef: Ref<TooltipInstance | null> = ref(null)
const input: Ref<InputInstance | null> = ref(null)
const tagWrapper = ref(null)
const cascaderPanelRef: Ref<CascaderPanelInstance | null> = ref(null)
const suggestionPanel: Ref<ScrollbarInstance | null> = ref(null)
const popperVisible = ref(false)
const inputHover = ref(false)
const filtering = ref(false)
const filterFocus = ref(false)
const inputValue = ref('')
const searchInputValue = ref('')
const presentTags: Ref<Tag[]> = ref([])
const allPresentTags: Ref<Tag[]> = ref([])
// const suggestions: Ref<CascaderNode[]> = ref([])
const optionsData = ref<CascaderOption[]>([])
watchEffect(() => {
  optionsData.value = props.options
})
// watch(() => popperVisible.value, () => {
//   optionsData.value = props.options
// })

const cascaderStyle = computed<StyleValue>(() => {
  return attrs.style as StyleValue
})

const isDisabled = computed(() => props.disabled || form?.disabled)
const inputPlaceholder = computed(() => props.placeholder || t('el.cascader.placeholder'))
const currentPlaceholder = computed(() =>
  searchInputValue.value || presentTags.value.length > 0 || isComposing.value ? '' : inputPlaceholder.value,
)
const realSize = useFormSize()
const tagSize = computed(() => (['small'].includes(realSize.value) ? 'small' : 'default'))
const multiple = computed(() => !!props.props.multiple)
const readonly = computed(() => !props.filterable || multiple.value)
const searchKeyword = computed(() => (multiple.value ? searchInputValue.value : inputValue.value))
const checkedNodes: ComputedRef<CascaderNode[]> = computed(() => cascaderPanelRef.value?.checkedNodes || [])
const clearBtnVisible = computed(() => {
  if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value) return false

  return !!checkedNodes.value.length
})
const presentText = computed(() => {
  const { showAllLevels, separator } = props
  const nodes = checkedNodes.value
  return nodes.length ? (multiple.value ? '' : nodes[0].calcText(showAllLevels, separator)) : ''
})

const validateState = computed(() => formItem?.validateState || '')

const checkedValue = computed<CascaderValue>({
  get() {
    return cloneDeep(props.modelValue) as CascaderValue
  },
  set(val) {
    // https://github.com/element-plus/element-plus/issues/17647
    const value = val ?? valueOnClear.value
    emit(UPDATE_MODEL_EVENT, value)
    emit(CHANGE_EVENT, value)
    if (props.validateEvent) {
      formItem?.validate('change').catch((err: Error) => debugWarn(err))
    }
  },
})

const cascaderKls = computed(() => {
  return [nsCascader.b(), nsCascader.m(realSize.value), nsCascader.is('disabled', isDisabled.value), attrs.class]
})

const cascaderIconKls = computed(() => {
  return [nsInput.e('icon'), 'icon-arrow-down', nsCascader.is('reverse', popperVisible.value)]
})

const inputClass = computed(() => {
  return nsCascader.is('focus', popperVisible.value || filterFocus.value)
})

const contentRef = computed(() => {
  return tooltipRef.value?.popperRef?.contentRef
})

const togglePopperVisible = (visible?: boolean) => {
  if (isDisabled.value) return

  visible = visible ?? !popperVisible.value

  if (visible !== popperVisible.value) {
    popperVisible.value = visible
    input.value?.input?.setAttribute('aria-expanded', `${visible}`)

    if (visible) {
      updatePopperPosition()
      nextTick(cascaderPanelRef.value?.scrollToExpandingNode)
    } else if (props.filterable) {
      syncPresentTextValue()
    }

    emit('visibleChange', visible)
  }
}

const updatePopperPosition = () => {
  nextTick(() => {
    tooltipRef.value?.updatePopper()
  })
}

const hideSuggestionPanel = () => {
  optionsData.value = props.options
  filtering.value = false
}

const genTag = (node: CascaderNode): Tag => {
  const { showAllLevels, separator } = props
  return {
    node,
    key: node.uid,
    text: node.calcText(showAllLevels, separator),
    hitState: false,
    closable: !isDisabled.value && !node.isDisabled,
    isCollapseTag: false,
  }
}

const deleteTag = (tag: Tag) => {
  const node = tag.node as CascaderNode
  node.doCheck(false)
  cascaderPanelRef.value?.calculateCheckedValue()
  emit('removeTag', node.valueByOption)
}

const calculatePresentTags = () => {
  if (!multiple.value) return

  const nodes = checkedNodes.value
  const tags: Tag[] = []

  const allTags: Tag[] = []
  nodes.forEach(node => allTags.push(genTag(node)))
  allPresentTags.value = allTags

  if (nodes.length) {
    nodes.slice(0, props.maxCollapseTags).forEach(node => tags.push(genTag(node)))
    const rest = nodes.slice(props.maxCollapseTags)
    const restCount = rest.length

    if (restCount) {
      if (props.collapseTags) {
        tags.push({
          key: -1,
          text: `+ ${restCount}`,
          closable: false,
          isCollapseTag: true,
        })
      } else {
        rest.forEach(node => tags.push(genTag(node)))
      }
    }
  }

  presentTags.value = tags
}

const cascaderPanelRef2: Ref<CascaderPanelInstance | null> = ref(null)
const checkedValue2 = ref<CascaderValue>([])
const handleCheckChange = (node: CascaderNode) => {
  const { filterMethod, showAllLevels, separator } = props
  const nodeList = cascaderPanelRef.value?.getFlattedNodes(!props.props.checkStrictly)?.filter((node) => {
    if (node.isDisabled) return false
    node.calcText(showAllLevels, separator)
    return filterMethod(node, searchKeyword.value)
  })
  const _nodeList = flattenTree(node.children && node.children.length ? node.children : [node]).map(v => v.value)
  const newNodeList = nodeList?.filter(v => _nodeList.includes(v.value))
  newNodeList?.forEach((v) => {
    v && handleSuggestionClick(v)
  })
  // console.log('=========0000000000000000000', { nodeList, node, _nodeList })
}
const calculateSuggestions = () => {
  const { value } = searchKeyword
  const result = filterTree(value, props.options)
  filtering.value = true
  optionsData.value = result
  // updatePopperPosition()
  // const { filterMethod, showAllLevels, separator } = props
  // const res = cascaderPanelRef.value?.getFlattedNodes(!props.props.checkStrictly)?.filter((node) => {
  //   if (node.isDisabled) return false
  //   node.calcText(showAllLevels, separator)
  //   return filterMethod(node, searchKeyword.value)
  // })

  // if (multiple.value) {
  //   presentTags.value.forEach((tag) => {
  //     tag.hitState = false
  //   })
  //   allPresentTags.value.forEach((tag) => {
  //     tag.hitState = false
  //   })
  // }

  // filtering.value = true
  // suggestions.value = res!
  // updatePopperPosition()
}

const focusFirstNode = () => {
  let firstNode!: HTMLElement

  if (filtering.value && suggestionPanel.value) {
    firstNode = suggestionPanel.value.$el.querySelector(`.${nsCascader.e('suggestion-item')}`)
  } else {
    firstNode = cascaderPanelRef.value?.$el.querySelector(`.${nsCascader.b('node')}[tabindex="-1"]`)
  }

  if (firstNode) {
    firstNode.focus()
    !filtering.value && firstNode.click()
  }
}

const updateStyle = () => {
  const inputInner = input.value?.input
  const tagWrapperEl = tagWrapper.value
  const suggestionPanelEl = suggestionPanel.value?.$el

  if (!isClient || !inputInner) return

  if (suggestionPanelEl) {
    const suggestionList = suggestionPanelEl.querySelector(`.${nsCascader.e('suggestion-list')}`)
    suggestionList.style.minWidth = `${inputInner.offsetWidth}px`
  }

  if (tagWrapperEl) {
    const { offsetHeight } = tagWrapperEl
    const height = presentTags.value.length > 0 ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px` : `${inputInitialHeight}px`
    inputInner.style.height = height
    updatePopperPosition()
  }
}

const getCheckedNodes = (leafOnly: boolean) => {
  return cascaderPanelRef.value?.getCheckedNodes(leafOnly)
}

const handleExpandChange = (value: CascaderValue) => {
  updatePopperPosition()
  emit('expandChange', value)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (isComposing.value) return

  switch (e.code) {
    case EVENT_CODE.enter:
      togglePopperVisible()
      break
    case EVENT_CODE.down:
      togglePopperVisible(true)
      nextTick(focusFirstNode)
      e.preventDefault()
      break
    case EVENT_CODE.esc:
      if (popperVisible.value === true) {
        e.preventDefault()
        e.stopPropagation()
        togglePopperVisible(false)
      }
      break
    case EVENT_CODE.tab:
      togglePopperVisible(false)
      break
  }
}

const handleClear = () => {
  cascaderPanelRef.value?.clearCheckedNodes()
  if (!popperVisible.value && props.filterable) {
    syncPresentTextValue()
  }
  togglePopperVisible(false)
  emit('clear')
}

const syncPresentTextValue = () => {
  const { value } = presentText
  inputValue.value = value
  searchInputValue.value = value
}

const handleSuggestionClick = (node: CascaderNode) => {
  const { checked } = node

  if (multiple.value) {
    cascaderPanelRef.value?.handleCheckChange(node, !checked, false)
  } else {
    !checked && cascaderPanelRef.value?.handleCheckChange(node, true, false)
    togglePopperVisible(false)
  }
}

const handleSuggestionKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const { code } = e

  switch (code) {
    case EVENT_CODE.up:
    case EVENT_CODE.down: {
      const distance = code === EVENT_CODE.up ? -1 : 1
      focusNode(getSibling(target, distance, `.${nsCascader.e('suggestion-item')}[tabindex="-1"]`) as HTMLElement)
      break
    }
    case EVENT_CODE.enter:
      target.click()
      break
  }
}

const handleDelete = () => {
  const tags = presentTags.value
  const lastTag = tags[tags.length - 1]
  pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1

  if (!lastTag || !pressDeleteCount || (props.collapseTags && tags.length > 1)) return

  if (lastTag.hitState) {
    deleteTag(lastTag)
  } else {
    lastTag.hitState = true
  }
}

const handleFocus = (e: FocusEvent) => {
  const el = e.target as HTMLInputElement
  const name = nsCascader.e('search-input')
  if (el.className === name) {
    filterFocus.value = true
  }
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  filterFocus.value = false
  emit('blur', e)
}

const handleFilter = debounce(() => {
  const { value } = searchKeyword
  if (!value) return

  const passed = props.beforeFilter(value)

  if (isPromise(passed)) {
    (passed as Promise<any>).then(calculateSuggestions).catch(() => {
      /* prevent log error */
    })
  } else if (passed !== false) {
    calculateSuggestions()
  } else {
    hideSuggestionPanel()
  }
}, props.debounce)

const handleInput = (val: string, e?: KeyboardEvent) => {
  !popperVisible.value && togglePopperVisible(true)

  if (e?.isComposing) return

  val ? handleFilter() : hideSuggestionPanel()
}

const getInputInnerHeight = (inputInner: HTMLElement): number =>
  Number.parseFloat(useCssVar(nsInput.cssVarName('input-height'), inputInner).value) - 2

watch(filtering, updatePopperPosition)

watch([checkedNodes, isDisabled, () => props.collapseTags], calculatePresentTags)

watch(presentTags, () => {
  nextTick(() => updateStyle())
})

watch(realSize, async () => {
  await nextTick()
  const inputInner = input.value!.input!
  inputInitialHeight = getInputInnerHeight(inputInner) || inputInitialHeight
  updateStyle()
})

watch(presentText, syncPresentTextValue, { immediate: true })

onMounted(() => {
  const inputInner = input.value!.input!

  const inputInnerHeight = getInputInnerHeight(inputInner)

  inputInitialHeight = inputInner.offsetHeight || inputInnerHeight
  useResizeObserver(inputInner, updateStyle)
})

defineExpose({
  /**
   * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
   */
  getCheckedNodes,
  /**
   * @description cascader panel ref
   */
  cascaderPanelRef,
  /**
   * @description toggle the visible of popper
   */
  togglePopperVisible,
  /**
   * @description cascader content ref
   */
  contentRef,
})
</script>
