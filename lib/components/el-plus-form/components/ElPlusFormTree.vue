<template>
  <el-tree ref="treeRef" v-if="isInit" :class="desc.class" :style="desc.style" v-bind="attrs" :disabled="disabled" :default-checked-keys="currentValue" :loading="loading" node-key="id" :data="options" v-on="onEvents" class="el-plus-form-tree" @check-change="handelCheckChange" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTree',
  inheritAttrs: false,
  typeName: 'tree',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { isEqual } from 'lodash'
import { ref, reactive, useAttrs, onBeforeMount, watch, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: string
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
  disabled?: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue?.split(',') || [])

const options = reactive([] as any[])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const treeRef = ref()

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { checkStrictly: true, showCheckbox: true, accordion: true, props: { label: 'label', children: 'children' }, ...useAttrs() })
  isInit.value = true
})

function handelCheckChange() {
  emits('update:modelValue', [...treeRef.value!.getCheckedKeys(!(props.desc.isPId ?? true))].join(','))
}

watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
      // 从全局数据中获取options
      options.splice(0, options.length, ...(globalData[data] || []))
    } else if (typeof data === 'function') {
      options.splice(0, options.length, ...(await data(props.formData)))
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
  (val) => {
    currentValue.value = val?.split(',') || []
    treeRef.value!.setCheckedKeys(currentValue.value)
  }
)
</script>
<style lang="scss" scoped>
.el-plus-form-tree {
  width: 100%;
}
</style>
