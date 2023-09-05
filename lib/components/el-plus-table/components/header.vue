<template>
  <div class="el-plus-table-header-info">
    <template v-if="props.toolbar && Object.keys(props.toolbar || {}).length">
      <el-form :inline="true" class="el-plus-table-header-form" :style="{ justifyContent: !props.toolbar.formConfig && props.toolbar.btnRight ? 'flex-end' : 'space-between' }">
        <div v-if="props.toolbar.formConfig" class="el-plus-table-form-items">
          <ElPlusForm ref="elPlusFormRef" v-bind="formConfig" v-model="props.modelValue" labelWidth="1" :requestFn="handelQueryData" :showBtns="false" :isTable="true">
            <template #row>
              <div class="table-header-form-btns">
                <ElPlusFormBtn type="primary" icon="ele-Search" :loading="loading" :desc="{ label: '查询', on: { click: handelSearch }, size }" />
                <ElPlusFormBtn :desc="{ label: '重置', on: { click: handelReset }, size }" />
                <ElPlusTableSettingColumn ref="settingColumnRef" v-if="tbName" :tbName="tbName" :column="column || []" :size="size" />
                <ElPlusFormBtn type="primary" v-if="props.toolbar.export" :desc="{ label: '导出Excel', size, mask: true, on: { click: handelDownload } }" />
                <template v-for="(item, i) in headerBtns" :key="i">
                  <template v-if="getVIf(item)">
                    <ElPlusFormUpbtn v-if="item.elType === 'upload'" :desc="item" :loading="loading" />
                    <ElPlusFormBtn v-else :desc="item" :loading="loading" />
                  </template>
                </template>
              </div>
            </template>
          </ElPlusForm>
        </div>
        <div v-else class="el-plus-table-header-btns" :style="{ 'min-width': isMobile() ? '100%' : headerBtns && headerBtns.length > 0 ? headerBtns.length * 110 + 'px' : '10px' }">
          <div class="el-plus-table-header-btn">
            <template v-for="(item, i) in headerBtns" :key="i">
              <ElPlusFormUpbtn v-if="item.elType === 'upload'" :desc="item" :loading="loading" />
              <ElPlusFormBtn v-else :desc="item" :loading="loading" />
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
import { isMobile, handelBtnType, mapToUrlStr } from '../util'
import { IBtnBack, ICRUDConfig, IColumnItem, ITableToolbar } from 'types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const emits = defineEmits(['query'])
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

function handelQueryData() {
  // 通知父类执行查询
  emits('query')
}

/**
 * 下载
 * @param data
 */
async function handelDownload({ callBack }: IBtnBack) {
  if (props.toolbar?.export) {
    // 创建请求
    const xhr = new XMLHttpRequest()
    let url = props.toolbar.export.url || ''
    const method = props.toolbar.export.method || 'get'
    let postData = Object.assign({}, elPlusFormRef.value?.getData(), props.toolbar.export?.data || {})
    // 处理为空的请求数据
    for (let key in postData) {
      if (postData[key] === undefined || postData[key] === null || postData[key] === '') {
        delete postData[key]
      }
    }
    if (props.toolbar.export.fetch) {
      url = (await props.toolbar.export.fetch(postData)) as string
    } else {
      if (!props.toolbar.export.noQuery && method === 'get') {
        url += (url.indexOf('?') >= 0 ? '&' : '?') + mapToUrlStr(postData)
      }
    }
    if (props.toolbar.export.beforeRequest && typeof props.toolbar.export.beforeRequest === 'function') {
      postData = props.toolbar.export.beforeRequest(postData)
    }
    xhr.open(method, url, true)
    // 转换流
    xhr.responseType = 'blob'
    // 是否授权
    if (props.toolbar.export.isAuth !== false && defaultConf.token) {
      let token = defaultConf.token
      if (typeof defaultConf.token === 'function') {
        token = defaultConf.token()
      }
      xhr.setRequestHeader('Authorization', '' + token)
    }
    xhr.onload = function () {
      if (this.status == 200) {
        const aLink = document.createElement('a')
        aLink.href = window.URL.createObjectURL(this.response)
        // 自定义文件名
        aLink.download = (props.toolbar?.export?.name || new Date().getTime()) + (props.toolbar?.export?.suffix || '.xlsx')
        aLink.click()
        window.URL.revokeObjectURL(url)
        setTimeout(() => {
          callBack && callBack()
        }, 1000)
      }
    }
    xhr.onerror = function () {
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
  elPlusFormRef.value.submit()
}

/**
 * 处理重置
 */
function handelReset() {
  elPlusFormRef.value.clear()
  nextTick(() => {
    elPlusFormRef.value.submit()
  })
}

/**
 * 获取vif
 * @param item
 */
function getVIf(item: any) {
  if (item.vif) {
    if (typeof item.vif === 'function') {
      return item.vif(item)
    }
    return !!item.vif
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

onMounted(() => {})

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
types
