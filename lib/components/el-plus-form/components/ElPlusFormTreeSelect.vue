<template>
  <el-tree-select v-if="isInit" :class="desc.class" :style="desc.style" v-bind="attrs" :disabled="disabled" v-model="currentValue" :data="options" :loading="loading" v-on="onEvents" :render-after-expand="false" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTselect',
  inheritAttrs: false,
  typeName: 'tselect',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { isEqual } from '../../../util'
import { ref, useAttrs, reactive, watch, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: any
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const options = reactive([] as any[])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { filterable: true, clearable: true, props: { label: 'name', value: 'id', children: 'children' }, ...useAttrs() })
  isInit.value = true
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
</script>
../util/aaaaa
