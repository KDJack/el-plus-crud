<template>
  <div class="el-plus-form-tree">
    <!-- 工具栏：全选 + 级联开关 + 搜索 -->
    <div class="btns" v-if="(attrs.showCheckbox && !attrs.noSelectAll) || attrs.showCascadeSwitch || attrs.enableSearch">
      <el-checkbox v-if="attrs.showCheckbox && !attrs.noSelectAll" :model-value="treeState.selectAll" :indeterminate="treeState.selectAllIndeterminate" @change="(val: any) => (treeState.selectAll = !!val)" label="全部勾选" border />
      <el-switch v-if="attrs.showCascadeSwitch" :model-value="treeState.cascadeMode" @change="(val: boolean) => (treeState.cascadeMode = val)" active-text="级联" inactive-text="独立" inline-prompt />
      <el-input v-if="attrs.enableSearch" :model-value="treeState.searchText" @update:model-value="handleSearchInput" @keydown.enter.prevent placeholder="输入关键字筛选" :validate-event="false" clearable class="tree-search-input" />
    </div>

    <!-- 自定义递归树（isInit 确保配置加载完成后再渲染） -->
    <div class="custom-tree" v-if="isInit && options.length" :style="{ maxHeight: getHeight || '400px' }">
      <CustomTreeNode :nodes="options" :depth="0" :tree-state="treeState" :on-node-check="handleNodeCheck" :on-node-expand="handleNodeExpand" />
    </div>
    <div v-else-if="isInit" class="null-tip">暂无选项</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElPlusFormTree',
  inheritAttrs: false,
  typeName: 'tree',
  customOptions: {}
}

// ========== 树组件配置接口 ==========

interface TreeConfig {
  idKey: string
  labelKey: string
  childrenKey: string
  checkStrictly: boolean
  showCheckbox: boolean
  maxCount: number
  fsIds: string[]
  nsIds: string[]
  isPId: boolean
  expandAll: boolean
  accordion: boolean
  disabled: boolean
}

// ========== 内部辅助函数 ==========

function getNodeId(node: any, cfg: TreeConfig): string {
  return String(node[cfg.idKey] ?? '')
}

function getChildren(node: any, cfg: TreeConfig): any[] {
  return node[cfg.childrenKey] || []
}

function hasChildren(node: any, cfg: TreeConfig): boolean {
  return getChildren(node, cfg).length > 0
}

function isForceControlled(node: any, cfg: TreeConfig): boolean {
  const id = getNodeId(node, cfg)
  return cfg.fsIds.includes(id) || cfg.nsIds.includes(id)
}

function initNodeState(nodes: any[], cfg: TreeConfig, expandAll: boolean): void {
  for (const node of nodes) {
    if (node._checked === undefined) node._checked = false
    if (node._expanded === undefined) node._expanded = expandAll
    if (node._indeterminate === undefined) node._indeterminate = false
    if (node._visible === undefined) node._visible = true
    const children = getChildren(node, cfg)
    if (children.length) initNodeState(children, cfg, expandAll)
  }
}

function syncIdInTree(nodes: any[], targetId: string, checked: boolean, cfg: TreeConfig): void {
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) syncIdInTree(children, targetId, checked, cfg)
    if (!children.length && getNodeId(node, cfg) === targetId && !isForceControlled(node, cfg)) {
      node._checked = checked
    }
  }
}

function cascadeSelect(node: any, checked: boolean, checkedIds: Set<string>, cfg: TreeConfig): void {
  const children = getChildren(node, cfg)
  if (!children.length) return
  for (const child of children) {
    if (hasChildren(child, cfg)) {
      cascadeSelect(child, checked, checkedIds, cfg)
    } else if (!isForceControlled(child, cfg)) {
      if (checked) {
        if (checkedIds.has(getNodeId(child, cfg)) || checkedIds.size < cfg.maxCount) {
          child._checked = true
          checkedIds.add(getNodeId(child, cfg))
        }
      } else {
        child._checked = false
      }
    }
  }
}

