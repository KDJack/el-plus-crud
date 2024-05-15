<template>
  <el-table-column v-if="props.item.__vif" v-bind="columnAttr">
    <template #header="{ column }: any">
      <div :class="{ 'th-required': item.required }" :style="item.hstyle">
        {{ column.label }}
      </div>
    </template>
    <template #default="scope: any">
      <!-- 递归 -->
      <template v-if="item.children?.length">
        <ElPlusTableColumn v-for="(child, i) in item.children" :item="child" :size="size" :key="i"></ElPlusTableColumn>
      </template>
      <template v-else>
        <ColumnItem v-if="scope['$index'] >= 0" :field="item.prop" :desc="item" :scope="scope" :size="size" v-model="scope.row[item.prop as any]" />
      </template>
    </template>
  </el-table-column>
</template>

<script lang="ts">
export default {
  name: 'ElPlusTableColumn',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { IColumnItem } from '../../../types'
import ColumnItem from './components/columnItem.vue'

const lodash = inject('lodash') as any

const props = defineProps<{
  item: IColumnItem
  size: string
}>()

/**
 * 绑定属性
 */
const columnAttr = computed(() => {
  const tempAttr = lodash.cloneDeep(props.item)
  delete tempAttr.children
  return tempAttr
})
</script>
