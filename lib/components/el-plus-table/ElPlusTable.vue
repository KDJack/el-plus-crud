<template>
  <div class="el-plus-table-content">
    <!-- <div class="select-items" v-if="type === 'selection' && selectRowList && selectRowList.length > 0">
      <span class="title">已选择({{ selectRowList.length }}个): </span>
      <el-tag v-for="(item, i) in selectRowList" :key="item.id" class="select-item" size="small" closable @close="() => handelRemoveSelect(i, item)">
        {{ item[tableConfig.showSelectNameKey || 'name'] }}
      </el-tag>
    </div> -->
    <EleTabletHeader ref="tableHeaderRef" v-if="Object.keys(tableConfig?.toolbar || {}).length || tableConfig.tbName" v-model="toolFormData" :tbName="tableConfig.tbName" :column="tableConfig?.column || []" :size="size" :isShowRefresh="isShowRefresh" :loading="compLoading" :toolbar="tableConfig.toolbar" :isDialog="isDialog" @query="handelTopQuery" :queryDataFn="getListQueryData" @reset="handelHeaderReset" />

    <!-- tabTop插槽 -->
    <template v-if="useSlots().tabTop">
      <slot name="tabTop"></slot>
    </template>

    <!-- 中部的Tabs -->
    <div class="table-tabs-panel" v-if="tableConfig.tabConf">
      <el-radio-group v-model="tableTabVal" size="default" @change="handelTabChange">
        <el-radio-button v-for="(item, i) in tableConfig.tabConf?.tabs" :key="i" :label="item.value" :loading="true">
          {{ item.label }}
          <template v-if="loadingTab">
            <el-icon class="is-loading"><Loading /></el-icon>
          </template>
          <template v-else>
            {{ getTabLabel(item) }}
          </template>
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 默认插槽 -->
    <template v-if="useSlots().default">
      <slot name="default"></slot>
    </template>

    <!-- 中间列表 -->
    <div class="el-plus-table-main" v-loading="compLoading">
      <template v-if="isDIYMain">
        <slot name="main" :tableData="tableData"></slot>
      </template>
      <!-- 这里开始是表格内容  -->
      <el-table
        ref="elPlusTableRef"
        v-else
        style="width: 100%"
        :maxHeight="tableConfig.maxHeight || 'auto'"
        v-bind="tableConfig.tableAttr"
        :class="{ 'big-h-bar': tableConfig?.tableAttr?.bigHBar, 'big-v-bar': tableConfig.tableAttr?.bigVBar }"
        :data="tableData"
        :row-key="type !== 'expand' && isTempId ? 'tempId' : rowKey"
        lazy
        :load="loadExpandData"
        :size="size"
        @select="handelTableSelect"
        @select-all="handelTableSelectAll"
        @expand-change="handelTableExpandChange"
        :treeProps="treeProps"
        :span-method="handelSpanMethod"
      >
        <!-- 复选框 -->
        <el-table-column v-if="type === 'selection'" type="selection" fixed="left" width="55px" :selectable="selectable" header-align="center" align="center" />
        <!-- 下标 -->
        <el-table-column v-if="isIndex" type="index" width="60" fixed="left" label="序号" :headerAlign="headerAlign" />
        <!-- 首列 -->
        <template v-if="useSlots().firstColumn">
          <slot name="firstColumn" />
        </template>
        <!-- 一级或多级列 -->
        <ElPlusTableColumn v-for="(item, i) in headerColumns" :key="i" :item="item" :size="size"></ElPlusTableColumn>

        <!-- 空 -->
        <template v-if="!compLoading && loadingStatus === 2" #empty>
          <el-empty v-if="isEmptyImg" :description="nullText" />
          <span v-else>{{ nullText }}</span>
        </template>
        <!-- 合计行 -->
        <template v-if="tableConfig.summaryConf?.prop" #append>
          <div :style="tableConfig.summaryConf?.hstyle" class="summary-row" v-if="summaryList && summaryList.length > 0">
            <div class="summary-item" v-for="(item, i) in summaryList" :key="i">
              <span>{{ item.label || '合计' }}:</span>
              <p>{{ item.value || 0 }}</p>
            </div>
          </div>
        </template>
      </el-table>
    </div>
    <div class="bottom-page-static-info" v-if="isPager || tableConfig.statistic">
      <el-pagination class="page-info" small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="+pageInfo.current" :page-sizes="pageSizes || [5, 10, 20, 50, 100]" :page-size="pageInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" />
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusTable',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch, nextTick, useSlots, inject, provide } from 'vue'
import EleTabletHeader from './components/header.vue'
import ElPlusTableColumn from './ElPlusTableColumn.vue'
import { handelListColumn, isEqual } from '../../util'
import { Loading } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus'
import { ICRUDConfig, ITableConfig, ITableTabItem, ITreeProps } from '../../../types'

interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}

const lodash = inject('lodash') as any
const defaultConf = inject('defaultConf') as ICRUDConfig
const format = inject('format') as any

const emits = defineEmits(['getUrlConsumerIds', 'selection', 'select', 'selectAll', 'update:modelValue', 'tabChange', 'queryChange', 'expandChange', 'inited', 'headerReset'])
const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfig
    // 外部数据
    modelValue?: Array<any> | null
    // 列表类型 默认为index
    type?: string
    // 是否显示第一列的Index下标
    isIndex?: boolean
    // 是否分页
    isPager?: boolean
    // 每页显示条数
    pageSize?: number
    // 分页选项
    pageSizes?: number[]
    // 是否在弹框中
    isDialog?: boolean
    // 空占位文本
    nullText?: string
    // 是否显示暂无数据的图片
    isEmptyImg?: boolean
    // 是否显示刷新文本
    isShowRefresh?: boolean
    // rowKey默认为id
    rowKey?: string
    // 自定义table主体
    isDIYMain?: boolean
    // 默认选中项
    selectList?: Array<any> | []
    // 默认列宽
    colMinWidth?: string
    // 表头文本排列方式
    headerAlign?: 'left' | 'right' | 'center'
    // 是否使用tempId
    isTempId?: boolean
    // 加载状态
    loading?: boolean
  }>(),
  {
    modelValue: null,
    type: 'index',
    isIndex: true,
    isPager: true,
    pageSize: 10,
    isDialog: false,
    nullText: '暂无数据',
    isShowRefresh: true,
    rowKey: 'id',
    isEmptyImg: true,
    isDIYMain: false,
    selectList: () => [],
    colMinWidth: 'auto',
    headerAlign: 'left',
    isTempId: true,
    loading: false
  }
)

// 合并行算法
const needSpanCellIndex = ref([] as any[])
const handelSpanMethod = ref(null as unknown as Function)

const elPlusTableRef = ref()

// 顶部Tab数据
const tabStatic = ref({} as any)
const tableTabVal = ref(props.tableConfig?.tabConf?.tabs[props.tableConfig?.tabConf?.default || 0].value ?? '')
// const tableTabVal = computed(() => {
//   if (props.tableConfig?.tabConf) {
//     if (props.tableConfig?.tabConf?.defaultVal !== undefined && props.tableConfig?.tabConf?.defaultVal !== null) {
//       return props.tableConfig?.tabConf?.defaultVal
//     }
//     return props.tableConfig?.tabConf?.tabs[props.tableConfig?.tabConf?.default || 0].value ?? ''
//   }
//   return ''
// })
const getTabLabel = computed(() => (item: ITableTabItem) => {
  if (item.key) {
    return tabStatic.value[item.key] || 0
  }
  return ''
})

const selectable = computed(() => (row: any, index: number) => {
  if (typeof props.tableConfig?.tableAttr?.selectable === 'function') {
    return props.tableConfig?.tableAttr?.selectable(row, index)
  }
  return true
})

const tableHeaderRef = ref()

// 加载
const localLoading = ref(false)
const loadingTab = ref(!!props.tableConfig?.tabConf?.fetch)
const listLoading = ref(false)
const size = defaultConf.size || 'default'

// 最终的loading
const compLoading = computed(() => props.loading || localLoading.value)

// 顶部查询条件数据缓存
// const topQueryData = ref({} as any)

