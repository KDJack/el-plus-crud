<template>
  <div class="ElPlusFormStatus-panel">
    <i :style="iconStyle" />
    <div :class="desc.class" :style="desc.style">
      {{ formatValue }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormStatus',
  inheritAttrs: false,
  typeName: 'status',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { isEqual } from '../../../util'
import { ref, reactive, watch, computed, inject } from 'vue'
import { useVModel } from '@vueuse/core'

const globalData = inject('globalData') as any
const format = inject('format') as any

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = useVModel(props, 'modelValue', emits)

const options = reactive([] as any[])
const formatValue = ref('' as any)

// icon 样式
const iconStyle = computed(() => {
  if (props.desc.icolor) {
    if (typeof props.desc.icolor === 'function') {
      return { background: props.desc.icolor(props.formData || {}) || '#909399' }
    }
    return { background: props.desc.icolor || '#909399' }
  }
  const optionsItem = options.find((item: any) => (item.value || item.v) == currentValue.value) || {}
  return { background: optionsItem.c || optionsItem.color || '#909399' }
})

watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
      // 从全局数据中获取options
      options.splice(0, options.length, ...(globalData[data] || []))
    } else if (typeof data === 'function') {
      options.splice(0, options.length, ...(await data(props.formData || {})))
    } else if (Array.isArray(data)) {
      if (data && options && !isEqual(data, options)) {
        options.splice(0, options.length, ...data)
      }
    } else {
      options.splice(0, options.length)
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  async () => {
    if (!props.desc.format) {
      formatValue.value = props.modelValue === '' ? props.desc.default ?? '-' : props.modelValue ?? props.desc.default ?? '-'
    } else {
      if (typeof props.desc.format === 'function') {
        // 如果有方法类型的判断，则需要启用动态监测
        formatValue.value = await props.desc.format(props.modelValue, props.formData || {}, props.field)
      } else if (typeof props.desc.format === 'string') {
        formatValue.value = format[props.desc.format] ? format[props.desc.format](props.modelValue, props.formData || {}, props.field) : '--'
      } else {
        formatValue.value = props.modelValue || '-'
      }
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.ElPlusFormStatus-panel {
  display: flex;
  line-height: 25px;
  align-items: center;
  i {
    display: inline-block;
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
../util/aaaaa
