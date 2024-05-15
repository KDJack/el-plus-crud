<template>
  <div class="el-plus-form-link">
    <el-select ref="selectRef" style="width: 100%" :class="desc.class" :style="desc.style" v-bind="topAttrs" :disabled="disabled || desc.disabled" :teleported="false" :loading="loading" :modelValue="values" @visible-change="handelVisibleChange" @clear="handelClear" v-on="onEvents">
      <el-option v-for="option in options" :key="option.value" v-bind="option" />
    </el-select>
    <!-- 弹框 -->
    <el-dialog :width="desc.dialogWidth || '1000px'" :title="desc.title || desc.placeholder || '请选择' + desc.label" draggable :closeOnClickModal="false" showCancel v-model="isShowDialog" append-to-body destroy-on-close>
      <div style="width: 100%" class="form-link-dialog">
        <div class="panel-left">
          <!-- 左侧列表 -->
          <ElPlusTable v-if="tableConfig" ref="multipleTableRef" :selectList="selectList" :tableConfig="tableConfig" :type="multiple ? 'selection' : 'index'" :isIndex="false" :rowKey="vkey" @selection="handelTableSelection" />
        </div>
        <div v-if="multiple" class="panel-right">
          <div class="right-title">已选中项：</div>
          <el-scrollbar height="480px" class="tag-list">
            <el-tag class="tag-item" style="margin-right: 10px; margin-bottom: 10px" v-for="tag in selectData" :key="tag.value" closable @close="() => handelTagRemove(tag)">
              {{ tag.label }}
            </el-tag>
          </el-scrollbar>
          <div class="btn-panel">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormLink',
  inheritAttrs: false,
  typeName: 'link',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed, inject } from 'vue'
import { IBtnBack, ITableConfig } from '../../../../types'

const lodash = inject('lodash') as any

interface ILinkItem {
  label: string
  value: string
  dataItem: { [key: string]: any }
}