// 数据
let toolFormData = reactive({} as any)
const tableData = ref((props.modelValue || []) as any[])
const haveClassRowList = reactive([])

// 0:未加载; 1:加载中；2:加载完成
const loadingStatus = ref(0)

// 保存所有的选中行
const allSelectRowList = reactive((lodash.cloneDeep(props.selectList) || []) as any[])
// 记录树形展开的数组的下标
const treeIndexList = reactive([] as any[][])

// 分页信息
const pageInfo = reactive({
  current: !props.isDialog && toolFormData.current ? parseInt(toolFormData.current as any) : 1,
  total: 0,
  size: !props.isDialog && toolFormData.size ? parseInt(toolFormData.size as any) : props.pageSize
})
// 数型解析
const treeProps = (props.tableConfig?.explan?.treeProps || { children: 'children', hasChildren: 'hasChildren' }) as ITreeProps

// 处理后的列显示
const headerColumns = computed(() => {
  const tempList = handelListColumn(props.tableConfig?.column, defaultConf, props.tableConfig?.tbName || '', props.headerAlign, props.isDialog ? 'auto' : props.colMinWidth)
  // 这里重构一下合并行算法
  // 获取所有列
  const allColumn = getColumList(tempList)
  // 查询是否有合并行属性
  needSpanCellIndex.value = []

  const tempColList = allColumn
    .map((item, i) => {
      // 合并行
      if (item.isRowSpan) {
        needSpanCellIndex.value.push(i)
        let value = undefined as any
        let first = 0
        let count = 1
        // 这里修改data数据
        tableData.value?.map((row, j) => {
          let prefixStr = item.rsProps?.length ? getPrefixStr(row, item.rsProps) : ''
          if (value !== prefixStr + row[item.prop]) {
            if (count > 1 && j > 0) {
              // 这里要设置之前的数据合并行数
              tableData.value[first]['rowSpan_' + i] = count
            }
            first = j
            count = 1
            value = prefixStr + row[item.prop]
          } else {
            count += 1
            row['rowSpan_' + i] = 0
          }
          if (j === tableData.value.length - 1) {
            // 这里要设置之前的数据合并行数
            tableData.value[first]['rowSpan_' + i] = count
          }
        })
      }
      // 返回需要合并列的列数据
      return item.isColSpan ? i : null
    })
    .filter((item) => item !== null) as number[]

  if (tempColList.length) {
    // 这里开始合并列-遍历行数据
    tableData.value?.map((row, j) => {
      let value = undefined as any
      let first = 0
      let count = 1
      // 遍历表头
      tempColList.map((val: number, i: number) => {
        // 不存在时才添加
        if (!needSpanCellIndex.value.includes(val)) {
          needSpanCellIndex.value.push(val)
        }
        // 如果值不等 或者 列序号已经中断
        if (value !== row[allColumn[val].prop] || (i > 0 && val - 1 !== tempColList[i - 1])) {
          if (count > 1) {
            // 这里要设置之前的数据合并行数
            row['colSpan_' + first] = count
          }
          first = val
          count = 1
          value = row[allColumn[val].prop]
        } else {
          count += 1
          row['colSpan_' + val] = 0
        }
        // 如果是最后一个
        if (i === tempColList.length - 1) {
          // 这里要设置之前的数据合并行数
          row['colSpan_' + first] = count
        }
      })
    })
  }
  if (needSpanCellIndex.value.length > 0) {
    handelSpanMethod.value = ({ row, column, columnIndex }: SpanMethodProps) => {
      let tempColumnIndex = columnIndex
      // 这里要排除默认的列
      if (props.type === 'selection') tempColumnIndex -= 1
      if (props.isIndex) tempColumnIndex -= 1
      if (useSlots().firstColumn) tempColumnIndex -= 1
      if (needSpanCellIndex.value.includes(tempColumnIndex)) {
        return { rowspan: row['rowSpan_' + tempColumnIndex] ?? 1, colspan: row['colSpan_' + tempColumnIndex] ?? 1 }
      }
    }
  }
  return tempList
})

