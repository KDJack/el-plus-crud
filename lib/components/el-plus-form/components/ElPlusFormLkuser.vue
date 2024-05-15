<template>
  <div class="el-plus-form-link-user">
    <el-select ref="selectRef" style="width: 100%" :class="desc.class" :style="desc.style" v-bind="topAttrs" :teleported="false" :disabled="disabled || desc.disabled" :loading="loading" :modelValue="values" @visible-change="handelVisibleChange" @clear="handelClear">
      <el-option v-for="option in options" :key="option.value" v-bind="option" />
    </el-select>
    <!-- 弹框 -->
    <el-dialog :width="desc.dialogWidth || '900px'" :title="desc.placeholder || '选择' + desc.label" draggable :closeOnClickModal="false" showCancel v-model="isShowDialog" append-to-body destroy-on-close @close="close">
      <div style="width: 100%" class="form-link-user-dialog">
        <div class="panel-left">
          <!-- 搜索 -->
          <el-select style="width: 300px" placeholder="输入用户名进行搜索" v-bind="selectAttrs" @change="handelSelectChange">
            <el-option v-for="option in selectOptions" :key="option.value" v-bind="option" />
          </el-select>
          <el-divider></el-divider>
          <div class="dept-breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click="goIndex(-1)">组织架构</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, i) in deptTreeItems" :key="i" @click="goIndex(i)">
                {{ item.label }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 组织机构列表 -->
          <el-table ref="multipleTableRef" :data="tableData" style="width: 100%; height: 500px" max-height="500px" @select="handelTableSelect" @select-all="handelTableSelectAll">
            <el-table-column type="selection" width="55" :selectable="handelTableSelectable" />
            <el-table-column label="组织/部门/人员" prop="label">
              <template #default="{ row }">
                <div style="display: flex; align-items: center">
                  <el-icon style="margin-right: 5px">
                    <Share v-if="row.type === 2" />
                    <UserFilled v-else />
                  </el-icon>
                  {{ row.label }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template #default="{ row, $index }">
                <el-button v-if="row.type === 2" :disabled="selectUser.some((item) => item.value === row.value)" type="primary" text plain @click="goInto(row, $index)">进入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="panel-right">
          <div class="right-title">已选中项：</div>
          <el-scrollbar height="480px" class="tag-list">
            <el-tag style="margin-right: 10px; margin-bottom: 10px" v-for="tag in selectUser" :key="tag.value" closable @close="() => handelTagRemove(tag)">
              <el-icon style="margin-right: 5px">
                <Share v-if="tag.type === 2" />
                <UserFilled v-else />
              </el-icon>
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
  name: 'ElPlusFormLkuser',
  inheritAttrs: false,
  typeName: 'lkuser',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, nextTick, watch, onMounted, computed, inject, onBeforeMount, useAttrs } from 'vue'
import { Share, UserFilled } from '@element-plus/icons-vue'
import { getAttrs } from '../mixins'
import { ICRUDConfig } from '../../../../types'

const lodash = inject('lodash') as any
const globalData = inject('globalData') as any
const defaultConf = inject('defaultConf') as ICRUDConfig

interface ILinkItem {
  // 选中类型： 1，用户、 2：部门
  type: 1 | 2
  label: string
  value: string
}

const props = defineProps<{
  modelValue?: []
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const onEvents = ref(getEvents(props))

const emits = defineEmits(['update:modelValue', 'change', 'input', 'validateThis', 'close'])

const currentValue = ref((props.modelValue || []) as any[])
emits('update:modelValue', currentValue)

// 顶部的select
const selectRef = ref()
const values = reactive([] as Array<string>)
const options = reactive([] as Array<ILinkItem>)
const topAttrs = reactive({
  multiple: true,
  size: props.desc.size,
  collapseTags: false,
  collapseTagsTooltip: false,
  clearable: true
})

const isShowDialog = ref(false)

// 存储的值
const selectUser = reactive([] as Array<ILinkItem>)

// 搜索框
const selectOptions = reactive([] as any[])
const selectAttrs = ref({})

// 左边列表idkey namekey
const lIdKey = ref(props.desc?.lIdKey || 'id')
const lNameKey = ref(props.desc?.lNameKey || 'name')
// 右边列表idkey namekey
const rIdKey = ref(props.desc?.rIdKey || 'userId')
const rNameKey = ref(props.desc?.rNameKey || 'nickname')

// 查询左边列表idKey
const lQueryIdKey = ref(props.desc?.lQueryIdKey || 'deptId')
// 组织架构列表
const deptDataList = ref((props.desc?.deptDataList || []) as any[])

/**
 * 处理自定义请求
 * @param param
 */
async function remoteMethod(query: string) {
  selectOptions.splice(0, selectOptions.length, ...(await selectRemote(query)))
}

// 组织架构数据
const deptTreeIndex = ref([] as number[])
const deptTreeItems = ref([] as any[])
// 用户数据列表
const tableUserData = ref([] as any[])

// 机构列表数据
const multipleTableRef = ref()
const tableData = computed(() => {
  const tempList = [] as ILinkItem[]
  // 遍历组织架构数据
  let tempData = [] as any[]
  if (deptDataList.value.length) {
    tempData = deptDataList.value
  } else {
    tempData = lodash.cloneDeep(globalData[defaultConf.form?.linkUser?.deptListKey || ''])
  }
  if (deptTreeIndex.value && deptTreeIndex.value.length > 0) {
    deptTreeIndex.value.map((item) => {
      tempData = tempData[item].children || []
    })
  }
  tempData.map((item: any) => tempList.push({ type: 2, label: item[lNameKey.value], value: item[lIdKey.value] }))
  // 遍历用户数据
  tableUserData.value.map((item) => tempList.push({ type: 1, label: item[rNameKey.value], value: item[rIdKey.value] }))

  // 这里默认选中
  nextTick(() => {
    setTimeout(() => {
      tempList.map((item) => {
        multipleTableRef.value?.toggleRowSelection(
          item,
          selectUser.some((i) => i.value === item.value)
        )
      })
    }, 10)
  })
  return tempList
})

/**
 * 获取事件
 * @returns
 */
function getEvents(props: any) {
  const tempOn = {} as any
  if (props.desc?.on) {
    Object.keys(props.desc.on).map((key: string) => {
      tempOn[key] = (val: any) => {
        nextTick(() => {
          props.desc.on[key](props.formData || {}, props.rowIndex, val)
        })
      }
    })
  }
  return tempOn
}

/**
 * 处理点击事件
 * @param val
 */
function handelVisibleChange(val: any) {
  if (val) {
    selectRef.value.blur()
    isShowDialog.value = true
  }
}

/**
 * 处理清空选项
 */
function handelClear() {
  selectUser.splice(0, selectUser.length)
  // 清空列表选中项
  tableData.value.map((item) => {
    multipleTableRef.value?.toggleRowSelection(
      item,
      selectUser.some((i) => i.value === item.value)
    )
  })
  submit()
}

/**
 * 处理自定义请求
 * @param param
 */

/**
 * 处理下拉框选中
 * @param val
 */
function handelSelectChange(val: any) {
  addAndRemove({ ...selectOptions.find((item) => item.value === val), type: 1 })
}

/**
 * 远程查询用户列表
 * @param nickname
 */
async function selectRemote(nickname: string) {
  if (nickname.length > 0) {
    return ((await defaultConf.form?.linkUser?.getUserList({ nickname, current: 1, size: 10, enabled: 1 })) as any).records?.map((item: any) => {
      return { value: item[rIdKey.value], label: item[rNameKey.value] }
    })
  }
  return []
}

/**
 * 进入下级组织架构
 * @param item
 */
async function goInto(item: ILinkItem, index: number) {
  // 查询机构用户
  tableUserData.value = (await defaultConf.form?.linkUser?.getUserList({ [lQueryIdKey.value]: item.value, size: 999 })).records as any[]
  deptTreeIndex.value.push(index)
  deptTreeItems.value.push(item)
}

/**
 * 返回上级组织架构
 * @param index
 */
async function goIndex(index: number) {
  // 查询机构用户
  tableUserData.value = index >= 0 ? ((await defaultConf.form?.linkUser?.getUserList({ [lQueryIdKey.value]: deptTreeItems.value[index].value, size: 999 })).records as any[]) : []
  deptTreeIndex.value.splice(index + 1)
  deptTreeItems.value.splice(index + 1)
}

/**
 * 处理当前行是否能够被选中
 * @param row
 */
function handelTableSelectable(row: any) {
  if (props.desc.onlyUser) {
    return row.type === 1
  }
  return true
}

/**
 * 处理单个选中的情况
 * @param selection
 * @param row
 */
function handelTableSelect(selection: ILinkItem[], item: ILinkItem) {
  addAndRemove(item, !selection.some((i) => i.value === item.value))
}

/**
 * 处理全选
 * @param selection
 * @param row
 */
function handelTableSelectAll(selection: ILinkItem[]) {
  const isRemove = !(selection && selection.length > 0)
  tableData.value.map((item) => {
    if (!props.desc.onlyUser || (props.desc.onlyUser && item.type === 1)) {
      addAndRemove(item, isRemove)
    }
  })
}

/**
 * 处理删除标签
 * @param item
 */
function handelTagRemove(item: ILinkItem) {
  if (tableData.value.some((i) => i.value === item.value)) {
    multipleTableRef.value?.toggleRowSelection(item, false)
  }
  addAndRemove(item, true)
}

/**
 * 添加或者移除
 * @param item
 */
function addAndRemove(item: ILinkItem, isRemove: boolean = false) {
  // 校验是否已经有了
  const index = selectUser.findIndex((i) => i.value === item.value)
  if (isRemove) {
    if (index >= 0) {
      selectUser.splice(index, 1)
    }
  } else {
    if (index < 0) {
      selectUser.push(item)
    }
  }
}

/**
 * 取消按钮
 */
function cancel() {
  isShowDialog.value = false
}

/**
 * 关闭弹框
 */
function close() {
  init()
  // 返回组织架构层级
  goIndex(-1)
}

/**
 * 确认按钮
 */
function submit() {
  options.splice(0, options.length, ...selectUser)
  const userIds = [] as string[]
  const deptIds = [] as string[]
  const userNames = [] as string[]
  const deptNames = [] as string[]
  values.splice(0, values.length)

  // 遍历数据
  selectUser.map((item) => {
    values.push(item.value)
    if (item.type === 1) {
      userIds.push(item.value)
      userNames.push(item.label)
    } else {
      deptIds.push(item.value)
      deptNames.push(item.label)
    }
  })

  isShowDialog.value = false
  currentValue.value = selectUser.length > 0 ? [userIds, deptIds, userNames, deptNames] : []
  // 触发外部change事件
  if (onEvents.value.change) {
    onEvents.value.change(props.formData || {}, null, currentValue.value)
  }
  emits('validateThis')
}

/**
 * 初始化选中数据
 */
function initSelectData() {
  const tempList = [] as Array<ILinkItem>
  if (props.modelValue) {
    let [userIds, deptIds, userNames, deptNames] = props.modelValue as any
    if (deptIds && deptNames && deptIds.length === deptNames.length) {
      deptIds.map((id: string, i: number) => {
        tempList.push({ type: 2, value: id, label: deptNames[i] })
      })
    }
    if (userIds && userNames && userIds.length === userNames.length) {
      userIds.map((id: string, i: number) => {
        tempList.push({ type: 1, value: id, label: userNames[i] })
      })
    }
  }
  return tempList
}

/**
 * 初始化选中Id
 */
function initSelectIds() {
  const tempList = [] as Array<string>
  if (props.modelValue) {
    let [userIds, deptIds] = props.modelValue as any
    tempList.push(...(deptIds || []))
    tempList.push(...(userIds || []))
  }
  return tempList
}

/**
 * 初始化数据
 */
function init() {
  selectUser.splice(0, selectUser.length, ...initSelectData())
  options.splice(0, options.length, ...initSelectData())
  values.splice(0, values.length, ...initSelectIds())
}

onBeforeMount(async () => {
  // // 如果没有配置，则抛出一个警告
  selectAttrs.value = await getAttrs(props, {
    remote: true,
    filterable: true,
    remoteShowSuffix: true,
    loadingText: '远程查询中...',
    remoteMethod: remoteMethod,
    ...useAttrs()
  })
})

watch(
  () => props.modelValue,
  () => init(),
  { deep: true }
)

onMounted(async () => {
  init()
})
</script>
<style lang="scss" scoped>
.el-plus-form-link-user {
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
.form-link-user-dialog {
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .panel-left {
    width: 60%;
    display: flex;
    flex-direction: column;

    .dept-breadcrumb {
      width: 100%;
      padding: 0 10px;
      margin-bottom: 20px;
      cursor: pointer;
      span {
        line-height: 24px;
        color: var(--el-color-primary);
      }
    }
  }

  .panel-right {
    width: 40%;
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
      flex: 1;
      overflow-y: hidden;
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
