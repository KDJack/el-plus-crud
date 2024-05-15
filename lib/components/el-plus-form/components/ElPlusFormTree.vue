<template>
  <div class="el-plus-form-tree">
    <template v-if="attrs.showCheckbox && !attrs.noSelectAll">
      <div class="btns">
        <el-checkbox v-model="selectAll" @change="handelSelectAll" label="全部勾选" border />
      </div>
    </template>
    <el-tree ref="treeRef" v-if="isInit" :class="desc.class" :style="desc.style" v-bind="attrs" :disabled="disabled" :default-checked-keys="currentValue" :loading="loading" node-key="id" :data="options" v-on="onEvents" class="el-plus-form-tree" @check-change="handelCheckChange" />
  </div>
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
import { isEqual } from '../../../util'
import { ref, reactive, useAttrs, onBeforeMount, watch, inject, nextTick } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { useVModel } from '@vueuse/core'

const lodash = inject('lodash') as any
const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: Array<string>
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const currentValue = useVModel(props, 'modelValue', emits)

const options = reactive([] as any[])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const treeRef = ref()
const selectAll = ref(false)
const allIds = ref([] as any[])

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { checkStrictly: true, showCheckbox: true, accordion: true, noSelectAll: false, props: { label: 'label', children: 'children' }, ...useAttrs() })
  if (attrs.value.showCheckbox && !attrs.value.noSelectAll && options.length) {
    allIds.value = getLoopIds(options)
  }
  isInit.value = true
})

/**
 * 处理单个checkbox改变
 */
function handelCheckChange(item: any, isSelect: boolean) {
  currentValue.value = treeRef.value!.getCheckedKeys(!(props.desc.isPId ?? true))
  nextTick(() => {
    // 这里判断一下全选状态
    selectAll.value = isSelect && allIds.value.length === currentValue.value?.length
    emits('validateThis')
  })
}

/**
 * 处理权限
 */
function handelSelectAll() {
  let selectIds = [] as any[]
  if (selectAll.value) selectIds = lodash.cloneDeep(allIds.value)
  currentValue.value = selectIds
  treeRef.value!.setCheckedKeys(currentValue.value)
}

/**
 * 递归获取id
 */
function getLoopIds(list: Array<any>) {
  const tempIds = [] as any[]
  if (list?.length) {
    list.map((item) => {
      if (item[attrs.value.props.children]?.length) {
        tempIds.push(...getLoopIds(item[attrs.value.props.children]))
      }
      tempIds.push(item.id)
    })
  }
  return tempIds
}

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
    // 如果是复选,这里重新获取下所有IDs
    if (attrs.value.showCheckbox && !attrs.value.noSelectAll) {
      allIds.value = getLoopIds(options)
    }
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (val) => {
    treeRef.value!.setCheckedKeys(val || [])
  }
)
</script>
<style lang="scss" scoped>
.el-plus-form-tree {
  width: 100%;
  display: flex;
  flex-direction: column;
  .btns {
    width: 100%;
    padding-left: 12px;
    margin-bottom: 8px;
  }
}
</style>
