<template>
  <div class="ele-form-text" :class="[...(desc.class || []), desc.linkType ? 'ele-form-text-click' : '']" :style="desc.style" v-bind="attrs" v-on="onEvents">
    <span v-if="desc.title">{{ desc.title + ': ' }}</span>
    <i v-if="desc.icon" :class="[formData.icon]"></i>
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

const showInfo = inject('showInfo') as Function
const format = inject('format') as any

const props = defineProps<{
  modelValue?: any
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const attrs = ref({} as any)

const onEvents = computed(() => {
  const tempOn = getEvents(props)

  // 如果这里有linkType，则会替换点击事件
  let linkId = props.desc.linkId || 'id'
  if (typeof linkId === 'function') {
    linkId = linkId(props.modelValue, props.formData)
  } else {
    linkId = props.formData[linkId]
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
      linkLabel = props.formData[linkLabel]
    }
    tempOn.click = () => {
      // 显示详情
      showInfo(linkId, linkType, linkLabel)
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
      formatValue.value = props.modelValue === '' ? '—' : props.modelValue ?? '—'
    } else {
      if (typeof props.desc.format === 'function') {
        // 如果有方法类型的判断，则需要启用动态监测
        formatValue.value = await props.desc.format(props.modelValue, props.formData, props.field)
      } else if (typeof props.desc.format === 'string') {
        formatValue.value = format[props.desc.format] ? format[props.desc.format](props.modelValue, props.formData, props.field) : '--'
      } else {
        formatValue.value = props.modelValue || '—'
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
  color: #1890ff;
  cursor: pointer;
}
</style>