function recalcAllParents(nodes: any[], cfg: TreeConfig): void {
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) {
      recalcAllParents(children, cfg)
      const actionable = children.filter((c: any) => !isForceControlled(c, cfg))
      if (actionable.length === 0) {
        node._checked = false
        node._indeterminate = false
      } else {
        const allChecked = actionable.every((c: any) => c._checked)
        const someChecked = actionable.some((c: any) => c._checked || c._indeterminate)
        node._checked = allChecked
        node._indeterminate = !allChecked && someChecked
      }
    }
  }
}

function recalcIndeterminateOnly(nodes: any[], cfg: TreeConfig): void {
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) {
      recalcIndeterminateOnly(children, cfg)
      const actionable = children.filter((c: any) => !isForceControlled(c, cfg))
      if (actionable.length === 0) {
        node._indeterminate = false
      } else {
        const someChecked = actionable.some((c: any) => c._checked || c._indeterminate)
        node._indeterminate = !node._checked && someChecked
      }
    }
  }
}

function computeVisibility(nodes: any[], keyword: string, cfg: TreeConfig): boolean {
  let hasVisible = false
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) {
      const childVisible = computeVisibility(children, keyword, cfg)
      const selfMatch = !keyword || (node[cfg.labelKey] && node[cfg.labelKey].includes(keyword))
      node._visible = childVisible || selfMatch
      if (node._visible) {
        hasVisible = true
        if (keyword && childVisible) node._expanded = true
      }
    } else {
      const isChecked = !!node._checked
      const labelMatch = !keyword || (node[cfg.labelKey] && node[cfg.labelKey].includes(keyword))
      node._visible = isChecked || labelMatch
      if (node._visible) hasVisible = true
    }
  }
  return hasVisible
}

function resetVisibility(nodes: any[], cfg: TreeConfig): void {
  for (const node of nodes) {
    node._visible = true
    const children = getChildren(node, cfg)
    if (children.length) resetVisibility(children, cfg)
  }
}

function collectCheckedLeafIds(nodes: any[], cfg: TreeConfig): string[] {
  const ids = new Set<string>()
  function walk(ns: any[]) {
    for (const node of ns) {
      const children = getChildren(node, cfg)
      if (children.length) walk(children)
      else if (node._checked) ids.add(getNodeId(node, cfg))
    }
  }
  walk(nodes)
  return [...ids]
}

function collectAllCheckedIds(nodes: any[], cfg: TreeConfig): string[] {
  const ids = new Set<string>()
  function walk(ns: any[]) {
    for (const node of ns) {
      if (node._checked) ids.add(getNodeId(node, cfg))
      const children = getChildren(node, cfg)
      if (children.length) walk(children)
    }
  }
  walk(nodes)
  return [...ids]
}

function collectAllLeafIds(nodes: any[], cfg: TreeConfig): string[] {
  const ids: string[] = []
  function walk(ns: any[]) {
    for (const node of ns) {
      const children = getChildren(node, cfg)
      if (children.length) walk(children)
      else ids.push(getNodeId(node, cfg))
    }
  }
  walk(nodes)
  return ids
}

function collectVisibleLeafIds(nodes: any[], cfg: TreeConfig): string[] {
  const ids: string[] = []
  function walk(ns: any[]) {
    for (const node of ns) {
      if (node._visible === false) continue
      const children = getChildren(node, cfg)
      if (children.length) walk(children)
      else ids.push(getNodeId(node, cfg))
    }
  }
  walk(nodes)
  return ids
}

function setNodesByIdSet(nodes: any[], idSet: Set<string>, cfg: TreeConfig): void {
  for (const node of nodes) {
    const id = getNodeId(node, cfg)
    if (idSet.has(id) && !isForceControlled(node, cfg)) node._checked = true
    const children = getChildren(node, cfg)
    if (children.length) setNodesByIdSet(children, idSet, cfg)
  }
}

function clearAllChecked(nodes: any[], cfg: TreeConfig): void {
  for (const node of nodes) {
    node._checked = false
    node._indeterminate = false
    const children = getChildren(node, cfg)
    if (children.length) clearAllChecked(children, cfg)
  }
}

function batchSyncChecked(nodes: any[], checkedIds: Set<string>, cfg: TreeConfig): void {
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) batchSyncChecked(children, checkedIds, cfg)
    else if (checkedIds.has(getNodeId(node, cfg)) && !isForceControlled(node, cfg)) node._checked = true
  }
}