/**
 * 获取一行数据的前缀
 * @param row
 * @param rowKeyList
 */
function getPrefixStr(row: any, rowKeyList: string[]) {
  if (row && rowKeyList?.length) {
    return rowKeyList.reduce((str: string, item: any) => (str += row[item] || ''), '')
  }
  return ''
}

// 合计行数据
const summaryList = computed(() => {
  const tempList = [] as any[]
  if (props.tableConfig.summaryConf?.vif) {
    if (typeof props.tableConfig.summaryConf?.vif === 'boolean') {
      if (!props.tableConfig.summaryConf?.vif) {
        return tempList
      }
    } else {
      if (!props.tableConfig.summaryConf?.vif()) {
        return tempList
      }
    }
  }
  if (props.tableConfig.summaryConf?.prop) {
    const propList = props.tableConfig.summaryConf.prop.split(',')
    const labelList = props.tableConfig.summaryConf?.label?.split(',') || []
    // 遍历
    propList.map((prop, i: number) => {
      let value = ''
      if (props.tableConfig.summaryConf?.sumFn) {
        value = props.tableConfig.summaryConf?.sumFn(tableData.value, allSelectRowList)
      } else {
        value = format.yuan(tableData.value.reduce((total: number, current) => (total += current[prop]), 0))
      }
      tempList.push({ label: labelList[i], value })
    })
  }
  return tempList
})

/**
 * 获取所有显示的列信息
 * @param list
 */
function getColumList(list: Array<any>): Array<any> {
  const tempList = [] as any
  list?.map((item) => {
    if (item.children?.length) {
      tempList.push(...getColumList(item.children))
    } else {
      if (item.__vif) {
        tempList.push(item)
      }
    }
  })
  return tempList
}

/**
 * Tab切换
 * @param val
 */
async function handelTabChange(val: string | number | boolean) {
  // 这里直接重新查询
  reload(true)

  // 通知父类 第二个参数是回调
  await emits('tabChange', val, initCol)

  // 这里触发下initCol
  nextTick(() => {
    initCol()
  })
}

/**
 * 加载自身展开的数据
 * @param row
 * @param treeNode
 * @param resolve
 */
async function loadExpandData(row: any, treeNode: any, resolve: any) {
  const postData = await getListQueryData()
  postData[props.tableConfig?.explan?.idName || 'parentId'] = row.id
  props.tableConfig.fetch &&
    props.tableConfig.fetch(postData).then((pageInfo) => {
      resolve(pageInfo?.[defaultConf.table?.list || props.tableConfig?.fetchMap?.list || 'records'])
    })
}

/**
 * 初始化每行的颜色
 * @param data
 */
// function initRowClassName(data: any) {
//   if (haveClassRowList.length > data.rowIndex) {
//     return haveClassRowList[data.rowIndex * 1]
//   }
//   return ''
// }

/**
 * 处理单个选中的情况
 * @param selection
 * @param row
 */
function handelTableSelect(selection: any[], item: any) {
  checkAndRemove(item, !selection.some((i) => i[props.rowKey] === item[props.rowKey]))
  // 通知父类
  emits('select', selection, item)
  emits('selection', lodash.cloneDeep(allSelectRowList))
}

/**
 * 处理全选
 * @param selection
 * @param row
 */
function handelTableSelectAll(selection: any[]) {
  const isRemove = !(selection && selection.length > 0)
  ;(isRemove ? tableData.value : selection).map((item) => {
    checkAndRemove(item, isRemove)
  })
  // 通知父类
  emits('selectAll', selection, isRemove)
  emits('selection', lodash.cloneDeep(allSelectRowList))
}

/**
 * 处理行展开
 * @param row
 * @param expanded
 */
function handelTableExpandChange(row: any, expanded: boolean) {
  emits('expandChange', row, expanded)
}

/**
 * 选中或者取消
 * @param item
 */
function checkAndRemove(item: any, isRemove: boolean = false) {
  // 校验是否已经有了
  const index = allSelectRowList.findIndex((i) => i[props.rowKey] === item[props.rowKey])
  if (isRemove) {
    if (index >= 0) {
      allSelectRowList.splice(index, 1)
    }
  } else {
    if (index < 0) {
      allSelectRowList.push(item)
    }
  }
}

