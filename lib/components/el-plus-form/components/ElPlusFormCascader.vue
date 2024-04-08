<template>
  <el-cascader v-if="isInit" class="ElPlusFormCascader-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" :options="options" v-model="currentValue" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormCascader',
  inheritAttrs: false,
  typeName: 'cascader',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount, inject, reactive, watch } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual } from '../../../util'
import { useVModel } from '@vueuse/core'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: Array<string> | string | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = useVModel(props, 'modelValue', emits)

const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))
const options = reactive([] as any[])

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { clearable: true, props: { value: 'value', label: 'label', children: 'children', checkStrictly: !!props.desc.checkStrictly }, ...useAttrs() })
  isInit.value = true
})

//监听options数据
watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
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
<style lang="scss" scoped>
.ElPlusFormCascader-panel {
  display: flex;
}
</style>
