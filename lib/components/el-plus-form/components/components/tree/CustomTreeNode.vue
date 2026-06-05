<template>
  <div class="custom-tree-node-list">
    <div v-for="(node, idx) in nodes" :key="`${treeState.getNodeIdStr(node)}-${depth}-${idx}`" v-show="treeState.isNodeVisible(node)" class="custom-tree-node">
      <!-- 节点行：展开图标 + 复选框 + 标签 -->
      <div class="node-row" :style="{ paddingLeft: depth * 20 + 'px' }">
        <!-- 展开图标 -->
        <span v-if="treeState.nodeHasChildren(node)" class="expand-icon" :class="{ 'is-expanded': treeState.isNodeExpanded(node) }" @click.stop="handleExpand(node)">
          <el-icon><ArrowRight /></el-icon>
        </span>
        <!-- 无子节点时占位 -->
        <span v-else class="expand-placeholder" />

        <!-- 复选框 -->
        <el-checkbox v-if="treeState.config.showCheckbox" :model-value="treeState.isNodeChecked(node)" :indeterminate="treeState.isNodeIndeterminate(node)" :disabled="treeState.isNodeDisabled(node)" @change="(val: any) => handleCheck(node, !!val)" />

        <!-- 节点标签 -->
        <span class="node-label" :title="node[treeState.config.labelKey]">
          {{ node[treeState.config.labelKey] }}
        </span>
      </div>

      <!-- 递归子节点 -->
      <div v-if="treeState.nodeHasChildren(node) && treeState.isNodeExpanded(node)" class="node-children">
        <CustomTreeNode :nodes="node[treeState.config.childrenKey]" :depth="depth + 1" :tree-state="treeState" :on-node-check="onNodeCheck" :on-node-expand="onNodeExpand" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CustomTreeNode'
}
</script>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{
  /** 同级节点数组 */
  nodes: any[]
  /** 嵌套层级（0=根），用于缩进 */
  depth: number
  /** 树状态对象（包含所有查询和操作方法） */
  treeState: any
  /** 节点选中回调 */
  onNodeCheck: (node: any, checked: boolean) => void
  /** 节点展开/收起回调 */
  onNodeExpand: (node: any) => void
}>()

/** 处理复选框变化 */
function handleCheck(node: any, checked: boolean) {
  props.onNodeCheck(node, checked)
}

/** 处理展开/收起 */
function handleExpand(node: any) {
  props.treeState.toggleExpand(node)
  props.onNodeExpand(node)
}
</script>

<style lang="scss" scoped>
.custom-tree-node-list {
  width: 100%;
}

.custom-tree-node {
  .node-row {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    gap: 4px;
    cursor: default;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  .expand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s;
    flex-shrink: 0;
    color: var(--el-text-color-placeholder);

    &.is-expanded {
      transform: rotate(90deg);
    }
  }

  .expand-placeholder {
    display: inline-block;
    width: 20px;
    flex-shrink: 0;
  }

  .node-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .node-children {
    width: 100%;
  }

  // 覆盖 el-checkbox 的间距
  :deep(.el-checkbox) {
    margin-right: 4px;
    height: auto;

    .el-checkbox__label {
      display: none;
    }
  }
}
</style>