/**
 * 外部修改选中项
 * @param item
 */
function changeSelect(itemList: any[], isSelect: boolean = false) {
  if (itemList && itemList.length) {
    itemList.map((item) => {
      checkAndRemove(
        allSelectRowList.find((i) => i[props.rowKey] === item[props.rowKey]),
        !isSelect
      )
    })
  }
  // 这里要刷新一下tab的选中
  refreshTableSelect()
}

/**
 * 重置选中
 */
function resetSelect() {
  allSelectRowList.splice(0, allSelectRowList.length, ...props.selectList)
}

/**
 * 封装分页查询条件
 */
async function getListQueryData() {
  let queryMap = {
    // 封装查询条件
    // ...route.query,
    // ...topQueryData.value,
    ...(tableHeaderRef.value?.getData() || {}),
    ...(typeof props.tableConfig.queryMap === 'function' ? await props.tableConfig.queryMap() : props.tableConfig.queryMap),
    t_: new Date().getTime()
  } as any
  if (props.isPager) {
    // 封装分页信息
    queryMap[defaultConf.table?.page?.current || props.tableConfig?.fetchMap?.page?.current || 'current'] = pageInfo.current
    queryMap[defaultConf.table?.page?.pageSize || props.tableConfig?.fetchMap?.page?.pageSize || 'size'] = pageInfo.size
  }
  // 这里处理一下列表Tab的查询条件
  if (props.tableConfig?.tabConf && props.tableConfig?.tabConf?.prop) {
    queryMap[props.tableConfig?.tabConf.prop] = tableTabVal.value
  }

  queryMap = handelQueryData(queryMap)
  if (!props.isDialog) {
    // setQuery(route.path, queryMap)
  }
  // 这里是导出的权限判定-增加登陆信息
  // if (props.tableConfig?.toolbar?.export?.isAuth) {
  // TODO GET Auth
  // }
  return queryMap
}

/**
 * 处理下请求参数
 * @param queryMap
 */
function handelQueryData(queryMap: object) {
  if (!queryMap) return {}
  const tempMap = {}
  Object.keys(queryMap).map((key) => {
    if (queryMap[key] !== undefined && queryMap[key] !== null && queryMap[key] !== '') {
      tempMap[key] = queryMap[key]
    }
  })
  return tempMap
}

/**
 * 处理显示
 * @param rowInfo
 */
// function handelHeaderVIf(rowInfo: any) {
//   let vif = false
//   if (rowInfo.children && rowInfo.children.length > 0) {
//     vif = rowInfo.children.some((item: any) => {
//       return !(item.vif === false)
//     })
//   }
//   return vif
// }

/**
 * 处理列的显示
 * @param item
 */
// function handelColumnVIf(item: any) {
//   if (item.vif !== undefined && item.vif !== null && item.vif !== '') {
//     if (typeof item.vif === 'boolean') return item.vif
//     if (typeof item.vif === 'function') return item.vif(item)
//     return !!item.vif
//   }
//   return true
// }

/**
 * 处理分页工具中pageSize变化
 * @param val
 */
function handleSizeChange(val: number) {
  // 回到第一页
  pageInfo.current = 1
  pageInfo.size = val
  loadData(true)
}

/**
 * 处理分页工具中current变化
 * @param val
 */
function handleCurrentChange(val: number) {
  if (pageInfo.current !== val) {
    pageInfo.current = val
    loadData(false)
  }
}

/**
 * 处理行展开
 * @param list
 * @param pIndexList
 */
function handelTreeIndex(list: any[], pIndexList: number[]) {
  let tempList = []
  if (list && list.length > 0) {
    list.map((item, i) => {
      treeIndexList.push([...pIndexList, i])
      tempList = item[treeProps.children] as any[]
      if (tempList && tempList.length > 0) {
        handelTreeIndex(tempList, [i])
      }
    })
  }
}

/**
 * 真正调用查询的接口
 * @param isInit
 */
