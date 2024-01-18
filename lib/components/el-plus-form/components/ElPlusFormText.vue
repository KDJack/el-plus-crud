<template>
  <div class="ele-form-text" :class="[...(desc.class || []), desc.linkType ? 'ele-form-text-click' : '']" :style="desc.style" v-bind="attrs" v-on="onEvents">
    <span v-if="desc.title">{{ desc.title + ': ' }}</span>
    <i v-if="desc.icon" :class="[(formData || {}).icon]"></i>
    {{ formatValue }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormText',
  inheritAttrs: false,
  typeName: 'text',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, computed, onBeforeMount, useAttrs, inject } from 'vue'
import { getEvents, getAttrs } from '../mixins'
import { isPromiseLike } from '../../../util'

let showInfo = null as any

const format = inject('format') as any

const props = defineProps<{
  modelValue?: any
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  rowIndex?: number
}>()

// 有点击事件时，才inject
if (props.desc.linkId || props.desc.linkType) {
  showInfo = inject('showInfo') as Function
}

const attrs = ref({} as any)

const onEvents = computed(() => {
  const tempOn = getEvents(props)

  // 如果这里有linkType，则会替换点击事件
  let linkId = props.desc.linkId || 'id'
  if (typeof linkId === 'function') {
    linkId = linkId(props.modelValue, props.formData || {})
  } else {
    if (props.formData) {
      linkId = props.formData[linkId]
    }
  }
  if (props.desc.linkType && linkId) {
    let linkType = props.desc.linkType
    let linkLabel = props.desc.linkLabel || ''
    if (typeof linkType === 'function') {
      linkType = linkType(props.modelValue, props.formData)
    }
    if (typeof linkLabel === 'function') {
      linkLabel = linkLabel(props.modelValue, props.formData)
    } else {
      if (props.formData) {
        linkLabel = props.formData[linkLabel]
      }
    }
    tempOn.click = () => {
      // 显示详情
      showInfo && showInfo(linkId, linkType, linkLabel, props.formData || {})
    }
  }
  return tempOn
})

const formatValue = ref('' as any)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, useAttrs())
})

watch(
  () => props.modelValue,
  async () => {
    if (!props.desc.format) {
      formatValue.value = props.modelValue === '' ? props.desc.default ?? '-' : props.modelValue ?? props.desc.default ?? '-'
    } else {
      if (typeof props.desc.format === 'function') {
        // 如果有方法类型的判断，则需要启用动态监测
        const result = props.desc.format(props.modelValue, props.formData, props.rowIndex)
        formatValue.value = isPromiseLike<any>(result) ? await result : result
      } else if (typeof props.desc.format === 'string') {
        formatValue.value = format[props.desc.format] ? format[props.desc.format](props.modelValue, props.formData, props.field) : '--'
      } else {
        formatValue.value = props.modelValue || '-'
      }
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.ele-form-text {
  color: #606266;
  word-break: break-all;
  display: flex;
  align-items: center;
}

.ele-form-text-click {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
../util/aaaaa
