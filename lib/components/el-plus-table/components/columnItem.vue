<template>
  <div class="el-plus-table-column-item" :class="[desc.inline ? 'el-plus-table-column-row' : 'el-plus-table-column-column']">
    <template v-for="(item, i) in cells" :key="i + (item.options && item.options.length > 0 ? item.options[0].value || item.options[0].v : '0')">
      <el-popover v-if="desc.content && popoverContent" placement="left" :width="200" trigger="hover" effect="dark" :content="popoverContent">
        <template #reference>
          <el-icon style="color: #f56c6c; font-size: 26px; padding: 0px 8px 0 0"><WarningFilled /></el-icon>
        </template>
      </el-popover>
      <div style="width: 100%; display: flex" :style="{ 'justify-content': item.align || 'flex-start' }">
        <component v-if="item.vshow === undefined || item.vshow" v-bind="item" :isTable="true" :formData="props.scope?.row" :size="item.size || size" :rowIndex="rowIndex" v-model="props.scope.row[item.field]" :is="'el-plus-form-' + item.desc.type"> </component>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { WarningFilled } from '@element-plus/icons-vue'
import { IColumnItem } from '../../../../types'

const props = defineProps<{
  modelValue?: any
  field?: string | ((data?: any) => string)
  desc: IColumnItem
  scope: { [key: string]: any }
  size?: string
}>()

const rowIndex = ref(props.scope?.$index || 0)
const cells = computed(() => {
  const _cells = [] as any

  // 如果是合并行，并且数据中存在isSumRow，则表示合计行，取消操作按钮
  if (props.desc.label === '操作' && props.scope?.row?.isSumRow) return []

  // 判断有没有nodes
  if (props.desc.nodes) {
    props.desc.nodes.map((item, i) => {
      _cells.push(handelItem(item.field || props.field, item, i))
    })
  } else {
    const tempField = (typeof props.field === 'function' ? props.field() : props.field) || ''
    const porpList = tempField.split(',')
    porpList.map((item, i) => {
      _cells.push(handelItem(item, props.desc, i))
    })
  }
  // 处理下没有prop的属性
  if (_cells.length <= 0) {
    _cells.push(handelItem('', props.desc, 0))
  }
  return _cells
})

// 鼠标悬浮
const popoverContent = computed(() => {
  if (typeof props.desc.content === 'function') {
    // 如果有方法类型的判断，则需要启用动态监测
    return props.desc.content(props.modelValue, props.scope?.row, props.field)
  } else {
    return props.desc.content || ''
  }
})

const handelItem = (prop: string, item: any, i: number) => {
  const tempCell = {
    field: prop,
    desc: {
      prop: prop,
      default: '',
      size: item.size || props.size || 'default'
    }
  } as any
  Object.assign(tempCell.desc, item)
  if (item.type === 'btn') {
    tempCell.desc.btnType = item.btnType || 'primary'
    tempCell.desc.btnLabel = item.btnLabel || item.label
    tempCell.desc.plain = item.plain || true
    tempCell.desc.text = true
  }
  if (item.type) {
    if (item.type === 'text') {
      tempCell.desc.default = item.default || '-'
    }
    if (item.type === 'tag') {
      // tempCell.size = tempCell.size || 'default'
    } else {
      // tempCell.size = tempCell.size || size || 'default';
    }
    if (typeof item.type === 'string') {
      tempCell.desc.type = item.type
    } else {
      tempCell.desc.type = item.type[i] || item.type[0]
    }
    if (item.format) {
      if (typeof item.format === 'string' || typeof item.format === 'function') {
        tempCell.desc.format = item.format
      } else {
        tempCell.desc.format = item.format[i] === null ? null : item.format[i] || item.format[0]
      }
    }
    if (item.title) {
      if (typeof item.title === 'string') {
        tempCell.desc.title = item.title
      } else {
        tempCell.desc.title = item.title[i] || item.title[0]
      }
    }
  } else {
    tempCell.desc.type = 'text'
  }
  if (item.elType) {
    tempCell.desc.elType = item.elType
  }
  if (item.linkType) {
    tempCell.desc.linkType = item.linkType
  }
  if (item.linkId) {
    tempCell.desc.linkId = item.linkId
  }
  if (item.color) {
    tempCell.desc.style = item.style || {}

    if (typeof item.color === 'function') {
      const tempField = (typeof props.field === 'function' ? props.field() : props.field) || ''
      tempCell.desc.style.color = item.color(props.scope?.row[tempField], props.scope?.row, props.field)
    } else if (typeof item.color === 'string') {
      tempCell.desc.style.color = item.color
    } else {
      tempCell.desc.style.color = item.color[i] === null ? null : item.color[i] || item.color[0]
    }
  }
  if (item.on) {
    if (Object.prototype.toString.call(item.on) === '[object Array]') {
      tempCell.desc.on = item.on[i] === null ? null : item.on[i] || item.on[0]
    } else {
      tempCell.desc.on = item.on
    }
  }
  if (item.disabled) {
    tempCell.disabled = true
  }
  // 处理下options
  if (typeof item.options === 'function') {
    tempCell.desc.options = item.options(props.scope)
  }

  // 处理下vif
  tempCell.vshow = handelColumnVIf(item)

  // 处理下attrs
  if (item.attrs) {
    if (typeof item.attrs === 'function') {
      tempCell.desc = { ...tempCell.desc, ...item.attrs(props.scope?.row) }
      // tempCell.desc.attrs = item.attrs(props.scope?.row)
    } else {
      tempCell.desc = { ...tempCell.desc, ...item.attrs }
      // tempCell.desc.attrs = item.attrs
    }
  }
  tempCell.align = item.align
  tempCell.desc._label = item.label

  // 处理attrs
  return tempCell
}

const handelColumnVIf = (item: any) => {
  if (item.vshow !== undefined && item.vshow !== null && item.vshow !== '') {
    if (typeof item.vshow === 'boolean') return item.vshow
    if (typeof item.vshow === 'function') return item.vshow(props.scope?.row)
    return !!item.vshow
  }
  return true
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
.el-plus-table-column-item {
  width: 100%;
  display: flex;
  :deep(.ele-form-text) {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  :deep(.ele-form-image) {
    margin-bottom: 0;
    .el-image {
      margin-left: 0;
      margin-bottom: 0;
    }
  }
}

.el-plus-table-column-row {
  flex-direction: row;

  & > div {
    margin-right: 10px;

    &:last-child {
      margin: 0;
    }
  }
}

.el-plus-table-column-column {
  flex-direction: row;

  & > div {
    margin-bottom: 10px;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
