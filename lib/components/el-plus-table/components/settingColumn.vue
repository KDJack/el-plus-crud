<template>
  <div class="el-plus-table-edit-column">
    <el-button v-if="showText" type="primary" @click="showSettingDialog" :size="size" plain>编辑显示列</el-button>
    <el-button v-else type="primary" icon="ele-Setting" @click="showSettingDialog" :size="size" title="编辑显示列" plain circle />

    <!-- 编辑列 -->
    <el-dialog title="编辑显示列" v-model="showSettingColumn" draggable width="40%">
      <template #default>
        <el-tree ref="treeRef" :data="options" show-checkbox node-key="idx" :default-expand-all="true" :default-checked-keys="checkColumn" :props="defaultProps" @check="handelCheckChange" />
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button :size="size" @click="handelCancel"> 取 消 </el-button>
          <el-button :size="size" type="primary" @click="changeColumnData"> 确 定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ICRUDConfig, IColumnItem } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  column: Array<IColumnItem>
  tbName: string
  size: string
  showText?: boolean
}>()

// 弹框显示
const showSettingColumn = ref(false)
const treeRef = ref()

let options = ref([])

const treeAll = ref([] as Array<String>)
const checkColumn = ref([] as Array<String>)
// 定义一个需要隐藏的列表-存储到本地用
let tempList = ref([] as Array<String>)

const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabledcheckd'
}

/**
 * 匹配序号并获取全部序号
 */

function addIndex(item: any, index?: string) {
  item.map((i: any, idx: number) => {
    // 匹配序号
    i.idx = index !== undefined ? `${index}-${idx}` : `${idx}`
    // 禁用判断
    if (i.required || i.noHide || i.disabled) {
      i.disabledcheckd = true
      tempList.value.splice(tempList.value.indexOf(i.idx), 1)
    }
    // 如果子集全部禁用，那么父级也禁用 ,如果父集禁用，那么子级也禁用
    i.children && i.children.every((info: any) => info.disabled) ? (i.disabled = true) : i.children && i.disabled ? i.children.map((info: any) => (info.disabled = true)) : ''
    // 是否有子集
    if (i.children?.length > 0) {
      addIndex(i.children, `${i.idx}`)
    }
    i.children ? '' : treeAll.value.push(i.idx)
  })
  return item
}

/**
 * 打开弹框
 */
function showSettingDialog() {
  showSettingColumn.value = true
}

/**
 * 获取没有选中的选项
 */
function handelCheckChange(val: any, data: any) {
  data.checkedAllKeys = Array.from(new Set([...data.checkedKeys, ...data.halfCheckedKeys]))
  tempList.value = treeAll.value.filter((x) => {
    return data.checkedAllKeys.indexOf(x) < 0
  })
}

// 设置是否显示
function setShow(item: any) {
  for (let index = 0; index < item.length; index++) {
    if (item[index].children) {
      setShow(item[index].children)
    }
    if (tempList.value.indexOf(item[index].idx) < 0) {
      item[index].scShow = true
    } else {
      item[index].scShow = false
    }
  }
}

function changeColumnData() {
  if (treeAll.value.length === tempList.value.length) {
    ElMessage.warning('请至少选择一列！')
    return false
  }
  setShow(props.column)
  if (tempList.value.length > 0) {
    localStorage.setItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName, tempList.value.join('__'))
  } else {
    localStorage.removeItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName)
  }
  showSettingColumn.value = false
}

/**
 * 初始化选择列
 * @param init
 */
function initLocalCheckList() {
  // 从本地获取处理过的字段一级顺序
  const tempLocalStr = localStorage.getItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName) as String
  // 判断为空
  if (tempLocalStr !== undefined && tempLocalStr !== null && tempLocalStr.length > 0) {
    // 用两个下划线拆分
    tempList.value = tempLocalStr.split('__')
  }
  options.value = addIndex(props.column)

  setShow(props.column)
  // 过滤出隐藏的节点
  checkColumn.value = treeAll.value.filter((x) => {
    return tempList.value.indexOf(x) < 0
  })
}

/**
 * 取消
 */
function handelCancel() {
  // 还原
  treeRef.value.setCheckedKeys(checkColumn.value)

  showSettingColumn.value = false
}

onMounted(() => {
  if (props.tbName) {
    initLocalCheckList()
  }
})

defineExpose({ initCol: initLocalCheckList })
</script>
<style lang="scss" scoped>
.el-plus-table-edit-column {
  margin: 0 10px;
  display: inline-block;

  .select-panel {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
}
</style>
