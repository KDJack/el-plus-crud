<template>
  <div class="el-plus-table-header-info">
    <template v-if="props.toolbar && Object.keys(props.toolbar || {}).length">
      <el-form :inline="true" class="el-plus-table-header-form" :style="{ justifyContent: !props.toolbar.formConfig && props.toolbar.btnRight ? 'flex-end' : 'space-between' }">
        <div v-if="props.toolbar.formConfig" class="el-plus-table-form-items">
          <ElPlusForm ref="elPlusFormRef" v-bind="formConfig" v-model="props.modelValue" :requestFn="handelQueryData" :showBtns="false" :isTable="true">
            <template #row>
              <div class="table-header-form-btns">
                <ElPlusFormBtn v-if="Object.keys(formConfig?.formDesc || {}).length" type="primary" icon="ele-Search" :loading="loading" :desc="{ label: '查询', on: { click: handelSearch }, size }" />
                <ElPlusFormBtn v-if="Object.keys(formConfig?.formDesc || {}).length" :desc="{ label: '重置', on: { click: handelReset }, size }" />
                <ElPlusTableSettingColumn ref="settingColumnRef" v-if="tbName" :tbName="tbName" :column="column || []" :size="size" />

                <template v-for="(item, i) in headerBtns" :key="i">
                  <template v-if="getVIf(item)">
                    <template v-if="item.customize">
                      <component :is="item.elType" v-bind="item"></component>
                    </template>
                    <template v-else>
                      <ElPlusFormUpbtn v-if="item.elType === 'upload'" :desc="item" :loading="loading" />
                      <ElPlusFormBtn v-else :desc="item" :loading="loading" />
                    </template>
                  </template>
                </template>
                <!-- 导出按钮放最后 -->
                <template v-if="exportConf && exportConf.length">
                  <template v-for="(expBtn, i) in exportConf" :key="i">
                    <ElPlusFormBtn type="primary" v-if="getVIf(expBtn)" :desc="expBtn" />
                  </template>
                </template>
              </div>
            </template>
          </ElPlusForm>
        </div>
        <div v-else class="el-plus-table-header-btns" :style="{ 'min-width': isMobile() ? '100%' : headerBtns && headerBtns.length > 0 ? headerBtns.length * 110 + 'px' : '10px' }">
          <div class="el-plus-table-header-btn">
            <template v-for="(item, i) in headerBtns" :key="i">
              <template v-if="item.customize">
                <component :is="item.elType" v-bind="item"></component>
              </template>
              <template v-else>
                <ElPlusFormUpbtn v-if="item.elType === 'upload'" :desc="item" :loading="loading" />
                <ElPlusFormBtn v-else :desc="item" :loading="loading" />
              </template>
            </template>
          </div>
        </div>
      </el-form>
    </template>
    <!-- 如果这里有tbname, 则需要显示设置列按钮 -->
    <template v-else-if="!!tbName">
      <div class="el-plus-table-header-form">
        <div class="table-header-form-btns" style="margin-bottom: 16px">
          <ElPlusTableSettingColumn ref="settingColumnRef" v-if="tbName" :tbName="tbName" :column="column || []" :size="size" :showText="true" />
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, inject } from 'vue'
import ElPlusTableSettingColumn from './settingColumn.vue'
import ElPlusFormBtn from '../../el-plus-form/components/ElPlusFormBtn.vue'
import ElPlusFormUpbtn from '../../el-plus-form/components/ElPlusFormUpbtn.vue'
import { isMobile, handelBtnType, mapToUrlStr } from '../../../util'
import { IBtnBack, ICRUDConfig, IColumnItem, ITableToolbar } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const emits = defineEmits(['query', 'reset'])
const props = withDefaults(
  defineProps<{
    modelValue?: { [key: string]: any } | {}
    column: Array<IColumnItem> | null
    tbName: string
    toolbar: ITableToolbar | null
    isDialog: boolean
    loading: boolean
    isShowRefresh: boolean
    size: string
    queryDataFn?: Function
  }>(),
  { tbName: '', toolbar: null, isDialog: false, loading: false, isShowRefresh: true, size: 'default' }
)

const elPlusFormRef = ref()
const settingColumnRef = ref()

const headerBtns = computed(() => {
  const btns = [] as any[]
  if (props.toolbar && props.toolbar.btns) {
    props.toolbar.btns.map((item: any) => {
      btns.push({ ...handelBtnType(item), size: item.size || props.size })
    })
  }
  return btns
})

const formConfig = computed(() => {
  const tempConf = props.toolbar?.formConfig
  if (tempConf?.formDesc) {
    Object.values(tempConf?.formDesc).map((item) => {
      if (item.width) return
      let width = 300
      switch (item.type) {
        case 'daterange':
        case 'input':
        case 'area':
          width = 300
          break
      }
      item.width = width + 'px'
    })
  }
  return tempConf
})

/**
 * 获取导出的按钮列表
 */
const exportConf = computed(() => {
  let tempExport = props.toolbar?.export || []
  if (tempExport && !Array.isArray(tempExport)) {
    tempExport = [tempExport]
  }
  if (tempExport?.length) {
    tempExport.map((item: any, i) => {
      item.label = item.label || `导出Excel ${i > 0 ? i : ''}`
      item.size = props.size
      item.mask = item.mask ?? true
      item.on = { click: (btnBack: IBtnBack) => handelDownload(btnBack, i) }
    })
    // { label: '导出Excel', size, disabled: exportConf?.disabled, mask: true, on: { click: handelDownload } }
  }
  return tempExport
})