function batchUncheckByIds(nodes: any[], uncheckIds: Set<string>, cfg: TreeConfig): void {
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.length) batchUncheckByIds(children, uncheckIds, cfg)
    else if (uncheckIds.has(getNodeId(node, cfg)) && !isForceControlled(node, cfg)) node._checked = false
  }
}

function collapseSiblings(nodes: any[], targetNode: any, cfg: TreeConfig): void {
  const targetId = getNodeId(targetNode, cfg)
  for (const node of nodes) {
    const children = getChildren(node, cfg)
    if (children.some((c: any) => getNodeId(c, cfg) === targetId)) {
      for (const child of children) {
        if (getNodeId(child, cfg) !== targetId) child._expanded = false
      }
      return
    }
    if (children.length) collapseSiblings(children, targetNode, cfg)
  }
}

function enforceForceIds(options: any[], cfg: TreeConfig): void {
  for (const id of cfg.fsIds) syncIdInTree(options, id, true, cfg)
  for (const id of cfg.nsIds) syncIdInTree(options, id, false, cfg)
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, triggerRef, watch, useAttrs, onBeforeMount, onUnmounted, inject, nextTick } from 'vue'
import { isEqual } from '../../../util'
import { getAttrs, getEvents } from '../mixins'
import { useVModel } from '@vueuse/core'
import CustomTreeNode from './components/tree/CustomTreeNode.vue'

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

const options = ref([] as any[])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const getHeight = computed(() => {
  if (props.desc?.height) {
    if (typeof props.desc.height == 'function') {
      return props.desc.height()
    } else {
      return props.desc?.height
    }
  }
  return '400px'
})

// ========== 树状态 ==========

const treeConfig = ref(null as TreeConfig | null)
const lastRawOptions = ref<any>(null) // 记录上次原始数据，用于精确比较避免误重置展开状态

// 响应式状态
const searchText = ref('')
const cascadeMode = ref(true)
const checkedLeafCount = ref(0)
const checkedLeafIdSet = ref(new Set<string>())
const actionableLeafIds = ref<string[]>([])

/** 获取当前配置（确保已初始化） */
function cfg(): TreeConfig {
  return treeConfig.value!
}

/** 刷新缓存并触发 UI 更新 */
function refreshCache(): void {
  const c = cfg()
  const checked = collectCheckedLeafIds(options.value, c)
  checkedLeafCount.value = checked.length
  checkedLeafIdSet.value = new Set(checked)
  const leafIds = searchText.value ? collectVisibleLeafIds(options.value, c) : collectAllLeafIds(options.value, c)
  actionableLeafIds.value = leafIds.filter((id) => !c.fsIds.includes(id) && !c.nsIds.includes(id))
  triggerRef(options)
}

// 节点状态查询
function isNodeChecked(node: any): boolean {
  return !!node._checked
}
function isNodeIndeterminate(node: any): boolean {
  return !!node._indeterminate
}
function isNodeDisabled(node: any): boolean {
  const c = cfg()
  if (c.disabled) return true
  if (isForceControlled(node, c)) return true
  if (!hasChildren(node, c) && !node._checked && c.maxCount < Infinity) {
    return checkedLeafCount.value >= c.maxCount
  }
  return false
}
function isNodeVisible(node: any): boolean {
  return node._visible !== false
}
function isNodeExpanded(node: any): boolean {
  return !!node._expanded
}
function nodeHasChildren(node: any): boolean {
  return hasChildren(node, cfg())
}
function getNodeIdStr(node: any): string {
  return getNodeId(node, cfg())
}

// 操作方法
function toggleCheck(node: any, checked: boolean): boolean {
  const c = cfg()
  const id = getNodeId(node, c)
  const isLeaf = !hasChildren(node, c)
  if (isLeaf) {
    if (checked && c.maxCount < Infinity && checkedLeafCount.value >= c.maxCount) return false
    syncIdInTree(options.value, id, checked, c)
  } else {
    if (cascadeMode.value) {
      const currentChecked = new Set(collectCheckedLeafIds(options.value, c))
      cascadeSelect(node, checked, currentChecked, c)
      const newCheckedIds = new Set(collectCheckedLeafIds(options.value, c))
      batchSyncChecked(options.value, newCheckedIds, c)
    } else {
      if (!isForceControlled(node, c)) node._checked = checked
    }
  }
  if (cascadeMode.value) recalcAllParents(options.value, c)
  else recalcIndeterminateOnly(options.value, c)
  refreshCache()
  return true
}

