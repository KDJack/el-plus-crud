<template>
  <div class="el-plus-form-tree">
    <div class="btns" v-if="(attrs.showCheckbox && !attrs.noSelectAll) || attrs.enableSearch">
      <el-checkbox v-if="attrs.showCheckbox && !attrs.noSelectAll" v-model="selectAll" @change="handelSelectAll" label="全部勾选" border />
      <el-input v-if="attrs.enableSearch" v-model="searchText" placeholder="输入关键字筛选" :validate-event="false" clearable @input="handleSearch" class="tree-search-input" />
    </div>
    <el-tree ref="treeRef" v-if="isInit" :class="desc.class" :style="desc.style" v-bind="attrs" :disabled="disabled" :default-checked-keys="currentValue" :loading="loading" node-key="id" :data="options" :filter-node-method="filterNodeMethod" v-on="onEvents" class="el-plus-form-tree" @check-change="handelCheckChange" />
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
const searchText = ref('')
let isPromise = false
let isSelectAllAction = false

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
async function handelCheckChange(item: any, isSelect: boolean) {
  // 全选操作中，跳过单个节点的处理，避免无限循环
  if (isSelectAllAction) return
  if (isSelect && attrs.value?.checkStrictly) {
    if (isPromise) return
    isPromise = true
    await new Promise((resolve) => {
      // 遍历该节点的所有下级节点id,然后选中
      const tempList = getLoopIds([item])
      tempList.push(...treeRef.value!.getCheckedKeys(!(props.desc.isPId ?? true)))
      treeRef.value!.setCheckedKeys(tempList)
      setTimeout(() => {
        isPromise = false
        resolve(true)
      }, 50)
    })
  }
  currentValue.value = treeRef.value!.getCheckedKeys(!(props.desc.isPId ?? true))
  nextTick(() => {
    // 这里判断一下全选状态
    if (!isSelectAllAction) {
      selectAll.value = isSelect && allIds.value.length === currentValue.value?.length
    }
    emits('validateThis')
  })
}

/**
 * 处理权限（防抖，防止快速连续点击）
 */
const handelSelectAll = lodash.debounce(function () {
  const isChecked = selectAll.value
  let selectIds = [] as any[]
  if (isChecked) {
    // 搜索状态下，只选中当前可见的节点
    selectIds = searchText.value ? lodash.cloneDeep(calcVisibleIds(options, searchText.value)) : lodash.cloneDeep(allIds.value)
  }
  isSelectAllAction = true
  currentValue.value = selectIds
  treeRef.value?.setCheckedKeys(currentValue.value)
  setTimeout(() => {
    isSelectAllAction = false
    selectAll.value = isChecked
    emits('validateThis')
  }, 150)
}, 300)

/**
 * 搜索过滤函数
 */
function filterNodeMethod(value: string, data: any, node: any) {
  if (!value) return true
  // 已勾选项始终显示
  if (currentValue.value?.includes(data.id)) return true
  const labelKey = attrs.value.props?.label || 'label'
  // 节点名称匹配
  if (data[labelKey] && data[labelKey].includes(value)) return true
  // 父节点匹配 → 子节点全部保留
  let parent = node.parent
  while (parent) {
    const parentLabel = parent.data?.[labelKey]
    if (parentLabel && parentLabel.includes(value)) return true
    parent = parent.parent
  }
  return false
}

/**
 * 处理搜索输入
 */
function handleSearch(val: string) {
  // 保存当前展开的节点
  const expandedKeys = getExpandedNodeKeys()
  treeRef.value?.filter(val)
  // 过滤后恢复展开状态
  nextTick(() => {
    restoreExpandState(expandedKeys)
    if (val === '') {
      selectAll.value = false
    }
  })
}

/**
 * 获取当前所有展开节点的 key
 */
function getExpandedNodeKeys() {
  const keys = new Set<any>()
  const traverse = (nodes: any[]) => {
    if (!nodes) return
    for (const node of nodes) {
      if (node.expanded && node.data?.id !== undefined) {
        keys.add(node.data.id)
      }
      if (node.childNodes?.length) {
        traverse(node.childNodes)
      }
    }
  }
  traverse(treeRef.value?.store?.root?.childNodes)
  return keys
}

/**
 * 恢复节点展开状态
 */
function restoreExpandState(expandedKeys: Set<any>) {
  const traverse = (nodes: any[]) => {
    if (!nodes) return
    for (const node of nodes) {
      if (node.childNodes?.length) {
        node.expanded = expandedKeys.has(node.data?.id)
        traverse(node.childNodes)
      }
    }
  }
  traverse(treeRef.value?.store?.root?.childNodes)
}

/**
 * 递归获取当前可见的节点ID列表
 */
function calcVisibleIds(list: Array<any>, keyword: string) {
  const ids = [] as any[]
  if (!list?.length || !keyword) return ids
  const labelKey = attrs.value.props?.label || 'label'
  const childrenKey = attrs.value.props?.children || 'children'
  for (const item of list) {
    const children = item[childrenKey] || []
    const childVisibleIds = calcVisibleIds(children, keyword)
    const isMatch = item[labelKey] && item[labelKey].includes(keyword)
    const isChecked = currentValue.value?.includes(item.id)
    if (isMatch || isChecked || childVisibleIds.length > 0) {
      ids.push(item.id)
      ids.push(...childVisibleIds)
    }
  }
  return ids
}

/**
 * 递归获取id
 */
function getLoopIds(list: Array<any>) {
  const tempIds = [] as any[]
  if (list?.length) {
    list.map((item) => {
      if (item[attrs.value.props.children || 'children']?.length) {
        tempIds.push(...getLoopIds(item[attrs.value.props.children || 'children']))
      }
      tempIds.push(item.id)
    })
  }
  return tempIds
}

watch(
  () => props.desc.options,
  async (data: any) => {
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
    setTimeout(() => {
      // 如果是复选,这里重新获取下所有IDs
      if (attrs.value.showCheckbox && !attrs.value.noSelectAll) {
        allIds.value = getLoopIds(options)
        if (!isSelectAllAction) {
          selectAll.value = allIds.value.length === currentValue.value?.length
        }
      }
    }, 20)
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (val: any) => {
    if (!treeRef.value?.setCheckedKeys) return
    const checkedKeys = treeRef.value.getCheckedKeys(!(props.desc.isPId ?? true))
    // 只有值确实不同时才更新，避免与 handelCheckChange 形成循环
    if (!isEqual(val || [], checkedKeys)) {
      treeRef.value.setCheckedKeys(val || [])
    }
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
    display: flex;
    align-items: center;
    gap: 12px;
    .tree-search-input {
      max-width: 300px;
      flex: 1;
      // 覆盖 el-form 校验失败时的红框样式
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset !important;
      }
      :deep(.el-input__wrapper:hover) {
        box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset !important;
      }
    }
  }
}
</style>
