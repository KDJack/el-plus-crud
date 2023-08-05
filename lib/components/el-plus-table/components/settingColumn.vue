<template>
  <div class="el-plus-table-edit-column">
    <el-button v-if="showText" type="primary" @click="showSettingDialog" :size="size" plain>编辑显示列</el-button>
    <el-button v-else type="primary" icon="ele-Setting" @click="showSettingDialog" :size="size" title="编辑显示列" plain circle />

    <!-- 编辑列 -->
    <el-dialog title="编辑显示列" v-model="showSettingColumn" width="40%">
      <template #default>
        <div class="select-panel">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="selectAll"> 全选 </el-checkbox>
        </div>
        <el-checkbox-group v-model="localColumn" @change="changeSelect" style="padding: 0 10px; flex-wrap: wrap; display: flex">
          <template v-for="item in props.column" :key="item.label">
            <el-checkbox v-if="item._vif" :label="item.label" :disabled="item.required || item.noHide || false">
              {{ item.label }}
            </el-checkbox>
          </template>
        </el-checkbox-group>
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
import { ref, onMounted, inject } from 'vue'
import { ElMessage } from 'element-plus'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  column: Array<IColumnItem>
  tbName: string
  size: string
  showText?: boolean
}>()

const showSettingColumn = ref(false)
const localColumn = ref([] as Array<String>)
const localOldColumn = ref([] as Array<String>)
const isIndeterminate = ref(false)
const checkAll = ref(false)

/**
 * 打开弹框
 */
function showSettingDialog() {
  showSettingColumn.value = true
}

function changeColumnData() {
  if (localColumn.value.length <= 0) {
    ElMessage.warning('请至少选择一列！')
    return false
  }
  // 定义一个需要隐藏的列表-存储到本地用
  const hideList = [] as Array<String>
  props.column.map((item: any) => {
    if (localColumn.value.indexOf(item.label) < 0) {
      hideList.push(item.label)
      item.scShow = false
    } else {
      item.scShow = true
    }
  })
  if (hideList.length > 0) {
    localStorage.setItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName, hideList.join('__'))
  } else {
    // 如果是对象，删除
    localStorage.removeItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName)
  }
  showSettingColumn.value = false
  // 赋值
  localOldColumn.value = localColumn.value
}

/**
 * 全选列
 */
function selectAll() {
  localColumn.value = [] as Array<String>
  if (checkAll.value) {
    localColumn.value = props.column.map((item: any) => item.label)
  } else {
    // 这里要屏蔽掉禁止勾选的项
    localColumn.value = props.column.filter((item) => item.required || item.noHide).map((item: any) => item.label)
  }
  isIndeterminate.value = false
}

/**
 * 复选框改变时触发
 */
function changeSelect() {
  if (localColumn.value.length === 0) {
    isIndeterminate.value = false
    checkAll.value = false
  } else if (props.column.length === localColumn.value.length) {
    isIndeterminate.value = false
    checkAll.value = true
  } else {
    isIndeterminate.value = true
    checkAll.value = false
  }
}

/**
 * 初始化选择列
 * @param init
 */
function initLocalCheckList(init?: Boolean) {
  // 从本地获取处理过的字段一级顺序
  const tempLocalStr = localStorage.getItem(defaultConf.storagePrefix + 'hideColumnsList_' + props.tbName) as String
  let tempList: any[] = []

  // 判断为空
  if (tempLocalStr !== undefined && tempLocalStr !== null && tempLocalStr.length > 0) {
    // 用两个下划线拆分
    tempList = tempLocalStr.split('__')
  }
  props.column.map((item: any) => {
    // 这里初始化一下vif
    if (item.vif !== undefined && item.vif !== null) {
      if (typeof item.vif === 'function') {
        item._vif = item.vif(item)
      } else {
        item._vif = !!item.vif
      }
    } else {
      item._vif = true
    }
    if (tempList.indexOf(item.label) < 0 || item.required || item.noHide) {
      localColumn.value.push(item.label)
    }
  })

  // 初始化的时候需要执行一次全选的状态校验
  changeSelect()
  if (init) {
    changeColumnData()
  }
}

/**
 * 取消
 */
function handelCancel() {
  showSettingColumn.value = false
  // 还原
  localColumn.value = localOldColumn.value
}

onMounted(() => {
  if (props.tbName) {
    initLocalCheckList(true)
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