function toggleExpand(node: any): void {
  const c = cfg()
  node._expanded = !node._expanded
  if (c.accordion && node._expanded) collapseSiblings(options.value, node, c)
  triggerRef(options)
}

function toggleSelectAll(checked: boolean): void {
  const c = cfg()
  const targetIds = searchText.value ? collectVisibleLeafIds(options.value, c) : collectAllLeafIds(options.value, c)
  const actionableIds = targetIds.filter((id) => !c.fsIds.includes(id) && !c.nsIds.includes(id))
  if (checked) {
    const currentChecked = new Set(collectCheckedLeafIds(options.value, c))
    for (const id of actionableIds) {
      if (c.maxCount < Infinity && currentChecked.size >= c.maxCount) break
      currentChecked.add(id)
    }
    batchSyncChecked(options.value, currentChecked, c)
  } else {
    batchUncheckByIds(options.value, new Set(actionableIds), c)
  }
  enforceForceIds(options.value, c)
  if (cascadeMode.value) recalcAllParents(options.value, c)
  else recalcIndeterminateOnly(options.value, c)
  refreshCache()
}

function handleSearchFilter(val: string): void {
  const c = cfg()
  if (val) computeVisibility(options.value, val, c)
  else resetVisibility(options.value, c)
  refreshCache()
}

function syncFromModelValue(ids: string[]): void {
  const c = cfg()
  const newIdSet = new Set(ids || [])
  clearAllChecked(options.value, c)
  if (cascadeMode.value) {
    for (const id of newIdSet) syncIdInTree(options.value, id, true, c)
    enforceForceIds(options.value, c)
    recalcAllParents(options.value, c)
  } else {
    setNodesByIdSet(options.value, newIdSet, c)
    enforceForceIds(options.value, c)
    recalcIndeterminateOnly(options.value, c)
  }
  refreshCache()
  if (searchText.value) computeVisibility(options.value, searchText.value, c)
}

function getCheckedIds(): string[] {
  const c = cfg()
  if (c.isPId) return collectAllCheckedIds(options.value, c)
  return collectCheckedLeafIds(options.value, c)
}

function doOptionsChanged(newOptions: any[]): void {
  const c = cfg()
  const cloned = lodash.cloneDeep(newOptions)
  options.value = cloned
  initNodeState(options.value, c, c.expandAll)
  enforceForceIds(options.value, c)
  recalcAllParents(options.value, c)
  refreshCache()
  if (searchText.value) computeVisibility(options.value, searchText.value, c)
}

function initOptions(): void {
  const c = cfg()
  initNodeState(options.value, c, c.expandAll)
  enforceForceIds(options.value, c)
  recalcAllParents(options.value, c)
  refreshCache()
}

// 计算属性
const selectAll = computed({
  get() {
    const actionable = actionableLeafIds.value
    if (!actionable.length) return false
    return actionable.every((id) => checkedLeafIdSet.value.has(id))
  },
  set(val: boolean) {
    toggleSelectAll(val)
    // 同步 v-model 值并触发表单校验
    currentValue.value = getCheckedIds()
    nextTick(() => {
      emits('validateThis')
    })
  }
})

const selectAllIndeterminate = computed(() => {
  const actionable = actionableLeafIds.value
  if (!actionable.length) return false
  const cnt = actionable.filter((id) => checkedLeafIdSet.value.has(id)).length
  return cnt > 0 && cnt < actionable.length
})

/** 暴露给子组件的树状态对象 */
const treeState = reactive({
  config: {} as TreeConfig,
  searchText,
  cascadeMode,
  selectAll,
  selectAllIndeterminate,
  isNodeChecked,
  isNodeIndeterminate,
  isNodeDisabled,
  isNodeVisible,
  isNodeExpanded,
  nodeHasChildren,
  getNodeIdStr,
  toggleCheck,
  toggleExpand
})

