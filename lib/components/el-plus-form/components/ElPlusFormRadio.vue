<template>
  <el-radio-group v-if="isInit" class="ElPlusFormRadio-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <el-radio v-for="option of options" :key="option.value" :label="option.value">
      {{ option.l || option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormRadio',
  inheritAttrs: false,
  typeName: 'radio',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, useAttrs, watch, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual } from '../../../util'
import { useVModel } from '@vueuse/core'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = useVModel(props, 'modelValue', emits)

const options = reactive([] as any[])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
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
<style lang="scss" scoped>
.ElPlusFormRadio-panel {
  display: flex;
}
</style>
../util/aaaaa