async function loadData(isInit: Boolean) {
  if (!props.tableConfig.fetch) {
    loadingStatus.value = 2
    // if (props.modelValue) {
    //   tableData.splice(0, tableData.length, ...props.modelValue)
    // }
    return false
  }
  if (loadingStatus.value === 1 || localLoading.value) return false
  loadingStatus.value = 1
  localLoading.value = true
  if (isInit) {
    pageInfo.current = 1
  }
  let postData = await getListQueryData()
  // 这里处理一下外部数据格式化
  if (props.tableConfig?.toolbar?.formConfig?.beforeRequest) {
    postData = props.tableConfig?.toolbar?.formConfig?.beforeRequest(JSON.parse(JSON.stringify(postData))) || postData
  }
  try {
    let dataPage = ((await props.tableConfig.fetch(postData)) || {}) as any
    // 这里要进行赋值操作-同时要转换相关key
    if (Array.isArray(dataPage)) {
      dataPage = { [defaultConf.table?.list || props.tableConfig?.fetchMap?.list || 'records']: dataPage }
    }
    try {
      let dataResult = [] as any
      if (props.isPager) {
        pageInfo.total = dataPage[defaultConf.table?.page?.total || props.tableConfig?.fetchMap?.page?.total || 'total'] * 1 || 0
        pageInfo.current = dataPage[defaultConf.table?.page?.current || props.tableConfig?.fetchMap?.page?.current || 'current'] || 1
        dataResult = dataPage[defaultConf.table?.list || props.tableConfig?.fetchMap?.list || 'records'] || null
      } else {
        dataResult = dataPage[defaultConf.table?.list || props.tableConfig?.fetchMap?.list || 'records'] || null
      }

      if (props.type !== 'expand' && props.isTempId && Array.isArray(dataResult)) {
        const nowTime = new Date().getTime()
        dataResult.map((item, i) => {
          item.tempId = item[props.rowKey] || `${nowTime + i}`
        })
      }

      tableData.value = dataResult
      // 如果是树形结构
      if (props.type === 'expand') {
        treeIndexList.splice(0, treeIndexList.length)
        handelTreeIndex(tableData.value, [])
      }
      listLoading.value = false
      // 通知父类
      noticeInited()
      nextTick(() => {
        // 遍历以及选中当前页面数据
        refreshTableSelect()
      })
    } catch (e) {
      if (defaultConf.debug) {
        // eslint-disable-next-line no-console
        console.log('error: ', e)
      }
    }
  } catch (e) {
    console.log('fetch error: ', e)
  }
  loadingStatus.value = 2
  localLoading.value = false
}

const noticeInited = lodash.debounce(
  () => {
    emits('inited', tableData.value)
  },
  400,
  { leading: true, trailing: false }
)

/**
 * 渲染列表的选中项
 */
function refreshTableSelect() {
  if (tableData.value && tableData.value.length > 0 && props.type === 'selection') {
    tableData.value.map((item: any) => {
      elPlusTableRef.value!.toggleRowSelection(
        item,
        allSelectRowList.some((i) => i[props.rowKey] === item[props.rowKey])
      )
    })
  }
}

/**
 * 重新加载
 */
async function reload(isTab: boolean = false) {
  await loadData(true)
  // 这里判断一下Tab
  if (!isTab && props.tableConfig?.tabConf && props.tableConfig?.tabConf.fetch) {
    tabStatic.value = await props.tableConfig?.tabConf.fetch(Object.assign({}, await getListQueryData(), props.tableConfig?.tabConf.queryMap))
    loadingTab.value = false
  }
  return tableData.value
}

/**
 * 处理顶部条件表单筛选
 */
async function handelTopQuery() {
  // topQueryData.value = cloneDeep(tableHeaderRef.value.getData())
  let tempQueryData = await getListQueryData()
  if (props.tableConfig?.toolbar?.formConfig?.beforeRequest) {
    tempQueryData = props.tableConfig?.toolbar?.formConfig?.beforeRequest(JSON.parse(JSON.stringify(tempQueryData))) || tempQueryData
  }
  if (tempQueryData) emits('queryChange', tempQueryData)
  reload()
}

/**
 * 处理顶部重置
 */