// ========== 生命周期 ==========

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, {
    checkStrictly: false,
    showCheckbox: true,
    accordion: false,
    noSelectAll: false,
    enableSearch: false,
    showCascadeSwitch: false,
    props: { label: 'label', children: 'children' },
    ...useAttrs()
  })

  const config: TreeConfig = {
    idKey: attrs.value.props?.idKey || attrs.value.nodeKey || 'id',
    labelKey: attrs.value.props?.label || 'label',
    childrenKey: attrs.value.props?.children || 'children',
    checkStrictly: attrs.value.checkStrictly ?? false,
    showCheckbox: attrs.value.showCheckbox ?? true,
    maxCount: attrs.value.maxCount ?? Infinity,
    fsIds: (attrs.value.fsIds || []).map(String),
    nsIds: (attrs.value.nsIds || []).map(String),
    isPId: props.desc.isPId ?? true,
    expandAll: attrs.value.expandAll ?? attrs.value.defaultExpandAll ?? false,
    accordion: attrs.value.accordion ?? false,
    disabled: props.disabled ?? false
  }

  treeConfig.value = config
  cascadeMode.value = !config.checkStrictly
  treeState.config = config

  if (options.value.length) {
    initOptions()
    if (currentValue.value?.length) syncFromModelValue(currentValue.value)
  }
  isInit.value = true
})

// 监听级联/严格模式切换
watch(cascadeMode, () => {
  if (!treeConfig.value) return
  if (cascadeMode.value) recalcAllParents(options.value, cfg())
  else recalcIndeterminateOnly(options.value, cfg())
  refreshCache()
})

/** 搜索输入：立即更新文本，debounce 延迟计算可见性 */
const debouncedSearch = lodash.debounce(function (val: string) {
  handleSearchFilter(val)
}, 200)

function handleSearchInput(val: string) {
  searchText.value = val
  debouncedSearch(val)
}

onUnmounted(() => {
  debouncedSearch.cancel()
})

/** 节点选中回调 */
function handleNodeCheck(node: any, checked: boolean) {
  const changed = toggleCheck(node, checked)
  if (changed) {
    currentValue.value = getCheckedIds()
    nextTick(() => {
      emits('validateThis')
      if (onEvents.value['check-change']) onEvents.value['check-change'](node, checked)
    })
  }
}

/** 节点展开/收起回调 */
function handleNodeExpand(node: any) {
  nextTick(() => {
    const isExpanded = isNodeExpanded(node)
    const eventName = isExpanded ? 'node-expand' : 'node-collapse'
    if (onEvents.value[eventName]) onEvents.value[eventName](node)
  })
}

// 监听选项数据变化
watch(
  () => props.desc.options,
  async (data: any) => {
    if (typeof data === 'string') {
      options.value = globalData[data] || []
    } else if (typeof data === 'function') {
      options.value = await data(props.formData || {})
    } else if (Array.isArray(data)) {
      if (isEqual(data, lastRawOptions.value)) return
      lastRawOptions.value = lodash.cloneDeep(data)
      options.value = [...data]
    } else {
      options.value = []
    }
    if (treeConfig.value) {
      doOptionsChanged(options.value)
      if (currentValue.value?.length) syncFromModelValue(currentValue.value)
    }
  },
  { immediate: true }
)

// 监听外部 v-model 变化
watch(
  () => props.modelValue,
  (val: any) => {
    if (!treeConfig.value) return
    const currentChecked = getCheckedIds()
    if (!isEqual(val || [], currentChecked)) syncFromModelValue(val || [])
  }
)

// 监听 disabled 变化
watch(
  () => props.disabled,
  (val) => {
    if (treeConfig.value) {
      treeConfig.value.disabled = val ?? false
      triggerRef(options)
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
    flex-wrap: wrap;

    .tree-search-input {
      max-width: 300px;
      flex: 1;
      min-width: 120px;

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset !important;
      }
      :deep(.el-input__wrapper:hover) {
        box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset !important;
      }
    }
  }

  .custom-tree {
    flex: 1;
    overflow: auto;
    // max-height: 400px;
    border: 1px solid var(--el-border-color-lighter, #ebeef5);
    border-radius: 4px;
    padding: 4px 0;
  }

  .null-tip {
    color: var(--el-text-color-placeholder);
    font-size: 14px;
    text-align: center;
    padding: 16px 0;
  }
}
</style>
