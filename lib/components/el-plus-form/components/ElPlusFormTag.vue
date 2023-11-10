<template>
  <div>
    <el-tag v-bind="attrs" :disabled="disabled" :size="attrs.size || 'default'" :type="tagType !== '--' ? tagType : ''" v-on="onEvents">
      {{ formatValue || modelValue }}
    </el-tag>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTag',
  inheritAttrs: false,
  typeName: 'tag',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const format = inject('format') as any

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const formatValue = ref('' as any)
// 格式化Type类型
const tagType = ref('' as any)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
})

watch(
  () => props.modelValue,
  async () => {
    if (!props.desc.tagType) {
      tagType.value = ''
    } else {
      if (typeof props.desc.tagType === 'function') {
        // 如果有方法类型的判断，则需要启用动态监测
        tagType.value = await props.desc.tagType(props.modelValue, props.formData || {}, props.field)
      } else if (typeof props.desc.tagType === 'string') {
        tagType.value = (await format)[props.desc.tagType](props.modelValue, props.formData || {}, props.field)
      } else {
        tagType.value = ''
      }
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  async () => {
    if (!props.desc.format) {
      formatValue.value = props.modelValue === '' ? '-' : props.modelValue ?? '-'
    } else {
      if (typeof props.desc.format === 'function') {
        // 如果有方法类型的判断，则需要启用动态监测
        formatValue.value = await props.desc.format(props.modelValue, props.formData || {}, props.field)
      } else if (typeof props.desc.format === 'string') {
        formatValue.value = (await format)[props.desc.format](props.modelValue, props.formData || {}, props.field)
      } else {
        formatValue.value = props.modelValue || '-'
      }
    }
  },
  { immediate: true }
)
</script>
