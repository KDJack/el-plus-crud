<template>
  <el-tree ref="treeRef" v-if="isInit" :class="props.desc.class" :style="props.desc.style" v-bind="attrs" :default-checked-keys="currentValue" :loading="props.loading" node-key="id" :data="props.desc.options" v-on="onEvents" class="el-plus-form-tree" @check-change="handelCheckChange" />
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
import { ref, useAttrs, onBeforeMount, watch } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()
const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue?.split(',') || [])

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