function handelHeaderReset() {
  emits('headerReset', toolFormData)
}

/**
 * 初始化列
 */
function initCol() {
  tableHeaderRef.value?.initCol()
}

// 监听父类数据变更
// watch(
//   () => props.modelValue,
//   (data) => {
//     if (!props.tableConfig.fetch) {
//       console.log('watch modelValue data: ', data)
//     }
//   }
// )
watch(
  () => props.modelValue,
  (data) => {
    if (!props.tableConfig.fetch) {
      // console.log('watch modelValue data: ', data)
      if (!isEqual(data, tableData.value)) {
        // if (JSON.parse(JSON.stringify(data)) !== JSON.parse(JSON.stringify(tableData.value))) {
        // 优化代码，这里就直接比较一下length就行了
        // if (data?.length !== tableData.value?.length) {
        loadingStatus.value = 2
        tableData.value?.splice(0, tableData.value.length, ...(data || []))
      }
    }
  },
  { deep: true }
)

watch(
  () => props.selectList,
  (val: any[]) => {
    allSelectRowList.splice(0, allSelectRowList.length, ...val)
    // 遍历以及选中当前页面数据
    refreshTableSelect()
  },
  { deep: true }
)

// 这里注入插槽的reload事件
if (props.isDIYMain) {
  // 只有isDIYMain=true时才注册事件
  provide('reloadTable', reload)
}

onMounted(() => {
  // toolbar.formConfig
  if (!(Object.keys(props.tableConfig?.toolbar?.formConfig || {}).length || props.tableConfig?.tbName)) {
    reload()
  }
})

defineExpose({ tableRef: elPlusTableRef, reload, tableData, changeSelect, resetSelect, initCol })
</script>
<style lang="scss">
.dark .el-plus-table-content {
  background-color: transparent !important;
}
.el-plus-table-content {
  background-color: #ffffff;
  color: var(--text-color);
  // background-color: var(--bg-color);
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  .th-required {
    position: relative;
    &::before {
      content: '*';
      position: absolute;
      left: -10px;
      font-size: 16px;
      top: 2px;
      color: #ff3b30;
      font-weight: bold;
    }
  }
  .select-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-right: 20px;
    }

    .select-item {
      margin: 5px 10px 5px 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .table-tabs-panel {
    margin-bottom: 16px;
  }
  .summary-row {
    width: 100%;
    background-color: var(--el-table-row-hover-bg-color);
    color: var(--el-table-text-color);
    padding: 16px 20px;
    line-height: 24px;
    height: 40px;
    display: flex;
    position: relative;
    .summary-item {
      display: flex;
      align-items: center;
      margin-right: 30px;
      & > span {
        margin-right: 20px;
      }
    }
  }

  .el-plus-table-main {
    width: 100%;
    flex: 1;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    .el-table {
      .cell {
        display: flex;
      }
      .is-center {
        .cell {
          align-items: center;
          justify-content: center;
        }
      }
    }
    .big-h-bar {
      .el-scrollbar {
        .is-horizontal {
          height: 12px !important;
        }
        .el-table__body {
          padding-bottom: 16px;
        }
      }
    }
    .big-v-bar {
      .el-scrollbar {
        .is-vertical {
          width: 12px !important;
        }
      }
    }
  }

  .pager-statistic {
    width: 100%;
    position: fixed;
    height: 32px;
    line-height: 32px;
    bottom: 0;
    text-align: right;
    min-width: 900px;

    .statistic-item {
      display: inline-block;
    }
  }

  .el-cascader__label {
    width: 300px !important;
  }

  .bottom-page-static-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 41px;
    margin-top: 10px;

    .page-info {
      margin-right: 30px;
    }
  }

  .common-list-export-excel {
    background: #20a0ff;
    text-decoration: none;
    color: #ffffff;
    font-size: 12px;
    height: 29px;
    line-height: 30px;
    display: block;
    margin-top: 5px;
    border-radius: 3px;
    padding: 0 10px;
  }

  .common-list-export-excel:hover {
    background: #58b6ff;
  }

  .el-table__empty-block {
    height: auto !important;
  }
}
</style>