const props = defineProps<{
  modelValue?: Array<Array<any>>
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const onEvents = ref(props.desc?.on || {})

const emits = defineEmits(['update:modelValue', 'change', 'input', 'validateThis'])

const currentValue = ref(props.modelValue as any[])
emits('update:modelValue', currentValue)

// 顶部的select
const selectRef = ref()
const values = reactive([] as any[])
const options = reactive([] as any[])
const selectList = ref([] as any[])

const topAttrs = reactive({
  multiple: true,
  size: props.desc.size,
  collapseTags: true,
  collapseTagsTooltip: true,
  clearable: false,
  placeholder: props.desc.placeholder || '请选择' + props.desc.label
})

// 显示弹框
const isShowDialog = ref(false)
const tableConfig = ref({} as any)
const vkey = computed(() => (props.desc.vkey as string) || 'id')

const multiple = ref(false)

const multipleTableRef = ref()

// 存储的值
const selectData = reactive([] as ILinkItem[])
// 存储历史选中-取消后要还原
const selectOldData = reactive([] as ILinkItem[])

/**
 * 处理点击事件
 * @param val
 */
function handelVisibleChange(val: any) {
  if (val) {
    selectRef.value.blur()
    isShowDialog.value = true
    selectList.value = lodash.cloneDeep(selectData.map((item) => item.dataItem))
    // 这里存储一下老数据
    selectOldData.splice(0, selectOldData.length, ...selectData)
  }
}

/**
 * 处理清空选项
 */
function handelClear() {
  selectData.splice(0, selectData.length)
  submit()
}

/**
 * 处理列表批量选中
 * @param selection
 */
function handelTableSelection(selection: any[]) {
  // 这里全是新增
  selectData.splice(0, selectData.length)
  selection.map((row) => {
    selectData.push({ label: row[props.desc.lkey || 'name'], value: row[vkey.value], dataItem: row })
  })
}

/**
 * 处理表格操作列单个选中
 * @param btnBack
 */
function handelSignleSelect({ row }: IBtnBack) {
  selectData.splice(0, selectData.length)
  selectData.push({ label: row[props.desc.lkey || 'name'], value: row[vkey.value], dataItem: row })
  // 直接关闭
  submit()
}

/**
 * 处理删除标签
 * @param item
 */
function handelTagRemove(item: ILinkItem) {
  selectData.splice(
    selectData.findIndex((i) => i.value === item.value),
    1
  )
  // 通知table刷新
  multipleTableRef.value.changeSelect([{ [vkey.value]: item.value }])
}

/**
 * 取消按钮
 */
function cancel() {
  isShowDialog.value = false
  // 这里重置一下老数据
  selectData.splice(0, selectData.length, ...selectOldData)
}

/**
 * 确认按钮
 */
function submit() {
  options.splice(0, options.length, ...selectData)
  const tempIds = [] as string[]
  const tempNames = [] as string[]
  values.splice(0, values.length)

  // 遍历数据
  selectData.map((item) => {
    values.push(item.value)
    tempIds.push(item.value)
    tempNames.push(item.label)
  })
  // 设置值
  currentValue.value = selectData.length > 0 ? [tempIds, tempNames] : []

  // 触发外部change事件
  if (onEvents.value.change) {
    onEvents.value.change(lodash.cloneDeep(selectData))
  }

  isShowDialog.value = false
  emits('validateThis')
}

// 表格配置
watch(
  () => props.desc.tableConfig,
  (val) => {
    let tempConfig = {} as ITableConfig
    if (val) {
      tempConfig = lodash.cloneDeep(val)
      if (typeof props.desc.multiple === 'function') {
        multiple.value = props.desc.multiple(props.formData || {})
      } else {
        multiple.value = props.desc.multiple
      }
      // 如果是多选
      if (multiple.value) {
        // TODO
      } else if (!multiple.value && tempConfig.column && tempConfig.column[tempConfig.column.length - 1].label !== '操作') {
        // 如果是单选
        tempConfig.column.push({ label: '操作', width: '120px', fixed: 'right', type: 'btns', btns: [{ label: '选中', on: { click: handelSignleSelect } }] })
      }
      tempConfig.maxHeight = 400
    }
    tableConfig.value = tempConfig
  },
  { deep: true, immediate: true }
)

watch(
  () => props.modelValue,
  () => {
    selectData.splice(0, selectData.length)
    values.splice(0, values.length)
    // 这里默认选中
    if (props.modelValue && Array.isArray(props.modelValue) && Array.isArray(props.modelValue[0])) {
      const [ids, names] = (props.modelValue || [[], []]) as Array<string[]>
      if (ids.length > 0 && ids.length === names.length) {
        ids.map((id, i) => {
          // 构建选中数据
          selectData.push({ label: names[i], value: id, dataItem: { [props.desc.lkey]: names[i], [vkey.value]: id } })
          values.push(id)
        })
      }
    }
    options.splice(0, options.length, ...selectData)
  },
  { deep: true, immediate: true }
)

onMounted(async () => {})
</script>
<style lang="scss" scoped>
.el-plus-form-link {
  width: 100%;

  .items-panel {
    :deep(.el-input__inner) {
      cursor: pointer;
    }
  }

  :deep(.el-tag__close) {
    display: none !important;
  }
}
</style>
<style lang="scss">
.form-link-dialog {
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .panel-left {
    flex: 1;
    min-width: 60%;
    // height: 500px;
    display: flex;
    flex-direction: column;

    .dept-breadcrumb {
      width: 100%;
      padding: 0 10px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }

  .panel-right {
    min-width: 40%;
    max-width: 40%;
    margin-left: 20px;
    border-left: 1px var(--el-border-color) var(--el-border-style);
    padding: 20px;
    display: flex;
    overflow: hidden;
    flex-direction: column;

    .right-title {
      width: 100%;
      font-size: 14px;
      color: #999999;
      margin-bottom: 20px;
    }

    .tag-list {
      width: 100%;
      height: 400px;
      overflow: hidden;
      .tag-item {
        .el-tag__content {
          max-width: 100px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }

    .btn-panel {
      width: 100%;
      min-height: 50px;
      padding-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