function handelQueryData() {
  // 通知父类执行查询
  emits('query')
}

/**
 * 下载
 * @param data
 */
async function handelDownload({ callBack }: IBtnBack, index: number) {
  const tempConf = exportConf.value[index]
  if (tempConf) {
    // 创建请求
    const xhr = new XMLHttpRequest()
    let url = tempConf.url || ''
    const method = tempConf.method || 'get'

    let postData = Object.assign({}, props.queryDataFn ? await props.queryDataFn() : {}, tempConf?.data || { size: 1000 })
    // 提交数据前的处理
    if (props.toolbar?.formConfig?.beforeRequest) {
      postData = await (props.toolbar.formConfig.beforeRequest as Function)(postData)
    }

    // 处理为空的请求数据
    for (let key in postData) {
      if (postData[key] === undefined || postData[key] === null || postData[key] === '') {
        delete postData[key]
      }
    }
    if (tempConf.fetch) {
      try {
        let result = (await tempConf.fetch(postData)) as string
        if (tempConf.urlKey) {
          let tempKeyList = (typeof tempConf.urlKey === 'string' ? [tempConf.urlKey] : tempConf.urlKey) as string[]
          // 循环遍历
          tempKeyList?.map((key) => (result = result[key]))
        }
        url = result
      } finally {
        callBack && callBack()
      }
    } else {
      if (!tempConf.noQuery && method === 'get') {
        url += (url.indexOf('?') >= 0 ? '&' : '?') + mapToUrlStr(postData)
      }
    }
    if (tempConf.beforeRequest && typeof tempConf.beforeRequest === 'function') {
      postData = tempConf.beforeRequest(postData)
    }
    xhr.open(method, url, true)
    // 转换流
    xhr.responseType = 'blob'
    // 是否授权
    if (tempConf.isAuth !== false && defaultConf.token) {
      let token = defaultConf.token
      if (typeof defaultConf.token === 'function') {
        token = defaultConf.token()
      }
      xhr.setRequestHeader(tempConf.tokenKey || 'Authorization', '' + token)
    }
    let fileName = tempConf.name || url.split('?')[0] || `${new Date().getTime()}`
    if (fileName.length > 0) {
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1)
    }
    const suffix = tempConf.suffix || fileName.indexOf('.') > 0 ? fileName.substring(fileName.lastIndexOf('.')) : '.xlsx'
    xhr.onload = function () {
      if (this.status == 200) {
        const aLink = document.createElement('a')
        // 优化下载兼容性
        if ((window.navigator as any).msSaveOrOpenBlob && typeof (window.navigator as any).msSaveOrOpenBlob === 'function') {
          aLink.href = (window.navigator as any).msSaveOrOpenBlob(this.response, fileName + suffix)
        } else {
          aLink.href = window.URL.createObjectURL(this.response)
          aLink.download = fileName + suffix
        }
        aLink.click()
        window.URL.revokeObjectURL(url)
        setTimeout(() => {
          callBack && callBack()
        }, 1000)
      }
    }
    xhr.onerror = function (e: any) {
      // 如果错误，则尝试直接打开链接
      const aLink = document.createElement('a')
      aLink.href = url
      aLink.download = fileName + suffix
      aLink.click()
      setTimeout(() => {
        callBack && callBack()
      }, 1000)
    }
    if (method === 'post') {
      // 必须在xhr.send()前设置
      xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8')
      xhr.send(JSON.stringify(postData))
    } else {
      xhr.send()
    }
  }
}

/**
 * 处理搜索
 */
function handelSearch() {
  elPlusFormRef.value?.submit()
}

/**
 * 处理重置
 */
function handelReset() {
  elPlusFormRef.value.clear()
  emits('reset')
  nextTick(() => {
    elPlusFormRef.value?.submit()
  })
}

/**
 * 获取vif
 * @param item
 */
function getVIf(item: any) {
  if (item?.vif) {
    if (typeof item.vif === 'function') {
      return item.vif(item)
    }
    return !!item.vif
  }
  // 这里最终处理一下auth权限问题
  if (item?.auth) {
    if (!defaultConf.auth) {
      console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
    } else {
      return defaultConf.auth(item.auth)
    }
  }
  return true
}

/**
 * 初始化列
 */
function initCol() {
  if (props.tbName) {
    settingColumnRef.value?.initCol()
  } else {
    // 没有下一层，这里需要在这一层级初始化一下
    props.column?.map((item: any) => {
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
      // 这里最终处理一下auth权限问题
      if (item.auth) {
        if (!defaultConf.auth) {
          console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
        } else {
          item._vif = defaultConf.auth(item.auth)
        }
      }
    })
  }
}

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      handelSearch()
    }, 200)
  })
})

defineExpose({ getData: () => elPlusFormRef.value?.getData(), initCol })
</script>
<style lang="scss">
.el-plus-table-header-info {
  .el-plus-table-header-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .el-form {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .el-form-item {
        margin-bottom: 16px !important;
        .el-form-item__label {
          width: auto !important;
        }
      }
      .waterfall-panel {
        width: auto !important;
        align-items: center;
      }
      .table-header-form-btns {
        white-space: nowrap;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        & > * {
          margin-bottom: 16px;
        }
      }
    }

    .el-plus-table-header-btns {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .el-plus-table-header-btn {
        height: 40px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        & > * {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped="">
.el-plus-table-header-info {
  width: 100%;
}
</style>
