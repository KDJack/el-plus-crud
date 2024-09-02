<template>
  <template v-if="isInit">
    <el-checkbox-group v-if="options?.length" class="ElPlusFormCheckbox-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
      <template v-for="option of options" :key="option.value">
        <el-checkbox :label="option.value" :value="option.value">
          {{ option.text || option.label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
    <div v-else class="null-tip">暂无选项</div>
  </template>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormCheckbox',
  inheritAttrs: false,
  typeName: 'checkbox',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, watch, useAttrs, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual } from '../../../util'
import { useVModel } from '@vueuse/core'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: Array<string | number> | string | number | null
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

watch(
  () => props.modelValue,
  (data: Array<string | number> | string | number | null | undefined) => {
    if (data) {
      currentValue.value = Array.isArray(data) ? data : [data]
    } else {
      currentValue.value = []
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.ElPlusFormCheckbox-panel {
  display: flex;
  flex-wrap: wrap;
}
.null-tip {
  color: #999;
}
</style>
